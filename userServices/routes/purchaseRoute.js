const router = require("express").Router();

// Imports for items.
const addItem = require("../controllers/purchases/addItem");
const fetchItems = require("../controllers/purchases/fetchItems");
const addGreyBill = require("../controllers/purchases/addGreyBill");
const fetchGreyBills = require("../controllers/purchases/fetchGreyBills");
const fetchSuppliers = require("../controllers/purchases/fetchSuppliers");
const fetchTaka = require("../controllers/purchases/fetchTaka");

// Item and related routes.
router.get("/items", fetchItems);
router.post("/items", addItem);
// routes for purchase transactions
router.get("/bills/:accountID?/:itemID?", fetchGreyBills);
router.post("/bills", addGreyBill);
router.get("/suppliers/:itemID?", fetchSuppliers); // To get suppliers for an item from current inventory.
// Routes for taka.
router.get("/taka/:billNumber?/:itemID?", fetchTaka);

//imports for general purchase
const fetchpurchase = require("../controllers/purchases/fetchgeneralpurchases");
const addgeneralpurchase = require("../controllers/purchases/addgeneralpurchase");
const deletegeneralpurchase = require("../controllers/purchases/deletegeneralpurchase");
const updategeneralpurchase = require("../controllers/purchases/updategeneralpurchase");
const fetchChallanNo = require("../controllers/purchases/fetchChallanNo");
const fetchDistinctItems = require("../controllers/purchases/fetchDistinctItems");
const stockDetails = require("../controllers/purchases/stockDetails");

// routes for general purchase
router.get("/fetchgeneralpurchase", fetchpurchase);
router.post("/addgeneralpurchase", addgeneralpurchase);
router.delete("/deletegeneralpurchase/:id", deletegeneralpurchase);
router.put("/updategeneralpurchase/:id", updategeneralpurchase);
router.get("/fetchChallanNo", fetchChallanNo); // for getting the last challan number
router.get("/fetchDistinctItems", fetchDistinctItems); // for getting distinct items persent
router.get("/stockDetails/:id", stockDetails); // for getting the qnty

module.exports = router;
