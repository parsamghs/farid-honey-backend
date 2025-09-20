import prisma from "../../../Config/db.js";

const AuthService = {
  logout: async (refreshToken) => {
    const tokenRecord = await prisma.refresh_token.findFirst({
      where: { token: refreshToken },
    });

    if (!tokenRecord) {
      throw { status: 400, message: "رفرش توکن یافت نشد." };
    }

    await prisma.refresh_token.delete({
      where: { id: tokenRecord.id },
    });

    return true;
  },
};

export default AuthService;
