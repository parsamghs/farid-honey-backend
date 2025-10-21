import ms from "ms";

export function refreshCookieOptions() {
  const isProd = process.env.NODE_ENV === "production";
  const maxAge = ms(process.env.JWT_REFRESH_EXPIRES_IN || "30d");

  return {
    httpOnly: true,
    secure: isProd,                // حتماً روی https در پروداکشن
    sameSite: isProd ? "none" : "lax", // برای فرانت و بک روی دامنه‌های جدا، none لازم است
    path: "/",
    maxAge,                        // مهم: در refresh هم maxAge ست کن
  };
}