import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import userModel from "../models/userModel.js";
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

export const registerUser = async (req, res) => {
  const { name, email, password, role } = req.body;

  if (!name || !email || !password || !role) {
    return res.status(400).json({ success: false, message: "Missing Details" });
  }

  try {
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res
        .status(400)
        .json({ success: false, message: "User already exists", isUserExist:true });
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new userModel({
      name,
      email,
      password: hashedPassword,
      role,
    });

    await newUser.save();
    generateToken(res, newUser._id, newUser.name, newUser.role);
    res.status(201).json({
      success: true,
      message: "User registered successfully",
      user: {
        _id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        role: newUser.role,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Registeration failed",
      error: error.message,
    });
  }
};

export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ success: false, message: "Sign In failed:Missing Details" });
  }

  try {
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(400).json({ success: false, message: "Invalid Credintials:please Enter Valid Credintials " });
    }

    if (!user.isAccountVerified) {
      return res
        .status(400)
        .json({ success: false, message: "Sign In failed:Account not verified" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid Credintials:please Enter Valid Credintials" });
    }

    generateToken(res, user._id, user.name, user.role);

    return res.status(200).json({
      success: true,
      user: {
        id: user._id,
        name: user.name,
        role: user.role,
      },
      message: "Login successful",
    });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "Login failed:please try again", error: error.message });
  }
};

export const logoutUser = async (req, res) => {
  try {
    res.clearCookie("token", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
    });

    return res
      .status(200)
      .json({ success: true, message: "Logout successful" });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "Logout failed", error: error.message });
  }
};

export const deleteUserWithProfile = async (req, res) => {
  try {
    const { userId } = req.params;
    
    if (!userId) {
      return res.status(400).json({
        success: false,
        message: "User ID is required"
      });
    }

    // Import models dynamically to avoid circular dependencies
    const User = (await import('../models/userModel.js')).default;
    const Patient = (await import('../models/patientModel.js')).default;
    const Clinic = (await import('../models/clinicModel.js')).default;
    const Doctor = (await import('../models/doctorModel.js')).default;
    const Pharmacist = (await import('../models/pharmacistModel.js')).default;

    // Find the user first
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found"
      });
    }

    // Delete associated profile based on user role
    let profileDeleted = false;
    
    switch (user.role) {
      case 'patient':
        const patientResult = await Patient.deleteOne({ userRef: userId });
        profileDeleted = patientResult.deletedCount > 0;
        break;
      case 'clinic':
        const clinicResult = await Clinic.deleteOne({ userRef: userId });
        profileDeleted = clinicResult.deletedCount > 0;
        break;
      case 'doctor':
        const doctorResult = await Doctor.deleteOne({ userRef: userId });
        profileDeleted = doctorResult.deletedCount > 0;
        break;
      case 'pharmacist':
        const pharmacistResult = await Pharmacist.deleteOne({ userRef: userId });
        profileDeleted = pharmacistResult.deletedCount > 0;
        break;
    }

    // Delete the user
    const userResult = await User.deleteOne({ _id: userId });

    if (userResult.deletedCount === 0) {
      return res.status(500).json({
        success: false,
        message: "Failed to delete user"
      });
    }

    res.status(200).json({
      success: true,
      message: "User deleted successfully",
      data: {
        userDeleted: true,
        profileDeleted: profileDeleted,
        userRole: user.role
      }
    });

  } catch (error) {
    console.error('Delete user error:', error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message
    });
  }
};

export const deleteAuthUserAccount = async(req,res) =>{
  try {
    const { userId } = req.params;
    
    if (!userId) {
      return res.status(400).json({
        success: false,
        message: "User ID is required"
      });
    }

    // Import userModel dynamically
    const User = (await import('../models/userModel.js')).default;

    // Find and delete the user
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found"
      });
    }

    // Delete only the auth user account
    const deleteResult = await User.deleteOne({ _id: userId });

    if (deleteResult.deletedCount === 0) {
      return res.status(500).json({
        success: false,
        message: "Failed to delete user account"
      });
    }

    res.status(200).json({
      success: true,
      message: "Auth user account deleted successfully",
      data: {
        userDeleted: true,
        deletedUserRole: user.role,
        deletedUserEmail: user.email
      }
    });

  } catch (error) {
    console.error('Delete auth user account error:', error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message
    });
  }
};

