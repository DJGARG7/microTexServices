const db = require("../config/db");

const Deleteaccountdata = (req, res) => {
  const data = req.body;
  const query = "DELETE FROM accountmaster WHERE uid=?;";
  console.log(data);
  db.query(query, [data.uuid], (err, result) => {
    if (err) {
      console.log(err);
      res.send(err);
    } else {
      res.send("1");
    }
  });
};

module.exports = Deleteaccountdata;
