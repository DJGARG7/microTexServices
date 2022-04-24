const router = require("express").Router();

// imports for job transactions
const addjobtype = require("../controllers/job/addjobtype");
const getjobtype = require("../controllers/job/getjobtype");
const addjobdetails = require("../controllers/job/addbilldetails");
const viewjobitems = require("../controllers/job/viewjobitems");


// routes for job transactions
router.post("/addjobtype", addjobtype); // add job type
router.get("/getjobtype",getjobtype);// fetch job types
router.post("/addjobdetails",addjobdetails); // bill and item detials entry
router.get("/viewjobitems",viewjobitems); // for viewing all the purchases

module.exports = router;
