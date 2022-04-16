const db = require("../../config/db");

const updategeneralpurchase = (req, res) => {
  const uuid = req.params.id;
  
  const data = req.body;

  const query =
    "UPDATE general_purchase SET itemname=?,\
        quantity=?,\
        priceperqty=?,\
        totalamount=?\
        WHERE uuid = ?;";
  db.query(
    query,
    [data.itemname, data.quantity, data.priceperqty,data.totalamount, uuid],
    (err) => {
      if (err) {
        console.log(err);
        res.status(400).send(err);
      } else {
        res.send("1");
      }
    }
  );
};

module.exports = updategeneralpurchase;
