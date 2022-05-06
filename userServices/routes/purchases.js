const router = require("express").Router();

// Imports for Grey Purchase and related modules.
const getSum = require("../controllers/purchases/getSum");
const addItem = require("../controllers/purchases/addItem");
const fetchItems = require("../controllers/purchases/fetchItems");
const addGreyBill = require("../controllers/purchases/addGreyBill");
const fetchGreyBills = require("../controllers/purchases/fetchGreyBills");
const fetchTaka = require("../controllers/purchases/fetchTaka");

//imports for general purchase
const fetchpurchase = require("../controllers/purchases/fetchgeneralpurchases");
const addgeneralpurchase = require("../controllers/purchases/addgeneralpurchase");
const deletegeneralpurchase = require("../controllers/purchases/deletegeneralpurchase");
const updategeneralpurchase = require("../controllers/purchases/updategeneralpurchase");
const fetchDistinctItems = require("../controllers/purchases/fetchDistinctItems");

// Routes for Grey Purchase and related modules.
router.get("/items", fetchItems);
router.post("/items", addItem);
router.post("/bills", addGreyBill);
router.get("/bills/:accountID?/:itemID?", fetchGreyBills);
router.get("/taka/:billNumber?/:itemID?", fetchTaka);
router.get("/fetchgeneralpurchase", fetchpurchase);
router.post("/addgeneralpurchase", addgeneralpurchase);
router.delete("/deletegeneralpurchase/:id", deletegeneralpurchase);
router.put("/updategeneralpurchase/:id", updategeneralpurchase);
router.get("/fetchDistinctItems", fetchDistinctItems);
router.get("/:startDate?/:endDate?", getSum);

module.exports = router;
