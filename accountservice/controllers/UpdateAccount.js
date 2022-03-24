const db = require("../config/db");
const {sendResponse} = require('../../helper');

const UpdateAccount = (req, res) => {
    const uuid = req.params.id;
    const data = req.body;
    console.log(req.body);
    const query =
        "UPDATE accountmaster set AccName=?,\
                                   AccType=?\
                                   address1 = ?,\
                                   address2 = ?,\
                                   address3 = ?,\
                                   city = ?,\
                                   pincode = ?,\
                                   phoneNo = ?,\
                                   email,\
                                   GSTIN,\
                                   RegDate,\
                                   propName,\
                                   PAN,\
                                   dist,\
                                   transport,\
                                   openingBal,\
                                   Cr/Dr,\
                                   beneName,\
                                   AccountNum,\
                                   IFSC,\
                                   shares\
        WHERE uid = ?;";
    db.query(
        query,
        [
            data.accountname,
            data.accounttype,
            data.address_1,
            data.address_2,
            data.address_3,
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
        (err, result) => sendResponse(res, err, result)
    );
};

module.exports = UpdateAccount;
