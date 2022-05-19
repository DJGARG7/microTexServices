const db = require("../../../../config/db");

const getgodownitem = (req, res) => {

    const data = req.params
  db.query(
    `SELECT * from inventory where itemname = ?;`,[data.itemname],
    (error,result) => {
      if (error) {
        if (error) res.status(400).send(`${error.sqlMessage}`);
      } else res.send(result);
    }
  );
};

module.exports = getgodownitem;