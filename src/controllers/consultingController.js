const consultingService = require('../services/consultingService');

// 사용자 ID로 컨설팅 목록 조회
const getConsultingList = async (req, res) => {
    try {
        const userId = req.params.userId;
        const consultingList = await consultingService.getConsultingListByUserId(userId);
        res.status(200).json(consultingList);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// 컨설팅 세부 내용 조회
const getConsultingDetail = async (req, res) => {
    try {
        const consultingId = req.params.consultingId;
        const consultingDetail = await consultingService.getConsultingDetailById(consultingId);
        res.status(200).json(consultingDetail);
    } catch (err) {
        res.status(404).json({ error: err.message });
    }
};

// 컨설팅 내용 데이터베이스 추가
const uploadConsultingData = async (req, res) => {
    const inputData = req.body;

    // 입력 데이터가 배열인지 확인
    if (!Array.isArray(inputData)) {
        return res.status(400).json({ message: 'Input data must be an array.' });
    }

    try {
        // 서비스 함수 호출
        const result = await insertConsultingInputData(inputData);
        
        // 성공 응답
        res.status(201).json({
            message: 'Input data added successfully.',
            insertedId: result.insertId, // 삽입된 데이터의 ID를 반환
            affectedRows: result.affectedRows // 영향을 받은 행 수
        });
    } catch (err) {
        console.error('Error adding input data:', err);
        res.status(500).json({ message: 'Error adding input data.', error: err });
    }
};

module.exports = { getConsultingList, getConsultingDetail, uploadConsultingData };