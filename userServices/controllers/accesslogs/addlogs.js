const db = require("../../config/db");

const addLogs = (req, res) => {
    const data = req.body;
    const ref = {
        status: "1",
    };
    JSON.stringify(ref);

    const query = "INSERT INTO master_userlogs values (?,?,?,?,?);";
    db.query(
        query,
        [data.corporateID, data.userID, data.userName, data.date, data.time],
        (err) => {
            if (err) {
                console.log(err);
                res.send(err);
            } else res.send(JSON.stringify(ref));
        }
    );
};

module.exports = addLogs;
