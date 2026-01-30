import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// Import all models
import BaseUser from "../models/baseUserModel.js";
import Patient from "../models/patientModel.js";
import Clinic from "../models/clinicModel.js";
import Doctor from "../models/doctorModel.js";
import Pharmacist from "../models/pharmacistModel.js";
import { sendEmail } from "../config/nodeMailer.js";

const generateToken = (res, id, name, role) => {
  const token = jwt.sign({ id, name, role }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });

  res.cookie("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });
};

// Helper function to get appropriate model based on role
const getModelByRole = (role) => {
  switch (role) {
    case 'patient':
      return Patient;
    case 'clinic':
      return Clinic;
    case 'doctor':
      return Doctor;
    case 'pharmacist':
      return Pharmacist;
    default:
      return BaseUser;
  }
};

// Register User (supports all roles)
export const registerUser = async (req, res) => {
  const { email, password, role, ...roleSpecificData } = req.body;

  if (!email || !password || !role) {
    return res.status(400).json({ success: false, message: "Missing required details" });
  }

  try {
    // Check if user already exists
    const existingUser = await BaseUser.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ success: false, message: "User already exists" });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Get appropriate model
    const Model = getModelByRole(role);

    // Prepare user data
    const userData = {
      email,
      password: hashedPassword,
      role,
      ...roleSpecificData
    };

    // Create user
    const newUser = new Model(userData);
    await newUser.save();

    // Generate token
    generateToken(res, newUser._id, newUser.fullName || newUser.clinicName || newUser.email, newUser.role);

    res.status(201).json({ 
      success: true, 
      message: "User registered successfully",
      user: {
        id: newUser._id,
        email: newUser.email,
        role: newUser.role,
        name: newUser.fullName || newUser.clinicName || newUser.email
      }
    });
  } catch (error) {
    console.error("Registration error:", error);
    res.status(500).json({
      success: false,
      message: "Registration failed",
      error: error.message,
    });
  }
};

// Login User
export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ success: false, message: "Missing email or password" });
  }

  try {
    // Find user across all models
    let user = await Patient.findOne({ email }) ||
               await Clinic.findOne({ email }) ||
               await Doctor.findOne({ email }) ||
               await Pharmacist.findOne({ email });

    if (!user) {
      return res.status(400).json({ success: false, message: "Invalid email or password" });
    }

    // Check if account is verified
    if (!user.isAccountVerified) {
      return res.status(400).json({ success: false, message: "Account not verified" });
    }

    // Check if account is active
    if (!user.isActive) {
      return res.status(400).json({ success: false, message: "Account is suspended" });
    }

    // Validate password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ success: false, message: "Invalid email or password" });
    }

    // Update last login
    user.lastLogin = new Date();
    await user.save();

    // Generate token
    const userName = user.fullName || user.clinicName || user.email;
    generateToken(res, user._id, userName, user.role);

    return res.status(200).json({
      success: true,
      user: {
        id: user._id,
        name: userName,
        email: user.email,
        role: user.role,
        isAccountVerified: user.isAccountVerified
      },
      message: "Login successful"
    });
  } catch (error) {
    console.error("Login error:", error);
    return res.status(500).json({ success: false, message: "Login failed", error: error.message });
  }
};

// Logout User
export const logoutUser = async (req, res) => {
  try {
    res.clearCookie("token", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
    });

    return res.status(200).json({ success: true, message: "Logout successful" });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Logout failed", error: error.message });
  }
};

