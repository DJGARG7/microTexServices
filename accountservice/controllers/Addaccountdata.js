const db = require("../config/db");

const Addaccountdata = (req, res) => {
	console.log("heloo")
    const data = req.body;
    const query =
        "INSERT INTO accountmaster values (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?);";
    db.query(
        query,
        [	"a1",
            data.AccName,
            data.AccType,
            data.address1,
            data.address2,
            data.address3,
            data.city,
            data.pincode,
            data.phoneNo,
            data.email,
            data.GSTIN,
            data.RegDate,
            data.propName,
            data.PAN,
            data.dist,
            data.transport,
            data.openingBal,
            data.CrDr,
            data.beneName,
            data.AccountNum,
            data.IFSC,
            data.shares,
        ],
        (err, result) => {
            if (err) {
                console.log(err);
                res.send(err.sql.Message);
            } else res.send(result);
        }
    );
};

module.exports = Addaccountdata;
