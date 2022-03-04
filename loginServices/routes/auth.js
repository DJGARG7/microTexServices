const router = require("express").Router();

const register = require("../controllers/registerController");
const login = require("../controllers/loginController");
const logout = require("../controllers/logoutController");
const authenticate = require("../utils/authenticate");

router.post("/register", register);

router.post("/login", login);

router.get("/logout", logout);

router.get("/test", authenticate, (req, res) => {
    res.send("Authenticated!");
});

module.exports = router;
