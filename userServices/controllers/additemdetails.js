const db = require("../config/db");
const additemdetails = (req, res) => {
  const data = req.body;

  const ref = {
    status: "1",
  };
  console.log(data);
  const query = "INSERT INTO itemdetails values (?,?,?,?,?,?,?,?,?,?,?,?,?);";
  
  data.forEach((item, index) => {
    db.query(
      query,
      [
        item.BillNo,
        item.ItemName,
        item.Marka,
        item.Taka,
        item.Mts,
        item.Fold,
        item.ActMts,
        item.Rate,
        item.Amount,
        item.Discount,
        item.IGST,
        item.CGST,
        item.SGST,
      ],
      (err) => {
        if (err) {
          console.log(err);
          res.send(err);
        }
      }
    );
  });
  res.send(JSON.stringify(ref));
};

module.exports = additemdetails;
