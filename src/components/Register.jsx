import { useState, useEffect, useCallback } from "react";
import { handleSignup } from "@/lib/auth_functions";
import { useAuth } from "@/context/auth";
import Modal from "@/components/common/Modal";
import Input from "@/components/common/Input";
import Button from "@/components/common/Button";
import { useForm } from "@/hooks/useForm";
import "react-phone-number-input/style.css";
import PhoneInput, { isValidPhoneNumber } from "react-phone-number-input";
import { fetchWithCsrf } from "@/lib/csrf";
import { isValidEmail, validatePassword } from "@/lib/sanitize";

function Register({ onClose }) {
  const { openModal } = useAuth();
  const [verified, setVerified] = useState(false);
  const [phone, setPhone] = useState("");
  const [cooldown, setCooldown] = useState(0);

  const { formData, handleChange, loading, setLoading, errors, setErrors, allFilled } = useForm({
    email: "",
    password: "",
    organization: "",
    firstName: "",
    lastName: "",
    confirmPassword: "",
  });

  useEffect(() => {
    if (cooldown > 0) {
      const timer = setInterval(() => setCooldown((c) => c - 1), 1000);
      return () => clearInterval(timer);
    }
  }, [cooldown]);

  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      if (!allFilled) {
        alert("Please Fill All the Fields");
        return;
      }
      const obj = {};
      if (!isValidEmail(formData.email)) {
        obj.email = "Please enter a valid email address";
      }
      const passwordValidation = validatePassword(formData.password);
      if (!passwordValidation.valid) {
        obj.pass = passwordValidation.error;
      }
      if (formData.password !== formData.confirmPassword) {
        obj.password = "Make Sure Passwords Match";
      }
      if (obj.email || obj.password || obj.pass) {
        setErrors(obj);
        return;
      }
      if (!phone || !isValidPhoneNumber(phone)) {
        obj.number = "Please Enter a Valid Phone Number";
        setErrors(obj);
        return;
      }

      try {
        setLoading(true);
        let res = await handleSignup(formData, phone);

        if (res.verified === false) {
          setVerified(true);
        }
        if (res.error) {
          obj.error = res.error;
          setErrors(obj);
          return;
        }

        setVerified(true);
        setErrors({});
      } catch {
        alert("Failed to submit.");
      } finally {
        setLoading(false);
      }
    },
    [formData, phone, allFilled, setLoading, setErrors]
  );

  const handleLoginModal = async () => {
    onClose();
    openModal("login");
  };

  return (
    <Modal isOpen={true} onClose={onClose}>
      <div className="p-6 pt-14 lg:w-[800px]">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <Input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              placeholder="First Name"
              className=""
              required
            />
            <Input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              placeholder="Last Name"
              className=""
              required
            />
          </div>

          <Input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Company Email"
            required
          />

          <div className="flex flex-col sm:flex-row gap-4">
            <PhoneInput
              placeholder="Enter phone number"
              value={phone}
              onChange={setPhone}
              defaultCountry="US"
              className="w-full  p-2 rounded bg-[#2A2A2E] text-white placeholder-white/70"
            />

            <Input
              type="text"
              name="organization"
              value={formData.organization}
              onChange={handleChange}
              placeholder="Company"
              className=""
              required
            />
          </div>

          <Input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Password"
            required
          />
          <Input
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            placeholder="Re-enter Password"
            required
          />

          {errors?.email && <div className="text-red-600">{errors.email}</div>}
          {errors?.number && <div className="text-red-600">{errors.number}</div>}
          {errors?.password && <div className="text-red-600">{errors.password}</div>}
          {errors?.pass && <div className="text-red-600">{errors.pass}</div>}
          {errors?.error && <div className="text-red-600">{errors.error}</div>}

          {verified && (
            <div className="text-green-400 space-y-2">
              <p>Check your email to verify and then login</p>
              <button
                disabled={cooldown > 0}
                type="button"
                onClick={async () => {
                  const res = await fetchWithCsrf("/api/session/resend", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ email: formData.email }),
                  });
                  const data = await res.json();
                  if (res.ok) {
                    setCooldown(60);
                  } else {
                    setErrors({ error: data.error });
                  }
                }}
                className={`px-4 py-2 rounded text-white ${
                  cooldown > 0
                    ? "bg-gray-600 cursor-not-allowed"
                    : "bg-primary hover:opacity-80 cursor-pointer"
                }`}
              >
                {cooldown > 0 ? `Resend in ${cooldown}s` : "Resend Verification Email"}
              </button>
            </div>
          )}

          <div className="flex gap-4">
            <Button
              type="submit"
              disabled={!allFilled || loading}
              variant="primary"
              className="w-full"
            >
              {loading ? "Sending..." : "Register"}
            </Button>

            <Button type="button" onClick={handleLoginModal} variant="border" className="w-full">
              Login
            </Button>
          </div>
        </form>
      </div>
    </Modal>
  );
}

export default Register;
