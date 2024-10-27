const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
// const { swaggerDocs } = require('./path/to/swaggerConfig'); // 스웨거 설정 파일 경로
const dotenv = require('dotenv');
const { connection, syncDatabase } = require('./config/db');

const userRoute = require('./routes/userRoute.js');
const consultingRoute = require('./routes/consultingRoute.js');

dotenv.config();

// 앱 생성
const app = express();
const port = 8000;

// 미들웨어 설정
app.use(cors());
app.use(bodyParser.json());

// 데이터베이스 동기화
syncDatabase();

// const apiPrefix = '/api/v1'; // 공통 경로

// 라우트 설정
app.get('/', (req, res) => {
    res.send('test');
});
app.use('/', userRoute);
app.use('/consulting', consultingRoute);

// 서버 실행
connection.connect((err) => {
    if (err) {
        console.error('Error connecting to the database:', err);
        return;
    }

    console.log('Connected to the database');
    app.listen(port, () => {
        console.log(`Example app listening on port ${port}`);
    });
});