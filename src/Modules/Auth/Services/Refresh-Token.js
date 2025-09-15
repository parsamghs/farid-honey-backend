import jwt from "jsonwebtoken";
import ms from "ms";
import prisma from "../../../Config/db.js"

const RefreshService = {
    refresh: async (oldRefreshToken) => {
        if (!oldRefreshToken) {
            throw { status: 401, message: "رفرش توکن اجباری است." };
        }

        const tokenRecord = await prisma.refresh_token.findFirst({
            where: { token: oldRefreshToken },
        });

        if (!tokenRecord) {
            throw { status: 403, message: "رفرش توکن نامعتبر است." };
        }

        if (tokenRecord.expires_at && tokenRecord.expires_at < new Date()) {
            await prisma.refresh_token.delete({ where: { id: tokenRecord.id } });
            throw { status: 403, message: "رفرش توکن منقضی شده است." };
        }

        let decoded;
        try {
            decoded = jwt.verify(oldRefreshToken, process.env.JWT_REFRESH_SECRET);
        } catch (err) {
            throw { status: 403, message: "رفرش توکن نامعتبر است." };
        }

        const newAccessToken = jwt.sign(
            { id: decoded.id, role: decoded.role, phone_number: decoded.phone_number },
            process.env.JWT_SECRET,
            { expiresIn: process.env.JWT_EXPIRES_IN }
        );

        const newRefreshToken = jwt.sign(
            { id: decoded.id },
            process.env.JWT_REFRESH_SECRET,
            { expiresIn: process.env.JWT_REFRESH_EXPIRES_IN }
        );

        await prisma.refresh_token.update({
            where: { id: tokenRecord.id },
            data: {
                token: newRefreshToken,
                created_at: new Date(),
                expires_at: process.env.JWT_REFRESH_EXPIRES_IN
                    ? new Date(Date.now() + ms(process.env.JWT_REFRESH_EXPIRES_IN))
                    : null,
            },
        });

        return {
            accessToken: newAccessToken,
            refreshToken: newRefreshToken,
        };
    },
};

export default RefreshService;