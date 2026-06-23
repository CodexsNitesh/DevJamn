// routes/auth.routes.ts

import { Router } from "express";
import {
  sendOTPController,
  verifyOTPController,
  getMeController,
  refreshController,
  logoutController
} from "./auth.controller";
import { AuthRequest, protect } from "../../middleware/auth.middleware";

const router = Router();

router.post("/send-otp", sendOTPController);

// same endpoint works as resend
router.post("/resend-otp", sendOTPController);

router.post("/verify-otp", verifyOTPController);

router.post("/refresh",  refreshController);

router.post("/logout", logoutController)

router.get("/me", protect, getMeController);

export default router;