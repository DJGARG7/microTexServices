const router = require("express").Router();

// imports for job transactions
const addjobtype = require("../controllers/job/addjobtype");
const getjobtype = require("../controllers/job/getjobtype");

// routes for job transactions
router.post("/addjobtype", addjobtype); // add job type
router.get("/getjobtype",getjobtype);// fetch job types

module.exports = router;
