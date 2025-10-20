import prisma from "../../../../Config/db.js";

export const createPhoneVerification = async ({ phoneNumber, otpHash, expiresAt }) => {
  return await prisma.phone_verification.create({
    data: {
      phone_number: phoneNumber,
      otp_hash: otpHash,
      expires_at: expiresAt,
    },
  });
};