// Send OTP for verification
export const sendOTP = async (req, res) => {
  const id = req.user.id;

  try {
    // Find user across all models
    let user = await Patient.findById(id) ||
               await Clinic.findById(id) ||
               await Doctor.findById(id) ||
               await Pharmacist.findById(id);

    if (!user) {
      return res.status(400).json({ success: false, message: "User not found" });
    }

    if (user.isAccountVerified) {
      return res.status(400).json({ success: false, message: "Account already verified" });
    }

    const otp = String(Math.floor(100000 + Math.random() * 900000));
    const otpExpiry = Date.now() + 3 * 60 * 1000; // 3 minutes

    user.verifyOtp = otp;
    user.verifyOtpExpiry = otpExpiry;
    await user.save();

    const htmlMessage = `
<!DOCTYPE html>
<html lang="en" style="margin:0; padding:0; font-family:Arial, Helvetica, sans-serif;">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>Verify your account</title>
  </head>
  <body style="background:#f4f6fb; margin:0; padding:0;">
    <table width="100%" cellpadding="0" cellspacing="0" role="presentation">
      <tr>
        <td align="center" style="padding:30px 10px;">
          <table width="600" cellpadding="0" cellspacing="0" style="background:#ffffff; border-radius:10px; overflow:hidden; box-shadow:0 6px 20px rgba(21,30,60,0.08);">
            <!-- Header -->
            <tr>
              <td style="background:#0d6efd; padding:22px 30px; text-align:center; color:#ffffff;">
                <h1 style="margin:0; font-size:20px; font-weight:700;">Verify your email</h1>
              </td>
            </tr>

            <!-- Body -->
            <tr>
              <td style="padding:28px 30px; color:#374151;">
                <p style="margin:0 0 14px; font-size:16px;">Hi ${user.fullName || user.clinicName || user.email},</p>

                <p style="margin:0 0 18px; font-size:15px; line-height:1.6; color:#4b5563;">
                  Thank you for creating an account with <strong>MediFlow</strong>.
                  To complete your registration, please use the verification code below. This code will expire in <strong> 3 minutes</strong>.
                </p>

                <!-- OTP box -->
                <div style="text-align:center; margin:22px 0;">
                  <div style="display:inline-block; background:#f1f5f9; padding:18px 26px; border-radius:8px; box-shadow:0 1px 0 rgba(0,0,0,0.02);">
                    <p style="margin:0; font-size:28px; letter-spacing:4px; font-weight:700; color:#0b2d6b;">${otp}</p>
                  </div>
                </div>

                <p style="margin:0 0 8px; font-size:13px; color:#6b7280;">
                  If you didn't request this, you can safely ignore this email. For help, contact our support at <a href="mailto:support@mediflow.example" style="color:#0d6efd; text-decoration:none;">support@mediflow.example</a>.
                </p>

                <p style="margin:16px 0 0; font-size:13px; color:#9ca3af;">
                  — The MediFlow Team
                </p>
              </td>
            </tr>

            <!-- Footer -->
            <tr>
              <td style="background:#f8fafc; padding:14px 24px; text-align:center; color:#9ca3af; font-size:12px;">
                © ${new Date().getFullYear()} MediFlow. All rights reserved.
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>
`;
    
    await sendEmail(user.email, "Verify Account", htmlMessage);
    console.log("Verification email sent");

    return res.status(200).json({ success: true, message: "OTP sent successfully" });

  } catch (error) {
    console.error("Error sending OTP:", error.message);
    return res.status(500).json({ success: false, message: "Failed to send OTP", error: error.message });
  }
};

