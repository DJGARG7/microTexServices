const router = require("express").Router();

const balanceSheet = require("../controllers/reports/balanceSheet");
// const receive = require("../controllers/cashBook/receive");

// router.post("/payment", payment);
router.get("/balancesheet", balanceSheet);

module.exports = router;
