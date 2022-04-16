const db = require("../../config/db");
const stockDetails = (req, res) => {
    console.log(req.params.id)
    const name = req.params.id;
  const query =
    "SELECT SUM(Mts) as totalmts,SUM(taka) as totaltaka from grey_itemdetails WHERE ItemName=?;";
  db.query(
    query,name,
    (err,result) => {
      if (err) {
        console.log(err);
        res.send(err);
      } else res.send(result);
    }
  );
};

module.exports = stockDetails;
