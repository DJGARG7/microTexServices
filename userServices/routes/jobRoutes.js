const router = require("express").Router();

// imports for job transactions
const addjobdetails = require("../controllers/job/addbilldetails");
const viewjobitems = require("../controllers/job/viewjobitems");
const getinventorylist = require("../controllers/job/getinventorylist");
const getitemsforjobreceive = require("../controllers/job/getitemsforjobreceive");
const getdistinctitems = require("../controllers/job/getdistinctitems");

// routes for job transactions
router.post("/addjobdetails",addjobdetails); // bill and item detials entry
router.get("/viewjobitems",viewjobitems); // for viewing all the purchases
router.get("/getjobinventory/:accntid/:jobtype",getinventorylist) // for getting all the sent job from the inventory
router.get("/getdistinctitems/:E/:L/:S",getdistinctitems); // for getting distinct items
router.get("/getitemsforjobreceive/:status",getitemsforjobreceive); // for getting the items sent to job work

module.exports = router;
