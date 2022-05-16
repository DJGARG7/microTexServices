const router = require("express").Router();

const balanceSheet = require("../controllers/reports/balanceSheet/balanceSheet");
const totalBS = require("../controllers/reports/balanceSheet/totalBS");
const getTotalExpenses = require("../controllers/reports/generalReports/getTotalExpenses");
const getTotalItemSold = require("../controllers/reports/generalReports/getTotalItemSold");
const getTotalAccountExpense = require("../controllers/reports/generalReports/getTotalAccountExpense");

router.get("/balancesheet", balanceSheet);
router.get("/totalBS", totalBS);
router.get("/getExpense", getTotalExpenses);
router.get("/getTotalItemSold", getTotalItemSold);
router.get("/getTotalAccountExpense", getTotalAccountExpense);

module.exports = router;
