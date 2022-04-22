import { db, config } from "../config/db.js";
const Deleteaccountdata = (req, res) => {
    const Dno = req.params.Dno;
    const query = "DELETE FROM master_design WHERE Dno=?;";
    try {
        db.query(query, [Dno], (error) => {
            if (error) throw error;
            else res.send("1");
        });
    } catch (error) {
        console.log("deleteDesign failed due to ", error);
        res.status(400).send(error);
    }
};

export default Deleteaccountdata;
