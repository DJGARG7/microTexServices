const router = require("express").Router();

// const receive = require("../controllers/cashBook/receive");
const getTotalExpenses = require("../controllers/reports/generalReports/getTotalExpenses")
const getTotalItemBought = require("../controllers/reports/generalReports/getTotalItemBought");
const getTotalAccountExpense = require("../controllers/reports/generalReports/getTotalAccountExpense");
const getItemSold = require("../controllers/reports/generalReports/getItemSold");
const getTotalSaleAccountWise = require("../controllers/reports/generalReports/getTotalSaleAccountWise");
const balanceSheet = require("../controllers/reports/balanceSheet/balanceSheet");
const totalBS = require("../controllers/reports/balanceSheet/totalBS");
const getitemsent = require("../controllers/reports/moduleReports/job/getitemsent");



// router.post("/payment", payment);
router.get("/balancesheet", balanceSheet);
router.get("/getExpense",getTotalExpenses);
router.get("/getTotalItemBought",getTotalItemBought);
router.get("/getTotalAccountExpense",getTotalAccountExpense);
router.get("/getItemSold",getItemSold);
router.get("/getTotalSaleAccountWise",getTotalSaleAccountWise);
router.get("/totalBS", totalBS);




// routes for module reports
router.get("/getitemsent/:jobtype",getitemsent);

module.exports = router;
