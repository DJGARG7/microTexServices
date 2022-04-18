import { db, config } from "../config/db.js";

const Deleteaccountdata = (req, res) => {
    const uuid = req.params.id;
    const query = "DELETE FROM master_account WHERE uid=?;";
    db.query(query, [uuid], (err, result) => {
        if (err) {
            console.log(err);
            res.status(400).send(err);
        } else {
            res.send("1");
        }
    });
};

export default Deleteaccountdata;
