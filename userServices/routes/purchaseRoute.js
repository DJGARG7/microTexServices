const router = require("express").Router();

// imports for purchase transactions
const addBilldetails = require("../controllers/purchases/addBilldetails");
const fetchall = require("../controllers/purchases/fetchall");
const additems = require("../controllers/purchases/additems");
const fetchitems = require("../controllers/purchases/fetchitems");

//imports for general purchase
const fetchpurchase = require("../controllers/purchases/fetchgeneralpurchases");
const addgeneralpurchase = require("../controllers/purchases/addgeneralpurchase");
const deletegeneralpurchase = require("../controllers/purchases/deletegeneralpurchase");

// routes for purchase transactions
router.post("/addbilldetails", addBilldetails); // adds data to greypurchase table
router.get("/fetchall",fetchall); // all the bill info detched 
router.post("/additems",additems); // for adding new item
router.get("/fetchitems",fetchitems); // for getting items

// routes for general purchase
router.get("/fetchgeneralpurchase",fetchpurchase)
router.post("/addgeneralpurchase",addgeneralpurchase);
router.delete("/:id",deletegeneralpurchase);

module.exports = router;