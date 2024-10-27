const db = require('../config/db');

// 사용자 ID로 컨설팅 목록 조회
const getConsultingListByUserId = (userId) => {
    const query = `
        SELECT id, type, DATE_FORMAT(createdAt, '%Y-%m-%d') AS date
        FROM Consulting
        WHERE userId = ?
    `;
    return new Promise((resolve, reject) => {
        db.query(query, [userId], (err, results) => {
            if (err) return reject(err);
            resolve(results);
        });
    });
};

// 컨설팅 세부 내용 조회
const getConsultingDetailById = (consultingId) => {
    const query = `SELECT id, type, content FROM Consulting WHERE id = ?`;
    return new Promise((resolve, reject) => {
        db.query(query, [consultingId], (err, results) => {
            if (err) return reject(err);
            if (results.length === 0) return reject(new Error('Consulting not found'));
            resolve(results[0]);
        });
    });
};

module.exports = { getConsultingListByUserId, getConsultingDetailById };