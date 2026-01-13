import { useState, useRef, useEffect } from 'react';
import './WorkbookSetupText.css';
import Header from './Header';

function WorkbookSetupText({ onBack, onCreate, onNavigate, currentPage, initialData }) {
  const [formData, setFormData] = useState({
    title: '',
    ageGroup: '',
    subject: '',
    questionTypes: [],
    questionCount: 20
  });
  const [activeTab, setActiveTab] = useState('project');
  const [selectedTopics, setSelectedTopics] = useState([]);
  const [selectedProject, setSelectedProject] = useState(null);

  // initialData가 있으면 formData 설정
  useEffect(() => {
    if (initialData) {
      setFormData({
        title: initialData.title || '',
        ageGroup: initialData.ageGroup || '',
        subject: initialData.subject || '',
        questionTypes: initialData.questionTypes || [],
        questionCount: initialData.questionCount || 20
      });
      setActiveTab('project');
      // selectedProject가 있으면 설정
      if (initialData.selectedProject) {
        setSelectedProject(initialData.selectedProject);
      } else {
        setSelectedProject(null);
      }
    }
  }, [initialData]);

  const questionTypes = [
    { id: 'choice', label: '선택형', icon: '☰' },
    { id: 'multiple', label: '다중선택형', icon: '☰' },
    { id: 'short', label: '단답형', icon: '―' },
    { id: 'multi-short', label: '다중단답형', icon: '☰' },
    { id: 'essay', label: '서술형', icon: '✎' },
    { id: 'match', label: '연결형', icon: '⋮⋯' },
    { id: 'ox', label: 'OX선택형', icon: '⭕❌' },
    { id: 'order', label: '순서형', icon: '⋮➤' },
  ];

  const ageGroups = [
    { id: 'elem-lower', label: '초등 저학년', age: '7-9세' },
    { id: 'elem-upper', label: '초등 고학년', age: '10-12세' },
    { id: 'middle', label: '중학생', age: '13-15세' },
    { id: 'high', label: '고등학생', age: '16-18세' }
  ];

  const subjects = [
    { id: 'science', label: '과학' },
    { id: 'social', label: '사회' },
    { id: 'history', label: '역사' },
    { id: 'vocabulary', label: '어휘' },
    { id: 'etc', label: '기타' }
  ];

  const aiTopics = [
    { id: 'topic1', label: '1단원: 빛과 파동', category: '과학' },
    { id: 'topic2', label: '2단원: 물질의 구조', category: '과학' },
    { id: 'topic3', label: '3단원: 화학 반응', category: '과학' },
    { id: 'topic4', label: '4단원: 에너지 전환', category: '과학' },
    { id: 'topic5', label: '1단원: 한국의 지리', category: '사회' },
    { id: 'topic6', label: '2단원: 세계의 지리', category: '사회' },
    { id: 'topic7', label: '3단원: 경제와 사회', category: '사회' },
    { id: 'topic8', label: '1단원: 고대 문명', category: '역사' },
    { id: 'topic9', label: '2단원: 중세 시대', category: '역사' },
    { id: 'topic10', label: '3단원: 근대 역사', category: '역사' },
  ];

  const projects = [
    { 
      id: 1, 
      title: '빛으로 만드는 식물의 에너지', 
      serviceType: '학습자료',
      ageGroup: '초등 고학년',
      subject: '과학',
      questionTypes: ['choice', 'multiple', 'short', 'match', 'ox', 'order'],
      questionCount: 20
    },
    { 
      id: 4, 
      title: '플라시보와 노시보', 
      serviceType: '지문',
      ageGroup: '초등 고학년',
      subject: '어휘',
      questionTypes: ['choice', 'short', 'match', 'ox'],
      questionCount: 10
    },
    { 
      id: 6, 
      title: '초등 영어 필수 어휘', 
      serviceType: '단어장',
      ageGroup: '초등 저학년',
      subject: '어휘',
      questionTypes: ['choice', 'short', 'match', 'ox'],
      questionCount: 10
    },
  ];

  const handleTypeToggle = (typeId) => {
    setFormData(prev => ({
      ...prev,
      questionTypes: prev.questionTypes.includes(typeId)
        ? prev.questionTypes.filter(id => id !== typeId)
        : [...prev.questionTypes, typeId]
    }));
  };

  const handleTopicToggle = (topicId) => {
    setSelectedTopics(prev =>
      prev.includes(topicId)
        ? prev.filter(id => id !== topicId)
        : [...prev, topicId]
    );
  };

  const handleProjectSelect = (projectId) => {
    const project = projects.find(p => p.id === projectId);
    if (selectedProject === projectId) {
      setSelectedProject(null);
      setFormData({
        title: '',
        ageGroup: '',
        subject: '',
        questionTypes: [],
        questionCount: 20
      });
    } else {
      setSelectedProject(projectId);
      setFormData({
        title: project.title,
        ageGroup: project.ageGroup,
        subject: project.subject,
        questionTypes: project.questionTypes,
        questionCount: project.questionCount
      });
    }
  };

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      alert(`파일 업로드: ${file.name}`);
    }
  };

  const handleCreate = () => {
    if (!formData.title.trim()) {
      alert('문제집 제목을 입력해주세요.');
      return;
    }
    if (!formData.ageGroup) {
      alert('학습 대상을 선택해주세요.');
      return;
    }
    if (!formData.subject) {
      alert('과목을 선택해주세요.');
      return;
    }
    if (formData.questionTypes.length === 0) {
      alert('최소 1개 이상의 문제 유형을 선택해주세요.');
      return;
    }
    if (!formData.questionCount || formData.questionCount < 1) {
      alert('문항 수를 입력해주세요.');
      return;
    }
    
    onNavigate('workbook-result');
  };

  return (
    <div className="workbook-setup-text-page">
      <Header 
        onNavigate={onNavigate}
        currentPage={currentPage}
        userName="사만원"
      />
      
      <div className="wst-main">
        <div className="wst-content">
          <div className="wst-form">
            {/* 문제집 제목 */}
            <div className="wst-form-group">
              <label className="wst-label">
                문제집 제목 <span className="required">*</span>
              </label>
              <input
                type="text"
                className="wst-input"
                placeholder="제목을 입력해주세요."
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              />
            </div>

            {/* 학습 대상 */}
            <div className="wst-form-group">
              <label className="wst-label">학습 대상 <span className="required">*</span></label>
              <div className="wst-audience-grid">
                {ageGroups.map(group => (
                  <button
                    key={group.id}
                    className={`wst-audience-btn ${formData.ageGroup === group.label ? 'active' : ''}`}
                    onClick={() => setFormData({ ...formData, ageGroup: group.label })}
                  >
                    <div className="wst-audience-label">{group.label}</div>
                    <div className="wst-audience-age">{group.age}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* 과목 */}
            <div className="wst-form-group">
              <label className="wst-label">과목 <span className="required">*</span></label>
              <div className="wst-subject-grid">
                {subjects.map(subject => (
                  <button
                    key={subject.id}
                    className={`wst-subject-btn ${formData.subject === subject.label ? 'active' : ''}`}
                    onClick={() => setFormData({ ...formData, subject: subject.label })}
                  >
                    {subject.label}
                  </button>
                ))}
              </div>
            </div>

            {/* 문제 유형 */}
            <div className="wst-form-group">
              <label className="wst-label">문제 유형 <span className="required">*</span></label>
              <div className="wst-type-grid">
                {questionTypes.map(type => (
                  <button
                    key={type.id}
                    className={`wst-type-btn ${formData.questionTypes.includes(type.id) ? 'active' : ''}`}
                    onClick={() => handleTypeToggle(type.id)}
                  >
                    <span className="wst-type-icon">{type.icon}</span>
                    <span className="wst-type-label">{type.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* 문항 수 */}
            <div className="wst-form-group">
              <label className="wst-label">문항 수</label>
              <div className="wst-number-input-wrapper">
                <input
                  type="number"
                  className="wst-number-input"
                  min="1"
                  value={formData.questionCount}
                  onChange={(e) => setFormData({ ...formData, questionCount: parseInt(e.target.value) || 1 })}
                />
                <span className="wst-unit">개</span>
              </div>
            </div>

            {/* 탭 */}
            <div className="wst-tabs">
              <button 
                className={`wst-tab-btn ${activeTab === 'project' ? 'active' : ''}`}
                onClick={() => setActiveTab('project')}
              >
                내 프로젝트로 만들기
              </button>
              <button 
                className={`wst-tab-btn ${activeTab === 'data' ? 'active' : ''}`}
                onClick={() => setActiveTab('data')}
              >
                내 데이터로 만들기
              </button>
              <button 
                className={`wst-tab-btn ${activeTab === 'ai' ? 'active' : ''}`}
                onClick={() => setActiveTab('ai')}
              >
                AI로 만들기
              </button>
            </div>

            {/* 탭 컨텐츠 */}
            <div className="wst-tab-content">
              {activeTab === 'project' && (
                <div className="wst-project-section">
                  <div className="wst-project-list-container">
                    {projects.map(project => (
                      <div 
                        key={project.id}
                        className={`wst-project-item ${selectedProject === project.id ? 'selected' : ''}`}
                        onClick={() => handleProjectSelect(project.id)}
                      >
                        <div className="wst-project-radio">
                          <input 
                            type="radio" 
                            checked={selectedProject === project.id}
                            onChange={() => {}}
                          />
                        </div>
                        <div className="wst-project-content">
                          <div className="wst-project-title">{project.title}</div>
                          <div className="wst-project-meta">
                            <span className="wst-project-type-badge" style={{ 
                              background: project.serviceType === '학습자료' ? '#6366f1' : 
                                         project.serviceType === '지문' ? '#f59e0b' : '#8b5cf6'
                            }}>
                              {project.serviceType}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === 'data' && (
                <div className="wst-upload-section">
                  <div className="wst-upload-area">
                    <div className="upload-icon-container">
                      <div className="cloud-upload-icon">
                        <svg width="100" height="100" viewBox="0 0 100 100" fill="none">
                          <circle cx="50" cy="50" r="45" fill="#EEF2FF"/>
                          <path 
                            d="M65 45C65 45 65 45 65 45C65 39.477 60.523 35 55 35C54.328 35 53.672 35.078 53.043 35.223C51.312 31.566 47.742 29 43.5 29C37.701 29 33 33.701 33 39.5C33 40.058 33.043 40.605 33.125 41.141C29.785 42.16 27.5 45.305 27.5 49C27.5 53.418 31.082 57 35.5 57H63.5C67.918 57 71.5 53.418 71.5 49C71.5 45.699 69.488 42.863 66.625 41.691C66.199 42.973 65.66 44.012 65 45Z" 
                            stroke="#60A5FA" 
                            strokeWidth="2.5" 
                            strokeLinecap="round" 
                            strokeLinejoin="round"
                            fill="none"
                          />
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
                </div>
              )}

              {activeTab === 'ai' && (
                <div className="wst-ai-section">
                  <p className="wst-ai-desc">AI가 자동으로 문제를 생성할 주제를 선택하세요.</p>
                  <div className="wst-topic-grid">
                    {aiTopics.map(topic => (
                      <div
                        key={topic.id}
                        className={`wst-topic-card ${selectedTopics.includes(topic.id) ? 'selected' : ''}`}
                        onClick={() => handleTopicToggle(topic.id)}
                      >
                        <div className="wst-topic-check">
                          {selectedTopics.includes(topic.id) && '✓'}
                        </div>
                        <div className="wst-topic-label">{topic.label}</div>
                        <div className="wst-topic-category">{topic.category}</div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* 버튼 영역 */}
            <div className="wst-footer">
              <button className="wst-btn-cancel" onClick={() => onNavigate('home')}>
                취소
              </button>
              <button className="wst-btn-create" onClick={handleCreate}>
                문제집 만들기
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default WorkbookSetupText;