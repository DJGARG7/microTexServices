const router = require("express").Router();

const Accountdata = require("../controllers/Addaccountdata");
const Deleteaccountdata = require("../controllers/Deleteaccountdata");
const updatedata = require("../controllers/UpdateAccount");

router.post("/postdata", Accountdata); // adds data to account_master table
router.post("/deletedata", Deleteaccountdata); // deletes data from the table with given account name
router.post("/updatedata", updatedata); 


// router.get("/test", verifyToken, (req, res) => {
//   res.send("Authenticated!");
// });

module.exports = router;
