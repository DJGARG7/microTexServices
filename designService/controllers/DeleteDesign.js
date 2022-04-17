const db = require("../config/db");
const Deleteaccountdata = (req, res) => {
    const Dno = req.params.Dno;
    const query = "DELETE FROM master_design WHERE Dno=?;";
    db.query(query, [Dno], (err) => {
        if (err) {
            console.log(err);
            res.status(400).send(err);
        } else {
            res.send("1");
        }
    });
}

module.exports = Deleteaccountdata;
