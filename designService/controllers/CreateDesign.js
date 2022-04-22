import { db, config } from "../config/db.js";

const Addaccountdata = (req, res) => {
    const data = req.body;
    console.log(data);
    const query =
        "INSERT INTO master_design values (?,?,?,?,?,?,?,?,?,?,?,?,?);";
    try {
        db.query(query, data, (error) => {
            if (error) throw error;
            else res.send("1");
        });
    } catch (error) {
        console.log("createDesign failed due to ", error);
        res.status(400).send(error);
    }
};

export default Addaccountdata;
