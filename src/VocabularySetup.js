import { useState, useRef, useEffect } from 'react';
import './VocabularySetup.css';
import Header from './Header';

function VocabularySetup({ onBack, onCreate, onNavigate, currentPage }) {
  const [formData, setFormData] = useState({
    title: '',
    language: '한국어',
    tags: []
  });
  const [activeTab, setActiveTab] = useState('ai'); // 'ai' or 'data'
  
  // AI 탭 상태
  const [aiFrontSlots, setAiFrontSlots] = useState(['단어', '이미지', null]);
  const [aiBackSlots, setAiBackSlots] = useState(['뜻', '예문', null]);
  const [showAIFrontDropdown, setShowAIFrontDropdown] = useState(null);
  const [showAIBackDropdown, setShowAIBackDropdown] = useState(null);
  const [preventDuplicates, setPreventDuplicates] = useState(true);
  
  const aiFrontDropdownRef = useRef(null);
  const aiBackDropdownRef = useRef(null);

  const languages = [
    { id: 'en', label: '영어', flag: '🇺🇸' },
    { id: 'es', label: '스페인어', flag: '🇪🇸' },
    { id: 'de', label: '독일어', flag: '🇩🇪' },
    { id: 'fr', label: '프랑스어', flag: '🇫🇷' },
    { id: 'zh', label: '중국어', flag: '🇨🇳' },
    { id: 'ko', label: '한국어', flag: '🇰🇷' },
    { id: 'ja', label: '일본어', flag: '🇯🇵' }
  ];

  const availableComponents = [
    { id: 'word', label: '단어', icon: '🌐' },
    { id: 'image', label: '이미지', icon: '🖼️' },
    { id: 'sentence', label: '일반설명', icon: '📄' },
    { id: 'idea', label: '뜻', icon: '💡' },
    { id: 'audio', label: '발음기호', icon: '🔊' },
    { id: 'book', label: '품사', icon: '📖' },
    { id: 'example', label: '예문', icon: '💬' },
    { id: 'example_sentence', label: '예문해석', icon: '💭' }
  ];

  const getIconForComponent = (label) => {
    const comp = availableComponents.find(c => c.label === label);
    return comp ? comp.icon : '📝';
  };

  // 외부 클릭 감지
  useEffect(() => {
    function handleClickOutside(event) {
      if (aiFrontDropdownRef.current && !aiFrontDropdownRef.current.contains(event.target)) {
        setShowAIFrontDropdown(null);
      }
      if (aiBackDropdownRef.current && !aiBackDropdownRef.current.contains(event.target)) {
        setShowAIBackDropdown(null);
      }
    }

    if (showAIFrontDropdown !== null || showAIBackDropdown !== null) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showAIFrontDropdown, showAIBackDropdown]);

  const handleAISelectComponent = (componentLabel, side, slotIndex) => {
    if (side === 'front') {
      if (!aiFrontSlots.includes(componentLabel) && !aiBackSlots.includes(componentLabel)) {
        const newSlots = [...aiFrontSlots];
        newSlots[slotIndex] = componentLabel;
        setAiFrontSlots(newSlots);
      }
      setShowAIFrontDropdown(null);
    } else if (side === 'back') {
      if (!aiBackSlots.includes(componentLabel) && !aiFrontSlots.includes(componentLabel)) {
        const newSlots = [...aiBackSlots];
        newSlots[slotIndex] = componentLabel;
        setAiBackSlots(newSlots);
      }
      setShowAIBackDropdown(null);
    }
  };

  const handleAIRemoveComponent = (side, component) => {
    if (side === 'front') {
      setAiFrontSlots(aiFrontSlots.map(c => c === component ? null : c));
    } else {
      setAiBackSlots(aiBackSlots.map(c => c === component ? null : c));
    }
  };

const handleCreate = () => {
  if (!formData.title.trim()) {
    alert('단어장 제목을 입력해주세요.');
    return;
  }

  onCreate?.(formData);

  // ✅ 생성 후 VocabularySample로 이동
  onNavigate?.('vocabulary-sample', formData); // (두 번째 인자는 필요 없으면 빼도 됨)
};


  const handleDownloadTemplate = () => {
    alert('파일 형식 다운로드 기능');
  };

  return (
    <div className="vocabulary-setup-page">
      <Header 
        onNavigate={onNavigate}
        currentPage={currentPage}
        userName="사만원"
      />

      <main className="vs-main">
        <div className="vs-content">
          <div className="vs-form">
            <div className="vs-form-group">
              <label className="vs-label">
                단어장 제목 <span className="required">*</span>
              </label>
              <input
                type="text"
                className="vs-input"
                placeholder="제목을 입력해주세요."
                value={formData.title}
                onChange={(e) => setFormData({...formData, title: e.target.value})}
              />
            </div>

            <div className="vs-form-group">
              <label className="vs-label">
                단어장 언어 <span className="required">*</span>
              </label>
              <div className="vs-language-grid">
                {languages.map((lang) => (
                  <button
                    key={lang.id}
                    className={`vs-lang-btn ${formData.language === lang.label ? 'active' : ''}`}
                    onClick={() => setFormData({...formData, language: lang.label})}
                  >
                    <span className="lang-flag">{lang.flag}</span>
                    <span>{lang.label}</span>
                  </button>
                ))}
              </div>
            </div>
                <div className="vs-ai-section">
                  <div className="vs-slider-header">
                    <div className="vs-card-count-wrapper">
                      <label className="vs-label">단어 카드 수</label>
<input
  type="number"
  className="vs-input vs-card-count-input"
  min="5"
  max="100"
  defaultValue="20"
  value={formData.questionCount}
  onChange={(e) =>
    setFormData({ ...formData, questionCount: parseInt(e.target.value) || 20 })
  }
/>

                    </div>
                    <label className="vs-toggle-wrapper" onClick={(e) => {
                      e.preventDefault();
                      setPreventDuplicates(!preventDuplicates);
                    }}>
                      <span className="vs-toggle-label">단어 중복 방지</span>
                      <input 
                        type="checkbox" 
                        className="vs-toggle-input" 
                        checked={preventDuplicates}
                        onChange={(e) => setPreventDuplicates(e.target.checked)}
                      />
                      <span className="vs-toggle-status">{preventDuplicates ? 'ON' : 'OFF'}</span>
                    </label>
                  </div>
                </div>

            {/* 탭 버튼 */}
            <div className="vs-tabs">
              <button
                className={`vs-tab-btn ${activeTab === 'ai' ? 'active' : ''}`}
                onClick={() => setActiveTab('ai')}
              >
                ✨ AI로 만들기
              </button>
              <button
                className={`vs-tab-btn ${activeTab === 'data' ? 'active' : ''}`}
                onClick={() => setActiveTab('data')}
              >
                📊 내 데이터로 만들기
              </button>
            </div>

            {/* AI로 만들기 탭 */}
            {activeTab === 'ai' && (
              <div className="vs-tab-content">
                <div className="vs-ai-components">
                  <div className="vs-components-container">
                    {/* 앞면 구성요소 */}
                    <div className="vs-component-side">
                      <div className="vs-side-label">앞면</div>
                      <div className="vs-slots-row">
                        {aiFrontSlots.map((slot, index) => (
                          slot === null ? (
                            <div key={`front-slot-${index}`} className="vs-slot-wrapper">
                              <button 
                                className="vs-slot-card empty"
                                onClick={() => {
                                  setShowAIFrontDropdown(showAIFrontDropdown === index ? null : index);
                                  setShowAIBackDropdown(null);
                                }}
                              >
                                <div className="vs-slot-icon">➕</div>
                                <div className="vs-slot-label">추가</div>
                              </button>
                              
                              {showAIFrontDropdown === index && (
                                <div className="vs-slot-dropdown" ref={aiFrontDropdownRef}>
                                  {availableComponents
                                    .filter(comp => 
                                      !aiFrontSlots.includes(comp.label) && 
                                      !aiBackSlots.includes(comp.label)
                                    )
                                    .map((comp) => (
                                      <button
                                        key={comp.id}
                                        className="vs-dropdown-item"
                                        onClick={() => handleAISelectComponent(comp.label, 'front', index)}
                                      >
                                        <span className="vs-dropdown-icon">{comp.icon}</span>
                                        <span className="vs-dropdown-label">{comp.label}</span>
                                      </button>
                                    ))}
                                </div>
                              )}
                            </div>
                          ) : (
                            <div key={`front-slot-${index}`} className="vs-slot-card filled">
                              <button 
                                className="vs-slot-delete"
                                onClick={() => handleAIRemoveComponent('front', slot)}
                              >
                                ✕
                              </button>
                              <div className="vs-slot-icon">{getIconForComponent(slot)}</div>
                              <div className="vs-slot-label">{slot}</div>
                            </div>
                          )
                        ))}
                      </div>
                    </div>

                    {/* 세로 구분선 */}
                    <div className="vs-divider"></div>

                    {/* 뒷면 구성요소 */}
                    <div className="vs-component-side">
                      <div className="vs-side-label">뒷면</div>
                      <div className="vs-slots-row">
                        {aiBackSlots.map((slot, index) => (
                          slot === null ? (
                            <div key={`back-slot-${index}`} className="vs-slot-wrapper">
                              <button 
                                className="vs-slot-card empty"
                                onClick={() => {
                                  setShowAIBackDropdown(showAIBackDropdown === index ? null : index);
                                  setShowAIFrontDropdown(null);
                                }}
                              >
                                <div className="vs-slot-icon">➕</div>
                                <div className="vs-slot-label">추가</div>
                              </button>
                              
                              {showAIBackDropdown === index && (
                                <div className="vs-slot-dropdown" ref={aiBackDropdownRef}>
                                  {availableComponents
                                    .filter(comp => 
                                      !aiBackSlots.includes(comp.label) && 
                                      !aiFrontSlots.includes(comp.label)
                                    )
                                    .map((comp) => (
                                      <button
                                        key={comp.id}
                                        className="vs-dropdown-item"
                                        onClick={() => handleAISelectComponent(comp.label, 'back', index)}
                                      >
                                        <span className="vs-dropdown-icon">{comp.icon}</span>
                                        <span className="vs-dropdown-label">{comp.label}</span>
                                      </button>
                                    ))}
                                </div>
                              )}
                            </div>
                          ) : (
                            <div key={`back-slot-${index}`} className="vs-slot-card filled">
                              <button 
                                className="vs-slot-delete"
                                onClick={() => handleAIRemoveComponent('back', slot)}
                              >
                                ✕
                              </button>
                              <div className="vs-slot-icon">{getIconForComponent(slot)}</div>
                              <div className="vs-slot-label">{slot}</div>
                            </div>
                          )
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* 단어장 선택 */}
                <div className="vs-ai-section">
                  <label className="vs-label">단어장</label>
                  <div className="vs-data-source">
                    <label className="vs-radio-item">
                      <input type="radio" name="dataSource" value="elementary" defaultChecked />
                      <span>(초등) 교육부 지정 필수 초등 영단어 800개</span>
                    </label>
                    <label className="vs-radio-item">
                      <input type="radio" name="dataSource" value="secondary" />
                      <span>(중고등) 교육부 지정 필수 영단어 1800개</span>
                    </label>
                    <label className="vs-radio-item">
                      <input type="radio" name="dataSource" value="high" />
                      <span>(고등) 교육부 지정 필수 영단어 400개</span>
                    </label>
                    <label className="vs-radio-item">
                      <input type="radio" name="dataSource" value="textbook" />
                      <span>(초등) 영어 교재</span>
                    </label>
                  </div>
                </div>

              </div>
            )}

            {/* 내 데이터로 만들기 탭 */}
            {activeTab === 'data' && (
              <div className="vs-tab-content">
                <div className="vs-download-section">
                  <button className="vs-download-btn" onClick={handleDownloadTemplate}>
                    📥 파일 형식 다운로드
                  </button>
                </div>
                
                <div className="vs-upload-area">
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
                  <p className="upload-info">xlsx, csv 지원 (5MB이하)</p>
                  <p className="upload-warning">⚠️ 형식에 맞는 파일만 업로드 됩니다.</p>
                </div>
              </div>
            )}

            <div className="vs-footer">
              <button className="vs-btn-cancel" onClick={onBack}>
                취소
              </button>
              <button className="vs-btn-create" onClick={handleCreate}>
                단어장 만들기
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default VocabularySetup;