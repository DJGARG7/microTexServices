const bcrypt = require("bcryptjs");

const db = require("../config/db");
const validation = require("../helpers/validation");

const register = async (req, res) => {
    // Get salt to hash passwords.
    const salt = await bcrypt.genSalt(10);

    if (req.body.userType === "proprietor") {
        // Validate incoming request.
        const { error } = validation.validateProprietor(req.body);

        // If there is an error, report it; else continue normal flow.
        if (error) return res.status(400).send(error.details[0].message);

        // Hash password before saving it to the database.
        const hashedPassword = await bcrypt.hash(req.body.password, salt);

        // Insert data into the table.
        db.query(
            "INSERT INTO Proprietor VALUES(?, ?)",
            [req.body.userID, hashedPassword],
            (error) => {
                if (error)
                    res.status(400).send(`${error.code}: ${error.sqlMessage}`);
                else res.send("User registered!");
            }
        );
    } else if (req.body.userType === "firm") {
        // Validate incoming request.
        const { error } = validation.validateRegisterFirm(req.body);

        // If there is an error, report it; else continue normal flow.
        if (error) return res.status(400).send(error.details[0].message);

        // Hash password before saving it to the database.
        const hashedPassword = await bcrypt.hash(req.body.password, salt);

        // Insert data into the table.
        db.query(
            "INSERT INTO Firm VALUES(?, ?, ?, ?)",
            [
                req.body.corporateID,
                req.body.userID,
                hashedPassword,
                req.body.isAdmin,
            ],
            (error) => {
                if (error)
                    res.status(400).send(`${error.code}: ${error.sqlMessage}`);
                else res.send("User registered!");
            }
        );
    }
};

module.exports = register;
