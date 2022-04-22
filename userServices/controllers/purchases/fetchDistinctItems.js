const db = require("../../config/db");

const fetchDistinctItems = (req, res) => {
  const query =
    "select DISTINCT(itemName),gi.itemID from GREY_ITEMS as gi,GREY_ITEM_DETAILS as gid where gi.itemId=gid.itemId;";
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

module.exports = fetchDistinctItems;