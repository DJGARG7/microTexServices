const db = require("../../../../config/db");

const getitemlist = (req, res) => {

    const data = req.params
  db.query(
    `SELECT * from grey_items;`,[data.itemname],
    (error,result) => {
      if (error) {
          
        if (error) {
            console.log(error);
            res.status(400).send(`${error.sqlMessage}`)};
      } else {
          console.log(result);
          res.send(result);
      }
    }
  );
};

module.exports = getitemlist;