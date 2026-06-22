import { prisma } from "../../config/db";
import jwt from "jsonwebtoken";
import { generateOTP } from "../../services/otp.services";
import { sendOTPEmail } from "../../services/email.services";

const OTP_EXPIRY_MINUTES = 2;
const OTP_RESEND_COOLDOWN_SECONDS = 30;

export const sendOTP = async (email: string) => {
  let user = await prisma.user.findUnique({
    where: { email },
  });

  // Auto-create user if doesn't exist
  if (!user) {
    user = await prisma.user.create({
      data: {
        email,
        provider: "LOCAL",
      },
    });
  }

  // Prevent spam (30-second cooldown)
  const recentOTP = await prisma.oTP.findFirst({
    where: {
      email,
      createdAt: {
        gt: new Date(
          Date.now() -
            OTP_RESEND_COOLDOWN_SECONDS * 1000
        ),
      },
    },
  });

  if (recentOTP) {
    throw new Error(
      `Please wait ${OTP_RESEND_COOLDOWN_SECONDS} seconds before requesting another OTP.`
    );
  }

  // Remove any previous OTPs
  await prisma.oTP.deleteMany({
    where: { email },
  });

  const otp = generateOTP();

  await prisma.oTP.create({
    data: {
      email,
      code: otp,
      expiresAt: new Date(
        Date.now() +
          OTP_EXPIRY_MINUTES * 60 * 1000
      ),
    },
  });

  await sendOTPEmail(email, otp);

  return {
    message: "OTP sent successfully",
    expiresIn: OTP_EXPIRY_MINUTES * 60,
    resendAfter: OTP_RESEND_COOLDOWN_SECONDS,
  };
};

export const verifyOTP = async (
  email: string,
  code: string
) => {
  const otpRecord = await prisma.oTP.findFirst({
    where: {
      email,
      code,
      expiresAt: {
        gt: new Date(),
      },
    },
  });

  if (!otpRecord) {
    throw new Error("Invalid or expired OTP");
  }

  const user = await prisma.user.update({
    where: { email },
    data: {
      isVerified: true,
    },
  });

  // Remove OTP after successful verification
  await prisma.oTP.deleteMany({
    where: { email },
  });

  const jwtSecret = process.env.JWT_SECRET;

  if (!jwtSecret) {
    throw new Error(
      "JWT_SECRET is not configured"
    );
  }

  const accessToken = jwt.sign(
    {
      userId: user.id,
      email: user.email,
    },
    jwtSecret,
    {
      expiresIn: "7d",
    }
  );

  return {
    accessToken,
    user: {
      id: user.id,
      email: user.email,
      name: user.name,
      username: user.username,
      avatar: user.avatar,
      provider: user.provider,
      isVerified: user.isVerified,
      createdAt: user.createdAt,
    },
  };
};