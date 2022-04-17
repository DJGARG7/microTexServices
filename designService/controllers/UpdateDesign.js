const db = require("../config/db");

const UpdateAccount = (req, res) => {
    const Dno = req.params.Dno;
    const data = req.body;
    console.log(req.body);
    const query =
        "UPDATE master_design set Dno= ?,Name= ?,\
                                 Cloth_Type= ?,\
                                 Basic_Cost= ?,\
                                 Work_Cost= ?,\
                                 Lace_Cost= ?,\
                                 Diamond_Cost= ?,\
                                 Packing_Cost= ?,\
                                 Mu= ?,\
                                 Calc_Price= ?,\
                                 Work_Job= ?,\
                                 Lace_Job= ?,\
                                 Diam_Job= ?\
        WHERE Dno = ?;";
    db.query(query, [...data, data[0]], (err) => {
        if (err) {
            console.log(err);
            res.status(400).send(err);
        } else {
            res.send("1");
        }
    });
};

module.exports = UpdateAccount;
