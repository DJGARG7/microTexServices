const db = require("../../config/db");
const { v4: uuidv4 } = require("uuid");
const additems = (req, res) => {
    const data = req.body;
    const id = uuidv4();
    const ref = {
        status: "1",
        uuid: id,
    };
    JSON.stringify(ref);
    const query = "INSERT INTO grey_items values (?,?,?,?);";
    db.query(
        query,
        [id, data.itemname, data.openingmts, data.ratepermts],
        (err) => {
            if (err) {
                console.log(err);
                res.send(err);
            } else res.send(JSON.stringify(ref));
        }
    );
};

module.exports = additems;
