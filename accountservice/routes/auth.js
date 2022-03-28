const router = require("express").Router();

const Accountdata = require("../controllers/Addaccountdata");
const Deleteaccountdata = require("../controllers/Deleteaccountdata");
const updatedata = require("../controllers/UpdateAccount");
const FetchAll = require("../controllers/FetchAll");
const fetchAccounts=require("../controllers/fetchAccounts");

router.post("", Accountdata); // adds data to account_master table
router.delete("/:id", Deleteaccountdata); // deletes data from the table with given id
router.put("/:id", updatedata); // update the data in the table
router.get("", FetchAll); // gets all the data from the table
router.get("/:accType",fetchAccounts); //gets id and account name from account table with given account type

// router.get("/test", verifyToken, (req, res) => {
//   res.send("Authenticated!");
// });

module.exports = router;
