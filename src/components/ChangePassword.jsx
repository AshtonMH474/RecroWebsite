import { useState } from "react";
import Modal from "@/components/common/Modal";
import Input from "@/components/common/Input";
import Button from "@/components/common/Button";
import { useForm } from "@/hooks/useForm";
import { fetchWithCsrf } from "@/lib/csrf";

function ChangePassword({ onClose, token }) {
  const [success, setSuccess] = useState(null);

  const { formData, handleChange, errors, setErrors, allFilled } = useForm({
    newPassword: "",
    confirmPassword: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const obj = {};
    if (formData?.newPassword?.length < 8) {
      obj.pass = "Password Must be 8 Characters or More";
    }
    if (formData.newPassword !== formData.confirmPassword) {
      obj.password = "Make Sure Passwords Match";
    }

    if (obj.password || obj.pass) {
      setErrors(obj);
      return;
    }
    setErrors({});
    setSuccess("");

    try {
      const res = await fetchWithCsrf("/api/session/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          token,
          newPassword: formData.newPassword,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setErrors({ error: data.error || "Something went wrong" });
      } else {
        setSuccess("Password has been reset successfully!");
      }
    } catch (err) {
      setErrors({ error: "Network error, please try again." });
    }
  };

  return (
    <Modal isOpen={true} onClose={onClose}>
      <div className="p-6 pt-14 lg:w-[800px]">
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            type="password"
            name="newPassword"
            value={formData.newPassword}
            onChange={handleChange}
            placeholder="New Password"
            required
          />
          <Input
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            placeholder="Confirm Password"
            required
          />

          {errors?.password && <div className="text-red-600">{errors.password}</div>}
          {errors?.pass && <div className="text-red-600">{errors.pass}</div>}
          {errors?.error && <div className="text-red-500 text-sm">{errors.error}</div>}
          {success && <div className="text-green-500 text-sm">{success}</div>}

          <Button type="submit" disabled={!allFilled} variant="primary" className="w-full">
            Change Password
          </Button>
        </form>
      </div>
    </Modal>
  );
}

export default ChangePassword;
