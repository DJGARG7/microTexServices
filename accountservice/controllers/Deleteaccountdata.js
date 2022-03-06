const db = require("../config/db");

const Deleteaccountdata = (req, res) => {
  const data = req.body;
  const query = "DELETE FROM account_master WHERE account_name=?;";
  console.log(data);
  db.query(query, [data.accountname], (err, result) => {
    if (err) {
      console.log(err);
      res.send(err);
    } else {
      res.send(result);
    }
  });
};

module.exports = Deleteaccountdata;
