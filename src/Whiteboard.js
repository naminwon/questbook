import { useState, useRef, useEffect } from 'react';
import './Whiteboard.css';
import Header from './Header';

function Whiteboard({ onNavigate, projectData, currentPage }) {
  const [leftSidebarOpen, setLeftSidebarOpen] = useState(true);
  const [activeLeftTab, setActiveLeftTab] = useState('도구모음');
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

  const leftTabs = ['도구모음', '생산성'];

  // 기본 도구 (이미지 참조)
  const basicTools = [
    { id: 'textbox', icon: 'T', name: '텍스트박스', desc: '텍스트 입력 및 편집', color: '#e0e7ff' },
    { id: 'media', icon: '🖼️', name: '미디어', desc: '이미지, 비디오, 오디오 입력', color: '#f3e8ff' },
    { id: 'shapes', icon: '△', name: '도형', desc: '도형 생성 및 편집', color: '#dcfce7' },
    { id: 'web', icon: '🌐', name: '웹 뷰어', desc: '웹 콘텐츠 표시', color: '#dbeafe' },
    { id: 'memo', icon: '📝', name: '메모지', desc: '간단한 메모 작성', color: '#fef3c7' },
    { id: 'calculator', icon: '🔢', name: '계산기', desc: '계산기', color: '#fce7f3' },
    { id: 'math', icon: '∑', name: '수학도구', desc: '수학 기호 및 그래프', color: '#fce7f3' },
    { id: 'app', icon: '+', name: '앱', desc: '다양한 교육 앱', color: '#f3e8ff' }
  ];

  const productivityApps = [
    { id: 'gdrive', icon: '📁', name: 'Google Drive', desc: '구글 드라이브에서 불러옵니다' },
    { id: 'gdocs', icon: '📄', name: 'Google Docs', desc: '구글 문서에서 불러옵니다' },
    { id: 'gsheets', icon: '📊', name: 'Google Sheets', desc: '구글 스프레드시트에서 불러옵니다' },
    { id: 'gslides', icon: '📽️', name: 'Google Slides', desc: '구글 프레젠테이션에서 불러옵니다' },
    { id: 'onedrive', icon: '☁️', name: 'MS One Drive', desc: '원드라이브에서 불러옵니다' },
    { id: 'word', icon: '📘', name: 'MS Word', desc: '워드 문서를 불러옵니다' },
    { id: 'excel', icon: '📗', name: 'MS Excel', desc: '엑셀 문서를 불러옵니다' },
    { id: 'powerpoint', icon: '📙', name: 'MS PowerPoint', desc: '파워포인트를 불러옵니다' }
  ];

  // 하단 도구 (이미지 참조)
  const bottomTools = [
    { id: 'select', icon: '➤', name: '선택' },
    { id: 'pen', icon: '✏️', name: '펜' },
    { id: 'shapes', icon: '◇', name: '도형' },
    { id: 'text', icon: 'T', name: '텍스트' },
    { id: 'emoji', icon: '😊', name: '이모지' },
    { id: 'eraser', icon: '🧹', name: '지우개' },
    { id: 'grid', icon: '▦', name: '그리드' } 
  ];

  return (
    <div className="whiteboard">
      {/* 헤더 - Header 컴포넌트 사용 */}
<Header 
  onNavigate={onNavigate}
  currentPage={currentPage}
  userName="사만원"
  centerContent={
    <div className="wb-header-center">
      <h1 className="wb-title">{projectData?.title || '새 화이트보드'}</h1>
    </div>
  }
/>


      <div className="wb-main">
        {/* 왼쪽 사이드바 */}
        <div className={`wb-left-sidebar ${leftSidebarOpen ? 'open' : 'closed'}`}>
          {leftSidebarOpen && (
            <>
              <div className="wb-sidebar-tabs">
                {leftTabs.map((tab) => (
                  <button
                    key={tab}
                    className={`wb-sidebar-tab ${activeLeftTab === tab ? 'active' : ''}`}
                    onClick={() => setActiveLeftTab(tab)}
                  >
                    {tab}
                  </button>
                ))}
              </div>

              <div className="wb-sidebar-content">
                {activeLeftTab === '도구모음' && (
                  <div className="wb-tools-panel">
                    <h3 className="panel-title">기본 도구</h3>
                    <div className="tools-list">
                      {basicTools.map((tool) => (
                        <button
                          key={tool.id}
                          className="tool-item-full"
                          onClick={() => alert(`${tool.name} 추가`)}
                        >
                          <div 
                            className="tool-icon-box" 
                            style={{ backgroundColor: tool.color }}
                          >
                            <span className="tool-icon-large">{tool.icon}</span>
                          </div>
                          <div className="tool-text">
                            <div className="tool-name-large">{tool.name}</div>
                            <div className="tool-desc">{tool.desc}</div>
                          </div>
                        </button>
                      ))}
                    </div>

                    <h3 className="panel-title">My App</h3>
                    <div className="my-apps-list">
                      <div className="app-item">
                        <div className="app-icon-box">📐</div>
                        <span className="app-name">Desmos</span>
                        <button className="app-delete">🗑️</button>
                      </div>
                      <div className="app-item">
                        <div className="app-icon-box">🔵</div>
                        <span className="app-name">GeoGebra</span>
                        <button className="app-delete">🗑️</button>
                      </div>
                      <div className="app-item">
                        <div className="app-icon-box">📝</div>
                        <span className="app-name">퀴즈 만들기</span>
                        <button className="app-delete">🗑️</button>
                      </div>
                    </div>
                  </div>
                )}

                {activeLeftTab === '생산성' && (
                  <div className="wb-productivity-panel">
                    <h3 className="panel-title">생산성 앱</h3>
                    <div className="productivity-list">
                      {productivityApps.map((app) => (
                        <button
                          key={app.id}
                          className="productivity-item"
                          onClick={() => alert(`${app.name} 연동`)}
                        >
                          <div className="app-icon">{app.icon}</div>
                          <div className="app-info">
                            <div className="app-name-prod">{app.name}</div>
                            <div className="app-desc-prod">{app.desc}</div>
                          </div>
                          <div className="app-arrow">›</div>
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </>
          )}

          <button 
            className="wb-sidebar-toggle"
            onClick={() => setLeftSidebarOpen(!leftSidebarOpen)}
          >
            {leftSidebarOpen ? '‹' : '›'}
          </button>
        </div>

        {/* 캔버스 영역 */}
        <div className="wb-canvas-container">
          {/* 탭 영역 */}
          <div className="wb-tabs-bar">
            <div className="wb-tabs-spacer"></div>
            <div className="wb-tabs-actions">
              <button 
                className="wb-action-btn layout-btn"
                onClick={() => alert('화면구성')}
                title="화면구성"
              >
                📐 화면구성
              </button>
              <button 
                className="wb-action-btn fullscreen-btn"
                onClick={() => alert('전체화면')}
                title="전체화면"
              >
                ⛶ 전체화면
              </button>
              <button 
                className="wb-action-btn save-btn"
                onClick={() => alert('저장하기')}
                title="저장하기"
              >
                💾 저장하기
              </button>
            </div>
          </div>

          <div className="wb-canvas">
            <div className="canvas-placeholder">
              <div className="placeholder-icon">🎨</div>
              <p className="placeholder-desc">
                왼쪽 도구를 사용하여 자유롭게 작업해 보세요.
              </p>
            </div>

            {/* 하단 도구바 - floating */}
            <div className="wb-bottom-toolbar">
              <div className="toolbar-left">
                {bottomTools.map((tool) => (
                  <button 
                    key={tool.id}
                    className={`wb-tool-btn ${selectedTool === tool.id ? 'active' : ''}`}
                    onClick={() => setSelectedTool(tool.id)}
                    title={tool.name}
                  >
                    {tool.icon}
                  </button>
                ))}
              <div className="toolbar-right">
              </div>
                <div className="zoom-control">
                  <button className="zoom-btn">−</button>
                  <span className="zoom-level">100%</span>
                  <button className="zoom-btn">+</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Whiteboard;