import rateLimit from "express-rate-limit";

const rateLimiter = rateLimit({
  windowMs: 2 * 60 * 100,
  limit: 4,
  standardHeaders: "draft-8",
  legacyHeaders: false,
  ipv6Subnet: 56,
});

export default rateLimiter;
