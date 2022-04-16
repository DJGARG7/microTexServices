const db = require("../config/db");
const {sendResponse} = require('../../helper');

const UpdateAccount = (req, res) => {
    const uuid = req.params.id;
    const data = req.body;
 
    const query =
        "UPDATE master_account SET AccName=?,\
                                   AccType=?,\
                                   address1 = ?,\
                                   address2 = ?,\
                                   address3 = ?,\
                                   city = ?,\
                                   pincode = ?,\
                                   phoneNo = ?,\
                                   email=?,\
                                   GSTIN=?,\
                                   RegDate=?,\
                                   propName=?,\
                                   PAN=?,\
                                   dist=?,\
                                   transport=?,\
                                   openingBal=?,\
                                   CrDr=?,\
                                   beneName=?,\
                                   AccountNum=?,\
                                   IFSC=?,\
                                   shares=?\
        WHERE uid = ?;";
    db.query(
        query,
        [
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
            uuid
        ],
        (err) => {
            if (err) {
                console.log(err);
                res.status(400).send(err);
            } else {
                res.send("1");
            }
        }
    );
};

module.exports = UpdateAccount;
