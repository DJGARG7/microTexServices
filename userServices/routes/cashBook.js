const router = require("express").Router();

const payment = require("../controllers/cashBook/payment");
const receive = require("../controllers/cashBook/receive");

// router.post("/payment", payment);
router.post("/receive", receive);

module.exports = router;
