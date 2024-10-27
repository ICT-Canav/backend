const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require('../config/db'); // DB 연결 파일
const saltRounds = 10;
const secretKey = 'your_secret_key'; //키 받아오기

const registerUser = async (name, password) => {
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    const query = 'INSERT INTO User (name, password) VALUES (?, ?)';
    return new Promise((resolve, reject) => {
        db.query(query, [name, hashedPassword], (err, results) => {
            if (err) {
                return reject(err);
            }
            resolve(results);
        });
    });
};

const loginUser = async (name, password) => {
    const query = 'SELECT * FROM User WHERE name = ?';
    return new Promise((resolve, reject) => {
        db.query(query, [name], async (err, results) => {
            if (err) return reject(err);
            if (results.length === 0) return reject(new Error('User not found'));

            const user = results[0];
            const match = await bcrypt.compare(password, user.password);
            if (!match) return reject(new Error('Invalid credentials'));

            const token = jwt.sign({ id: user.id, name: user.name }, secretKey, { expiresIn: '1h' });
            resolve(token);
        });
    });
};

module.exports = { registerUser, loginUser };