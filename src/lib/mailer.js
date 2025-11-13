import nodemailer from "nodemailer";

/**
 * Create a nodemailer transporter with SMTP configuration
 * @param {Object} options - Optional configuration overrides
 * @param {string} options.user - SMTP user (defaults to SMTP_USER env var)
 * @param {string} options.pass - SMTP password (defaults to SMTP_PASS env var)
 * @returns {nodemailer.Transporter} Configured nodemailer transporter
 */
export function createMailer(options = {}) {
  return nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT),
    secure: process.env.SMTP_SECURE === "true",
    auth: {
      user: options.user || process.env.SMTP_USER,
      pass: options.pass || process.env.SMTP_PASS,
    },
  });
}

/**
 * Create a transporter for career-related emails
 * Uses SMTP_CAREER_HOST and SMTP_CAREER_PASS environment variables
 * @returns {nodemailer.Transporter} Configured nodemailer transporter for career emails
 */
export function createCareerMailer() {
  return createMailer({
    user: process.env.SMTP_CAREER_HOST,
    pass: process.env.SMTP_CAREER_PASS,
  });
}
