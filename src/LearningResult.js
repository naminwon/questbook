import { useState, useEffect, useRef } from 'react';
import './LearningResult.css';
import Header from './Header';

function LearningResult({ onHome, onBack, onNavigate, currentPage, whiteboardMode = false }) {
  const [activeTab, setActiveTab] = useState('objectives');
  const [isWhiteboardMode, setIsWhiteboardMode] = useState(whiteboardMode);
  const [selectedTool, setSelectedTool] = useState('select');
  const [showMoreDropdown, setShowMoreDropdown] = useState(false);
  const moreDropdownRef = useRef(null);

  // 외부 클릭 감지
  useEffect(() => {
    function handleClickOutside(event) {
      if (moreDropdownRef.current && !moreDropdownRef.current.contains(event.target)) {
        setShowMoreDropdown(false);
      }
    }

    if (showMoreDropdown) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showMoreDropdown]);

  const tabs = [
    { id: 'objectives', label: '학습목표', icon: '🎯' },
    { id: 'concepts', label: '개념학습', icon: '📚' },
    { id: 'inquiry', label: '탐구과제', icon: '🔍' },
    { id: 'glossary', label: '용어사전', icon: '📖' },
    { id: 'assessment', label: '점검하기', icon: '✅' },
    { id: 'summary', label: '정리하기', icon: '📝' }
  ];

  const objectives = [
    { number: 1, title: '광합성의 정의', color: '#818cf8' },
    { number: 2, title: '광합성의 과정', color: '#818cf8' },
    { number: 3, title: '광합성의 재료', color: '#818cf8' },
    { number: 4, title: '산소와 포도당의 역할', color: '#818cf8' },
    { number: 5, title: '광합성의 중요성', color: '#818cf8' }
  ];

  return (
    <div className="learning-result">
      {/* 헤더 */}
      <Header 
        onNavigate={onNavigate}
        currentPage={currentPage}
        userName="사만원"
        centerContent={
          <div className="lr-header-center">
            {!isWhiteboardMode && (
              <button className="lr-back-btn" onClick={onBack}>
                ‹
              </button>
            )}
            <h1 className="lr-title">빛으로 만드는 식물의 에너지</h1>
          </div>
        }
      />

      {/* 탭 메뉴 */}
      <nav className="lr-tabs">
        <div className="lr-tabs-left">
          {isWhiteboardMode && (
            <button 
              className="whiteboard-mode-btn active" 
              title="칠판"
              onClick={() => setIsWhiteboardMode(false)}
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="2" y="3" width="20" height="14" rx="2" />
                <line x1="8" y1="21" x2="16" y2="21" />
                <line x1="12" y1="17" x2="12" y2="21" />
              </svg>
            </button>
          )}
          {tabs.map((tab) => (
            <button
              key={tab.id}
              className={`lr-tab ${activeTab === tab.id ? 'active' : ''}`}
              onClick={() => setActiveTab(tab.id)}
            >
              <span className="tab-icon">{tab.icon}</span>
              <span className="tab-label">{tab.label}</span>
            </button>
          ))}
        </div>
        
        <div className="lr-tabs-right">
          {isWhiteboardMode ? (
            <>
              <button 
                className="lr-action-btn layout-btn"
                onClick={() => alert('화면구성')}
                title="화면구성"
              >
                📐 화면구성
              </button>
              <button 
                className="lr-action-btn fullscreen-btn"
                onClick={() => alert('전체화면')}
                title="전체화면"
              >
                ⛶ 전체화면
              </button>
              <button 
                className="lr-action-btn save-btn"
                onClick={() => alert('저장하기')}
                title="저장하기"
              >
                💾 저장하기
              </button>
              <div className="lr-more-dropdown-wrapper" ref={moreDropdownRef}>
                {showMoreDropdown && (
                  <div className="lr-more-dropdown">
                    <button 
                      className="lr-dropdown-item"
                      onClick={() => {
                        setShowMoreDropdown(false);
                        alert('공유 기능');
                      }}
                    >
                      <span className="lr-dropdown-icon">↗️</span>
                      <span>공유</span>
                    </button>
                    <button 
                      className="lr-dropdown-item"
                      onClick={() => {
                        setShowMoreDropdown(false);
                        alert('삭제');
                      }}
                    >
                      <span className="lr-dropdown-icon">🗑️</span>
                      <span>삭제</span>
                    </button>
                  </div>
                )}
              </div>
            </>
          ) : (
            <>
              <button 
                className="lr-action-btn edit-btn"
                onClick={() => alert('편집하기')}
                title="편집하기"
              >
              ✏️ 편집하기
              </button>
              <button 
                className="lr-action-btn download-btn"
                onClick={() => alert('내려받기')}
                title="내려받기"
              >
                ⬇️ 내려받기
              </button>
              <button 
                className="lr-action-btn problem-btn"
                onClick={() => onNavigate('workbook-setup-learning', {
  title: '빛으로 만드는 식물의 에너지',
  ageGroup: '초등 고학년',
  subject: '과학',
  questionTypes: ['choice', 'multiple', 'short', 'match', 'ox', 'order'],
  questionCount: 20,
  selectedProject: 1
})}
                title="문제 만들기"
              >
                ✏️ 문제 만들기
              </button>
              <div className="lr-more-dropdown-wrapper" ref={moreDropdownRef}>
                <button 
                  className="lr-action-btn more-btn"
                  onClick={() => setShowMoreDropdown(!showMoreDropdown)}
                  title="더보기"
                >
                  ⋯ 더보기
                </button>
                {showMoreDropdown && (
                  <div className="lr-more-dropdown">
                    <button 
                      className="lr-dropdown-item"
                      onClick={() => {
                        setShowMoreDropdown(false);
                        alert('공유 기능');
                      }}
                    >
                      <span className="lr-dropdown-icon">✈️</span>
                      <span>공유</span>
                    </button>
                    <button 
                      className="lr-dropdown-item"
                      onClick={() => {
                        setShowMoreDropdown(false);
                        setIsWhiteboardMode(true);
                      }}
                    >
                      <span className="lr-dropdown-icon">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <rect x="2" y="3" width="20" height="14" rx="2" />
                          <line x1="8" y1="21" x2="16" y2="21" />
                          <line x1="12" y1="17" x2="12" y2="21" />
                        </svg>
                      </span>
                      <span>판서</span>
                    </button>
                    <button 
                      className="lr-dropdown-item"
                      onClick={() => {
                        setShowMoreDropdown(false);
                        alert('설정');
                      }}
                    >
                      <span className="lr-dropdown-icon">⚙️</span>
                      <span>설정</span>
                    </button>
                  </div>
                )}
              </div>
            </>
          )}
        </div>
      </nav>

      {/* 메인 컨텐츠 */}
      <main className="lr-main">
        <div className="lr-content">
          {/* 브레드크럼 */}
          <div className="breadcrumb">
            <span>빛으로 만드는 식물의 에너지</span>
            <span className="breadcrumb-arrow">›</span>
            <span className="breadcrumb-current">학습목표</span>
          </div>

          {/* 학습목표 카드 */}
          <div className="objectives-card">
            <div className="objectives-header">
              <div className="objectives-icon">🎯</div>
              <h2 className="objectives-title">학습목표</h2>
            </div>

            <div className="objectives-subtitle">오늘의 학습내용</div>

            <div className="objectives-list">
              {objectives.map((obj) => (
                <div key={obj.number} className="objective-item">
                  <div className="objective-number" style={{ backgroundColor: obj.color }}>
                    {obj.number}
                  </div>
                  <div className="objective-title">{obj.title}</div>
                </div>
              ))}
            </div>
          </div>

          {/* 화이트보드 모드일 때 추가 도구 바 */}
          {isWhiteboardMode && (
            <div className="lr-toolbar">
              <button 
                className={`tool-btn ${selectedTool === 'select' ? 'active' : ''}`}
                onClick={() => setSelectedTool('select')}
                title="선택"
              >
                ➤
              </button>
              <button 
                className={`tool-btn ${selectedTool === 'pen' ? 'active' : ''}`}
                onClick={() => setSelectedTool('pen')}
                title="펜"
              >
                ✏️
              </button>
              <button 
                className={`tool-btn ${selectedTool === 'shapes' ? 'active' : ''}`}
                onClick={() => setSelectedTool('shapes')}
                title="도형"
              >
                ▢
              </button>
              <button 
                className={`tool-btn ${selectedTool === 'text' ? 'active' : ''}`}
                onClick={() => setSelectedTool('text')}
                title="텍스트"
              >
                T
              </button>
              <button 
                className={`tool-btn ${selectedTool === 'emoji' ? 'active' : ''}`}
                onClick={() => setSelectedTool('emoji')}
                title="이모지"
              >
                😀
              </button>
              <button 
                className={`tool-btn ${selectedTool === 'eraser' ? 'active' : ''}`}
                onClick={() => setSelectedTool('eraser')}
                title="지우개"
              >
                🧹
              </button>
              <button 
                className={`tool-btn ${selectedTool === 'grid' ? 'active' : ''}`}
                onClick={() => setSelectedTool('grid')}
                title="그리드"
              >
                ▦
              </button>
            </div>
          )}

          {/* 좌우 네비게이션 */}
          <div className="lr-nav">
            <button className="nav-arrow">‹</button>
          </div>

          {/* 하단 줌 컨트롤 */}
          <div className="lr-zoom">
            <button className="zoom-btn">A-</button>
            <span className="zoom-level">100%</span>
            <button className="zoom-btn">A+</button>
          </div>
        </div>
      </main>
    </div>
  );
}

export default LearningResult;