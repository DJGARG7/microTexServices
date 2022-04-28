const db = require("../../config/db");

const getdistinctitems = (req, res) => {

    const data = req.params

  db.query(
    `SELECT * FROM inventory where status="godown" and Embroidery=? and Lace=? and Stone=?;`,[data.E,data.L,data.S],
    (error,result) => {
      if (error) {
        if (error) res.status(400).send(`${error.sqlMessage}`);
      } else res.send(result);
    }
  );
};

module.exports = getdistinctitems;
