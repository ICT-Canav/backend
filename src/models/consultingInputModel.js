//컨설팅 정보 입력 테이블
const createConsultingInputTable = (connection) => {
    const createConsultingInputTableQuery = `
        CREATE TABLE IF NOT EXISTS ConsultingInput (
            id INT AUTO_INCREMENT PRIMARY KEY,
            userId INT,
            content TEXT NOT NULL,
            createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY (userId) REFERENCES User(id) ON DELETE CASCADE
        );
    `;

    connection.query(createConsultingInputTableQuery, (err, results) => {
        if (err) {
            console.error('Error creating ConsultingInput table:', err);
            return;
        }
        console.log('ConsultingInput table checked/created:', results);
    });
};

module.exports = { createConsultingInputTable };
