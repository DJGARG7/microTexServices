const db = require("../../config/db");

const postPermission = (req, res) => {
    if (!req.params.uuid || !req.params.p_id)
        res.status(400).send("Error! Bad request format");
    else {
        db.query(
            "INSERT INTO UserPermissions VALUES(?, ?)",
            [req.params.uuid, req.params.p_id],
            (error) => {
                if (error) res.status(400).send(`${error.sqlMessage}`);
                else res.send("Permission added successfully");
            }
        );
    }
};

module.exports = postPermission;
