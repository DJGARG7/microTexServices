const router = require("express").Router();

const addBilldetails = require("../controllers/addBilldetails");
const fetchall = require("../controllers/fetchall");
const additems = require("../controllers/additems");
const fetchitems = require("../controllers/fetchitems");
const additemdetails = require("../controllers/additemdetails");

router.post("/addbilldetails", addBilldetails); // adds data to greypurchase table
router.get("/fetchall",fetchall); 
router.post("/additems",additems); // for adding new item
router.get("/fetchitems",fetchitems); // for getting items
router.post("/additemdetails",additemdetails); // for adding item list in a bill
module.exports = router;