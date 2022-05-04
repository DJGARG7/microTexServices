import { db, config } from "../config/db.js";

const UpdateDesign = (req, res) => {
    const Dno = req.params.Dno;
    const data = req.body;
    // console.log(req.body);
    const query =
        "UPDATE master_design set Dno= ?,Name= ?,\
                                 Cloth_Type= ?,\
                                 Basic_Cost= ?,\
                                 Work_Cost= ?,\
                                 Lace_Cost= ?,\
                                 Diamond_Cost= ?,\
                                 Packing_Cost= ?,\
                                 Mu= ?,\
                                 Calc_Price= ?,\
                                 Work_Job= ?,\
                                 Lace_Job= ?,\
                                 Diam_Job= ?\
        WHERE Dno = ?;";
    try {
        db.query(query, [...data, data[0]], (error) => {
            if (error) throw error;
            else res.send("1");
        });
    } catch (error) {
        console.log("updateDesign failed due to ", error);
        res.status(400).send(error);
    }
};
export default UpdateDesign;
