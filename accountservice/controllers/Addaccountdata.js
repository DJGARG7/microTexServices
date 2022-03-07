const db = require("../config/db");

const Addaccountdata = (req, res) => {
  const data = req.body;
  const query =
    "INSERT INTO account_master (account_name,account_type,address_line_1,address_line_2,address_line_3,city,pincode) values (?,?,?,?,?,?,?);";
  if(!data.pincode) data.pincode = 0;
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
    ],
    (err, result) => {
      if (err) 
      {console.log(err);
        res.send(err.sql.Message);}
      else res.send(result);
    }
  );
};

module.exports = Addaccountdata;
