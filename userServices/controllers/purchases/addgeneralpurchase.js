const db = require("../../config/db");
const { v4: uuidv4 } = require("uuid");

const addgeneralpurchase = (req, res) => {
  const data = req.body;
  const id = uuidv4();
  const ref = {
    status: "1",
    uuid: id,
  };

  console.log(data);
  const query =
    "INSERT INTO generalpurchase values (?,?,?,?,?);";
  db.query(
    query,
    [
      id,
      data.state.itemname, 
      data.state.quantity, 
      data.state.priceperqty,
      data.totalamount
    ],
    (err) => {
      if (err) {
        console.log(err);
        res.send(JSON.stringify(err));
      } else res.send(JSON.stringify(ref));
    }
  );
};

module.exports = addgeneralpurchase;
