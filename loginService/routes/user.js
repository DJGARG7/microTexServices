const router = require("express").Router();

const fetchUsers = require("../controllers/user/fetchUsersController");
const registerUser = require("../controllers/user/registerController");
const deleteUser = require("../controllers/user/deleteUserController");
const authenticate = require("../utils/authenticate");

router.get("/", authenticate, fetchUsers);

router.post("/", authenticate, registerUser);

router.delete("/:uuid", authenticate, deleteUser);

module.exports = router;
