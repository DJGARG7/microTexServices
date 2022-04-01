const db = require("../../config/db");
const additems = (req, res) => {
  const data = req.body;
  const ref = {
    status: "1",
  };
  JSON.stringify(ref);
  const query =
    "INSERT INTO items values (?,?,?,?,?,?,?,?,?);";
  db.query(
    query,
    [
     data.itemname,
     data.openingpcs,
     data.openingmts,
     data.openingval,
     data.rateperpcs,
     data.ratepermts,
     data.hsncode,
     data.gst,
     data.descriptiongst
    ],
    (err) => {
      if (err) {
        console.log(err);
        res.send(err);
      } else res.send(JSON.stringify(ref));
    }
  );
};

module.exports = additems;
