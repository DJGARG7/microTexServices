import express from "express";
const router = express.Router();

import Accountdata from "../controllers/Addaccountdata.js";
import Deleteaccountdata from "../controllers/Deleteaccountdata.js";
import UpdateAccount from "../controllers/UpdateAccount.js";
import FetchAll from "../controllers/FetchAll.js";
import FetchAccounts from "../controllers/fetchAccounts.js";

router.post("", Accountdata); // adds data to account_master table
router.delete("/:id", Deleteaccountdata); // deletes data from the table with given id
router.put("/:id", UpdateAccount); // update the data in the table
router.get("", FetchAll); // gets all the data from the table
router.get("/:accType", FetchAccounts); //gets id and account name from account table with given account type

// router.get("/test", verifyToken, (req, res) => {
//   res.send("Authenticated!");
// });

export default router;
