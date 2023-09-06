import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";

export const hashPassword = async (password) => {
  return await bcrypt.hash(password, 10);
};

export const generateToken = (user) => {
  return jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });
};

export const sendVerificationEmail = async (email, token) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  const url = `http://localhost:3000/verify/${token}`;

  await transporter.sendMail({
    to: email,
    subject: "Email Verification",
    html: `Click <a href="${url}">here</a> to verify your email.`,
  });
};
