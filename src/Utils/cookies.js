import ms from "ms";

export function refreshCookieOptions() {
  const isProd = process.env.NODE_ENV === "production";
  const maxAge = ms(process.env.JWT_REFRESH_EXPIRES_IN || "30d");

  return {
    httpOnly: true,
    secure: isProd,
    sameSite: isProd ? "none" : "lax",
    path: "/",
    maxAge,
  };
}
