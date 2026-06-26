// src/utils/token.ts

import jwt from "jsonwebtoken";

export const generateAccessToken = (
  userId: string,
  email: string
) => {
  return jwt.sign(
    {
      userId,
      email,
    },
    process.env.JWT_SECRET!,
    {
      expiresIn: "15d",
    }
  );
};

export const generateRefreshToken = (
  userId: string
) => {
  return jwt.sign(
    {
      userId,
    },
    process.env.JWT_REFRESH_SECRET!,
    {
      expiresIn: "7d",
    }
  );
};