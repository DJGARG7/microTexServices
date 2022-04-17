const db = require("../../config/db");
const viewlogs = (req, res) => {
  const query =
    "SELECT * FROM master_userlogs;";
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

module.exports = viewlogs;
