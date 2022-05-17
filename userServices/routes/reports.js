const router = require("express").Router();

const balanceSheet = require("../controllers/reports/balanceSheet");
// const receive = require("../controllers/cashBook/receive");
const getTotalExpenses = require("../controllers/reports/generalReports/getTotalExpenses")
const getTotalItemBought = require("../controllers/reports/generalReports/getTotalItemBought");
const getTotalAccountExpense = require("../controllers/reports/generalReports/getTotalAccountExpense");
const getItemSold = require("../controllers/reports/generalReports/getItemSold");
const getTotalSaleAccountWise = require("../controllers/reports/generalReports/getTotalSaleAccountWise");
// router.post("/payment", payment);
router.get("/balancesheet", balanceSheet);
router.get("/getExpense",getTotalExpenses);
router.get("/getTotalItemBought",getTotalItemBought);
router.get("/getTotalAccountExpense",getTotalAccountExpense);
router.get("/getItemSold",getItemSold);
router.get("/getTotalSaleAccountWise",getTotalSaleAccountWise);
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
