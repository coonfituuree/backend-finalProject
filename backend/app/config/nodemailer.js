import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASSWORD,
  },
  logger: true,
  debug: true,
  connectionTimeout: 10_000,
  greetingTimeout: 10_000,
  socketTimeout: 20_000,
});

transporter
  .verify()
  .then(() => console.log("SMTP ready: true"))
  .catch((err) => console.error("SMTP verify failed:", err?.message || err));

export async function sendEmail(to, subject, text) {
  const mailData = {
    from: process.env.SENDER_EMAIL || process.env.SMTP_USER, // важный фоллбек
    to,
    subject,
    text,
  };

  const info = await transporter.sendMail(mailData);
  console.log("Email sent:", info.response || info.messageId);
  return info;
}
