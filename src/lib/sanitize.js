/**
 * Input sanitization and validation utilities for RecroWebsite API routes
 * Provides XSS prevention, input validation, and data sanitization
 */

/**
 * RFC 5322 compliant email regex pattern
 */
const EMAIL_REGEX =
  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/;

/**
 * Phone number pattern (basic validation)
 */
const PHONE_REGEX = /^\+?[1-9]\d{1,14}$/;

// HTML entities to escape for XSS prevention
const htmlEntities = {
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;',
  '"': '&quot;',
  "'": '&#x27;',
  '/': '&#x2F;',
  '`': '&#x60;',
  '=': '&#x3D;',
};

/**
 * Validates an email address format
 * @param {string} email - The email to validate
 * @returns {boolean} - True if valid email format
 */
export function isValidEmail(email) {
  if (typeof email !== 'string') return false;
  const trimmed = email.trim().toLowerCase();
  if (trimmed.length === 0 || trimmed.length > 254) return false;
  return EMAIL_REGEX.test(trimmed);
}

/**
 * Validates a phone number format
 * @param {string} phone - The phone number to validate
 * @returns {boolean} - True if valid phone format
 */
export function isValidPhone(phone) {
  if (typeof phone !== 'string') return false;
  if (phone.trim().length === 0) return true; // Empty phone is allowed (optional field)
  return PHONE_REGEX.test(phone.replace(/[\s()-]/g, ''));
}

/**
 * Validates password complexity requirements
 * @param {string} password - The password to validate
 * @returns {{ valid: boolean, error?: string }} - Validation result with error message
 */
export function validatePassword(password) {
  if (typeof password !== 'string') {
    return { valid: false, error: 'Password must be a string' };
  }

  if (password.length < 8) {
    return { valid: false, error: 'Password must be at least 8 characters' };
  }

  if (password.length > 128) {
    return { valid: false, error: 'Password must be less than 128 characters' };
  }

  const hasUpperCase = /[A-Z]/.test(password);
  const hasLowerCase = /[a-z]/.test(password);
  const hasNumber = /\d/.test(password);
  const hasSpecialChar = /[@$!%*?&]/.test(password);

  if (!hasUpperCase || !hasLowerCase || !hasNumber || !hasSpecialChar) {
    return {
      valid: false,
      error:
        'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character (@$!%*?&)',
    };
  }

  return { valid: true };
}

/**
 * Escapes HTML special characters to prevent XSS
 * @param {string} str - The string to sanitize
 * @returns {string} - Sanitized string
 */
