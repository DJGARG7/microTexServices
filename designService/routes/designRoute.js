const router = require("express").Router();

const CreateDesign = require("../controllers/CreateDesign");
const DeleteDesign = require("../controllers/DeleteDesign");
const GetAll = require("../controllers/GetAll");
const UpdateDesign = require("../controllers/UpdateDesign");

router.post("", CreateDesign); // adds data to account_master table
router.delete("/:Dno", DeleteDesign); // deletes data from the table with given account name
router.put("/:Dno", UpdateDesign); // update the data in the table
router.get("", GetAll); // update the data in the table


// router.get("/test", verifyToken, (req, res) => {
//   res.send("Authenticated!");
// });

module.exports = router;
