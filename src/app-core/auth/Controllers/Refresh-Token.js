import { refreshCookieOptions } from "../../../Utils/cookies.js";
import RefreshService from "../Services/Refresh-Token.js";

async function refreshToken(req, res) {
  try {
    const { refreshToken } = req.cookies;
    const result = await RefreshService.refresh(refreshToken);

    res.cookie("refreshToken", result.refreshToken,  refreshCookieOptions());

    res.json({ accessToken: result.accessToken });
  } catch (err) {
    res
      .status(err.status || 500)
      .json({ message: err.message || "خطا در رفرش توکن" });
  }
}

export default refreshToken;
