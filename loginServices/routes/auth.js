const router = require("express").Router();

const login = require("../controllers/auth/loginController");
const logout = require("../controllers/auth/logoutController");

const authenticate = require("../utils/authenticate");

router.post("/login", login);

router.get("/logout", logout);

router.get("/check", authenticate, (req, res) => {
    res.send("Authenticated!");
});

module.exports = router;
