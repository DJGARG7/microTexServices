const db = require("../../config/db");
const stockDetails = (req, res) => {
    console.log(req.params.id)
    const name = req.params.id;
  const query =
    "SELECT SUM(meters) as totalmts from GREY_ITEM_DETAILS WHERE itemID=?;";
  db.query(
    query,name,
    (err,result) => {
      if (err) {
        console.log(err);
        res.status(400).send(`${err.sqlMessage}`);
      } else res.send(result);
    }
  );
};

module.exports = stockDetails;
