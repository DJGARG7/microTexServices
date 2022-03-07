const db = require("../config/db");

const UpdateAccount = (req, res) => {
  const data = req.body;
  console.log(req.body);
  const query =
    "UPDATE account_master set account_name=?, account_type=?, address_line_1 = ?,address_line_2 = ?,address_line_3 = ?,city = ?,pincode = ? WHERE account_name = ?;";
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
      data.oldaccountname,
    ],
    (err, result) => {
      if (err) {
        console.log(err);
        res.send(err.sql.Message);
      } else res.send(result);
    }
  );
};

module.exports = UpdateAccount;
