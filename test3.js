import { sendPtpSms } from "./src/niksms/smsservice.js";
const ok = await sendPtpSms("09960028362", "تست ارسال از نیک‌اس‌ام‌اس");
console.log("Send OK:", ok);
