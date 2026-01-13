import { useState } from 'react';
import './PlanningForm.css';
import Header from './Header';

function PlanningForm({ onHome, onBack, onNext, initialPrompt, onNavigate, currentPage }) {
  const [formData, setFormData] = useState({
    title: '빛으로 만드는 식물의 에너지',
    objectives: '식물의 광합성 과정과 그 중요성을 이해하고, 일상생활에서 광합성이 자연에 미치는 영향을 생각할 수 있다.',
    learningElements: ['광합성 정의', '광합성 과정', '광합성 재료', '산소와 탄소의 역할', '광합성의 중요성'],
    language: '한국어',
    difficulty: '표준 분량',
    structure: ['학습목표', '개념학습', '탐구과정', '정리하기']
  });

  const [draggedIndex, setDraggedIndex] = useState(null);

  const difficulties = [
    { id: 'easy', label: '핵심 요약', desc: '약 20분 수업, 탭 3개 내외, 핵심 내용 중심의 구성입니다.' },
    { id: 'medium', label: '표준 분량', desc: '약 40분 수업, 탭 6개 내외, 균형 잡힌 표준 구성입니다.' },
    { id: 'hard', label: '상세 전체', desc: '약 60분 수업, 모든 탭 포함, 가장 상세하고 깊이 있는 구성입니다.' }
  ];

  const structures = [
    { id: 'objective', label: '학습목표', icon: '🎯' },
    { id: 'concept', label: '개념학습', icon: '📚' },
    { id: 'inquiry', label: '탐구과정', icon: '🔍' },
    { id: 'experiment', label: '실험하기', icon: '🧪' },
    { id: 'discussion', label: '용어사전', icon: '💬' },
    { id: 'assessment', label: '점검하기', icon: '✅' },
    { id: 'summary', label: '정리하기', icon: '📝' }
  ];

  const removeLearningElement = (index) => {
    setFormData({
      ...formData,
      learningElements: formData.learningElements.filter((_, i) => i !== index)
    });
  };


const updateElement = (index, newValue) => {
  const updatedElements = [...formData.learningElements];
  updatedElements[index] = newValue;
  setFormData({
    ...formData,
    learningElements: updatedElements
  });
};


const handleDragStart = (e, index) => {
  setDraggedIndex(index);
  e.dataTransfer.effectAllowed = 'move';
  e.currentTarget.style.opacity = '0.5';
};

const handleDragOver = (e, index) => {
  e.preventDefault();
  e.dataTransfer.dropEffect = 'move';
  
  if (draggedIndex === null || draggedIndex === index) return;
  
  // 시각적 피드백
  const items = document.querySelectorAll('.element-row-new');
  items.forEach(item => item.classList.remove('drag-over'));
  e.currentTarget.classList.add('drag-over');
};

const handleDrop = (e, dropIndex) => {
  e.preventDefault();
  
  if (draggedIndex === null || draggedIndex === dropIndex) return;
  
  const updatedElements = [...formData.learningElements];
  const [draggedItem] = updatedElements.splice(draggedIndex, 1);
  updatedElements.splice(dropIndex, 0, draggedItem);
  
  setFormData({
    ...formData,
    learningElements: updatedElements
  });
  
  // 스타일 초기화
  const items = document.querySelectorAll('.element-row-new');
  items.forEach(item => item.classList.remove('drag-over'));
};

const handleDragEnd = (e) => {
  e.currentTarget.style.opacity = '1';
  setDraggedIndex(null);
  
  // 모든 drag-over 클래스 제거
  const items = document.querySelectorAll('.element-row-new');
  items.forEach(item => item.classList.remove('drag-over'));
};


  const toggleStructure = (structureId) => {
    const label = structures.find(s => s.id === structureId)?.label;
    if (formData.structure.includes(label)) {
      setFormData({
        ...formData,
        structure: formData.structure.filter(s => s !== label)
      });
    } else {
      setFormData({
        ...formData,
        structure: [...formData.structure, label]
      });
    }
  };

  const isStructureSelected = (structureId) => {
    const label = structures.find(s => s.id === structureId)?.label;
    return formData.structure.includes(label);
  };

  return (
    <div className="planning-form">
      {/* 헤더 */}
      <Header 
        onNavigate={onNavigate}
        currentPage={currentPage}
        userName="사만원"
        centerContent={
          <div className="pf-header-center">
            <button className="pf-back-btn" onClick={onBack}>
              ‹
            </button>
            <h1 className="pf-page-title">빛으로 만드는 식물의 에너지</h1>
          </div>
        }
      />

      {/* 메인 컨텐츠 */}
      <main className="pf-main">
        <div className="pf-intro">
          <div className="user-message-container">
    <div className="user-message">
      식물의 광합성에 대한 교육자료를 만들어 주세요.
    </div>
  </div>
          <p className="pf-guide">업로드 하신 문서나 요청 사항을 반영하여 교육 자료를 생성합니다.</p>
          <div className="pf-steps">
            <div className="step-item">
              <span className="step-icon">🔍</span>
              <span className="step-text">검색: 교육 자료를 만들기 위해 관련 내용을 조사하고 있습니다.</span>
            </div>
            <div className="step-item">
              <span className="step-icon">📊</span>
              <span className="step-text">분석: 학습 자료 제작에 앞서 제작 계획서를 준비하고 있습니다.</span>
            </div>
          </div>
          <p className="pf-notice">학습 자료 제작을 위한 계획서를 작성했습니다.</p>
          <p className="pf-action">아래 계획을 검토하고, 학습 분량과 구성 요소를 조정한 후 "학습 자료 생성"을 클릭하세요.</p>
        </div>

        {/* 폼 섹션 */}
        <div className="pf-form">
          {/* 제작 계획서 */}
          <div className="form-section">
            <div className="section-header">
              <h2 className="section-title">제작 계획서</h2>
              <span className="badge">대기중</span>
            </div>
            <p className="section-desc">AI가 분석한 교육자료 기반의 제작 계획서입니다.</p>

            {/* 1. 학습 제목 */}
            <div className="form-group">
              <label className="form-label">1. 학습 제목</label>
              <input
                type="text"
                className="form-input"
                value={formData.title}
                onChange={(e) => setFormData({...formData, title: e.target.value})}
              />
            </div>

            {/* 2. 학습 목표 */}
            <div className="form-group">
              <label className="form-label">2. 학습 목표</label>
              <textarea
                className="form-textarea"
                value={formData.objectives}
                onChange={(e) => setFormData({...formData, objectives: e.target.value})}
                rows="3"
              />
            </div>

            {/* 3. 학습목차 */}
<div className="form-group">
  <label className="form-label">3. 학습 목차</label>
  <div className="elements-vertical-list">
    {formData.learningElements.map((element, index) => (
      <div 
        key={index} 
        className="element-row-new"
        draggable
        onDragStart={(e) => handleDragStart(e, index)}
        onDragOver={(e) => handleDragOver(e, index)}
        onDragEnd={handleDragEnd}
        onDrop={(e) => handleDrop(e, index)}
      >
        <button 
          className="drag-handle"
          onMouseDown={(e) => e.preventDefault()}
        >
        
        </button>
        <input
          type="text"
          className="element-text-input-new"
          value={element}
          onChange={(e) => updateElement(index, e.target.value)}
          placeholder="내용을 입력해주세요."
        />
        <button 
          className="remove-btn-circle"
          onClick={() => removeLearningElement(index)}
        >
          −
        </button>
      </div>
    ))}
  </div>
  <button className="add-element-dashed" onClick={() => {
    setFormData({
      ...formData,
      learningElements: [...formData.learningElements, '']
    });
  }}>
    + 학습 목차 추가하기
  </button>
</div>

            {/* 4. 제작 언어 및 과목 */}
            <div className="form-group">
              <label className="form-label">4. 제작 언어 및 과목</label>
              <div className="language-grid">
                <button className="lang-btn active">🇰🇷 한국어</button>
                <button className="lang-btn">🇺🇸 English</button>
                <button className="lang-btn">🇧🇷 Português</button>
                <button className="lang-btn">🇯🇵 日本語</button>
              </div>
              <select className="form-select">
                <option>과학</option>
              </select>
            </div>

            {/* 5. 학습 분량 */}
            <div className="form-group">
              <label className="form-label">5. 학습 분량</label>
              <div className="difficulty-grid">
                {difficulties.map((diff) => (
                  <div
                    key={diff.id}
                    className={`difficulty-card ${diff.id === 'medium' ? 'active' : ''}`}
                    onClick={() => setFormData({...formData, difficulty: diff.label})}
                  >
                    <h4>{diff.label}</h4>
                    <p>{diff.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* 6. 학습 구성 */}
            <div className="form-group">
              <label className="form-label">6. 학습 구성</label>
              <div className="structure-grid">
                {structures.map((structure) => (
                  <button
                    key={structure.id}
                    className={`structure-btn ${isStructureSelected(structure.id) ? 'active' : ''}`}
                    onClick={() => toggleStructure(structure.id)}
                  >
                    <span className="structure-icon">{structure.icon}</span>
                    <span>{structure.label}</span>
                    {isStructureSelected(structure.id) && <span className="check">✓</span>}
                  </button>
                ))}
              </div>
            </div>

            {/* 7. 학습 대상 */}
            <div className="form-group">
              <label className="form-label">7. 학습 대상</label>
              <select className="form-select">
                <option>초등 고학년 (10-12세)</option>
              </select>
            </div>
          </div>

          {/* 생성 버튼 */}
          <button className="generate-btn" onClick={onNext}>
            ✨ 학습 자료 만들기
          </button>
        </div>
      </main>
    </div>
  );
}

export default PlanningForm;