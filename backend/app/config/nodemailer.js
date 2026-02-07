import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

export const sendEmail = async (to, subject, text) => {
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
  });

  transporter.verify((err, success) => {
    if (err) console.error("SMTP verify failed:", err);
    else console.log("SMTP ready:", success);
  });

  const mailData = {
    from: process.env.SENDER_EMAIL,
    to,
    subject,
    text,
  };
  
  await new Promise((resolve, reject) => {
    transporter.sendMail(mailData, (err, info) => {
      if (err) {
        console.error("Email send error:", err);
        reject(err);
      } else {
        console.log("Email sent:", info.response);
        resolve(info);
      }
    });
  });
};

export default transporter;
