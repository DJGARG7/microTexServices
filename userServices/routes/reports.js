const router = require("express").Router();

// Imports for Balance Sheet.
// const receive = require("../controllers/cashBook/receive");
const balanceSheet = require("../controllers/reports/balanceSheet/balanceSheet");
const totalBS = require("../controllers/reports/balanceSheet/totalBS");

// Imports for General Report.
const getTotalExpenses = require("../controllers/reports/generalReports/getTotalExpenses");
const getTotalItemBought = require("../controllers/reports/generalReports/getTotalItemBought");
const getTotalAccountExpense = require("../controllers/reports/generalReports/getTotalAccountExpense");
const getItemSold = require("../controllers/reports/generalReports/getItemSold");
const getTotalSaleAccountWise = require("../controllers/reports/generalReports/getTotalSaleAccountWise");

// Imports for Mill Report.
const fetchGreyStock = require("../controllers/reports/millReport/fetchGreyStock");
const fetchMillPending = require("../controllers/reports/millReport/fetchMillPending");

// Routes for Balance Sheet.
// router.post("/payment", payment);
router.get("/balancesheet", balanceSheet);
router.get("/totalBS", totalBS);

// Routes for General Report.
router.get("/getExpense", getTotalExpenses);
router.get("/getTotalItemBought", getTotalItemBought);
router.get("/getTotalAccountExpense", getTotalAccountExpense);
router.get("/getItemSold", getItemSold);
router.get("/getTotalSaleAccountWise", getTotalSaleAccountWise);

// Routes for Mill Report.
router.get("/greyStock", fetchGreyStock);
router.get("/millPending", fetchMillPending);

module.exports = router;
