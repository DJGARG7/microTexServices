const db = require("../../config/db");
const fetchChallanNo = (req, res) => {
  const query =
    "Select MAX(ChallanNo) as challanNo from grey_billdetails;";
  db.query(
    query,
    (err,result) => {
      if (err) {
        console.log(err);
        res.status(400).send(`${err.sqlMessage}`);
      } else {
        //   console.log(result."MAX");
          res.send(result)};
    }
  );
};

module.exports = fetchChallanNo;
