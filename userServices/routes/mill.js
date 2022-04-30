const router = require("express").Router();

// Imports.
const fetchSuppliers = require("../controllers/mill/fetchSuppliers");
const postChallan = require("../controllers/mill/postChallan");
const fetchChallan = require("../controllers/mill/fetchChallan");
const getSum = require("../controllers/mill/getSum");

// Routes.
router.get("/suppliers/:itemID?", fetchSuppliers);
router.get("/challan/:millID?/:itemID?", fetchChallan);
router.get("/:startDate?/:endDate?", getSum);
router.post("/:mode?", postChallan);

module.exports = router;
