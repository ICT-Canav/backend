const dotenv = require('dotenv');
dotenv.config();

const bcrypt = require('bcryptjs'); // bcryptjs 사용
const jwt = require('jsonwebtoken');
const { connection } = require('../config/db'); // DB 연결 파일
const saltRounds = 10;

// 회원가입
const registerUser = async (name, password) => {
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    const query = 'INSERT INTO User (name, password) VALUES (?, ?)';
    return new Promise((resolve, reject) => {
        connection.query(query, [name, hashedPassword], (err, results) => {
            if (err) {
                console.error('Error registering user:', err);
                return reject(new Error('Failed to register user. Please try again.'));
            }
            resolve(results);
        });
    });
};

// 로그인
const loginUser = async (name, password) => {
    const query = 'SELECT * FROM User WHERE name = ?';
    return new Promise((resolve, reject) => {
        connection.query(query, [name], async (err, results) => {
            if (err) {
                console.error('Error fetching user:', err);
                return reject(new Error('Failed to fetch user. Please try again.'));
            }
            if (results.length === 0) return reject(new Error('User not found'));

            const user = results[0];
            const match = await bcrypt.compare(password, user.password);
            if (!match) return reject(new Error('Invalid credentials'));

            // JWT 생성
            const token = jwt.sign({ id: user.id, name: user.name }, process.env.JWT_SECRET, { expiresIn: '1h' });
            resolve({ token });
        });
    });
};

// JWT 검증 예시
const verifyToken = (token) => {
    return new Promise((resolve, reject) => {
        jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
            if (err) return reject(new Error('Token verification failed'));
            resolve(decoded);
        });
    });
};

module.exports = { registerUser, loginUser, verifyToken };