// src/modules/auth/auth.controller.ts

import { Request, Response } from "express";
import * as authService from "./auth.service";

export const sendOTPController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    console.log("BODY:", req.body);

    const email = req.body?.email?.trim();

    if (!email) {
      res.status(400).json({
        success: false,
        message: "Email is required",
      });
      return;
    }

    const result = await authService.sendOTP(email);

    res.status(200).json({
      success: true,
      ...result,
    });
  } catch (error: any) {
    console.error("SEND OTP ERROR:", error);

    res.status(400).json({
      success: false,
      message:
        error?.message || "Failed to send OTP",
    });
  }
};

export const verifyOTPController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    console.log("VERIFY BODY:", req.body);

    const email = req.body?.email?.trim();
    const code = req.body?.code?.trim();

    if (!email || !code) {
      res.status(400).json({
        success: false,
        message: "Email and OTP code are required",
      });
      return;
    }

    const result = await authService.verifyOTP(
      email,
      code
    );

    res.status(200).json({
      success: true,
      message: "OTP verified successfully",
      ...result,
    });
  } catch (error: any) {
    console.error("VERIFY OTP ERROR:", error);

    res.status(400).json({
      success: false,
      message:
        error?.message || "OTP verification failed",
    });
  }
};