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


// for job report
const getitemsent = require("../controllers/reports/moduleReports/job/getitemsent");
const getitemreceived = require("../controllers/reports/moduleReports/job/getitemreceived")
const getgodownitem = require("../controllers/reports/moduleReports/job/getgodownitem");
const getitemlist = require("../controllers/reports/moduleReports/job/getitemlist");

// Imports for Mill Report.
const fetchGreyStock = require("../controllers/reports/millReport/fetchGreyStock");
const fetchMillPending = require("../controllers/reports/millReport/fetchMillPending");
const fetchMillReceived = require("../controllers/reports/millReport/fetchMillReceived");

// Routes for Balance Sheet.
// router.post("/payment", payment);
router.get("/balancesheet", balanceSheet);
router.get("/totalBS", totalBS);




// routes for job reports
router.get("/getitemlist",getitemlist);
router.get("/getitemsent/:jobtype",getitemsent);
router.get("/getitemreceived/:jobtype",getitemreceived);
router.get("/getgodownitem/:itemname",getgodownitem);
// Routes for General Report.
router.get("/getExpense", getTotalExpenses);
router.get("/getTotalItemBought", getTotalItemBought);
router.get("/getTotalAccountExpense", getTotalAccountExpense);
router.get("/getItemSold", getItemSold);
router.get("/getTotalSaleAccountWise", getTotalSaleAccountWise);

// Routes for Mill Report.
router.get("/greyStock", fetchGreyStock);
router.get("/millPending", fetchMillPending);
router.get("/millReceived", fetchMillReceived);

module.exports = router;
