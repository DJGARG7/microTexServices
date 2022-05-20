import { db, config } from "../config/db.js";

const FetchAccounts = (req, res) => {
    const AccType = req.params.accType;
    const query = "SELECT uid,AccName FROM master_account where AccType=?;";
    try {
        db.query(query, [AccType], (error, result) => {
            if (error) res.status(500).send("Server error");
            else res.send(result);
        });
    } catch (error) {
        console.log("fetchAccounts failed due to ", error);
        res.status(400).send(error);
    }
};

export default FetchAccounts;
