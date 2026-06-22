// routes/auth.routes.ts

import { Router } from "express";
import {
  sendOTPController,
  verifyOTPController,
  getMeController
} from "./auth.controller";
import { AuthRequest, protect } from "../../middleware/auth.middleware";

const router = Router();

router.post("/send-otp", sendOTPController);

// same endpoint works as resend
router.post("/resend-otp", sendOTPController);

router.post("/verify-otp", verifyOTPController);

router.get("/me", protect, getMeController);

console.log("Auth routes loaded");

router.get("/test", (req, res) => {
  res.json({
    success: true,
    message: "Auth route working",
  });
});

export default router;