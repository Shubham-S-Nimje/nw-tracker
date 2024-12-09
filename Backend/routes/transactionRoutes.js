const router = require("express").Router();
const authenticateToken = require("../middlewares/authMiddleware");
const {
  getNetworth,
  getNetworthByDateRange,
  getIncomeExpense,
  getCurrentAssetValue,
  getRecentTransactions,
  getRecentAssets,
  getAllAssets,
  getAllTransactions,
} = require("../controllers/transactionController");

router.get("/all-transactions", authenticateToken, getAllTransactions);
router.get("/recent-transactions", authenticateToken, getRecentTransactions);
router.get("/all-assets", authenticateToken, getAllAssets);
router.get("/recent-assets", authenticateToken, getRecentAssets);
router.get("/networth", authenticateToken, getNetworth);
router.get("/networthByDateRange", authenticateToken, getNetworthByDateRange);
router.get("/incomeExpense", authenticateToken, getIncomeExpense);
router.get("/currentAssetValue", authenticateToken, getCurrentAssetValue);

module.exports = router;
