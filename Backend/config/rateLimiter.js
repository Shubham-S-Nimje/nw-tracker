const rateLimit = require("express-rate-limit");

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 min
  max: 100, // max 100 request per ip in ms
  message: "Too many requests, please try again later.",
});
module.exports = limiter;
