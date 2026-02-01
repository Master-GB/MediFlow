import express from "express";
import { loginUser,registerUser,logoutUser,sendOTP,verifyUserAccount,resetPassword,sendResetOtp,verifyResetOtp,getMe,deleteUserWithProfile,deleteAuthUserAccount } from "../controllers/authController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const authRouter = express.Router();

authRouter.post('/login',loginUser);
authRouter.post('/register',registerUser);
authRouter.post('/logout',logoutUser);
authRouter.post('/delete-user-with-profile',deleteUserWithProfile);
authRouter.post('/delete-user-account',deleteAuthUserAccount);
authRouter.post('/send-otp',authMiddleware,sendOTP);
authRouter.post('/verify-account',authMiddleware,verifyUserAccount);
authRouter.post('/send-reset-otp',sendResetOtp);
authRouter.post('/verify-reset-otp',verifyResetOtp);
authRouter.post('/reset-password',resetPassword);
authRouter.get('/me', authMiddleware, getMe);
authRouter.delete('/delete-user/:userId', deleteUserWithProfile);
authRouter.delete('/delete-auth-user/:userId', deleteAuthUserAccount);

// router.use(authMiddleware);
// router.use(authorizeRoles("doctor"));

// router.get("/dashboard", doctorDashboard);
// router.get("/patients", doctorPatients);
// ------------------------------------------------------
// router.get(
//   "/doctor/dashboard",
//   authMiddleware,
//   authorizeRoles("doctor"),
//   controller
// );



export default authRouter;