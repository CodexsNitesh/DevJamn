export const generateOTP = () => {
  return Math.floor(
    100000 + Math.random() * 900000
  ).toString();
};

export const isOTPExpired = (
  expiresAt: Date
) => {
  return expiresAt < new Date();
};