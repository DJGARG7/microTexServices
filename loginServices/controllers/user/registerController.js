const bcrypt = require("bcryptjs");
const { v4: uuidv4 } = require("uuid");

const mysql = require("mysql2/promise");
const config = require("../../config/transactionConfig");
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

        // Create connection.
        const connection = await mysql.createConnection(config);

        // Begin transaction.
        await connection.execute(
            "SET TRANSACTION ISOLATION LEVEL READ COMMITTED"
        );
        await connection.beginTransaction();

        // Insert data into the table.
        try {
            await connection.execute(
                "INSERT INTO Proprietor VALUES(?, ?, ?, ?)",
                [uuid, req.body.userID, req.body.userName, hashedPassword]
            );

            await connection.commit();
            res.send("User registered!");
        } catch (error) {
            connection.rollback();
            res.status(500).send(`${error.sqlMessage}`);
        }
    } else if (req.body.userType === "firm") {
        // Validate incoming request.
        const { error } = validation.validateRegisterFirm(req.body);

        // If there is an error, report it; else continue normal flow.
        if (error) return res.status(400).send(error.details[0].message);

        // Hash password before saving it to the database.
        const hashedPassword = await bcrypt.hash(req.body.password, salt);

        // Generate UUID.
        let uuid = uuidv4();

        // Create connection.
        const connection = await mysql.createConnection(config);

        // Begin transaction.
        await connection.execute(
            "SET TRANSACTION ISOLATION LEVEL READ COMMITTED"
        );
        await connection.beginTransaction();

        // Insert user.
        try {
            await connection.execute(
                "INSERT INTO Firm VALUES(?, ?, ?, ?, ?, ?)",
                [
                    uuid,
                    req.body.corporateID,
                    req.body.userID,
                    req.body.userName,
                    hashedPassword,
                    req.body.isAdmin,
                ]
            );

            await Promise.all(
                req.body.permissions.map(async (p_id) => {
                    await connection.execute(
                        `INSERT INTO User_Permissions VALUES('${uuid}', ${p_id});`
                    );
                })
            );

            await connection.commit();
            res.send("User registered!");
        } catch (error) {
            connection.rollback();
            res.status(500).send(`${error.sqlMessage}`);
        }
    }
};

module.exports = register;
