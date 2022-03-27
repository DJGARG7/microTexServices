const db = require("../config/db");
const addBilldetails = (req, res) => {
  const data = req.body;
  const ref = {
    staus : "1"
  }
  const query =
    "INSERT INTO billdetails values (?,?,?,?,?,?,?,?);";
  db.query(
    query,
    [
      data.BillNo,
      data.BillDate,
      data.accntnames,
      data.ChallanNo,
      data.ChallanDate,
      data.Agent,
      data.EntryNo,
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

module.exports = addBilldetails;
