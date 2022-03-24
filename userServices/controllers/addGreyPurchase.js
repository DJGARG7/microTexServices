const db = require("../config/db");
const { v4: uuidv4 } = require("uuid");
const addGreyPurchase = (req, res) => {
  console.log("heloo");
  const data = req.body;
  const id = uuidv4();
  const ref = {
    status: "1",
    uuid: id,
  };
  JSON.stringify(ref);
  const query =
    "INSERT INTO greypurchase values (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?);";
  db.query(
    query,
    [
      id,
      data.BillNo,
      data.BillDate,
      data.accntnames,
      data.RevCharge,
      data.RcmInvNo,
      data.ChallanNo,
      data.ChallanDate,
      data.Agent,
      data.Haste,
      data.OrderForm,
      data.EntryNo,
      data.ItemName,
      data.Marka,
      data.Taka,
      data.Mts,
      data.Fold,
      data.ActMts,
      data.Rate,
      data.Amount,
      data.Discount,
      data.IGST,
      data.CGST,
      data.SGST,
      data.NetAmount,
    ],
    (err) => {
      if (err) {
        console.log(err);
        res.send(err);
      } else res.send(JSON.stringify(ref));
    }
  );
};

module.exports = addGreyPurchase;
