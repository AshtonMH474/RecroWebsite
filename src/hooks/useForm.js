import { useState } from "react";

export function useForm(initialValues = {}, validationFn = null) {
  const [formData, setFormData] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const handleSubmit = async (onSubmit) => {
    setLoading(true);
    setErrors({});

    try {
      if (validationFn) {
        const validationErrors = validationFn(formData);
        if (Object.keys(validationErrors).length > 0) {
          setErrors(validationErrors);
          setLoading(false);
          return;
        }
      }

      await onSubmit(formData);
    } catch (error) {
      console.error("Form submission error:", error);
      setErrors({ submit: error.message || "An error occurred" });
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setFormData(initialValues);
    setErrors({});
    setLoading(false);
  };

  const allFilled = Object.values(formData).every(
    (val) => typeof val === "string" && val.trim() !== ""
  );

  return {
    formData,
    setFormData,
    errors,
    setErrors,
    loading,
    setLoading,
    handleChange,
    handleSubmit,
    resetForm,
    allFilled,
  };
}
