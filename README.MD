# Jimin's Portfolio

웹 개발자 전지민의 개인 포트폴리오 웹사이트입니다.

## 🛠 기술 스택 (Tech Stack)
- **Frontend**: HTML5, CSS3, Vanilla JavaScript
- **Backend**: Node.js, Express
- **Deployment**: Docker, Ubuntu

## ✨ 주요 기능 (Features)
- **반응형 디자인 (Responsive Design)**: 데스크톱 및 모바일 환경에 최적화된 레이아웃 제공
- **부드러운 스크롤 (Smooth Scrolling & Snap)**: CSS Scroll Snap을 활용한 깔끔한 섹션 이동
- **보안 폼 전송 (Secure Contact Form)**:
  - 구글 앱스 스크립트(Google Apps Script) 연동 메일 전송
  - Honeypot 기법을 활용한 스팸 봇 자동 차단
  - 브라우저에 구글 웹앱 URL을 노출하지 않고 Node.js 서버(`/api/contact`)를 경유하는 보안 설계

## 🚀 로컬 실행 방법 (How to run locally)

이 프로젝트는 Vite나 React 같은 빌드 도구 없이, 순수 Node.js(Express) 환경에서 실행됩니다.

```bash
# 1. 의존성 설치
npm install

# 2. 서버 실행 (기본 포트: 3000)
npm start
```

서버가 실행되면 브라우저에서 `http://localhost:3000` 으로 접속할 수 있습니다.

## 🐳 도커 실행 방법 (How to run with Docker)

```bash
# 1. 도커 이미지 빌드
docker build -t portfolio .

# 2. 도커 컨테이너 실행 (웹 표준 포트인 80번 포트로 실행)
docker run -p 80:80 -d portfolio
```
