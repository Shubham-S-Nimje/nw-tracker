const express = require("express");
const corsOptions = require("./config/corsOptions");
const limiter = require("./config/rateLimiter");
const sequelize = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const transactionRoutes = require("./routes/transactionRoutes");
const errorHandler = require("./middlewares/errorHandler");
const Transaction = require("./models/transaction");
const User = require("./models/user");

const app = express();
app.use(express.json());
app.use(corsOptions);
app.use(limiter);

app.use("/auth", authRoutes);
app.use("/transactions", transactionRoutes);

User.hasMany(Transaction, { foreignKey: "userId" });

app.use(errorHandler);

sequelize.sync().then(() => {
  console.log("Database connected");
});

module.exports = app;
