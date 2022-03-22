const router = require("express").Router();

const fetchPermissions = require("../controllers/permission/fetchPermissionsController");
const authenticate = require("../utils/authenticate");

router.get("/", authenticate, fetchPermissions);

module.exports = router;
