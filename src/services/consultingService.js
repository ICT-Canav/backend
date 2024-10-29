const { connection } = require('../config/db');
const ai = require('../config/ai');

// 사용자 ID로 컨설팅 목록 조회
const getConsultingListByUserId = (userId) => {
    const query = `
        SELECT id, type, DATE_FORMAT(createdAt, '%Y-%m-%d') AS date
        FROM Consulting
        WHERE userId = ?
    `;
    return new Promise((resolve, reject) => {
        connection.query(query, [userId], (err, results) => {
            if (err) return reject(err);
            resolve(results);
        });
    });
};

// 사용자 ID와 컨설팅 ID로 세부 내용 조회
const getConsultingDetailByUserIdAndId = async (userId, consultingId) => {
    const query = `SELECT * FROM Consulting WHERE userId = ? AND id = ?`;
    return new Promise((resolve, reject) => {
        connection.query(query, [userId, consultingId], (err, results) => {
            if (err) return reject(err);
            resolve(results[0] || null); // 결과가 없을 경우 null 반환
        });
    });
};

// 컨설팅 데이터를 삽입하는 함수
const insertConsultingInputData = (consultingInputData) => {
    const query = `INSERT INTO ConsultingInput (type, information, userId) VALUES (?, ?, ?)`;
    const values = [consultingInputData.type, consultingInputData.information, consultingInputData.userId];

    return new Promise((resolve, reject) => {
        connection.query(query, values, (err, results) => {
            if (err) return reject(err);
            resolve(results);
        });
    });
};

// 입력 데이터를 ID로 가져오는 함수
const getConsultingInputDataById = (inputId) => {
    const query = `SELECT userId, information, type FROM ConsultingInput WHERE id = ?`;
    return new Promise((resolve, reject) => {
        connection.query(query, [inputId], (err, results) => {
            if (err) return reject(err);
            resolve(results[0]);
        });
    });
};

// 분석 결과 저장
const insertConsultingResult = async (userId, content, type) => {
    try {
        // AI 분석
        let analysisResult;
        switch (type) {
            case '진학':
                analysisResult = await ai.analyzeForEducation(content);
                break;
            case '진로':
                analysisResult = await ai.analyzeForCareer(content);
                break;
            case '취업':
                analysisResult = await ai.analyzeForJob(content);
                break;
            default:
                throw new Error('Invalid consulting type');
        }

        // 결과를 Consulting 테이블에 저장
        const query = `INSERT INTO Consulting (type, text, userId) VALUES (?, ?, ?)`;
        const values = [type, analysisResult, userId];
        await connection.promise().query(query, values);
        console.log('Values:', values);

        return analysisResult;
    } catch (error) {
        console.error('Error in ConsultingService:', error);
        throw error;
    }
};


module.exports = { getConsultingListByUserId, getConsultingDetailByUserIdAndId, insertConsultingInputData, insertConsultingResult, getConsultingInputDataById };