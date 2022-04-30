const db = require("../../config/db");

const viewjobitems = (req, res) => {
  // For "View Purchases table.
  db.query("SELECT * from job_view_challans", (err, result) => {
    if (err) {
      console.log(err);
      res.send(err);
    } else res.send(result);
  });
};

module.exports = viewjobitems;
