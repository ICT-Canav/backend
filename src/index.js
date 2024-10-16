import express from 'express'
import cors from 'cors';
import bodyParser from 'body-parser';
//스웨거 설정
//env파일 불러오기

// 앱 생성
const app = express()
const port = 8000

// 미들웨어 설정
app.use(cors());
app.use(bodyParser.json());

// 데이터베이스 연결하기!!
// 데이터베이스 동기화하는 로직 추가하기

//기본 경로 설정해주기

// 라우트 설정
app.get('/', (req, res) => { res.send('test')})

// 서버 실행
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})