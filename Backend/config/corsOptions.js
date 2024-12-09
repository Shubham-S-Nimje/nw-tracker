const cors = require("cors");

const corsOptions = {
  origin: ["http://localhost:5173", "http://localhost:3000", "*"],
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
  optionsSuccessStatus: 200,
};

module.exports = cors(corsOptions);
