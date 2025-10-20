import prisma from "../../../../Config/db.js";

export const getLatestPhoneVerification = async (phoneNumber) => {
  return await prisma.phone_verification.findFirst({
    where: { phone_number: phoneNumber },
    orderBy: { created_at: "desc" },
  });
};

export const deletePhoneVerification = async (id) => {
  return await prisma.phone_verification.delete({
    where: { id },
  });
};
