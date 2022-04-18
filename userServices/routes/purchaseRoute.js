const router = require("express").Router();

// imports for items.
const addItem = require("../controllers/purchases/addItem");
const fetchItems = require("../controllers/purchases/fetchItems");
const fetchSuppliers = require("../controllers/purchases/fetchSuppliers");

// imports for purchase transactions
const addBilldetails = require("../controllers/purchases/addBilldetails");
const fetchGreyBills = require("../controllers/purchases/fetchGreyBills");
const fetchChallanNo = require("../controllers/purchases/fetchChallanNo");
const getTaka = require("../controllers/purchases/getTaka");
const fetchDistinctItems = require("../controllers/purchases/fetchDistinctItems");
const stockDetails = require("../controllers/purchases/stockDetails");

//imports for general purchase
const fetchpurchase = require("../controllers/purchases/fetchgeneralpurchases");
const addgeneralpurchase = require("../controllers/purchases/addgeneralpurchase");
const deletegeneralpurchase = require("../controllers/purchases/deletegeneralpurchase");
const updategeneralpurchase = require("../controllers/purchases/updategeneralpurchase");

// routes for items.
router.post("/items", addItem); // for adding new item
router.get("/items", fetchItems); // for getting items
router.get("/suppliers/:itemID?", fetchSuppliers); // To get suppliers from current inventory.

// routes for purchase transactions
router.post("/addbilldetails", addBilldetails); // adds data to greypurchase table
router.get("/fetchGreyBills/:account?", fetchGreyBills); // all the bill info detched
router.get("/fetchChallanNo", fetchChallanNo); // for getting the last challan number
router.get("/taka/:itemID?", getTaka); // to get taka for an item.
router.get("/fetchDistinctItems", fetchDistinctItems); // for getting distinct items persent
router.get("/stockDetails/:id", stockDetails); // for getting the qnty

// routes for general purchase
router.get("/fetchgeneralpurchase", fetchpurchase);
router.post("/addgeneralpurchase", addgeneralpurchase);
router.delete("/deletegeneralpurchase/:id", deletegeneralpurchase);
router.put("/updategeneralpurchase/:id", updategeneralpurchase);

module.exports = router;
