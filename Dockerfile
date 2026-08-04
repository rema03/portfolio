FROM node:22-alpine

WORKDIR /app

# 의존성 설치
COPY package*.json ./
RUN npm ci --only=production

# 소스코드 복사
COPY . .

# 포트 설정 (도커 환경에서는 기본으로 80 포트 사용)
ENV PORT=80
EXPOSE 80

# 서버 실행
CMD ["npm", "start"]