// Verify User Account
export const verifyUserAccount = async (req, res) => {
  const { otp } = req.body;
  const id = req.user.id;

  if (!id || !otp) {
    return res.status(400).json({ success: false, message: "Missing details" });
  }

  try {
    // Find user across all models
    let user = await Patient.findById(id) ||
               await Clinic.findById(id) ||
               await Doctor.findById(id) ||
               await Pharmacist.findById(id);

    if (!user) {
      return res.status(400).json({ success: false, message: "User not found" });
    }

    if (user.verifyOtp !== otp || user.verifyOtp === '') {
      return res.status(400).json({ success: false, message: "Invalid OTP" });
    }

    if (user.verifyOtpExpiry < Date.now()) {
      return res.status(400).json({ success: false, message: "OTP Expired" });
    }

    user.isAccountVerified = true;
    user.verifyOtp = '';
    user.verifyOtpExpiry = 0;
    await user.save();

    const htmlMessage = `<!DOCTYPE html>
<html lang="en" style="margin:0; padding:0; font-family:Arial, sans-serif;">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  </head>

  <body style="background:#f4f4f8; padding:0; margin:0;">
    <table width="100%" cellpadding="0" cellspacing="0">
      <tr>
        <td align="center">
          <table
            width="600"
            cellpadding="0"
            cellspacing="0"
            style="background:white; margin-top:40px; border-radius:10px; overflow:hidden; box-shadow:0 4px 12px rgba(0,0,0,0.1)"
          >
            <!-- Header -->
            <tr>
              <td
                style="background:#4e73df; padding:20px 30px; color:white; text-align:center;"
              >
                <h1 style="margin:0; font-size:24px; font-weight:600;">
                  Welcome to MediFlow
                </h1>
              </td>
            </tr>

            <!-- Body -->
            <tr>
              <td style="padding:30px;">
                <h2 style="margin:0 0 15px; color:#333;">Hello ${user.fullName || user.clinicName}, 👋</h2>

                <p style="font-size:16px; color:#555; line-height:1.6;">
                  We're excited to let you know that your account has been
                  successfully created on <strong>MediFlow</strong>.
                </p>

                <p style="font-size:16px; color:#555; line-height:1.6;">
                  You can now log in and start using the platform to manage your
                  medical workflow more efficiently.
                </p>

                <div style="text-align:center; margin:30px 0;">
                  <a
                    href="${process.env.FRONTEND_URL || 'http://localhost:3000'}/login"
                    style="
                      background:#4e73df;
                      color:white;
                      text-decoration:none;
                      padding:12px 25px;
                      border-radius:6px;
                      font-size:16px;
                      display:inline-block;
                    "
                    >Login to Your Account</a
                  >
                </div>

                <p style="font-size:15px; color:#777;">
                  If you didn't create this account, please contact our support
                  team immediately.
                </p>

                <hr style="border:none; border-top:1px solid #eee; margin:30px 0;" />

                <p style="font-size:14px; color:#888;">
                  Thank you for choosing <strong>MediFlow</strong>.<br />
                  We're glad to have you with us!
                </p>
              </td>
            </tr>

            <!-- Footer -->
            <tr>
              <td
                style="background:#f1f1f5; padding:15px; text-align:center; font-size:13px; color:#777;"
              >
                © ${new Date().getFullYear()} MediFlow. All rights reserved.
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`;
    
    await sendEmail(user.email, "Welcome to MediFlow", htmlMessage);
    return res.status(200).json({ success: true, message: "Account verified successfully" });

  } catch (error) {
    return res.status(500).json({ success: false, message: "Verification failed", error: error.message });
  }
};

// Send Reset OTP
export const sendResetOtp = async (req, res) => {
  const { email } = req.body;

  try {
    if (!email) {
      return res.status(400).json({ success: false, message: "Email is required" });
    }

    // Find user across all models
    let user = await Patient.findOne({ email }) ||
               await Clinic.findOne({ email }) ||
               await Doctor.findOne({ email }) ||
               await Pharmacist.findOne({ email });

    if (!user) {
      return res.status(400).json({ success: false, message: "User not found" });
    }

    const passOtp = String(Math.floor(100000 + Math.random() * 900000));
    const passOtpExpiry = Date.now() + 3 * 60 * 1000; // 3 minutes

    user.resetOtp = passOtp;
    user.resetOtpExpiry = passOtpExpiry;
    await user.save();

    const resetUrl = `${process.env.FRONTEND_URL || 'http://localhost:3000'}/reset-password`;
    const htmlMessage = `<!DOCTYPE html>
<html lang="en" style="margin:0; padding:0; font-family: Arial, Helvetica, sans-serif;">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>Password Reset</title>
  </head>
  <body style="background:#f4f6fb; margin:0; padding:20px;">
    <table width="100%" cellpadding="0" cellspacing="0" role="presentation">
      <tr>
        <td align="center">
          <table width="600" cellpadding="0" cellspacing="0" style="background:#ffffff; border-radius:10px; overflow:hidden; box-shadow:0 6px 18px rgba(20,30,60,0.06);">
            <!-- Header -->
            <tr>
              <td style="background:#1f6feb; padding:20px 26px; color:#ffffff; text-align:center;">
                <h1 style="margin:0; font-size:20px; font-weight:700;">Password Reset Request</h1>
              </td>
            </tr>

            <!-- Body -->
            <tr>
              <td style="padding:28px 30px; color:#333;">
                <p style="margin:0 0 12px; font-size:16px;">Hi ${user.fullName || user.clinicName || 'there'},</p>

                <p style="margin:0 0 18px; color:#555; font-size:15px; line-height:1.6;">
                  We received a request to reset the password for your account. Use the one-time verification code below to proceed. This code will expire in <strong> 3 minutes</strong>.
                </p>

                <!-- OTP box -->
                <div style="text-align:center; margin:20px 0;">
                  <div style="display:inline-block; background:#f1f5f9; padding:18px 28px; border-radius:8px; box-shadow:0 1px 0 rgba(0,0,0,0.02);">
                    <p style="margin:0; font-size:28px; letter-spacing:6px; font-weight:700; color:#0b2d6b;">${passOtp}</p>
                  </div>
                </div>

                <p style="margin:0 0 12px; font-size:15px; color:#555;">
                  Or click the button below to open the secure reset page:
                </p>

                <div style="text-align:center; margin:16px 0;">
                  <a href="${resetUrl}" target="_blank" rel="noopener" style="display:inline-block; text-decoration:none; background:#1f6feb; color:#ffffff; padding:12px 22px; border-radius:8px; font-weight:600;">
                    Reset Password
                  </a>
                </div>

                <p style="font-size:13px; color:#6b7280; margin:0;">
                  If you did not request a password reset, please ignore this email or contact our support at <a href="mailto:support@example.com" style="color:#1f6feb; text-decoration:none;">support@example.com</a>.
                </p>
              </td>
            </tr>

            <!-- Footer -->
            <tr>
              <td style="background:#f8fafc; padding:14px 20px; text-align:center; color:#9ca3af; font-size:12px;">
                © ${new Date().getFullYear()} MediFlow. All rights reserved.
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`;
    
    await sendEmail(user.email, "Password Reset OTP", htmlMessage);
    return res.status(200).json({ success: true, message: "Password reset OTP sent to email" });

  } catch (error) {
    return res.status(500).json({ success: false, message: "Password reset request failed", error: error.message });
  }
};

