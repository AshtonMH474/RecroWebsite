import { useState } from 'react';
import Modal from '@/components/common/Modal';
import Input from '@/components/common/Input';
import Button from '@/components/common/Button';
import { useForm } from '@/hooks/useForm';
import { useAuth } from '@/context/auth';
import { fetchWithCsrf } from '@/lib/csrf';

function NewPasswordModal({ onClose }) {
  const [success, setSuccess] = useState(null);
  const { openModal } = useAuth();
  const { formData, handleChange, loading, setLoading, errors, setErrors, allFilled } = useForm({
    email: '',
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!allFilled) return;

    setLoading(true);
    setErrors({});
    setSuccess(null);

    try {
      const res = await fetchWithCsrf('/api/session/forgot-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok) {
        setSuccess('If this email exists, a reset link has been sent.');
      } else {
        setErrors({ error: data.error || 'Something went wrong.' });
      }
    } catch (err) {
      console.error(err);
      setErrors({ error: 'Network error. Please try again.' });
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = async () => {
    await onClose();
    await openModal('login');
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

          {errors?.error && <div className="text-red-500 text-sm">{errors.error}</div>}
          {success && <div className="text-green-500 text-sm">{success}</div>}

          <Button type="button" onClick={handleLogin} variant="border" className="w-full">
            Login
          </Button>

          <Button
            type="submit"
            disabled={!allFilled || loading}
            variant="primary"
            className="w-full"
          >
            {loading ? 'Sending...' : 'Reset Password'}
          </Button>
        </form>
      </div>
    </Modal>
  );
}

export default NewPasswordModal;
