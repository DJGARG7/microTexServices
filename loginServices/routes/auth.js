const router = require("express").Router();

const register = require("../controllers/registerController");
const login = require("../controllers/loginController");
const refresh = require("../controllers/refreshController");
const logout = require("../controllers/logoutController");
const verifyToken = require("../helpers/verifyToken");

router.post("/register", register);

router.post("/login", login);

router.get("/refresh", refresh);

router.get("/logout", logout);

router.get("/test", verifyToken, (req, res) => {
    res.send("Authenticated!");
});

module.exports = router;
