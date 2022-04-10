const db = require("../../config/db");
const fetchGreyBills = (req, res) => {
  const query =
    "SELECT * FROM grey_bills;";
  db.query(
    query,
    (err,result) => {
      if (err) {
        console.log(err);
        res.send(err);
      } else res.send(result);
    }
  );
};

module.exports = fetchGreyBills;
