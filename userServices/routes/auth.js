const router = require("express").Router();

const addBilldetails = require("../controllers/addBilldetails");
const fetchall = require("../controllers/fetchall");
const additems = require("../controllers/additems");
const fetchitems = require("../controllers/fetchitems");

router.post("/addbilldetails", addBilldetails); // adds data to greypurchase table
router.get("/fetchall",fetchall); // all the bill info detched 
router.post("/additems",additems); // for adding new item
router.get("/fetchitems",fetchitems); // for getting items
module.exports = router;