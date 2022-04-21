const router = require("express").Router();

// Imports.
const postChallan = require("../controllers/mill/postChallan");

// Routes.
router.post("/challan", postChallan);

module.exports = router;
