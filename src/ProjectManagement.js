import { useState, useRef, useEffect } from 'react';
import './ProjectManagement.css';
import ProfileDropdown from './ProfileDropdown';
import Header from './Header';

function ProjectManagement({ onBack, onProjectClick, onLogout, onSettings, onNavigate }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('최근 수정일순');
  const [openDropdownId, setOpenDropdownId] = useState(null);
  const [selectedServiceType, setSelectedServiceType] = useState('전체');
  const [showServiceDropdown, setShowServiceDropdown] = useState(false);
  const [showSortDropdown, setShowSortDropdown] = useState(false);
  const [isManageMode, setIsManageMode] = useState(false);
  const [selectedProjects, setSelectedProjects] = useState([]);
  const dropdownRef = useRef(null);
  const serviceDropdownRef = useRef(null);
  const sortDropdownRef = useRef(null);

  const serviceTypes = [
    { id: 'all', label: '전체', color: '#6b7280' },
    { id: 'learning', label: '학습자료', color: '#6366f1' },
    { id: 'text', label: '지문', color: '#f59e0b' },
    { id: 'vocabulary', label: '단어장', color: '#8b5cf6' },
    { id: 'problem', label: '문제', color: '#ec4899' },
    { id: 'grading', label: '채점', color: '#10b981' },
    { id: 'whiteboard', label: '화이트 보드', color: '#06b6d4' }
  ];

  const projects = [
    { 
      id: 1, 
      title: '빛으로 만드는 식물의 에너지', 
      date: '2025-12-10', 
      modifiedDate: '2025-12-15',
      status: '완료',
      statusColor: '#10b981',
      serviceType: '학습자료',
      serviceColor: '#6366f1'
    },
    { 
      id: 3, 
      title: '빛으로 만드는 식물의 에너지', 
      date: '2025-12-10', 
      modifiedDate: '2025-12-19',
      status: '완료',
      statusColor: '#10b981',
      serviceType: '문제',
      serviceColor: '#ec4899'
    },
    { 
      id: 4, 
      title: '플라시보와 노시보', 
      date: '2025-12-08', 
      modifiedDate: '2025-12-17',
      status: '완료',
      statusColor: '#10b981',
      serviceType: '지문',
      serviceColor: '#f59e0b'
    },
    { 
      id: 5, 
      title: '중간고사 수학 문제 채점', 
      date: '2025-12-05', 
      modifiedDate: '2025-12-20',
      status: '완료',
      statusColor: '#10b981',
      serviceType: '채점',
      serviceColor: '#10b981'
    },
    { 
      id: 6, 
      title: '초등 영어 필수 어휘', 
      date: '2025-12-03', 
      modifiedDate: '2025-12-18',
      status: '완료',
      statusColor: '#10b981',
      serviceType: '단어장',
      serviceColor: '#8b5cf6'
    },
    { 
      id: 7, 
      title: '피타고라스의 정리', 
      date: '2025-11-28', 
      modifiedDate: '2025-12-10',
      status: '완료',
      statusColor: '#10b981',
      serviceType: '화이트 보드',
      serviceColor: '#06b6d4'
    }
  ];

  const sortOptions = [
    { id: 'modified', label: '최근 수정일순' },
    { id: 'created', label: '생성일순' },
    { id: 'name', label: '이름순' }
  ];

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpenDropdownId(null);
      }
      if (serviceDropdownRef.current && !serviceDropdownRef.current.contains(event.target)) {
        setShowServiceDropdown(false);
      }
      if (sortDropdownRef.current && !sortDropdownRef.current.contains(event.target)) {
        setShowSortDropdown(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const toggleProjectSelection = (projectId) => {
    setSelectedProjects(prev =>
      prev.includes(projectId)
        ? prev.filter(id => id !== projectId)
        : [...prev, projectId]
    );
  };

  const toggleManageMode = () => {
    setIsManageMode(!isManageMode);
    setSelectedProjects([]);
  };

  const toggleSelectAll = () => {
    if (selectedProjects.length === filteredProjects.length) {
      setSelectedProjects([]);
    } else {
      setSelectedProjects(filteredProjects.map(p => p.id));
    }
  };

  const deleteSelectedProjects = () => {
    if (selectedProjects.length === 0) {
      alert('삭제할 프로젝트를 선택해주세요.');
      return;
    }
    if (window.confirm(`${selectedProjects.length}개의 프로젝트를 삭제하시겠습니까?`)) {
      alert('삭제되었습니다.');
      setSelectedProjects([]);
      setIsManageMode(false);
    }
  };

  const handleDropdownToggle = (e, projectId) => {
    e.stopPropagation();
    setOpenDropdownId(openDropdownId === projectId ? null : projectId);
  };

  const handleMenuAction = (e, action, project) => {
    e.stopPropagation();
    setOpenDropdownId(null);
    
    if (action === 'duplicate') {
      alert(`"${project.title}" 프로젝트를 복제합니다.`);
    } else if (action === 'delete') {
      if (window.confirm(`"${project.title}" 프로젝트를 삭제하시겠습니까?`)) {
        alert('삭제되었습니다.');
      }
    }
  };

  // 문제 만들기 버튼 클릭 핸들러
  const handleCreateWorkbook = (e, project) => {
    e.stopPropagation();
    
    let workbookData = {};
    
    // 프로젝트별 데이터 설정
    if (project.id === 1 && project.serviceType === '학습자료') {
      // 빛으로 만드는 식물의 에너지 (학습자료)
      workbookData = {
        title: '빛으로 만드는 식물의 에너지',
        ageGroup: '초등 고학년',
        subject: '과학',
        questionTypes: ['choice', 'multiple', 'short', 'match', 'ox', 'order'],
        questionCount: 20,
        selectedProject: 1
      };
      onNavigate('workbook-setup-learning', workbookData);
    } else if (project.id === 4 && project.serviceType === '지문') {
      // 플라시보와 노시보 (지문) -> workbooksetuptext로 이동
      workbookData = {
        title: '플라시보와 노시보',
        ageGroup: '초등 고학년',
        subject: '어휘',
        questionTypes: ['choice', 'short', 'match', 'ox'],
        questionCount: 10,
        selectedProject: 4
      };
      onNavigate('workbooksetuptext', workbookData);
    } else if (project.id === 6 && project.serviceType === '단어장') {
      // 초등 영어 필수 어휘 (단어장)
      workbookData = {
        title: '초등 영어 필수 어휘',
        ageGroup: '초등 저학년',
        subject: '어휘',
        questionTypes: ['choice', 'short', 'match', 'ox'],
        questionCount: 10,
        selectedProject: 6
      };
      onNavigate('workbooksetupvocabulary', workbookData);
    }
  };

  const filteredProjects = projects.filter(project => {
    const matchesSearch = project.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesService = selectedServiceType === '전체' || project.serviceType === selectedServiceType;
    return matchesSearch && matchesService;
  });

  const sortedProjects = [...filteredProjects].sort((a, b) => {
    if (sortBy === '최근 수정일순') {
      return new Date(b.modifiedDate) - new Date(a.modifiedDate);
    } else if (sortBy === '생성일순') {
      return new Date(b.date) - new Date(a.date);
    } else {
      return a.title.localeCompare(b.title);
    }
  });

  // 서비스 타입별 버튼 렌더링
  const renderActionButtons = (project) => {
    const { serviceType } = project;
    
    return (
      <div className="project-actions">
        {/* 공유 버튼 - 화이트보드 제외 모든 타입에 표시 */}
        {serviceType !== '화이트 보드' && (
          <button 
            className="action-icon-btn"
            onClick={(e) => {
              e.stopPropagation();
              alert('공유 기능');
            }}
            title="공유"
          >
            ✈️
          </button>
        )}
        
        {/* 판서 버튼 - 문제, 화이트보드, 채점 제외 */}
        {serviceType !== '화이트 보드' && serviceType !== '채점' && (
          <button 
            className="action-icon-btn"
            onClick={(e) => {
              e.stopPropagation();
              if (project.id === 7) {
                onNavigate('whiteboard-sample', project);
              } else if (project.id === 1 || project.id === 8) {
                onNavigate('learning-result-whiteboard');
              } else if (project.id === 4) {
                onNavigate('text-result-whiteboard');
              } else {
                alert('화이트 보드 기능');
              }
            }}
            title="판서"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="2" y="3" width="20" height="14" rx="2" />
              <line x1="8" y1="21" x2="16" y2="21" />
              <line x1="12" y1="17" x2="12" y2="21" />
            </svg>
          </button>
        )}

        {/* 문제 버튼 - 학습자료, 지문, 단어장에만 표시 */}
        {(serviceType === '학습자료' || serviceType === '지문' || serviceType === '단어장') && (
          <button 
            className="action-icon-btn"
            onClick={(e) => handleCreateWorkbook(e, project)}
            title="문제"
          >
            ✏️
          </button>
        )}

        {/* 더보기 버튼 - 관리 모드가 아닐 때만 표시 */}
        {!isManageMode && (
          <div className="dropdown-wrapper" ref={openDropdownId === project.id ? dropdownRef : null}>
            <button 
              className="action-icon-btn"
              onClick={(e) => handleDropdownToggle(e, project.id)}
              title="더보기"
            >
              ⋯
            </button>
            {openDropdownId === project.id && (
              <div className="action-dropdown">
                <button 
                  className="action-dropdown-item"
                  onClick={(e) => handleMenuAction(e, 'duplicate', project)}
                >
                  <span className="dropdown-icon">📑</span>
                  <span>복제하기</span>
                </button>
                <button 
                  className="action-dropdown-item"
                  onClick={(e) => handleMenuAction(e, 'delete', project)}
                >
                  <span className="dropdown-icon">🗑️</span>
                  <span>삭제하기</span>
                </button>
                <button 
                  className="action-dropdown-item"
                  onClick={(e) => handleMenuAction(e, 'delete', project)}
                >
                  <span className="dropdown-icon">⚙️</span>
                  <span>설정하기</span>
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="project-management-page">
      <Header 
        onNavigate={onNavigate}
        currentPage="projects"
        userName="사만원"
      />
      
      <div className="pm-container">
        {/* 타이틀 및 관리 버튼 */}
        <div className="pm-count-section">
          <div className="count-left">
            <span className="pm-count">{sortedProjects.length}개의 프로젝트가 있습니다.</span>
            {isManageMode ? (
              <>
                <button className="manage-btn active" onClick={toggleManageMode}>
                  취소
                </button>
                <button className="select-all-btn" onClick={toggleSelectAll}>
                  {selectedProjects.length === filteredProjects.length && filteredProjects.length > 0 ? '전체 해제' : '전체 선택'}
                </button>
                {selectedProjects.length > 0 && (
                  <button className="delete-selected-btn" onClick={deleteSelectedProjects}>
                    선택 삭제 ({selectedProjects.length})
                  </button>
                )}
              </>
            ) : (
              <button className="manage-btn" onClick={toggleManageMode}>
                관리
              </button>
            )}
          </div>
        </div>

        {/* 검색 및 필터 */}
        <div className="pm-search-filter-row">
          <div className="pm-search-box">
            <span className="pm-search-icon">🔍</span>
            <input
              type="text"
              className="pm-search-input"
              placeholder="제목, 태그로 검색해주세요"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="pm-filter-dropdown-wrapper" ref={serviceDropdownRef}>
            <button 
              className="pm-filter-btn"
              onClick={() => setShowServiceDropdown(!showServiceDropdown)}
            >
              <span>{selectedServiceType}</span>
              <span className="pm-dropdown-arrow">▼</span>
            </button>
            {showServiceDropdown && (
              <div className="pm-dropdown-menu">
                {serviceTypes.map(type => (
                  <button
                    key={type.id}
                    className={`pm-dropdown-item ${selectedServiceType === type.label ? 'active' : ''}`}
                    onClick={() => {
                      setSelectedServiceType(type.label);
                      setShowServiceDropdown(false);
                    }}
                  >
                    <span className="pm-type-dot" style={{ background: type.color }}></span>
                    {type.label}
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="pm-filter-dropdown-wrapper" ref={sortDropdownRef}>
            <button 
              className="pm-filter-btn"
              onClick={() => setShowSortDropdown(!showSortDropdown)}
            >
              <span>{sortBy}</span>
              <span className="pm-dropdown-arrow">▼</span>
            </button>
            {showSortDropdown && (
              <div className="pm-dropdown-menu">
                {sortOptions.map(option => (
                  <button
                    key={option.id}
                    className={`pm-dropdown-item ${sortBy === option.label ? 'active' : ''}`}
                    onClick={() => {
                      setSortBy(option.label);
                      setShowSortDropdown(false);
                    }}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* 프로젝트 그리드 */}
        <div className="projects-grid">
          {sortedProjects.map((project) => (
            <div 
              key={project.id} 
              className={`project-card ${selectedProjects.includes(project.id) ? 'selected' : ''}`}
              onClick={() => {
                if (isManageMode) {
                  toggleProjectSelection(project.id);
                } else {
                  if (project.id === 8) {
                    onNavigate('learning-result-whiteboard');
                  } else if (project.id === 6) {
                    onNavigate('vocabulary-sample');
                  } else if (project.id === 7) {
                    onNavigate('whiteboard-sample', project);
                  } else if (project.serviceType === '화이트 보드') {
                    onNavigate('whiteboard', project);
                  } else if (project.id === 1) {
                    onNavigate('learning-result');
                  } else if (project.id === 4) {
                    onNavigate('text-result');
                  } else if (project.id === 3) {
                    onNavigate('workbook-result');
                  } else {
                    onProjectClick(project);
                  }
                }
              }}
            >
              {isManageMode && (
                <div className="project-checkbox">
                  <input
                    type="checkbox"
                    checked={selectedProjects.includes(project.id)}
                    onChange={() => toggleProjectSelection(project.id)}
                    onClick={(e) => e.stopPropagation()}
                  />
                </div>
              )}
              
              <div 
                className="service-chip" 
                style={{ background: project.serviceColor }}
              >
                {project.serviceType}
              </div>
              
              <div className="project-preview">
                <div className="document-icon">
                  <div className="doc-lines"></div>
                  <div className="doc-lines"></div>
                  <div className="doc-lines"></div>
                  <div className="doc-logo">Q</div>
                </div>
              </div>
              
              <div className="project-info">
                <h3 className="project-title">{project.title}</h3>
                <div className="project-meta">
                  <span className="project-date">최종 수정: {project.modifiedDate}</span>
                  {renderActionButtons(project)}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ProjectManagement;