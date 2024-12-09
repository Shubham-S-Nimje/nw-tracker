const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Transaction = sequelize.define("Transaction", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  amount: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
  description: {
    type: DataTypes.STRING,
  },
  category: {
    type: DataTypes.STRING, // e.g., 'shopping', 'entertainment', etc.
  },
  date: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
  type: {
    type: DataTypes.ENUM("income", "expense"),
    allowNull: false,
  },
  assetClass: {
    type: DataTypes.STRING, // e.g., 'Bank', 'Investment', 'Insurance', etc.
  },
  assetName: {
    type: DataTypes.STRING, // Specific name of the asset like Bank name or Insurance provider
  },
  accountNumber: {
    type: DataTypes.STRING, // Account or policy number
  },
  cardNumber: {
    type: DataTypes.STRING, // Account or policy number
  },
  logo: {
    type: DataTypes.STRING, // URL for bank/insurance/investment logo
  },
  transactionType: {
    type: DataTypes.STRING, // e.g., 'credit', 'debit', etc.
  },
});

module.exports = Transaction;
