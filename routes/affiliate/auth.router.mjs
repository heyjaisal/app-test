import { Router } from "express";
import {
    logout,
    refreshAccessToken,
    resendOtp,
    sendOrLoginOtp,
    verifyOtpAndLogin,
    getMe,
} from "../../controllers/affiliate/auth.controller.mjs";
import { verifyUserToken } from "../../middlewares/verifyToken.mjs";

const router = Router();

// OTP-based authentication routes
router.post("/send-otp", sendOrLoginOtp);
router.post("/verify-otp", verifyOtpAndLogin);
router.post("/resend-otp", resendOtp);

// Token management routes
router.post("/refresh-token", refreshAccessToken);
router.post("/logout", logout);
router.get("/me", verifyUserToken, getMe);

// Test route
router.get("/test", (req, res) => {
    res.status(200).json({ message: "Auth route is working" });
});

export default router;
