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

module.exports = { getConsultingList, getConsultingDetail };