export const sendOTP = async (req, res) => {
  const id = req.user.id;

  try {
    const user = await userModel.findById(id);
    if (user.isAccountVerified) {
      return res.status(400).json({ 
        success: false, 
        message: "Account already verified" 
      });
    }

    const otp = String(Math.floor(100000 + Math.random() * 900000));
    const otpExpiry = Date.now() + 3 * 60 * 1000; //3 minutes

    user.verifyOtp = otp;
    user.verifyOtpExpiry = otpExpiry;
    const verifyUrl = "google.com";

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
                <p style="margin:0 0 14px; font-size:16px;">Hi ${
                  user.name ?? "there"
                },</p>

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

                <p style="margin:0 0 18px; font-size:15px; color:#4b5563;">
                  Or click the button below to verify automatically:
                </p>

                <div style="text-align:center; margin:18px 0;">
                  <a href="${
                    verifyUrl ?? "#"
                  }" target="_blank" rel="noopener" style="display:inline-block; text-decoration:none; background:#0d6efd; color:#ffffff; padding:12px 22px; border-radius:8px; font-weight:600;">
                    Verify Account
                  </a>
                </div>

                <p style="margin:0 0 8px; font-size:13px; color:#6b7280;">
                  If the button doesn't work, copy and paste this link into your browser:
                </p>
                <p style="word-break:break-all; font-size:12px; color:#6b7280; margin:6px 0 0;">${
                  verifyUrl ?? "—"
                }</p>

                <hr style="border:none; border-top:1px solid #eef2f7; margin:24px 0;" />

                <p style="font-size:13px; color:#6b7280; margin:0;">
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
    sendEmail(user.email, "Verify Account", htmlMessage);
    console.log("Verification email sent");
     return res.status(200).json({ 
      success: true, 
      message: "OTP sent successfully" 
    });
  } catch (error) {
    console.log("Error in account verification:", error.message);
    return res.status(500).json({ 
      success: false, 
      message: "Failed to send OTP", 
      error: error.message 
    });
  }
};

