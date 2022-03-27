const db = require("../config/db");
const { v4: uuidv4 } = require("uuid");

const Addaccountdata = (req, res) => {

  const data = req.body;

  const id = uuidv4();
  console.log(id);

  data.RegDate = "2000/12/1";
  data.dist = 1;

  const ref = {
    status: "1",
    uuid: id,
  };
  JSON.stringify(ref);

  const query =
    "INSERT INTO accountmaster values (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?);";
  db.query(
    query,
    [
      id,
      data.AccName,
      data.AccType,
      data.address1,
      data.address2,
      data.address3,
      data.city,
      data.pincode,
      data.phoneNo,
      data.email,
      data.GSTIN,
      data.RegDate,
      data.propName,
      data.PAN,
      data.dist,
      data.transport,
      data.openingBal,
      data.CrDr,
      data.beneName,
      data.AccountNum,
      data.IFSC,
      data.shares,
    ],
    (err) => {
      if (err) {
        console.log(err);
        res.send(err);
      } else res.send(JSON.stringify(ref));
    }
  );
};

module.exports = Addaccountdata;
