const db = require("../../config/db");

const viewjobitems = (req, res) => {
  // For "View Purchases table.
  db.query("SELECT * FROM job_send_items;", (err, result) => {
    if (err) {
      console.log(err);
      res.send(err);
    } else res.send(result);
  });
};

module.exports = viewjobitems;
