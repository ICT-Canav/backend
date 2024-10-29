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
        const userId = req.params.userId;
        const consultingId = req.params.consultingId;
        const consultingDetail = await consultingService.getConsultingDetailByUserIdAndId(userId, consultingId);
        res.status(200).json(consultingDetail);
    } catch (err) {
        res.status(404).json({ error: err.message });
    }
};

// 컨설팅 내용 데이터베이스 추가
const uploadConsultingData = async (req, res) => {
    const inputData = req.body;

    try {
        // 서비스 함수 호출
        const result = await consultingService.insertConsultingInputData(inputData);
        
        // 성공 응답
        res.status(201).json({
            message: 'Input data added successfully.',
            insertedId: result.insertId,
            content: result.content
        });
    } catch (err) {
        console.error('Error adding input data:', err);
        res.status(500).json({ message: 'Error adding input data.', error: err });
    }
};

// AI 분석 후 결과 저장 함수
const saveConsultingResult = async (req, res) => {
    const { inputId } = req.body;

    try {
        // ConsultingInput에서 저장된 입력 데이터를 가져옴
        const inputData = await consultingService.getConsultingInputDataById(inputId);
        if (!inputData) {
            return res.status(404).json({ message: 'Input data not found for given user and type.' });
        }

        // AI 분석 수행
        const analysisResult = await consultingService.insertConsultingResult(inputData.userId, inputData.information, inputData.type);

        // 분석 결과 응답
        res.status(201).json({
            message: 'Consulting result saved successfully.',
            analysisResult
        });
    } catch (error) {
        console.error('Error in analyzeAndSaveConsultingResult:', error);
        res.status(500).json({
            message: 'Failed to save consulting result.',
            error: error.message
        });
    }
};

module.exports = { getConsultingList, getConsultingDetail, uploadConsultingData, saveConsultingResult };