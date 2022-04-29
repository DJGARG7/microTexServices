const db = require("../../config/db");

const fetchPermissions = (req, res) => {
    if (!req.params.p_id) {
        if (!req.params.uuid) {
            db.query("SELECT * FROM Permissions", (error, results) => {
                if (error) res.status(400).send(`${error.sqlMessage}`);
                else res.send(results);
            });
        } else {
            db.query(
                "SELECT p_id FROM UserPermissions WHERE uuid=?",
                [req.params.uuid],
                (error, results) => {
                    if (error) res.status(400).send(`${error.sqlMessage}`);
                    else res.send(results);
                }
            );
        }
    } else {
        db.query(
            "SELECT p_id FROM UserPermissions WHERE uuid=?",
            [req.params.uuid],
            (error, results) => {
                if (error) res.status(500).send(`${error.sqlMessage}`);
                else
                    res.send(
                        results.some(
                            (permission) =>
                                permission.p_id === parseInt(req.params.p_id)
                        )
                    );
            }
        );
    }
};

module.exports = fetchPermissions;