export const verifyUserAccount = async (req, res) => {
  const { otp } = req.body;
  const id = req.user.id;

  if (!id || !otp) {
    return res.status(400).json({ success: false, message: "Missing Details" });
  }

  try {
    const user = await userModel.findById(id);

    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "User not found" });
    }

    if (user.verifyOtp !== otp || user.verifyOtp === "") {
      return res.status(400).json({ success: false, message: "Invalid OTP" });
    }

    if (user.verifyOtpExpiry < Date.now()) {
      return res.status(400).json({ success: false, message: "OTP Expired" });
    }

    user.isAccountVerified = true;
    user.verifyOtp = "";
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
                <h2 style="margin:0 0 15px; color:#333;">Hello ${user.name}, 👋</h2>

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
                    href="google.com"
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
                  If you didn’t create this account, please contact our support
                  team immediately.
                </p>

                <hr style="border:none; border-top:1px solid #eee; margin:30px 0;" />

                <p style="font-size:14px; color:#888;">
                  Thank you for choosing <strong>MediFlow</strong>.<br />
                  We’re glad to have you with us!
                </p>
              </td>
            </tr>

            <!-- Footer -->
            <tr>
              <td
                style="background:#f1f1f5; padding:15px; text-align:center; font-size:13px; color:#777;"
              >
                © 2025 MediFlow. All rights reserved.
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`;
    sendEmail(user.email, "Welcome to MediFlow", htmlMessage);
    return res
      .status(200)
      .json({ success: true, message: "Account verified successfully" });
  } catch (error) {
    return res
      .status(500)
      .json({
        success: false,
        message: "Verification failed",
        error: error.message,
      });
  }
};

export const sendResetOtp = async (req, res) => {
  const { email } = req.body;

  try {
    if (!email) {
      return res
        .status(400)
        .json({ success: false, message: "Email is required" });
    }

    const user = await userModel.findOne({ email });
    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "OTP sending failed,User not found" });
    }

    const passOtp = String(Math.floor(100000 + Math.random() * 900000));
    const passOtpExpiry = Date.now() + 3 * 60 * 1000; //3 minutes

    user.resetOtp = passOtp;
    user.resetOtpExpiry = passOtpExpiry;
    await user.save();

    const resetUrl = "google.com";
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
                <p style="margin:0 0 12px; font-size:16px;">Hi ${user.name ?? "there"},</p>

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
                  <a href="${resetUrl ?? "#"}" target="_blank" rel="noopener" style="display:inline-block; text-decoration:none; background:#1f6feb; color:#ffffff; padding:12px 22px; border-radius:8px; font-weight:600;">
                    Reset Password
                  </a>
                </div>

                <p style="margin:0 0 10px; font-size:13px; color:#6b7280;">
                  If the button doesn't work, copy and paste this link into your browser:
                </p>
                <p style="word-break:break-all; font-size:12px; color:#6b7280; margin:6px 0 0;">${resetUrl ?? "—"}</p>

                <hr style="border:none; border-top:1px solid #eef2f7; margin:20px 0;" />

                <p style="font-size:13px; color:#6b7280; margin:0;">
                  If you did not request a password reset, please ignore this email or contact our support at <a href="mailto:support@example.com" style="color:#1f6feb; text-decoration:none;">support@example.com</a>.
                </p>

                <p style="margin:12px 0 0; font-size:13px; color:#9ca3af;">
                  — The Team
                </p>
              </td>
            </tr>

            <!-- Footer -->
            <tr>
              <td style="background:#f8fafc; padding:14px 20px; text-align:center; color:#9ca3af; font-size:12px;">
                © ${new Date().getFullYear()} Your Company. All rights reserved.
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`;
    sendEmail(user.email, "Password Reset OTP", htmlMessage);
    return res
      .status(200)
      .json({ success: true, message: "Password reset OTP sent to email" });
  } catch (error) {
    return res
      .status(500)
      .json({
        success: false,
        message: "Password reset request failed",
        error: error.message,
      });
  }
};

export const verifyResetOtp = async (req, res) => {
  const { email, code } = req.body;
  try {
    if (!email || !code) {
      return res
        .status(400)
        .json({ success: false, message: "Email verification failed,Missing Details" });
    }
    const user = await userModel.findOne({ email });
    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "Email verification failed,User not found" });
    }

    if (user.resetOtp !== code || user.resetOtp === "") {
      return res.status(400).json({ success: false, message: "Email verification failed,Invalid OTP" });
    }

    if (user.resetOtpExpiry < Date.now()) {
      return res.status(400).json({ success: false, message: "Email verification failed,OTP Expired" });
    }

    return res
      .status(200)
      .json({ success: true, message: "OTP verified successfully" });
  } catch (error) {
    return res
      .status(500)
      .json({
        success: false,
        message: "OTP verification failed",
        error: error.message,
      });
  }
};

export const resetPassword = async (req, res) => {
  const { email, newPassword } = req.body;
  try {
    if (!email || !newPassword) {
      return res
        .status(400)
        .json({ success: false, message: "Password Reset failed,Missing Details" });
    }

    const user = await userModel.findOne({ email });
    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "Password Reset failed,User not found" });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;
    user.resetOtp = "";
    user.resetOtpExpiry = 0;
    await user.save();

    return res
      .status(200)
      .json({ success: true, message: "Password reset successfully" });
  } catch (error) {
    return res
      .status(500)
      .json({
        success: false,
        message: "Password reset failed",
        error: error.message,
      });
  }
};

// Get logged-in user
export const getMe = (req, res) => {
  res.json({
    success: true,
    user: req.user,
  });
};
