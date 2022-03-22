const db = require("../config/db");
const { v4: uuidv4 } = require("uuid");
const Addaccountdata = (req, res) => {
  console.log("heloo");
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
    "INSERT INTO DesignMaster values (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?);";
  db.query(
    query,
    [
      id,
      data.Name,
      data.ClothType,
      data.BasicCost,
      data.WorkCost,
      data.LaceCost,
      data.DiamondCost,
      data.PackingCost,
      data.Mu,
      data.CalcPrice,
      data.WorkJob,
      data.LaceJob,
      data.DiamJob
    ],
    (err) => sendResponse(res, err, JSON.stringify(ref))
  );
};

module.exports = Addaccountdata;
