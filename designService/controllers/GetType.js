import { db, config } from "../config/db.js";

const GetType = (req, res) => {
    const NAME = req.params.DName;
    console.log(req.body);
    const query = "SELECT cloth_Type FROM master_design where NAME =? ;";
    try {
        db.query(query, [NAME], (error, result) => {
            if (error) throw error;
            else res.send(result);
        });
    } catch (error) {
        console.log("GetType failed due to ", error);
        res.status(400).send(error);
    }
};

export default GetType;
