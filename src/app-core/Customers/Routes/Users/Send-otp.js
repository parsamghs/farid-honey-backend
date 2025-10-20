import express from "express";
const router = express.Router();
import { sendOtp } from "../../Controllers/Users/send-otp.js";

router.post("/", sendOtp);

export default router;
