# Node.js 18 이미지를 기반으로 사용
FROM node:18

# 작업 디렉토리 설정
WORKDIR /src

# 의존성 파일을 복사
COPY package.json package-lock.json ./

# 의존성 설치
RUN npm install

# 소스 코드 복사
COPY . .

# 포트 설정
EXPOSE 8000

# 서버 시작 명령
CMD ["npm", "run", "dev"]