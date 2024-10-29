import nodemailer from "nodemailer";
import { generateOTPEmailTemplate } from "./emailTemplates";

const transporter = nodemailer.createTransport({
  // Configure your email service here
  service: "gmail",
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
  },
});

export const sendOTPEmail = async (
  email: string,
  otp: string,
  name: string
) => {
  const mailOptions = {
    from: process.env.MAIL_USER,
    to: email,
    subject: "Your Verification Code",
    html: generateOTPEmailTemplate(otp, name),
  };

  return transporter.sendMail(mailOptions);
};
