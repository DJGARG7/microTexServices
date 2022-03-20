const router = require("express").Router();

const login = require("../controllers/loginController");
const logout = require("../controllers/logoutController");
const register = require("../controllers/registerController");
const fetchUsers = require("../controllers/fetchUsersController");
const deleteUser = require("../controllers/deleteUserController");
const authenticate = require("../utils/authenticate");

router.post("/login", login);

router.get("/logout", authenticate, logout);

router.post("/register", authenticate, register);

router.get("/fetchUsers", authenticate, fetchUsers);

router.get("/deleteUser", authenticate, deleteUser);

router.get("/check", authenticate, (req, res) => {
    res.send("Authenticated!");
});

module.exports = router;
