const fs = require("fs");

const config = {
    connectionLimit: 10,
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: 3306,
    ssl: {
        ca: fs.readFileSync(process.env.CERT_PATH),
    },
    multipleStatements: true,
};

module.exports = config;
