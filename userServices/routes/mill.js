const router = require("express").Router();

// Imports.
const postChallan = require("../controllers/mill/postChallan");
const fetchChallan = require("../controllers/mill/fetchChallan");

// Routes.
router.get("/challan/:millID?/:itemID?", fetchChallan);
router.post("/:mode?", postChallan);

module.exports = router;
