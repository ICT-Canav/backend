//컨설팅 결과 저장 테이블
const createConsultingTable = (connection) => {
    const createConsultingTableQuery = `
        CREATE TABLE IF NOT EXISTS Consulting (
            id INT AUTO_INCREMENT PRIMARY KEY,
            type ENUM('진학', '진로', '취업') NOT NULL,
            text TEXT,
            userId INT,
            createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY (userId) REFERENCES User(id) ON DELETE CASCADE
        );
    `;

    connection.query(createConsultingTableQuery, (err, results) => {
        if (err) {
            console.error('Error creating Consulting table:', err);
            return;
        }
        console.log('Consulting table checked/created:', results);
    });
};

module.exports = { createConsultingTable };