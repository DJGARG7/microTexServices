const router = require("express").Router();

const  addlogs = require("../controllers/accesslogs/addlogs");
const viewlogs = require("../controllers/accesslogs/viewlogs");

router.post("/",addlogs);
router.get("/",viewlogs);

module.exports = router;