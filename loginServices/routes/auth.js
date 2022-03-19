const router = require("express").Router();

const register = require("../controllers/registerController");
const login = require("../controllers/loginController");
const logout = require("../controllers/logoutController");
const authenticate = require("../utils/authenticate");

router.post("/register", authenticate, register);

router.post("/login", login);

router.get("/logout", authenticate, logout);

router.get("/check", authenticate, (req, res) => {
    res.send("Authenticated!");
});

module.exports = router;
