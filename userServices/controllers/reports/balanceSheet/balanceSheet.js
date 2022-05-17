// http://localhost:3005/reports/balancesheet
const db = require("../../../config/db");
const balanceSheet = (req, res) => {
    const dict = { 0: "liabilites", 1: "assets" };
    const actData = { liabilites: [], assets: [] };
    const dummyData = {
        "Sundry Creditors": {
            type: 0,
            subdata: [],
        },
        "Creditors for process": {
            type: 0,
            subdata: [],
        },
        "Creditors For Job": {
            type: 0,
            subdata: [],
        },
        "Cash Account": {
            type: 1,
            subdata: [],
        },
        "Sundry Debtors": {
            type: 1,
            subdata: [],
        },
        "Creditors for expenses":{
            type:0,
            subdata :[],
        },
        "Creditors for others":{
            type:0,
            subdata :[],
        }
    };
    console.log(dummyData);
    const query = "SELECT * FROM bs1;";
    try {
        db.query(query, (error, result) => {
            if (error) throw error;
            else {
                console.log(result)
                result.map((obj) => {
                    console.log(obj.AccType);
                    dummyData[obj.AccType].subdata.push({
                        name: obj.AccName,
                        value: obj.balance,
                    });
                });
                console.log(dummyData);
                Object.keys(dummyData).map((key) => {
                    actData[dict[dummyData[key].type]].push({
                        heading: key,
                        subdata: dummyData[key].subdata,
                    });
                });
                res.send(actData);
            }
        });
    } catch (error) {
        console.log("balance sheet failed due to ", error);
        res.status(400).send(error);
    }
};
module.exports = balanceSheet;
