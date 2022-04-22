import { db, config } from "../config/db.js";

const FetchAll = (req, res) => {
    console.log(req.body);
    const query = "SELECT * FROM master_design;";
    try {
        db.query(query, (error, result) => {
            if (error) throw error;
            else res.send(result);
        });
    } catch (error) {
        console.log("fetchAccounts failed due to ", error);
        res.status(400).send(error);
    }
};

export default FetchAll;
