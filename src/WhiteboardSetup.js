import { useState } from 'react';
import './WorkbookSetup.css';
import Header from './Header';

function WorkbookSetup({ onBack, onCreate, onNavigate, currentPage }) {
  const [formData, setFormData] = useState({
    title: '',
    subject: '',
    grade: '',
    problemType: '',
    problemCount: '',
    tags: []
  });
  const [activeTab, setActiveTab] = useState('ai');

  const subjects = [
    { id: 'math', label: '수학', icon: '🔢' },
    { id: 'korean', label: '국어', icon: '📖' },
    { id: 'english', label: '영어', icon: '🇺🇸' },
    { id: 'science', label: '과학', icon: '🔬' },
    { id: 'social', label: '사회', icon: '🌍' }
  ];

  const grades = [
    '초등 1학년', '초등 2학년', '초등 3학년', '초등 4학년', '초등 5학년', '초등 6학년',
    '중등 1학년', '중등 2학년', '중등 3학년',
    '고등 1학년', '고등 2학년', '고등 3학년'
  ];

  const problemTypes = [
    { id: 'multiple', label: '객관식' },
    { id: 'short', label: '단답형' },
    { id: 'essay', label: '서술형' },
    { id: 'truefalse', label: 'O/X' },
    { id: 'matching', label: '연결형' }
  ];

  const problemCounts = [5, 10, 15, 20, 25, 30];

  const handleCreate = () => {
    if (!formData.title.trim()) {
      alert('제목을 입력해주세요.');
      return;
    }
    
    const projectData = {
      ...formData,
      createdAt: new Date().toISOString()
    };
    
    onCreate(projectData);
  };

  return (
    <div className="workbook-setup">
      <Header 
        onNavigate={onNavigate}
        currentPage={currentPage}
        userName="사만월"
        centerContent={
          <div className="ws-header-center">
            <button className="ws-back-btn" onClick={onBack}>
              ‹
            </button>
            <h1 className="ws-title">문제 만들기</h1>
          </div>
        }
      />

      <main className="ws-main">
        <div className="ws-container">
          {/* 탭 메뉴 */}
          <div className="ws-tabs">
            <button 
              className={`ws-tab ${activeTab === 'ai' ? 'active' : ''}`}
              onClick={() => setActiveTab('ai')}
            >
              <span className="ws-tab-icon">✨</span>
              <span>AI로 만들기</span>
            </button>
            <button 
              className={`ws-tab ${activeTab === 'data' ? 'active' : ''}`}
              onClick={() => setActiveTab('data')}
            >
              <span className="ws-tab-icon">📋</span>
              <span>직접 입력하기</span>
            </button>
            <button 
              className={`ws-tab ${activeTab === 'project' ? 'active' : ''}`}
              onClick={() => setActiveTab('project')}
            >
              <span className="ws-tab-icon">📁</span>
              <span>프로젝트에서 가져오기</span>
            </button>
          </div>

          {/* 기본 정보 입력 */}
          <div className="ws-form">
            <div className="ws-form-group">
              <label className="ws-label">제목</label>
              <input
                type="text"
                className="ws-input"
                placeholder="예: 소수와 배수 문제"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              />
            </div>

            <div className="ws-form-row">
              <div className="ws-form-group">
                <label className="ws-label">과목</label>
                <select
                  className="ws-select"
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                >
                  <option value="">과목 선택</option>
                  {subjects.map(subject => (
                    <option key={subject.id} value={subject.label}>
                      {subject.icon} {subject.label}
                    </option>
                  ))}
                </select>
              </div>

              <div className="ws-form-group">
                <label className="ws-label">학년</label>
                <select
                  className="ws-select"
                  value={formData.grade}
                  onChange={(e) => setFormData({ ...formData, grade: e.target.value })}
                >
                  <option value="">학년 선택</option>
                  {grades.map(grade => (
                    <option key={grade} value={grade}>
                      {grade}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="ws-form-row">
              <div className="ws-form-group">
                <label className="ws-label">문제 유형</label>
                <select
                  className="ws-select"
                  value={formData.problemType}
                  onChange={(e) => setFormData({ ...formData, problemType: e.target.value })}
                >
                  <option value="">유형 선택</option>
                  {problemTypes.map(type => (
                    <option key={type.id} value={type.label}>
                      {type.label}
                    </option>
                  ))}
                </select>
              </div>

              <div className="ws-form-group">
                <label className="ws-label">문항 수</label>
                <select
                  className="ws-select"
                  value={formData.problemCount}
                  onChange={(e) => setFormData({ ...formData, problemCount: e.target.value })}
                >
                  <option value="">문항 수 선택</option>
                  {problemCounts.map(count => (
                    <option key={count} value={count}>
                      {count}문항
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* AI 탭 컨텐츠 */}
            {activeTab === 'ai' && (
              <div className="ws-tab-content">
                <div className="ws-form-group">
                  <label className="ws-label">문제 설명</label>
                  <textarea
                    className="ws-textarea"
                    placeholder="어떤 문제를 만들고 싶으신가요?&#10;예: 소수와 배수를 구분하는 객관식 문제 10개를 만들어주세요."
                    rows={6}
                  />
                </div>
              </div>
            )}

            {/* 직접 입력 탭 컨텐츠 */}
            {activeTab === 'data' && (
              <div className="ws-tab-content">
                <div className="ws-info-box">
                  <p>💡 직접 문제를 입력하거나 파일을 업로드할 수 있습니다.</p>
                </div>
                <div className="ws-form-group">
                  <label className="ws-label">문제 입력</label>
                  <textarea
                    className="ws-textarea"
                    placeholder="문제를 입력해주세요..."
                    rows={10}
                  />
                </div>
              </div>
            )}

            {/* 프로젝트 탭 컨텐츠 */}
            {activeTab === 'project' && (
              <div className="ws-tab-content">
                <div className="ws-info-box">
                  <p>📁 기존 프로젝트에서 문제를 가져올 수 있습니다.</p>
                </div>
                <div className="ws-project-list">
                  <p className="ws-empty-text">저장된 프로젝트가 없습니다.</p>
                </div>
              </div>
            )}
          </div>

          {/* 하단 버튼 */}
          <div className="ws-actions">
            <button className="ws-btn ws-btn-secondary" onClick={onBack}>
              취소
            </button>
            <button className="ws-btn ws-btn-primary" onClick={handleCreate}>
              문제 만들기
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}

export default WorkbookSetup;