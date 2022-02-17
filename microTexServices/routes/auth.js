const router = require("express").Router();

const register = require("../controllers/registerController");
const login = require("../controllers/loginController");
const verifyToken = require("./verifyToken");

router.post("/register", register);

router.post("/login", login);

router.get("/test", verifyToken, (req, res) => {
    res.send("Authenticated!");
});

module.exports = router;
