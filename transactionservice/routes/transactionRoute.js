import express from "express";
const router = express.Router();

import transact from "../controllers/Transact.js";
import getDrinfo from "../controllers/getDrInfo.js";
import getCrinfo from "../controllers/getCrInfo.js";

router.post("", transact); // 
router.get("/drBills/:uid", getDrinfo); // gets all the data from the table
router.get("/crBills/:type/:uid", getCrinfo); // gets all the data from the table

export default router;
