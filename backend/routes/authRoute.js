import express from "express";
import { loginUser,registerUser,logoutUser,sendOTP,verifyUserAccount,resetPassword,sendResetOtp,verifyResetOtp } from "../controllers/authController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const authRouter = express.Router();

authRouter.post('/login',loginUser);
authRouter.post('/register',registerUser);
authRouter.post('/logout',logoutUser);
authRouter.post('/send-otp',authMiddleware,sendOTP);
authRouter.post('/verify-account',authMiddleware,verifyUserAccount);
authRouter.post('/send-reset-otp',sendResetOtp);
authRouter.post('/verify-reset-otp',verifyResetOtp);
authRouter.post('/reset-password',resetPassword);

export default authRouter;