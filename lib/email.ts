import nodemailer from "nodemailer";

/**
 * SMTP email helper — mirrors the opsy pattern (nodemailer over SMTP, driven by
 * SMTP_* env vars). Configure SMTP_HOST, SMTP_PORT, SMTP_SECURE, SMTP_USER,
 * SMTP_PASS and EMAIL_FROM in the environment.
 */
export interface EmailAttachment {
  filename: string;
  content: Buffer | string;
  contentType?: string;
}

interface EmailOptions {
  to: string | string[];
  subject: string;
  html: string;
  replyTo?: string;
  attachments?: EmailAttachment[];
}

/** True when the SMTP transport has enough configuration to send. */
export function isEmailConfigured(): boolean {
  return Boolean(process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS);
}

export const sendEmail = async ({ to, subject, html, replyTo, attachments }: EmailOptions) => {
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT) || 587,
    secure: process.env.SMTP_SECURE === "true", // true for 465, false for other ports
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  const from = process.env.EMAIL_FROM || '"Thepla House" <noreply@theplahouse.com>';

  const info = await transporter.sendMail({
    from,
    to: Array.isArray(to) ? to.join(", ") : to,
    subject,
    html,
    ...(replyTo ? { replyTo } : {}),
    ...(attachments && attachments.length > 0 ? { attachments } : {}),
  });

  console.log("Message sent: %s", info.messageId);
  return info;
};
