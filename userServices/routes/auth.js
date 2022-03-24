const router = require("express").Router();

const addGreyPurchase = require("../controllers/addGreyPurchase");
const fetchall = require("../controllers/fetchall");

router.post("/addgreypurchase", addGreyPurchase); // adds data to greypurchase table
router.get("/fetchall",fetchall);


module.exports = router;