const router = require("express").Router();

const balanceSheet = require("../controllers/reports/balanceSheet");
// const receive = require("../controllers/cashBook/receive");
const getTotalExpenses = require("../controllers/reports/generalReports/getTotalExpenses")
const getTotalItemSold = require("../controllers/reports/generalReports/getTotalItemSold");
const getTotalAccountExpense = require("../controllers/reports/generalReports/getTotalAccountExpense");
// router.post("/payment", payment);
router.get("/balancesheet", balanceSheet);
router.get("/getExpense",getTotalExpenses);
router.get("/getTotalItemSold",getTotalItemSold);
router.get("/getTotalAccountExpense",getTotalAccountExpense);

module.exports = router;
