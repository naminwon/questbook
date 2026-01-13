import { useState, useRef, useEffect } from 'react';
import './WhiteboardSample.css';
import Header from './Header';

function WhiteboardSample({ onNavigate, projectData, currentPage }) {
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

  // 기본 도구
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

  // 하단 도구
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
      {/* 헤더 */}
<Header
  onNavigate={onNavigate}
  currentPage={currentPage}
  userName="사만원"
  centerContent={
    <div className="wb-header-center">
      <button
        className="wb-back-btn"
        onClick={() => onNavigate('projects')} // ← ProjectManagement로 가는 키
        aria-label="뒤로가기"
      >
        ‹
      </button>
      <h1 className="wb-page-title">피타고라스의 정리</h1>
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
            {/* 피타고라스의 정리 시각화 - 크기 축소 (60%) */}
            <svg className="pythagorean-canvas" viewBox="0 0 800 600" xmlns="http://www.w3.org/2000/svg">
              {/* 배경 그리드 */}
              <defs>
                <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                  <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#e5e7eb" strokeWidth="0.5"/>
                </pattern>
              </defs>
              <rect width="800" height="600" fill="url(#grid)" />

              {/* 전체 그룹 - 크기 45%로 축소하고 중앙 정렬 */}
              <g transform="translate(400, 100) scale(0.45) translate(-400, -100)">
                {/* 제목 */}
                <text x="400" y="50" textAnchor="middle" fontSize="36" fontWeight="bold" fill="#1f2937">
                  피타고라스의 정리
                </text>

                {/* 직각삼각형 */}
                <g transform="translate(250, 200)">
                  {/* 빗변 위의 정사각형 (c²) - 파란색 */}
                  <g transform="translate(120, -120) rotate(36.87)">
                    <rect x="0" y="0" width="200" height="200" fill="#93c5fd" stroke="#3b82f6" strokeWidth="3" opacity="0.7"/>
                    <text x="100" y="100" textAnchor="middle" dominantBaseline="middle" fontSize="32" fontWeight="bold" fill="#1e40af">c²</text>
                    <text x="100" y="135" textAnchor="middle" dominantBaseline="middle" fontSize="18" fill="#1e40af">5² = 25</text>
                  </g>

                  {/* 밑변 위의 정사각형 (a²) - 초록색 */}
                  <rect x="0" y="160" width="160" height="160" fill="#86efac" stroke="#10b981" strokeWidth="3" opacity="0.7"/>
                  <text x="80" y="240" textAnchor="middle" dominantBaseline="middle" fontSize="28" fontWeight="bold" fill="#065f46">a²</text>
                  <text x="80" y="270" textAnchor="middle" dominantBaseline="middle" fontSize="16" fill="#065f46">4² = 16</text>

                  {/* 높이 위의 정사각형 (b²) - 보라색 */}
                  <rect x="-120" y="40" width="120" height="120" fill="#c4b5fd" stroke="#8b5cf6" strokeWidth="3" opacity="0.7"/>
                  <text x="-60" y="100" textAnchor="middle" dominantBaseline="middle" fontSize="28" fontWeight="bold" fill="#5b21b6">b²</text>
                  <text x="-60" y="125" textAnchor="middle" dominantBaseline="middle" fontSize="16" fill="#5b21b6">3² = 9</text>

                  {/* 직각삼각형 본체 */}
                  <path d="M 0 160 L 160 160 L 0 40 Z" fill="white" stroke="#1f2937" strokeWidth="4"/>
                  
                  {/* 직각 표시 */}
                  <rect x="0" y="140" width="20" height="20" fill="none" stroke="#1f2937" strokeWidth="2"/>

                  {/* 변 라벨 */}
                  <text x="80" y="180" textAnchor="middle" fontSize="24" fontWeight="bold" fill="#1f2937">a = 4</text>
                  <text x="-30" y="100" textAnchor="middle" fontSize="24" fontWeight="bold" fill="#1f2937">b = 3</text>
                  <text x="100" y="80" textAnchor="middle" fontSize="24" fontWeight="bold" fill="#1f2937">c = 5</text>
                </g>

                {/* 공식 */}
                <g transform="translate(400, 600)">
                  <rect x="-180" y="-40" width="360" height="80" rx="12" fill="#fef3c7" stroke="#f59e0b" strokeWidth="3"/>
                  <text x="0" y="0" textAnchor="middle" dominantBaseline="middle" fontSize="32" fontWeight="bold" fill="#92400e">
                    a² + b² = c²
                  </text>
                  <text x="0" y="30" textAnchor="middle" dominantBaseline="middle" fontSize="18" fill="#92400e">
                    4² + 3² = 5²  ⇒  16 + 9 = 25
                  </text>
                </g>

                {/* 설명 텍스트 */}
                <text x="50" y="700" fontSize="16" fill="#6b7280">
                  💡 모든 직각삼각형에 대해서 이 정리가 성립하는지는 이렇게 증명하면 안되죠!
                </text>
              </g>
            </svg>

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
              </div>
              <div className="toolbar-right">
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

export default WhiteboardSample;