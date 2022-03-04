const router = require("express").Router();

const Accountdata = require("../controllers/Accountdata");

router.post("/postdata", Accountdata);


// router.get("/test", verifyToken, (req, res) => {
//   res.send("Authenticated!");
// });

module.exports = router;
