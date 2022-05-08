import { db, config } from "../config/db.js";

const GetQuantity = (req, res) => {
    // const data = req.body;
    const clothType = req.params.clothType;
    const query =
        "SELECT qty,CALC_PRICE FROM master_design where CLOTH_TYPE = ?";
    try {
        db.query(query, [clothType], (error, result) => {
            if (error) throw error;
            else res.send(result);
        });
    } catch (error) {
        console.log("GETQUANTITY failed due to ", error);
        res.status(400).send(error);
    }
};

export default GetQuantity;
