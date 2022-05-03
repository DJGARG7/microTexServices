const db = require("../../config/db");

const deletePermission = (req, res) => {
    if (!req.params.uuid || !req.params.p_id)
        res.status(400).send("Error! Bad request format");
    else {
        db.query(
            "DELETE FROM UserPermissions WHERE uuid = ? AND p_id = ?",
            [req.params.uuid, req.params.p_id],
            (error) => {
                if (error) res.status(500).send(`${error.sqlMessage}`);
                else res.send("Permission deleted successfully");
            }
        );
    }
};

module.exports = deletePermission;
