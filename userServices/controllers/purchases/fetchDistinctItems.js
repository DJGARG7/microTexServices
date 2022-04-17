const db = require("../../config/db");

const fetchDistinctItems = (req, res) => {
  const query =
    "SELECT DISTINCT(ItemName) from grey_itemdetails;";
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

module.exports = fetchDistinctItems;