// Verify Reset OTP
export const verifyResetOtp = async (req, res) => {
  const { email, passotp } = req.body;
  try {
    if (!email || !passotp) {
      return res.status(400).json({ success: false, message: "Missing details" });
    }
    
    // Find user across all models
    let user = await Patient.findOne({ email }) ||
               await Clinic.findOne({ email }) ||
               await Doctor.findOne({ email }) ||
               await Pharmacist.findOne({ email });

    if (!user) {
      return res.status(400).json({ success: false, message: "User not found" });
    }

    if (user.resetOtp !== passotp || user.resetOtp === '') {
      return res.status(400).json({ success: false, message: "Invalid OTP" });
    }

    if (user.resetOtpExpiry < Date.now()) {
      return res.status(400).json({ success: false, message: "OTP Expired" });
    }

    return res.status(200).json({ success: true, message: "OTP verified successfully" });

  } catch (error) {
    return res.status(500).json({ success: false, message: "OTP verification failed", error: error.message });
  }
};

// Reset Password
export const resetPassword = async (req, res) => {
  const { email, newPassword } = req.body;
  try {
    if (!email || !newPassword) {
      return res.status(400).json({ success: false, message: "Missing details" });
    }

    // Find user across all models
    let user = await Patient.findOne({ email }) ||
               await Clinic.findOne({ email }) ||
               await Doctor.findOne({ email }) ||
               await Pharmacist.findOne({ email });

    if (!user) {
      return res.status(400).json({ success: false, message: "User not found" });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;
    user.resetOtp = '';
    user.resetOtpExpiry = 0;
    await user.save();

    return res.status(200).json({ success: true, message: "Password reset successfully" });

  } catch (error) {
    return res.status(500).json({ success: false, message: "Password reset failed", error: error.message });
  }
};

// Get logged-in user
export const getMe = async (req, res) => {
  try {
    const id = req.user.id;
    
    // Find user across all models
    let user = await Patient.findById(id) ||
               await Clinic.findById(id) ||
               await Doctor.findById(id) ||
               await Pharmacist.findById(id);

    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    res.json({
      success: true,
      user: {
        id: user._id,
        email: user.email,
        role: user.role,
        name: user.fullName || user.clinicName || user.email,
        isAccountVerified: user.isAccountVerified,
        isActive: user.isActive,
        lastLogin: user.lastLogin,
        preferences: user.preferences
      }
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Failed to get user info", error: error.message });
  }
};
