const mysql = require('mysql2');
const dotenv = require('dotenv');
const { createUserTable } = require('../models/userModel');
const { createConsultingTable } = require('../models/consultingModel');
const { createConsultingInputTable } = require('../models/consultingInputModel');

dotenv.config();

const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
});

const syncDatabase = () => {
    const createDatabase = `CREATE DATABASE IF NOT EXISTS ${process.env.DB_DATABASE};`;

    connection.query(createDatabase, (err) => {
        if (err) {
            console.error('Error creating database:', err);
            return;
        }
        console.log('Database checked/created');

        connection.query(`USE ${process.env.DB_DATABASE};`, (err) => {
            if (err) {
                console.error('Error selecting database:', err);
                return;
            }

            createUserTable(connection);
            createConsultingTable(connection);
            createConsultingInputTable(connection);
        });
    });
};

connection.connect((err) => {
    if (err) {
        console.error('Error connecting to the database:', err);
        return;
    }
    console.log('Connected to the database');
});

module.exports = { connection, syncDatabase };