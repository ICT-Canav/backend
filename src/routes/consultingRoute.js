const express = require('express');
const router = express.Router();
const consultingController = require('../controllers/consultingController');

// 사용자 ID로 간단한 컨설팅 목록 조회
router.get('/user/:userId/consultings', consultingController.getConsultingList);

// 컨설팅 세부 내용 조회
router.get('/consultings/:consultingId', consultingController.getConsultingDetail);

module.exports = router;