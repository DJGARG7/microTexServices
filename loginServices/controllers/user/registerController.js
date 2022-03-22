const bcrypt = require("bcryptjs");
const { v4: uuidv4 } = require("uuid");

const db = require("../../config/db");
const validation = require("../../utils/validation");

const register = async (req, res) => {
    if (!req.body.userType) res.status(400).send("Bad format.");

    // Get salt to hash passwords.
    const salt = await bcrypt.genSalt(10);

    if (req.body.userType === "proprietor") {
        // Validate incoming request.
        const { error } = validation.validateRegisterProprietor(req.body);

        // If there is an error, report it; else continue normal flow.
        if (error) return res.status(400).send(error.details[0].message);

        // Hash password before saving it to the database.
        const hashedPassword = await bcrypt.hash(req.body.password, salt);

        // Generate UUID.
        let uuid = uuidv4();

        // Insert data into the table.
        db.query(
            "INSERT INTO Proprietor VALUES(?, ?, ?, ?)",
            [uuid, req.body.userID, req.body.userName, hashedPassword],
            (error) => {
                if (error) res.status(400).send(`${error.sqlMessage}`);
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

        // Generate UUID.
        let uuid = uuidv4();

        // Insert data into the table.
        db.query(
            "INSERT INTO Firm VALUES(?, ?, ?, ?, ?, ?)",
            [
                uuid,
                req.body.corporateID,
                req.body.userID,
                req.body.userName,
                hashedPassword,
                req.body.isAdmin,
            ],
            (error) => {
                if (error) res.status(400).send(`${error.sqlMessage}`);
                else {
                    // Construct query statement
                    let QUERY = "";
                    req.body.permissions.map((p_id) => {
                        QUERY =
                            QUERY +
                            `INSERT INTO UserPermissions VALUES('${uuid}', ${p_id});`;
                    });

                    // Insert data into the table.
                    db.query(QUERY, (error) => {
                        if (error) res.status(400).send(`${error.sqlMessage}`);
                        // Bug: Add rollback - delete added user.
                        else res.send("User registered!");
                    });
                }
            }
        );
    }
};

module.exports = register;
