const db = require("../config/db");

const Deleteaccountdata = (req, res) => {
    const uuid = req.params.id;
    const query = "DELETE FROM accountmaster WHERE uid=?;";
    // console.log(data);
    db.query(query, [uuid], (err, result) => {
        if (err) {
            console.log(err);
            res.send(err);
        } else {
            res.send("1");
        }
    });
};

module.exports = Deleteaccountdata;
