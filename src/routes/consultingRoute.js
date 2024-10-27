const express = require('express');
const router = express.Router();
const consultingController = require('../controllers/consultingController');

// 사용자 ID로 간단한 컨설팅 목록 조회
router.get('/:userId', consultingController.getConsultingList);

// 컨설팅 세부 내용 조회
router.get('/:consultingId', consultingController.getConsultingDetail);

// JSON 파일로부터 데이터를 받아 Consulting 데이터베이스에 등록
router.post('/upload', consultingController.uploadConsultingData);

module.exports = router;