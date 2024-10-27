const createUserTable = (connection) => {
    const createUserTableQuery = `
        CREATE TABLE IF NOT EXISTS User (
            id INT AUTO_INCREMENT PRIMARY KEY,
            name CHAR(100) NOT NULL,
            password CHAR(100) NOT NULL
        );
    `;

    connection.query(createUserTableQuery, (err, results) => {
        if (err) {
            console.error('Error creating User table:', err);
            return;
        }
        console.log('User table checked/created:', results);
    });
};

module.exports = { createUserTable };