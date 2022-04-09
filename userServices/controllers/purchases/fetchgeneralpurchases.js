const db = require("../../config/db");
const fetchgeneralpurchases = (req, res) => {
  const query =
    "SELECT * FROM generalpurchase";
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

module.exports = fetchgeneralpurchases;
