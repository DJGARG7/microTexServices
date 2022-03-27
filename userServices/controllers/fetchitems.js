const db = require("../config/db");
const fetchitems = (req, res) => {
  const query =
    "SELECT * FROM items;";
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

module.exports = fetchitems;
