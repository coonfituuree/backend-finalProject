import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { sendEmail } from "../config/nodemailer.js";
import userModel from "../models/user.model.js";

const setAuthCookie = (res, token) => {
  res.cookie("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
    maxAge: 24 * 60 * 60 * 1000,
  });
};

const clearAuthCookie = (res) => {
  res.clearCookie("token", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
  });
};

const signToken = (user) =>
  jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });

const generateOtp6 = () => String(Math.floor(100000 + Math.random() * 900000));

const logMailError = (context, err) => {
  // Для SMTP важно видеть response/code/command
  console.error(`[MAIL ERROR] ${context}`, {
    message: err?.message,
    code: err?.code,
    command: err?.command,
    response: err?.response,
    responseCode: err?.responseCode,
  });
};

export const register = async (req, res) => {
  const { username, email, password, firstName, lastName, phoneNumber } =
    req.body;

  try {
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: "User with this email already exists",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await userModel.create({
      username,
      email,
      password: hashedPassword,
      firstName,
      lastName,
      phoneNumber,
      role: "user",
    });

    const token = signToken(user);
    setAuthCookie(res, token);

    // Welcome email (не ломаем регистрацию, если почта упала)
    try {
      await sendEmail(
        email,
        "Welcome to Vizier Airways!",
        `Hello ${firstName},\n\n` +
          `Thank you for registering with Vizier Airways. We're excited to have you on board!\n\n` +
          `Best regards,\nVizier Airways Team`,
      );
    } catch (mailErr) {
      logMailError("welcome email", mailErr);
    }

    return res.status(201).json({
      success: true,
      message: "User registered successfully",
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const login = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    const user = await userModel.findOne(username ? { username } : { email });
    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid credentials" });
    }

    const token = signToken(user);
    setAuthCookie(res, token);

    return res.json({ success: true, message: "Login successful" });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Server error" });
  }
};

export const logout = (req, res) => {
  try {
    clearAuthCookie(res);
    return res.json({ success: true, message: "Logout successful" });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Server error" });
  }
};

export const sendVerifyOtp = async (req, res) => {
  try {
    const userId = req.user?.id;

    const user = await userModel.findById(userId);
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    if (user.isAccountVerified) {
      return res
        .status(400)
        .json({ success: false, message: "Account already verified" });
    }

    const otp = generateOtp6();
    user.verifyOtp = otp;
    user.verifyOtpExpireAt = Date.now() + 10 * 60 * 1000;
    await user.save();

    try {
      await sendEmail(
        user.email,
        "Your Verification OTP",
        `Hello ${user.firstName},\n\n` +
          `Your OTP for account verification is: ${otp}\n` +
          `It will expire in 10 minutes.\n\n` +
          `Best regards,\nVizier Airways Team`,
      );
    } catch (mailErr) {
      logMailError("verify otp", mailErr);
      // Можно вернуть 500, если хочешь строго, но обычно OTP отправка критична:
      return res
        .status(500)
        .json({ success: false, message: "Failed to send OTP email" });
    }

    return res.json({ success: true, message: "OTP sent successfully" });
  } catch (error) {
    console.log("sendVerifyOtp error:", error);
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const verifyEmail = async (req, res) => {
  const { otp } = req.body;
  const userId = req.user?.id;

  try {
    const user = await userModel.findById(userId);
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    if (user.isAccountVerified) {
      return res
        .status(400)
        .json({ success: false, message: "Account already verified" });
    }

    if (user.verifyOtp !== otp) {
      return res.status(400).json({ success: false, message: "Invalid OTP" });
    }

    if (Date.now() > user.verifyOtpExpireAt) {
      return res
        .status(400)
        .json({ success: false, message: "OTP has expired" });
    }

    user.isAccountVerified = true;
    user.verifyOtp = "";
    user.verifyOtpExpireAt = 0;
    await user.save();

    return res.json({ success: true, message: "Email verified successfully" });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const isAuthenticated = (req, res) => {
  return res.json({ success: true });
};

export const sendResetOtp = async (req, res) => {
  const { email } = req.body;

  try {
    const user = await userModel.findOne({ email });
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    const otp = generateOtp6();
    user.resetOtp = otp;
    user.resetOtpExpireAt = Date.now() + 10 * 60 * 1000;
    await user.save();

    try {
      await sendEmail(
        user.email,
        "Password Reset OTP",
        `Hello ${user.firstName},\n\n` +
          `Your OTP for resetting password is: ${otp}\n` +
          `It will expire in 10 minutes.\n\n` +
          `Best regards,\nVizier Airways Team`,
      );
    } catch (mailErr) {
      logMailError("reset otp", mailErr);
      return res
        .status(500)
        .json({ success: false, message: "Failed to send reset OTP email" });
    }

    return res.json({ success: true, message: "OTP sent to your email" });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};

export const resetPassword = async (req, res) => {
  const { email, otp, newPassword } = req.body;

  try {
    const user = await userModel.findOne({ email });
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    if (!user.resetOtp || user.resetOtp !== otp) {
      return res.status(400).json({ success: false, message: "Invalid OTP" });
    }

    if (user.resetOtpExpireAt < Date.now()) {
      return res.status(400).json({ success: false, message: "OTP expired" });
    }

    user.password = await bcrypt.hash(newPassword, 10);
    user.resetOtp = "";
    user.resetOtpExpireAt = 0;
    await user.save();

    return res.json({
      success: true,
      message: "Password has been changed successfully",
    });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};
