const router = require("express").Router();

const fetchPermissions = require("../controllers/permission/fetchPermissionsController");
const postPermission = require("../controllers/permission/postPermissionsController");
const deletePermission = require("../controllers/permission/deletePermissionController");
const authenticate = require("../utils/authenticate");

router.get("/:uuid?", authenticate, fetchPermissions);
router.post("/:uuid?/:p_id?", authenticate, postPermission);
router.delete("/:uuid?/:p_id?", authenticate, deletePermission);

module.exports = router;
