const dotenv = require('dotenv');
dotenv.config();
const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const gemini = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });


// 진학
const analyzeForEducation = async (content) => {
    try {
        const prompt = content + " 위 내용을 가지고 진학을 성공적으로 할 수 있도록 계획을 작성해줘.";
        const response = await gemini.generateContentStream(prompt);

        let finalResult = ''; // 결과를 저장할 변수

        for await (const chunk of response.stream) {
            const chunkText = chunk.text();
            finalResult += chunkText; // 스트리밍된 텍스트를 결합
        }

        return finalResult; // 최종 결과 반환
    } catch (error) {
        console.error('Error in analyzeForEducation:', error);
        throw new Error('Failed to analyze for education.');
    }
};

// 진로
const analyzeForCareer = async (content) => {
    try {
        const prompt = content + " 위 내용을 바탕으로 진로를 정할 수 있도록 도와줘.";
        const response = await gemini.generateContentStream(prompt);

        let finalResult = '';

        for await (const chunk of response.stream) {
            const chunkText = chunk.text();
            finalResult += chunkText;
        }

        return finalResult; // 최종 결과 반환
    } catch (error) {
        console.error('Error in analyzeForCareer:', error);
        throw new Error('Failed to analyze for career.');
    }
};

// 취업
const analyzeForJob = async (content) => {
    try {
        const prompt = content + " 위 내용을 가지고 취업을 성공적으로 할 수 있도록 계획을 작성해줘.";
        const response = await gemini.generateContentStream(prompt);

        let finalResult = '';

        for await (const chunk of response.stream) {
            const chunkText = chunk.text();
            finalResult += chunkText;
        }

        return finalResult; // 최종 결과 반환
    } catch (error) {
        console.error('Error in analyzeForJob:', error);
        throw new Error('Failed to analyze for job.');
    }
};

// 모듈 내보내기
module.exports = {
    analyzeForEducation,
    analyzeForCareer,
    analyzeForJob
};