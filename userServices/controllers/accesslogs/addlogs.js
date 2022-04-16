const db = require("../../config/db");
const addlogs = (req, res) => {
    const data = req.body;
    const ref = {
      status: "1",
    };
    JSON.stringify(ref);
    console.log(data);
    const query =
      "INSERT INTO master_userlogs values (?,?,?,?,?);";
    db.query(
      query,
      [
       data.corporateID,
       data.userID,
       data.userName,
       data.date,
       data.time
      ],
      (err) => {
        if (err) {
          console.log(err);
          res.send(err);
        } else res.send(JSON.stringify(ref));
      }
    );
  };
  
  module.exports = addlogs;