const db = require("../../config/db");
const { v4: uuidv4 } = require("uuid");
const fetchall = (req, res) => {
  const query =
    "SELECT * FROM grey_billdetails as bd,grey_itemdetails as id where bd.ChallanNo=id.ChallanNo;";
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

module.exports = fetchall;
