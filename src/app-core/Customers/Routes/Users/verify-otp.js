import express from "express";
const router = express.Router();
import { verifyOtpController } from "../../Controllers/Users/verify-otp.js";

router.post("/", verifyOtpController);

export default router;
