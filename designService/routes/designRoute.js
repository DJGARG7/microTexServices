import express from "express";
const router = express.Router();

import CreateDesign from "../controllers/CreateDesign.js";
import DeleteDesign from "../controllers/DeleteDesign.js";
import GetAll from "../controllers/GetAll.js";
import UpdateDesign from "../controllers/UpdateDesign.js";
import GetNameType from "../controllers/GetNameType.js";

router.post("", CreateDesign); // adds data to account_master table
router.delete("/:Dno", DeleteDesign); // deletes data from the table with given account name
router.put("/:Dno", UpdateDesign); // update the data in the table
router.get("", GetAll); // update the data in the table

router.get("/nameAndType", GetNameType);
// router.get("/test", verifyToken, (req, res) => {
//   res.send("Authenticated!");
// });

export default router;
