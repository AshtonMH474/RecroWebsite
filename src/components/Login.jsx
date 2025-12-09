
import { useEffect, useState } from "react";
import { handleLogin } from "@/lib/auth_functions";
import { useAuth } from "@/context/auth";
import Modal from "@/components/common/Modal";
import Input from "@/components/common/Input";
import Button from "@/components/common/Button";
import { useForm } from "@/hooks/useForm";

function Login({ onClose, modalData }) {
  const { setUser, openModal } = useAuth();
  const [isToken, setToken] = useState(false);

  const { formData, handleChange, loading, setLoading, errors, setErrors, allFilled } = useForm({
    email: "",
    password: "",
  });

  useEffect(() => {
    const verify = async (token) => {
      if (token) {
        setToken(true);
        await fetch(`/api/session/verify?token=${token}`);
      }
    };
    verify(modalData?.token);
  }, [modalData?.token]);

  const handleRegister = () => {
    onClose();
    openModal("register");
  };

  const handleForgotPassword = () => {
    onClose();
    openModal("newPassword");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!allFilled) {
      alert("Please fill all the fields");
      return;
    }

    try {
      setLoading(true);
      const res = await handleLogin(setUser, formData);
      if (res && res.error) {
        setErrors({ error: res.error });
        return;
      }
      onClose();
    } catch (err) {
      alert("Failed to submit.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal isOpen={true} onClose={onClose}>
      <div className="p-6 pt-14 lg:w-[800px]">
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email"
            required
          />
          <Input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Password"
            required
          />

          {errors?.error && <div className="text-red-600">{errors.error}</div>}
          {isToken && (
            <div className="pl-2 text-green-500 text-sm">
              Verification successful! You can now log in.
            </div>
          )}

          <button
            type="button"
            onClick={handleForgotPassword}
            className="pl-2 text-sm text-blue-400 hover:underline cursor-pointer"
          >
            Forgot Password?
          </button>

          <div className="flex gap-4">
            <Button
              type="submit"
              disabled={!allFilled || loading}
              variant="primary"
              className="w-full"
            >
              {loading ? "Sending..." : "Login"}
            </Button>

            <Button type="button" onClick={handleRegister} variant="border" className="w-full">
              Register
            </Button>
          </div>
        </form>
      </div>
    </Modal>
  );
}

export default Login;
