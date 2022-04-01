const router = require("express").Router();

// imports for sale transactions
// const addBilldetails = require("../controllers/purchases/addBilldetails");
// const fetchall = require("../controllers/fetchall");
// const additems = require("../controllers/additems");
// const fetchitems = require("../controllers/fetchitems");
const addChallan = require("../controllers/sales/addChallan");

// routes for sale transactions
// router.get("/fetchall",fetchall); // all the bill info detched
router.post("", addChallan); // adds data to greypurchase table
// router.post("/additems",additems); // for adding new item
// router.get("/fetchitems",fetchitems); // for getting items

module.exports = router;