export function escapeHtml(str) {
  if (typeof str !== 'string') return str;
  return str.replace(/[&<>"'`=/]/g, (char) => htmlEntities[char]);
}

/**
 * Removes potentially dangerous patterns from strings
 * @param {string} str - The string to sanitize
 * @returns {string} - Sanitized string
 */
export function sanitizeString(str) {
  if (typeof str !== 'string') return str;

  let sanitized = str.trim();
  sanitized = sanitized.replace(/\0/g, '');
  // eslint-disable-next-line no-control-regex
  sanitized = sanitized.replace(/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/g, '');
  sanitized = escapeHtml(sanitized);

  return sanitized;
}

/**
 * Sanitizes a string but preserves newlines (for message fields)
 * @param {string} str - The string to sanitize
 * @returns {string} - Sanitized string with preserved newlines
 */
export function sanitizeMultilineString(str) {
  if (typeof str !== 'string') return str;

  let sanitized = str.trim();
  sanitized = sanitized.replace(/\0/g, '');
  // eslint-disable-next-line no-control-regex
  sanitized = sanitized.replace(/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/g, '');
  sanitized = escapeHtml(sanitized);

  return sanitized;
}

/**
 * Validates that all required string fields are present and are strings
 * @param {Object} obj - The object to validate
 * @param {string[]} requiredFields - Array of required field names
 * @returns {{ valid: boolean, error?: string }} - Validation result
 */
export function validateRequiredStrings(obj, requiredFields) {
  for (const field of requiredFields) {
    if (typeof obj[field] !== 'string') {
      return { valid: false, error: `Invalid ${field} format` };
    }
    if (obj[field].trim().length === 0) {
      return { valid: false, error: `${field} is required` };
    }
  }
  return { valid: true };
}

/**
 * Sanitizes signup form data
 * @param {Object} data - The signup form data
 * @returns {{ valid: boolean, data?: Object, error?: string }} - Sanitized data or error
 */
export function sanitizeSignupData(data) {
  if (!data || typeof data !== 'object') {
    return { valid: false, error: 'Invalid input' };
  }

  const requiredFields = ['email', 'password', 'firstName', 'lastName', 'organization', 'phone'];
  const validation = validateRequiredStrings(data, requiredFields);
  if (!validation.valid) {
    return validation;
  }

  if (!isValidEmail(data.email)) {
    return { valid: false, error: 'Invalid email format' };
  }

  const passwordValidation = validatePassword(data.password);
  if (!passwordValidation.valid) {
    return passwordValidation;
  }

  if (!isValidPhone(data.phone)) {
    return { valid: false, error: 'Invalid phone number format' };
  }

  return {
    valid: true,
    data: {
      email: sanitizeString(data.email).toLowerCase(),
      password: data.password,
      firstName: sanitizeString(data.firstName),
      lastName: sanitizeString(data.lastName),
      organization: sanitizeString(data.organization),
      phone: sanitizeString(data.phone),
    },
  };
}

/**
 * Sanitizes login credentials
 * @param {Object} data - The login data
 * @returns {{ valid: boolean, data?: Object, error?: string }} - Sanitized data or error
 */
export function sanitizeLoginData(data) {
  if (!data || typeof data !== 'object') {
    return { valid: false, error: 'Invalid input' };
  }

  if (typeof data.email !== 'string' || typeof data.password !== 'string') {
    return { valid: false, error: 'Invalid input format' };
  }

  if (!data.email.trim() || !data.password) {
    return { valid: false, error: 'Email and password are required' };
  }

  return {
    valid: true,
    data: {
      email: sanitizeString(data.email).toLowerCase(),
      password: data.password,
    },
  };
}

/**
 * Sanitizes contact form data
 * @param {Object} form - The form data object
 * @returns {{ valid: boolean, data?: Object, error?: string }} - Sanitized data or error
 */
export function sanitizeContactFormData(form) {
  if (!form || typeof form !== 'object') {
    return { valid: false, error: 'Invalid input' };
  }

  const requiredValidation = validateRequiredStrings(form, [
    'email',
    'subject',
    'message',
    'firstName',
    'lastName',
  ]);
  if (!requiredValidation.valid) {
    return { valid: false, error: 'Missing required fields' };
  }

  if (!isValidEmail(form.email)) {
    return { valid: false, error: 'Invalid email format' };
  }

  if (form.organization && typeof form.organization !== 'string') {
    return { valid: false, error: 'organization must be a string' };
  }

  if (form.phone && typeof form.phone !== 'string') {
    return { valid: false, error: 'phone must be a string' };
  }

  if (form.phone && !isValidPhone(form.phone)) {
    return { valid: false, error: 'Invalid phone number format' };
  }

  return {
    valid: true,
    data: {
      firstName: sanitizeString(form.firstName),
      lastName: sanitizeString(form.lastName),
      email: sanitizeString(form.email).toLowerCase(),
      subject: sanitizeString(form.subject),
      message: sanitizeMultilineString(form.message),
      organization: form.organization ? sanitizeString(form.organization) : null,
      phone: form.phone ? sanitizeString(form.phone) : null,
    },
  };
}

/**
 * Sanitizes password reset data
 * @param {Object} data - The password reset data
 * @returns {{ valid: boolean, data?: Object, error?: string }} - Sanitized data or error
 */
export function sanitizePasswordResetData(data) {
  if (!data || typeof data !== 'object') {
    return { valid: false, error: 'Invalid input' };
  }

  if (typeof data.resetToken !== 'string' || typeof data.newPassword !== 'string') {
    return { valid: false, error: 'Invalid input format' };
  }

  if (!data.resetToken.trim()) {
    return { valid: false, error: 'Reset token is required' };
  }

  const passwordValidation = validatePassword(data.newPassword);
  if (!passwordValidation.valid) {
    return passwordValidation;
  }

  if (!/^[a-f0-9]{64}$/i.test(data.resetToken.trim())) {
    return { valid: false, error: 'Invalid reset token format' };
  }

  return {
    valid: true,
    data: {
      resetToken: data.resetToken.trim(),
      newPassword: data.newPassword,
    },
  };
}

/**
 * Sanitizes download tracking data
 * @param {Object} data - The download data
 * @returns {{ valid: boolean, data?: Object, error?: string }} - Sanitized data or error
 */
export function sanitizeDownloadData(data) {
  if (!data || typeof data !== 'object') {
    return { valid: false, error: 'Invalid input' };
  }

  if (typeof data.pdfUrl !== 'string' || typeof data.type !== 'string') {
    return { valid: false, error: 'Invalid input format' };
  }

  if (!data.pdfUrl.trim() || !data.type.trim()) {
    return { valid: false, error: 'pdfUrl and type are required' };
  }

  return {
    valid: true,
    data: {
      pdfUrl: sanitizeString(data.pdfUrl),
      type: sanitizeString(data.type),
    },
  };
}
