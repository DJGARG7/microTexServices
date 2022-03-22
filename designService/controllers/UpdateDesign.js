
const db = require("../config/db");

const UpdateAccount = (req, res) => {
    const uuid = req.params.id;
    const data = req.body;
    console.log(req.body);
    const query =
        "UPDATE DesignMaster set Name,\
                                 ClothType,\
                                 BasicCost,\
                                 WorkCost,\
                                 LaceCost,\
                                 DiamondCost,\
                                 PackingCost,\
                                 Mu,\
                                 CalcPrice,\
                                 WorkJob,\
                                 LaceJob,\
                                 DiamJob\
        WHERE uid = ?;";
    db.query(
        query,
        [
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
            data.DiamJob,
            uuid
        ],
        (err, result) => sendResponse(res, err, result)
    );
};

module.exports = UpdateAccount;
