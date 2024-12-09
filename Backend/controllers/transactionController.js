const Transaction = require("../models/transaction");
const { Op, fn, col, literal } = require("sequelize");
const sequelize = require("../config/db");

const getAllTransactions = async (req, res, next) => {
  try {
    const transactions = await Transaction.findAll({
      attributes: [
        "id",
        "amount",
        "description",
        "category",
        "date",
        "type",
        "assetClass",
        "assetName",
        "transactionType",
        "logo",
        "accountNumber",
      ],
    });

    const aggregates = await Transaction.findAll({
      attributes: [
        [fn("COUNT", col("id")), "totalTransactions"],
        [
          fn(
            "SUM",
            literal(`CASE WHEN type = 'expense' THEN amount ELSE 0 END`)
          ),
          "totalExpenses",
        ],
        [
          fn(
            "SUM",
            literal(
              `CASE WHEN transactionType = 'debit' THEN amount ELSE 0 END`
            )
          ),
          "totalDebitAmount",
        ],
        [
          fn(
            "SUM",
            literal(`CASE WHEN type = 'income' THEN amount ELSE 0 END`)
          ),
          "totalIncome",
        ],
        "category",
      ],
      group: ["category"], // sending Category wise aggregates data
    });

    res.json({ transactions, aggregates });
  } catch (error) {
    next(error);
  }
};

const getRecentTransactions = async (req, res, next) => {
  try {
    const recentTransactions = await Transaction.findAll({
      attributes: ["assetName", "amount", "accountNumber", "category"],
      where: {
        date: { [Op.gte]: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000) }, // Last 30 day
      },
      order: [["date", "DESC"]], //recent date
      limit: 5, // last 5 transactions
    });

    res.json({ recentTransactions });
  } catch (error) {
    next(error);
  }
};

const getAllAssets = async (req, res, next) => {
  try {
    const assets = await Transaction.findAll({
      attributes: [
        "assetClass",
        [sequelize.fn("SUM", sequelize.col("amount")), "total"],
      ],
      group: ["assetClass"],
    });

    const items = await Transaction.findAll({
      attributes: [
        "assetClass",
        "assetName",
        "accountNumber",
        "logo",
        [sequelize.fn("SUM", sequelize.col("amount")), "amount"],
      ],
      group: ["assetClass", "assetName", "accountNumber", "logo"],
    });

    // Group items by assetClass
    const groupedItems = items.reduce((acc, item) => {
      const { assetClass, assetName, accountNumber, logo, amount } =
        item.dataValues;
      if (!acc[assetClass]) acc[assetClass] = [];
      acc[assetClass].push({ assetName, accountNumber, logo, amount });
      return acc;
    }, {});

    // Combine summary and grouped items
    const allAssets = assets.map((asset) => {
      const { assetClass, total } = asset.dataValues;
      return {
        assetClass,
        total,
        items: groupedItems[assetClass] || [],
      };
    });

    res.json({ allAssets });
  } catch (error) {
    next(error);
  }
};

const getRecentAssets = async (req, res, next) => {
  try {
    const recentAssets = await Transaction.findAll({
      attributes: [
        "assetClass",
        [sequelize.fn("SUM", sequelize.col("amount")), "total"],
      ],
      where: {
        date: { [Op.gte]: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000) }, // Last 30 days
      },
      group: ["assetClass"],
      order: [[sequelize.fn("SUM", sequelize.col("amount")), "DESC"]], // descending order total amount
      limit: 5, // last 5 asset
    });

    const formattedRecentAssets = recentAssets.map((asset) => ({
      assetClass: asset.dataValues.assetClass,
      total: asset.dataValues.total,
    }));

    res.json({ recentAssets: formattedRecentAssets });
  } catch (error) {
    next(error);
  }
};

const getNetworth = async (req, res, next) => {
  try {
    const networth = await Transaction.sum("amount");
    res.json({ networth });
  } catch (error) {
    next(error);
  }
};

const getNetworthByDateRange = async (req, res, next) => {
  try {
    const { startYear, endYear } = req.query;

    const networthByYear = await Transaction.findAll({
      attributes: [
        [fn("YEAR", col("date")), "year"],
        [fn("SUM", col("amount")), "networth"],
      ],
      where: {
        date: {
          [Op.between]: [
            new Date(`${startYear}-01-01`),
            new Date(`${endYear}-12-31`),
          ],
        },
      },
      group: [fn("YEAR", col("date"))],
      order: [[fn("YEAR", col("date")), "ASC"]],
    });

    const formattedData = networthByYear.map((entry) => ({
      year: entry.dataValues.year,
      networth: parseFloat(entry.dataValues.networth),
    }));

    res.json({ data: formattedData });
  } catch (error) {
    next(error);
  }
};

const getIncomeExpense = async (req, res, next) => {
  try {
    const income = await Transaction.sum("amount", {
      where: { type: "income" },
    });
    const expense = await Transaction.sum("amount", {
      where: { type: "expense" },
    });
    res.json({ income, expense });
  } catch (error) {
    next(error);
  }
};

const getCurrentAssetValue = async (req, res, next) => {
  try {
    const assetValues = await Transaction.findAll({
      attributes: [
        "assetClass",
        [sequelize.fn("sum", sequelize.col("amount")), "currentValue"],
      ],
      group: ["assetClass"],
      where: {
        // Filtering last recent transactions for every asset Class
        date: {
          [Op.gte]: sequelize.fn(
            "DATE",
            sequelize.fn("NOW", sequelize.literal("-1 month"))
          ),
        },
      },
    });
    res.json(assetValues);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllTransactions,
  getRecentTransactions,
  getAllAssets,
  getRecentAssets,
  getNetworth,
  getNetworthByDateRange,
  getIncomeExpense,
  getCurrentAssetValue,
};
