const db = require("../config/db");

const fetchAccounts = (req, res) => {
    const AccType = req.params.accType;
    const query = "SELECT uid,AccName FROM master_account where AccType=?;";
    db.query(query,[AccType], (err, result) => {
        if (err) {
            console.log(err);
            res.status(400).send(err.sqlMessage);
        } else {
            res.send(result);
        }
    });
};

module.exports = fetchAccounts;
