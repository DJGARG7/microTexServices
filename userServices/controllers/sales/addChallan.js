const db = require("../../config/db");

const addChallan = (req, res) => {
    // console.log("heloo");
    const data = req.body;
    console.log(data);

    // const query =
    //     "INSERT INTO DesignMaster values (?,?,?,?,?,?,?,?,?,?,?,?,?);";
    // db.query(query, data, (err) => {
    //     if (err) {
    //         console.log(err);
    //         res.send(err);
    //     } else res.send("1");
    // });
    res.send(1);
};

module.exports = addChallan;
