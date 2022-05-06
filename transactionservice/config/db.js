import mysql from "mysql2";
import dotenv from "dotenv";
import fs from "fs";

dotenv.config();

const config = {
    connectionLimit: 10,
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT,
    ssl: {
        ca: fs.readFileSync(process.env.CERT_PATH),
    },
    multipleStatements: true,
};

// Creating connection pool.
const db = mysql.createPool(config);

export { db, config };
