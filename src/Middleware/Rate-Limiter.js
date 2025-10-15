import rateLimit from "express-rate-limit";

function createLimiter() {
  return rateLimit({
    windowMs: 5 * 60 * 1000, 
    max: 100,         
    message: "⚠️ زیاد درخواست دادی، بعدا دوباره امتحان کن!"
  });
}

export default createLimiter;
