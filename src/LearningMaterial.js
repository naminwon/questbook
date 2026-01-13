import { useState } from 'react';
import './LearningMaterial.css';
import Header from './Header';

function LearningMaterial({ onHome, onNext, onNavigate, currentPage}) {
  const [uploadedFile, setUploadedFile] = useState(null);
  const [prompt, setPrompt] = useState('');

  const examples = [
    {
      icon: '🧪',
      text: '식물의 광합성에 대한 교육자료를 만들어 주세요.',
      color: '#e3f2fd'
    },
    {
      icon: '∞',
      text: '피타고라스의 정리에 대한 수업자료를 20분 분량으로 만들어 주세요.',
      color: '#e8f5e9'
    },
    {
      icon: '📝',
      text: '한국의 전통악기 중 하나인 단소에 대한 교육자료를 초등학교 3학년을 대상으로 만들어 주세요.',
      color: '#fff9c4'
    },
    {
      icon: '✏️',
      text: '첨부 파일을 토대로 십자군 전광과 르네상스 시대에 대한 중학교 3학년 교과과정에 맞는 교안을 만들어 주세요.(첨부파일과 함께)',
      color: '#fce4ec'
    }
  ];

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setUploadedFile(file);
    }
  };

  const handleSubmit = () => {
  if (prompt.trim() || uploadedFile) {
    onNext(prompt);  // 다음 페이지로 이동
  } else {
    alert('프롬프트를 입력하거나 파일을 업로드해주세요.');
  }
  };

  return (
    <div className="learning-material">
      {/* 헤더 */}
      <Header 
        onNavigate={onNavigate}
        currentPage={currentPage}
        userName="사만원"
      />

      {/* 메인 컨텐츠 */}
      <main className="lm-main">
        <div className="lm-content">
          <h1 className="lm-title">
            교육용 <span className="highlight">AI 에이전트</span>
          </h1>
          <h2 className="lm-subtitle">
            선생님을 위한 가장 <span className="highlight">똑똑한 수업 조수</span>
          </h2>
          <p className="lm-description">
            자료를 올리거나, 만들고 싶은 주제를 말해주세요. 나머지는 퀘스트보드가 전부 알아서 준비합니다.
          </p>

          {/* 파일 업로드 섹션 */}
<div className="upload-section">
  <div className="upload-icon-container">
    <div className="cloud-upload-icon">
        <svg width="100" height="100" viewBox="0 0 100 100" fill="none">
    {/* 배경 원 */}
    <circle cx="50" cy="50" r="45" fill="#EEF2FF"/>
    
    {/* 구름 */}
    <path 
      d="M65 45C65 45 65 45 65 45C65 39.477 60.523 35 55 35C54.328 35 53.672 35.078 53.043 35.223C51.312 31.566 47.742 29 43.5 29C37.701 29 33 33.701 33 39.5C33 40.058 33.043 40.605 33.125 41.141C29.785 42.16 27.5 45.305 27.5 49C27.5 53.418 31.082 57 35.5 57H63.5C67.918 57 71.5 53.418 71.5 49C71.5 45.699 69.488 42.863 66.625 41.691C66.199 42.973 65.66 44.012 65 45Z" 
      stroke="#60A5FA" 
      strokeWidth="2.5" 
      strokeLinecap="round" 
      strokeLinejoin="round"
      fill="none"
    />
    
    {/* 위 화살표 */}
    <path 
      d="M50 52V42M50 42L46 46M50 42L54 46" 
      stroke="#60A5FA" 
      strokeWidth="2.5" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    />
  </svg>
    </div>
  </div>
  <p className="upload-text">파일을 업로드 또는 드래그 앤 드롭 하세요.</p>
  <p className="upload-info">hwp, doc, docx, ppt, pptx, xlsx, pdf 지원 (5MB이하)</p>
</div>

          {/* 입력 영역 */}
          <div className="input-section">
            <input
              type="text"
              className="prompt-input"
              placeholder="교육자료를 업로드하거나, 요구사항을 입력하여 빠르게 수업자료를 만들어보세요!"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSubmit()}
            />
            <button className="submit-btn" onClick={handleSubmit}>
              ➤
            </button>
          </div>

          {/* 예제 프롬프트 */}
<div className="examples-section">
  <h3 className="examples-title">예제 프롬프트</h3>
  <div className="examples-grid">
    {examples.map((example, index) => (
      <div
        key={index}
        className="example-card"
        style={{ backgroundColor: example.color }}
        onClick={() => setPrompt(example.text)}
      >
        <span className="example-icon">{example.icon}</span>
        <p className="example-text">{example.text}</p>
      </div>
    ))}
  </div>
</div>
        </div>
      </main>
    </div>
  );
}

export default LearningMaterial;