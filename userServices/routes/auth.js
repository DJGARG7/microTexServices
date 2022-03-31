const router = require("express").Router();

const addBilldetails = require("../controllers/addBilldetails");
const fetchall = require("../controllers/fetchall");
const additems = require("../controllers/additems");
const fetchitems = require("../controllers/fetchitems");


//imports for sale transactions


router.post("/addbilldetails", addBilldetails); // adds data to greypurchase table
router.get("/fetchall",fetchall); // all the bill info detched 
router.post("/additems",additems); // for adding new item
router.get("/fetchitems",fetchitems); // for getting items



// routes for sale transactions
// router.get()
module.exports = router;