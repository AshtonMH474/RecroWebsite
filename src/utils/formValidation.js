export const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const validatePassword = (password, minLength = 8) => {
  return password.length >= minLength;
};

export const validatePasswordMatch = (password, confirmPassword) => {
  return password === confirmPassword;
};

export const validatePhone = (phone) => {
  const phoneRegex = /^\+?[\d\s\-()]+$/;
  return phone.length >= 10 && phoneRegex.test(phone);
};

export const validateRequired = (value) => {
  return value && value.trim() !== "";
};

export const loginValidation = (formData) => {
  const errors = {};

  if (!validateRequired(formData.email)) {
    errors.email = "Email is required";
  } else if (!validateEmail(formData.email)) {
    errors.email = "Please enter a valid email";
  }

  if (!validateRequired(formData.password)) {
    errors.password = "Password is required";
  }

  return errors;
};

export const registerValidation = (formData) => {
  const errors = {};

  if (!validateRequired(formData.firstName)) {
    errors.firstName = "First name is required";
  }

  if (!validateRequired(formData.lastName)) {
    errors.lastName = "Last name is required";
  }

  if (!validateRequired(formData.email)) {
    errors.email = "Email is required";
  } else if (!validateEmail(formData.email)) {
    errors.email = "Please enter a valid email";
  }

  if (!validateRequired(formData.phone)) {
    errors.phone = "Phone number is required";
  } else if (!validatePhone(formData.phone)) {
    errors.phone = "Please enter a valid phone number";
  }

  if (!validateRequired(formData.password)) {
    errors.password = "Password is required";
  } else if (!validatePassword(formData.password)) {
    errors.password = "Password must be at least 8 characters";
  }

  if (!validateRequired(formData.confirmPassword)) {
    errors.confirmPassword = "Please confirm your password";
  } else if (!validatePasswordMatch(formData.password, formData.confirmPassword)) {
    errors.confirmPassword = "Passwords do not match";
  }

  return errors;
};

export const passwordResetValidation = (formData) => {
  const errors = {};

  if (!validateRequired(formData.password)) {
    errors.password = "Password is required";
  } else if (!validatePassword(formData.password)) {
    errors.password = "Password must be at least 8 characters";
  }

  if (!validateRequired(formData.confirmPassword)) {
    errors.confirmPassword = "Please confirm your password";
  } else if (!validatePasswordMatch(formData.password, formData.confirmPassword)) {
    errors.confirmPassword = "Passwords do not match";
  }

  return errors;
};

export const contactFormValidation = (formData) => {
  const errors = {};

  if (!validateRequired(formData.firstName)) {
    errors.firstName = "First name is required";
  }

  if (!validateRequired(formData.lastName)) {
    errors.lastName = "Last name is required";
  }

  if (!validateRequired(formData.email)) {
    errors.email = "Email is required";
  } else if (!validateEmail(formData.email)) {
    errors.email = "Please enter a valid email";
  }

  if (!validateRequired(formData.phone)) {
    errors.phone = "Phone number is required";
  } else if (!validatePhone(formData.phone)) {
    errors.phone = "Please enter a valid phone number";
  }

  if (!validateRequired(formData.message)) {
    errors.message = "Message is required";
  }

  return errors;
};
