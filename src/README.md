# Questbook - 교육용 AI 플랫폼

## 📋 프로젝트 개요

**Questbook**는 "기술을 통해 교사와 학생의 미래를 꿈꿉니다"라는 미션으로 개발된 교육용 AI 플랫폼입니다.

## 🎯 주요 기능

### 1. 학습자료 만들기 📚
- AI 기반 맞춤형 학습자료 생성
- 프롬프트 입력 또는 파일 업로드
- 학습 계획서 자동 생성
- 다양한 학습 구성 요소 (학습목표, 개념학습, 탐구과정 등)

### 2. 문제 생성 ✏️
- 다양한 유형의 문제 자동 생성

### 3. 지문 생성 및 첨삭 📝
- 지문 작성과 AI 피드백 제공

### 4. 문제 채점 ✅
- 자동 채점 및 분석

### 5. 단어장 📖
- 스마트 단어 학습 관리

### 6. 화이트보드 🎨
- 실시간 협업 학습 공간
- 학습 자료 위에 주석 추가 가능
- 무한 캔버스 기능

## 📁 파일 구조

```
src/
├── App.js                      # 메인 애플리케이션
├── App.css                     # 메인 스타일
├── Header.js                   # 통합 헤더 컴포넌트
├── Header.css
├── Home.js                     # 홈 페이지
├── Login.js                    # 로그인 페이지
├── Login.css
├── ProjectManagement.js        # 프로젝트 관리 페이지
├── ProjectManagement.css
├── ProfileDropdown.js          # 프로필 드롭다운
├── ProfileDropdown.css
├── Settings.js                 # 설정 페이지
├── Settings.css
├── LearningMaterial.js         # 학습자료 생성 페이지
├── LearningMaterial.css
├── PlanningForm.js             # 학습 계획서 페이지
├── PlanningForm.css
├── LearningResult.js           # 학습 결과 페이지
├── LearningResult.css
├── Whiteboard.js               # 화이트보드 페이지
├── Whiteboard.css
├── WhiteboardSetup.js          # 화이트보드 설정 모달
├── WhiteboardSetup.css
├── index.js
├── index.css
├── reportWebVitals.js
├── setupTests.js
└── App_test.js
```

## 🚀 설치 및 실행

### 1. 의존성 설치
```bash
npm install
```

### 2. 개발 서버 실행
```bash
npm start
```

### 3. 빌드
```bash
npm run build
```

## 🎨 디자인 시스템

### 색상 팔레트
- **Primary**: #6366f1 ~ #8b5cf6 (보라색 그라데이션)
- **Success**: #10b981 (초록색)
- **Warning**: #f59e0b (주황색)
- **Error**: #ef4444 (빨간색)
- **Info**: #3b82f6 (파란색)
- **Cyan**: #06b6d4 (청록색)

### 주요 디자인 원칙
- 일관된 보라색 그라데이션 사용
- 둥근 모서리 (border-radius: 8px ~ 20px)
- 부드러운 그림자 효과
- 호버 시 시각적 피드백

## 📄 페이지별 설명

### Home (홈 페이지)
- 6개 기능 카드 그리드
- 로그인 버튼

### Login (로그인)
- 이메일/비밀번호 입력
- 소셜 로그인 (Google, Kakao)

### Main (메인 대시보드)
- 로그인 후 메인 페이지
- 6개 기능 카드
- 헤더에 프로필 드롭다운

### ProjectManagement (프로젝트 관리)
- 8개 프로젝트 표시
- 필터 기능 (서비스 타입, 상태, 정렬)
- 관리 모드 (선택, 삭제, 다운로드)
- 그리드/리스트 뷰 전환

### LearningMaterial (학습자료 만들기)
- 프롬프트 입력
- 파일 업로드
- 예제 프롬프트 4개

### PlanningForm (학습 계획서)
- 학습 제목, 목표 설정
- 학습 목차 관리 (드래그 앤 드롭)
- 언어, 분량, 구성 선택

### LearningResult (학습 결과)
- **일반 모드**: 학습 자료 보기
- **화이트보드 모드**: 학습 자료 + 주석 도구
- 6개 탭 (학습목표, 개념학습, 탐구과정, 용어사전, 점검하기, 정리하기)

### Whiteboard (화이트보드)
- 무한 캔버스
- 왼쪽 사이드바 (도구모음, 생산성 앱)
- 하단 도구바
- 줌 컨트롤

### WhiteboardSetup (화이트보드 설정)
- 프로젝트 제목 입력
- 썸네일 업로드
- 태그 관리
- 그리드 활성화 토글

## 🔄 페이지 흐름

### 학습자료 생성 흐름
```
Home → Login → Main → 학습자료 만들기 
  → PlanningForm → LearningResult
```

### 화이트보드 생성 흐름
```
Main → 더보기 → 화이트보드 
  → WhiteboardSetup → Whiteboard
```

### 프로젝트 관리 흐름
```
Main → 내 프로젝트 → ProjectManagement
  → 프로젝트 클릭 → (각 타입별 페이지)
```

## 🎯 주요 기능 상세

### 통합 Header 시스템
- 모든 페이지에서 일관된 헤더
- 왼쪽: Questbook 로고 (홈으로 이동)
- 중앙: 페이지별 컨텐츠 (제목, 버튼 등)
- 오른쪽: 사용자 이름, 더보기, 언어, 로그아웃

### 프로젝트 관리
- 8개 프로젝트 (학습자료, 문제생성, 지문, 채점, 단어장, 화이트보드)
- 서비스 타입별 필터링
- 상태별 필터링 (완료, 실패)
- 정렬 (생성일순, 이름순, 최근 수정순)
- 관리 모드 (다중 선택, 삭제, 다운로드)

### 화이트보드 기능
- 2가지 접근 방법:
  1. 새 화이트보드 생성
  2. 학습 자료에 화이트보드 추가
- 도구: 선택, 펜, 도형, 텍스트, 이모지, 지우개
- 생산성 앱 통합: Google Drive, MS Office 등

## 🔧 기술 스택

- **Framework**: React
- **언어**: JavaScript
- **스타일**: CSS3
- **상태 관리**: React Hooks (useState)
- **라우팅**: 조건부 렌더링

## 📝 주요 업데이트 내역

### 2025-12-15
- ✅ 통합 Header 컴포넌트 구현
- ✅ ProjectManagement 페이지 완성 (8개 프로젝트)
- ✅ LearningResult 화이트보드 모드 추가
- ✅ Whiteboard 페이지 구현
- ✅ WhiteboardSetup 모달 구현
- ✅ 화이트보드 아이콘 스타일 개선
- ✅ 탭 버튼 모드별 분리 (일반/화이트보드)
- ✅ WhiteboardSetup 레이아웃 정렬 개선

## 👤 사용자 정보

- 기본 사용자명: 사만원
- 역할: 교사

## 🎨 UI/UX 특징

1. **일관성**: 모든 페이지에서 통일된 디자인
2. **직관성**: 명확한 아이콘과 레이블
3. **반응성**: 호버, 클릭 피드백
4. **접근성**: 명확한 버튼, 큰 터치 영역
5. **색상 구분**: 기능별 고유 색상

## 📞 문의

프로젝트에 대한 문의사항이 있으시면 연락 주세요.

---

© 2024 Questbook. All rights reserved.
