const router = require("express").Router();

// imports for purchase transactions
const addBilldetails = require("../controllers/purchases/addBilldetails");
const fetchall = require("../controllers/purchases/fetchall");
const additems = require("../controllers/purchases/additems");
const fetchitems = require("../controllers/purchases/fetchitems");

// routes for purchase transactions
router.post("/addbilldetails", addBilldetails); // adds data to greypurchase table
router.get("/fetchall",fetchall); // all the bill info detched 
router.post("/additems",additems); // for adding new item
router.get("/fetchitems",fetchitems); // for getting items

module.exports = router;