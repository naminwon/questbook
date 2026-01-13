import React, { useState, useRef, useEffect } from 'react';
import './Vocabulary.css';
import './VocabularySample.css';
import Header from './Header';


function VocabularySample({ onNavigate, currentPage, vocabularyData }) {
  const [showMoreDropdown, setShowMoreDropdown] = useState(false);
  const [draggedComponentIndex, setDraggedComponentIndex] = useState(null);
  const [draggedComponentSide, setDraggedComponentSide] = useState(null);
  const [selectedCardId, setSelectedCardId] = useState(1); // 미리보기용
  const [previewSide, setPreviewSide] = useState('front'); // 'front' or 'back'
  const [expandedCardId, setExpandedCardId] = useState(null); // 확장된 카드 ID
  const [isEditMode, setIsEditMode] = useState(false); // 편집 모드 상태
  
  // 모달 상태
  const [showAIModal, setShowAIModal] = useState(false);
  const [showDataModal, setShowDataModal] = useState(false);
  
  // AI 모달 구성요소 선택 상태 (3개 슬롯)
  const [aiFrontSlots, setAiFrontSlots] = useState(['단어', '이미지', null]);
  const [aiBackSlots, setAiBackSlots] = useState(['뜻', '예문', null]);
  const [showAIFrontDropdown, setShowAIFrontDropdown] = useState(null);
  const [showAIBackDropdown, setShowAIBackDropdown] = useState(null);
  
  const aiFrontDropdownRef = useRef(null);
  const aiBackDropdownRef = useRef(null);
  
  // 드롭다운 상태 추가
  const [showFrontDropdown, setShowFrontDropdown] = useState(false);
  const [showBackDropdown, setShowBackDropdown] = useState(false);
  
  // 구성요소 정의
  const [frontComponents, setFrontComponents] = useState(['단어', '이미지', null]);
  const [backComponents, setBackComponents] = useState(['뜻', '예문', null]);

  
  const moreDropdownRef = useRef(null);
  const frontDropdownRef = useRef(null);
  const backDropdownRef = useRef(null);

  // 사용 가능한 구성요소 타입
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

  // 레이블로 아이콘 찾기
  const getIconForComponent = (label) => {
    const comp = availableComponents.find(c => c.label === label);
    return comp ? comp.icon : '📝';
  };

  // 외부 클릭 감지
  useEffect(() => {
    function handleClickOutside(event) {
      if (moreDropdownRef.current && !moreDropdownRef.current.contains(event.target)) {
        setShowMoreDropdown(false);
      }
      if (frontDropdownRef.current && !frontDropdownRef.current.contains(event.target)) {
        setShowFrontDropdown(false);
      }
      if (backDropdownRef.current && !backDropdownRef.current.contains(event.target)) {
        setShowBackDropdown(false);
      }
      if (aiFrontDropdownRef.current && !aiFrontDropdownRef.current.contains(event.target)) {
        setShowAIFrontDropdown(null);
      }
      if (aiBackDropdownRef.current && !aiBackDropdownRef.current.contains(event.target)) {
        setShowAIBackDropdown(null);
      }
    }

    if (showMoreDropdown || showFrontDropdown || showBackDropdown || showAIFrontDropdown !== null || showAIBackDropdown !== null) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showMoreDropdown, showFrontDropdown, showBackDropdown, showAIFrontDropdown, showAIBackDropdown]);

  // 드래그 앤 드롭 핸들러
  const handleDragStart = (index, side) => {
    setDraggedComponentIndex(index);
    setDraggedComponentSide(side);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (dropIndex, dropSide) => {
    if (draggedComponentIndex === null || draggedComponentSide !== dropSide) return;

    const components = dropSide === 'front' ? [...frontComponents] : [...backComponents];
    const [draggedItem] = components.splice(draggedComponentIndex, 1);
    components.splice(dropIndex, 0, draggedItem);

    if (dropSide === 'front') {
      setFrontComponents(components);
    } else {
      setBackComponents(components);
    }

    setDraggedComponentIndex(null);
    setDraggedComponentSide(null);
  };

  // 구성요소 추가 (드롭다운 방식)
  const handleAddComponentDropdown = (side) => {
    if (side === 'front') {
      setShowFrontDropdown(!showFrontDropdown);
      setShowBackDropdown(false);
    } else {
      setShowBackDropdown(!showBackDropdown);
      setShowFrontDropdown(false);
    }
  };

  // 구성요소 선택
  const handleSelectComponent = (componentLabel, side, slotIndex = null) => {
    if (side === 'front') {
      if (!frontComponents.includes(componentLabel)) {
        const newComponents = [...frontComponents];
        // 슬롯 인덱스가 지정된 경우 해당 위치에 추가
        if (slotIndex !== null) {
          newComponents[slotIndex] = componentLabel;
        } else {
          // 첫 번째 빈 슬롯에 추가
          const emptyIndex = newComponents.indexOf(null);
          if (emptyIndex !== -1) {
            newComponents[emptyIndex] = componentLabel;
          }
        }
        setFrontComponents(newComponents);
        setCards(cards.map(card => ({
          ...card,
          data: { ...card.data, [componentLabel]: '' }
        })));
      }
      setShowFrontDropdown(null);
    } else if (side === 'back') {
      if (!backComponents.includes(componentLabel)) {
        const newComponents = [...backComponents];
        if (slotIndex !== null) {
          newComponents[slotIndex] = componentLabel;
        } else {
          const emptyIndex = newComponents.indexOf(null);
          if (emptyIndex !== -1) {
            newComponents[emptyIndex] = componentLabel;
          }
        }
        setBackComponents(newComponents);
        setCards(cards.map(card => ({
          ...card,
          data: { ...card.data, [componentLabel]: '' }
        })));
      }
      setShowBackDropdown(null);
    }
  };

  // 구성요소 삭제
  const handleRemoveComponent = (side, component) => {
    if (side === 'front') {
      setFrontComponents(frontComponents.map(c => c === component ? null : c));
    } else {
      setBackComponents(backComponents.map(c => c === component ? null : c));
    }
  };


  const [cards, setCards] = useState([
  {
    id: 1,
    data: {
      '단어': 'angel',
      '이미지': 'images/angel.jpg',
      '뜻': '천사(하늘에서 사람을 돕는 착한 존재)',
      '예문': 'The angel in the story helps the child.',
      '예문해석': '이야기 속 천사는 아이를 도와줍니다.',
    },
  },
  {
    id: 2,
    data: {
      '단어': 'comedy',
      '이미지': 'images/comedy.jpg',
      '뜻': '코미디(사람을 웃게 만드는 이야기나 영화)',
      '예문': 'We watched a comedy movie and laughed a lot.',
      '예문해석': '우리는 코미디 영화를 보고 많이 웃었습니다.',
    },
  },
  {
    id: 3,
    data: {
      '단어': 'horse',
      '이미지': 'images/horse.jpg',
      '뜻': '말(사람이 타기도 하는 큰 동물)',
      '예문': 'I rode a horse at the farm.',
      '예문해석': '나는 농장에서 말을 타았습니다.',
    },
  },
  {
    id: 4,
    data: {
      '단어': 'foot',
      '이미지': 'images/foot.jpg',
      '뜻': '발(걷거나 뛸 때 쓰는 몸의 부분)',
      '예문': 'My foot hurts after running.',
      '예문해석': '달리고 나서 발이 아픕니다.',
    },
  },
  {
    id: 5,
    data: {
      '단어': 'bake',
      '이미지': 'images/bake.jpg',
      '뜻': '굽다(오븐에서 빵이나 과자를 만들다)',
      '예문': 'We bake cookies in the oven.',
      '예문해석': '우리는 오븐에서 쿠키를 굽습니다.',
    },
  },
]);

  
  // 카드 데이터 변경
  const handleCardChange = (cardId, field, value) => {
    setCards(cards.map(card => 
      card.id === cardId ? { ...card, data: { ...card.data, [field]: value } } : card
    ));
  };

  // 카드 추가
  const handleAddCard = () => {
    const newCardData = {};
    [...frontComponents, ...backComponents].forEach(comp => {
      newCardData[comp] = '';
    });
    
    const newCard = {
      id: Math.max(...cards.map(c => c.id), 0) + 1,
      data: newCardData
    };
    setCards([...cards, newCard]);
  };

  // 카드 삭제
  const handleDeleteCard = (cardId) => {
    if (cards.length > 1) {
      const newCards = cards.filter(card => card.id !== cardId);
      setCards(newCards);
      if (selectedCardId === cardId && newCards.length > 0) {
        setSelectedCardId(newCards[0].id);
      }
    } else {
      alert('최소 1개의 카드가 필요합니다.');
    }
  };

  // 카드 순서 변경
  const handleMoveCard = (cardId, direction) => {
    const index = cards.findIndex(card => card.id === cardId);
    const newIndex = direction === 'up' ? index - 1 : index + 1;
    
    if (newIndex >= 0 && newIndex < cards.length) {
      const newCards = [...cards];
      [newCards[index], newCards[newIndex]] = [newCards[newIndex], newCards[index]];
      setCards(newCards);
    }
  };

  // 선택된 카드 가져오기
  const getSelectedCard = () => {
    return cards.find(card => card.id === selectedCardId) || cards[0];
  };

  // AI 모달 - 구성요소 선택
  const handleAISelectComponent = (label, side, slotIndex) => {
    if (side === 'front') {
      const newSlots = [...aiFrontSlots];
      newSlots[slotIndex] = label;
      setAiFrontSlots(newSlots);
      setShowAIFrontDropdown(null);
    } else {
      const newSlots = [...aiBackSlots];
      newSlots[slotIndex] = label;
      setAiBackSlots(newSlots);
      setShowAIBackDropdown(null);
    }
  };

  // AI 모달 - 구성요소 제거
  const handleAIRemoveComponent = (side, label) => {
    if (side === 'front') {
      const newSlots = aiFrontSlots.map(slot => slot === label ? null : slot);
      setAiFrontSlots(newSlots);
    } else {
      const newSlots = aiBackSlots.map(slot => slot === label ? null : slot);
      setAiBackSlots(newSlots);
    }
  };

  return (
    <div className="vocabulary-page">
<Header
  onNavigate={onNavigate}
  currentPage={currentPage}
  userName="사만원"
  centerContent={
    <div className="vocab-header-center">
      <button
        className="vocab-back-btn"
        onClick={() => onNavigate('vocabulary-setup')}
        aria-label="뒤로가기"
      >
        ‹
      </button>
      <h1 className="vocab-title">
        {vocabularyData?.title || '초등 영어 필수 어휘'}
      </h1>
    </div>
  }
/>



      {/* 탭 바 */}
      <div className="vocab-tabs-bar">
        <div className="vocab-tabs-right">
          {isEditMode ? (
            // 편집 모드: 저장하기 버튼만 표시
            <button 
              className="vocab-action-btn save-btn"
              onClick={() => {
                setIsEditMode(false);
                alert('저장하기');
              }}
              title="저장하기"
            >
              💾 저장하기
            </button>
          ) : (
            // 보기 모드: 편집하기, 내려받기, 문제 만들기, 더보기 표시
            <>
              <button 
                className="vocab-action-btn edit-btn"
                onClick={() => setIsEditMode(true)}
                title="편집하기"
              >
                ✂️ 편집하기
              </button>
              <button 
                className="vocab-action-btn download-btn"
                onClick={() => alert('내려받기')}
                title="내려받기"
              >
                ⬇️ 내려받기
              </button>
              <button 
                className="vocab-action-btn problem-btn"
                onClick={() => onNavigate('workbooksetupvocabulary', {
                  title: '초등 영어 필수 어휘',
                  ageGroup: '초등 저학년',
                  subject: '어휘',
                  questionTypes: ['choice', 'short', 'match', 'ox'],
                  questionCount: 10,
                  selectedProject: 6
                })}
                title="문제 만들기"
              >
                ✏️ 문제 만들기
              </button>
              <div className="vocab-more-dropdown-wrapper" ref={moreDropdownRef}>
                <button 
                  className="vocab-action-btn more-btn"
                  onClick={() => setShowMoreDropdown(!showMoreDropdown)}
                  title="더보기"
                >
                  ⋯ 더보기
                </button>
                {showMoreDropdown && (
                  <div className="vocab-more-dropdown">
                    <button 
                      className="vocab-dropdown-item"
                      onClick={() => {
                        setShowMoreDropdown(false);
                        alert('공유 기능');
                      }}
                    >
                      <span className="vocab-dropdown-icon">✈️</span>
                      <span>공유</span>
                    </button>
                    <button 
                      className="vocab-dropdown-item"
                      onClick={() => {
                        setShowMoreDropdown(false);
                        alert('판서');
                      }}
                    >
                      <span className="vocab-dropdown-icon">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <rect x="2" y="3" width="20" height="14" rx="2" />
                          <line x1="8" y1="21" x2="16" y2="21" />
                          <line x1="12" y1="17" x2="12" y2="21" />
                        </svg>
                      </span>
                      <span>판서</span>
                    </button>
                    <button 
                      className="vocab-dropdown-item"
                      onClick={() => {
                        setShowMoreDropdown(false);
                        alert('설정');
                      }}
                    >
                      <span className="vocab-dropdown-icon">⚙️</span>
                      <span>설정</span>
                    </button>
                  </div>
                )}
              </div>
            </>
          )}
        </div>
      </div>

      {/* 메인 컨텐츠 */}
      <main className="vocab-main">
        {/* 단어 카드 구성요소 섹션 */}
        {isEditMode && (
        <div className="components-section">
          <div className="components-header">
            <h2 className="components-title">단어 카드 구성요소</h2>
          </div>

          <div className="components-grid">
            {/* 앞면 */}
            <div className="component-column">
              <div className="column-header">
                <span className="column-label">앞면</span>
                <span className="column-count">{frontComponents.filter(c => c !== null).length} / 3</span>
              </div>
              
              <div className="component-card-grid">
                {frontComponents.map((comp, index) => (
                  comp === null ? (
                    // 빈 슬롯: 점선 테두리 + 추가 버튼
                    <div key={index} className="component-dropdown-wrapper">
                      <button 
                        className="add-component-card empty-slot"
                        onClick={() => {
                          setShowFrontDropdown(showFrontDropdown === index ? null : index);
                          setShowBackDropdown(null);
                        }}
                      >
                        <div className="add-card-icon">➕</div>
                        <div className="add-card-label">추가</div>
                      </button>
                      
                      {showFrontDropdown === index && (
                        <div className="component-dropdown" ref={frontDropdownRef}>
                          {availableComponents
                            .filter(availComp => 
                              !frontComponents.includes(availComp.label) && 
                              !backComponents.includes(availComp.label)
                            )
                            .map((availComp) => (
                              <button
                                key={availComp.id}
                                className="component-dropdown-item"
                                onClick={() => handleSelectComponent(availComp.label, 'front', index)}
                              >
                                <span className="component-dropdown-icon">{availComp.icon}</span>
                                <span className="component-dropdown-label">{availComp.label}</span>
                              </button>
                            ))}
                        </div>
                      )}
                    </div>
                  ) : (
                    // 채워진 슬롯: 일반 컴포넌트 카드
                    <div
                      key={index}
                      className="component-card"
                      draggable
                      onDragStart={() => handleDragStart(index, 'front')}
                      onDragOver={handleDragOver}
                      onDrop={() => handleDrop(index, 'front')}
                    >
                      <button 
                        className="component-delete-x"
                        onClick={() => handleRemoveComponent('front', comp)}
                      >
                        ✕
                      </button>
                      <div className="component-card-icon">
                        {getIconForComponent(comp)}
                      </div>
                      <div className="component-card-label">{comp}</div>
                    </div>
                  )
                ))}
              </div>
            </div>

            {/* 뒷면 */}
            <div className="component-column">
              <div className="column-header">
                <span className="column-label">뒷면</span>
                <span className="column-count">{backComponents.filter(c => c !== null).length} / 3</span>
              </div>
              
              <div className="component-card-grid">
                {backComponents.map((comp, index) => (
                  comp === null ? (
                    // 빈 슬롯: 점선 테두리 + 추가 버튼
                    <div key={index} className="component-dropdown-wrapper">
                      <button 
                        className="add-component-card empty-slot"
                        onClick={() => {
                          setShowBackDropdown(showBackDropdown === index ? null : index);
                          setShowFrontDropdown(null);
                        }}
                      >
                        <div className="add-card-icon">➕</div>
                        <div className="add-card-label">추가</div>
                      </button>
                      
                      {showBackDropdown === index && (
                        <div className="component-dropdown" ref={backDropdownRef}>
                          {availableComponents
                            .filter(availComp => 
                              !backComponents.includes(availComp.label) && 
                              !frontComponents.includes(availComp.label)
                            )
                            .map((availComp) => (
                              <button
                                key={availComp.id}
                                className="component-dropdown-item"
                                onClick={() => handleSelectComponent(availComp.label, 'back', index)}
                              >
                                <span className="component-dropdown-icon">{availComp.icon}</span>
                                <span className="component-dropdown-label">{availComp.label}</span>
                              </button>
                            ))}
                        </div>
                      )}
                    </div>
                  ) : (
                    // 채워진 슬롯: 일반 컴포넌트 카드
                    <div
                      key={index}
                      className="component-card"
                      draggable
                      onDragStart={() => handleDragStart(index, 'back')}
                      onDragOver={handleDragOver}
                      onDrop={() => handleDrop(index, 'back')}
                    >
                      <button 
                        className="component-delete-x"
                        onClick={() => handleRemoveComponent('back', comp)}
                      >
                        ✕
                      </button>
                      <div className="component-card-icon">
                        {getIconForComponent(comp)}
                      </div>
                      <div className="component-card-label">{comp}</div>
                    </div>
                  )
                ))}
              </div>
            </div>
          </div>
        </div>

        )}
        {/* 카드 리스트 섹션 */}
        <div className="cards-section-wrapper">
          {/* 왼쪽: 카드 리스트 */}
          <div className="cards-list-section">
            <div className="cards-header">
              <h2 className="cards-title">단어 카드 리스트 {cards.length}</h2>
              {isEditMode && (
                <button 
                  className="ai-fill-btn"
                  onClick={() => alert('AI로 빈칸 채우기')}
                  title="AI로 빈칸 채우기"
                >
                  🤖 AI로 빈칸 채우기
                </button>
              )}
            </div>

            <div className="cards-list">
              {cards.map((card, cardIndex) => (
                <React.Fragment key={card.id}>
                <div 
                  className={`card-item-compact ${selectedCardId === card.id ? 'selected' : ''}`}
                  onClick={() => setSelectedCardId(card.id)}
                  style={{ cursor: 'pointer' }}
                >
                  <div className="card-header-compact">
                    <div className="card-number-compact">
                      <span className="card-drag-handle">≡</span>
                      {cardIndex + 1}
                    </div>
                    
                    {isEditMode && (
                      <div className="card-actions-compact">
                        <button 
                          className="card-action-btn-compact"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleMoveCard(card.id, 'up');
                          }}
                          disabled={cardIndex === 0}
                          title="위로 이동"
                        >
                          ↑
                        </button>
                        <button 
                          className="card-action-btn-compact"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleMoveCard(card.id, 'down');
                          }}
                          disabled={cardIndex === cards.length - 1}
                          title="아래로 이동"
                        >
                          ↓
                        </button>
                        <button 
                          className="card-action-btn-compact delete"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDeleteCard(card.id);
                          }}
                          title="삭제"
                        >
                          🗑️
                        </button>
                      </div>
                    )}
                  </div>
                  
                  <div className="card-content-compact">
                    {/* 앞면 열 */}
                    <div className="card-column front-column">
                      <div className="column-label-compact">앞면</div>
                      {frontComponents.filter(comp => comp !== null).map((comp, compIndex) => (
                        <div key={compIndex} className="card-field-compact">
                          <label className="field-label-compact">{comp}</label>
                          {comp === '이미지' ? (
                            card.data[comp] ? (
                              <>
                                <div className="image-preview-container">
                                  <img 
                                    src={card.data[comp]} 
                                    alt="preview" 
                                    className="field-image-preview"
                                    onClick={(e) => e.stopPropagation()}
                                    onError={(e) => {
                                      e.target.style.display = 'none';
                                      e.target.nextSibling.style.display = 'flex';
                                    }}
                                  />
                                  <div className="image-error-placeholder" style={{display: 'none'}}>
                                    🖼️ 이미지 로드 실패
                                  </div>
                                </div>
                                <button 
                                  className="clear-field-btn"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleCardChange(card.id, comp, '');
                                  }}
                                >
                                  ✕
                                </button>
                              </>
                            ) : (
                              <button 
                                className="image-add-btn"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  alert('이미지 추가 기능');
                                }}
                              >
                                ➕ 추가
                              </button>
                            )
                          ) : (
                            <>
                              <input
                                type="text"
                                className="field-input-compact"
                                placeholder="내용을 입력해주세요."
                                value={card.data[comp] || ''}
                                onChange={(e) => handleCardChange(card.id, comp, e.target.value)}
                                onClick={(e) => e.stopPropagation()}
                              />
                              {card.data[comp] && (
                                <button 
                                  className="clear-field-btn"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleCardChange(card.id, comp, '');
                                  }}
                                >
                                  ✕
                                </button>
                              )}
                            </>
                          )}
                        </div>
                      ))}
                    </div>
                    
                    {/* 뒷면 열 */}
                    <div className="card-column back-column">
                      <div className="column-label-compact">뒷면</div>
                      {backComponents.filter(comp => comp !== null).map((comp, compIndex) => (
                        <div key={`back-${compIndex}`} className="card-field-compact">
                          <label className="field-label-compact">{comp}</label>
                          <input
                            type="text"
                            className="field-input-compact"
                            placeholder="내용을 입력해주세요."
                            value={card.data[comp] || ''}
                            onChange={(e) => handleCardChange(card.id, comp, e.target.value)}
                            onClick={(e) => e.stopPropagation()}
                          />
                          {card.data[comp] && (
                            <button 
                              className="clear-field-btn"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleCardChange(card.id, comp, '');
                              }}
                            >
                              ✕
                            </button>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                </React.Fragment>
              ))}
            </div>

            {/* 단어 카드 추가 버튼 */}
            {isEditMode && (
            <button className="add-card-btn" onClick={handleAddCard}>
              <span>➕</span>
              <span>단어 카드 추가하기</span>
            </button>
            )}
          </div>

          {/* 오른쪽: 단어 카드 미리보기 */}
          <div className="card-preview-section">
            <div className="preview-header">
              <h3 className="preview-title">단어 카드 미리보기</h3>
            </div>

            <div className="preview-card">
              <button 
                className="card-flip-btn"
                onClick={() => setPreviewSide(previewSide === 'front' ? 'back' : 'front')}
                title="카드 뒤집기"
              >
                🔄
              </button>
              
              {previewSide === 'front' ? (
                <div className="preview-content">
                  {frontComponents.filter(comp => comp !== null).map((comp, index) => {
                    const selectedCard = getSelectedCard();
                    const value = selectedCard?.data[comp] || '';
                    
                    return (
                      <div key={index} className="preview-field">
                        <div className="preview-label">{comp}</div>
                        <div className="preview-value">
                          {comp === '이미지' && value ? (
                            <div className="preview-image-placeholder">
                              <img src={value} alt="preview" onError={(e) => {
                                e.target.style.display = 'none';
                                e.target.nextSibling.style.display = 'flex';
                              }} />
                              <div className="image-placeholder-text" style={{display: 'none'}}>
                                🖼️ 이미지
                              </div>
                            </div>
                          ) : (
                            value || '내용을 입력해주세요.'
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="preview-content">
                  {backComponents.filter(comp => comp !== null).map((comp, index) => {
                    const selectedCard = getSelectedCard();
                    const value = selectedCard?.data[comp] || '';
                    
                    return (
                      <div key={index} className="preview-field">
                        <div className="preview-label">{comp}</div>
                        <div className="preview-value">
                          {comp === '이미지' && value ? (
                            <div className="preview-image-placeholder">
                              <img src={value} alt="preview" onError={(e) => {
                                e.target.style.display = 'none';
                                e.target.nextSibling.style.display = 'flex';
                              }} />
                              <div className="image-placeholder-text" style={{display: 'none'}}>
                                🖼️ 이미지
                              </div>
                            </div>
                          ) : (
                            value || '내용을 입력해주세요.'
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      {/* AI로 만들기 모달 */}
      {showAIModal && (
        <div className="modal-overlay" onClick={() => setShowAIModal(false)}>
          <div className="ai-modal" onClick={(e) => e.stopPropagation()}>
            <div className="ai-modal-header">
              <h2 className="ai-modal-title">✨ AI로 만들기</h2>
              <button className="modal-close-btn" onClick={() => setShowAIModal(false)}>
                ✕
              </button>
            </div>

            <div className="ai-modal-content">
              {/* 단어 카드 구성요소 선택 */}
              <div className="ai-modal-section">
                <label className="ai-modal-label">단어 카드 구성요소</label>
                
                {/* 앞면 구성요소 */}
                <div className="ai-component-side">
                  <div className="ai-side-label">앞면</div>
                  <div className="ai-slots-grid">
                    {aiFrontSlots.map((slot, index) => (
                      slot === null ? (
                        // 빈 슬롯 - +추가 버튼
                        <div key={`front-slot-${index}`} className="ai-slot-wrapper">
                          <button 
                            className="ai-slot-card empty"
                            onClick={() => {
                              setShowAIFrontDropdown(showAIFrontDropdown === index ? null : index);
                              setShowAIBackDropdown(null);
                            }}
                          >
                            <div className="ai-slot-icon">➕</div>
                            <div className="ai-slot-label">추가</div>
                          </button>
                          
                          {showAIFrontDropdown === index && (
                            <div className="ai-slot-dropdown" ref={aiFrontDropdownRef}>
                              {availableComponents
                                .filter(comp => 
                                  !aiFrontSlots.includes(comp.label) && 
                                  !aiBackSlots.includes(comp.label)
                                )
                                .map((comp) => (
                                  <button
                                    key={comp.id}
                                    className="ai-dropdown-item"
                                    onClick={() => handleAISelectComponent(comp.label, 'front', index)}
                                  >
                                    <span className="ai-dropdown-icon">{comp.icon}</span>
                                    <span className="ai-dropdown-label">{comp.label}</span>
                                  </button>
                                ))}
                            </div>
                          )}
                        </div>
                      ) : (
                        // 채워진 슬롯 - 구성요소 카드
                        <div key={`front-slot-${index}`} className="ai-slot-card filled">
                          <button 
                            className="ai-slot-delete"
                            onClick={() => handleAIRemoveComponent('front', slot)}
                          >
                            ✕
                          </button>
                          <div className="ai-slot-icon">{getIconForComponent(slot)}</div>
                          <div className="ai-slot-label">{slot}</div>
                        </div>
                      )
                    ))}
                  </div>
                </div>

                {/* 뒷면 구성요소 */}
                <div className="ai-component-side">
                  <div className="ai-side-label">뒷면</div>
                  <div className="ai-slots-grid">
                    {aiBackSlots.map((slot, index) => (
                      slot === null ? (
                        // 빈 슬롯 - +추가 버튼
                        <div key={`back-slot-${index}`} className="ai-slot-wrapper">
                          <button 
                            className="ai-slot-card empty"
                            onClick={() => {
                              setShowAIBackDropdown(showAIBackDropdown === index ? null : index);
                              setShowAIFrontDropdown(null);
                            }}
                          >
                            <div className="ai-slot-icon">➕</div>
                            <div className="ai-slot-label">추가</div>
                          </button>
                          
                          {showAIBackDropdown === index && (
                            <div className="ai-slot-dropdown" ref={aiBackDropdownRef}>
                              {availableComponents
                                .filter(comp => 
                                  !aiBackSlots.includes(comp.label) && 
                                  !aiFrontSlots.includes(comp.label)
                                )
                                .map((comp) => (
                                  <button
                                    key={comp.id}
                                    className="ai-dropdown-item"
                                    onClick={() => handleAISelectComponent(comp.label, 'back', index)}
                                  >
                                    <span className="ai-dropdown-icon">{comp.icon}</span>
                                    <span className="ai-dropdown-label">{comp.label}</span>
                                  </button>
                                ))}
                            </div>
                          )}
                        </div>
                      ) : (
                        // 채워진 슬롯 - 구성요소 카드
                        <div key={`back-slot-${index}`} className="ai-slot-card filled">
                          <button 
                            className="ai-slot-delete"
                            onClick={() => handleAIRemoveComponent('back', slot)}
                          >
                            ✕
                          </button>
                          <div className="ai-slot-icon">{getIconForComponent(slot)}</div>
                          <div className="ai-slot-label">{slot}</div>
                        </div>
                      )
                    ))}
                  </div>
                </div>
              </div>

              {/* 단어장 선택 */}
              <div className="ai-modal-section">
                <label className="ai-modal-label">단어장</label>
                <div className="ai-data-source">
                  <label className="ai-radio-item">
                    <input type="radio" name="dataSource" value="elementary" defaultChecked />
                    <span>(초등) 교육부 지정 필수 초등 영단어 800개</span>
                  </label>
                  <label className="ai-radio-item">
                    <input type="radio" name="dataSource" value="secondary" />
                    <span>(중고등) 교육부 지정 필수 영단어 1800개</span>
                  </label>
                  <label className="ai-radio-item">
                    <input type="radio" name="dataSource" value="high" />
                    <span>(고등) 교육부 지정 필수 영단어 400개</span>
                  </label>
                  <label className="ai-radio-item">
                    <input type="radio" name="dataSource" value="textbook" />
                    <span>(초등) 영어 교재</span>
                  </label>
                </div>
              </div>

              {/* 단어 카드 수 + 중복 방지 토글 */}
              <div className="ai-modal-section">
                <div className="ai-slider-header">
                  <div className="ai-card-count-wrapper">
                    <label className="ai-modal-label">단어 카드 수</label>
                    <input 
                      type="number" 
                      className="ai-card-count-input" 
                      min="5" 
                      max="100" 
                      defaultValue="20"
                      style={{
                        width: '70px',
                        padding: '6px 10px',
                        border: '1px solid #e5e7eb',
                        borderRadius: '6px',
                        fontSize: '14px',
                        fontWeight: '600',
                        textAlign: 'center',
                        marginLeft: '12px'
                      }}
                    />
                  </div>
                  <label className="ai-toggle-wrapper">
                    <span className="ai-toggle-label">단어 중복 방지</span>
                    <input type="checkbox" className="ai-toggle-input" defaultChecked />
                    <span className="ai-toggle-slider"></span>
                  </label>
                </div>
              </div>
            </div>

            <div className="ai-modal-footer">
              <button className="ai-modal-cancel" onClick={() => setShowAIModal(false)}>
                취소
              </button>
              <button className="ai-modal-create" onClick={() => {
                alert('AI로 단어 카드 생성!');
                setShowAIModal(false);
              }}>
                ✨ 카드 생성하기
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 내 데이터로 만들기 모달 */}
      {showDataModal && (
        <div className="modal-overlay" onClick={() => setShowDataModal(false)}>
          <div className="data-modal" onClick={(e) => e.stopPropagation()}>
            <div className="data-modal-header">
              <h2 className="data-modal-title">📊 내 데이터로 만들기</h2>
              <button className="modal-close-btn" onClick={() => setShowDataModal(false)}>
                ✕
              </button>
            </div>

            <div className="data-modal-content">
              <div className="data-upload-area">
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
                <p className="data-upload-text">파일을 업로드 또는 드래그 앤 드롭 하세요.</p>
                <p className="data-upload-info">xlsx, csv 지원 (5MB이하)</p>
                <p className="data-upload-warning">⚠️ 형식에 맞는 파일만 업로드 됩니다.</p>
              </div>
            </div>

            <div className="data-modal-footer">
              <button className="data-modal-cancel" onClick={() => setShowDataModal(false)}>
                취소
              </button>
              <button className="data-modal-upload" onClick={() => {
                alert('파일 업로드 처리!');
                setShowDataModal(false);
              }}>
                📊 업로드하기
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default VocabularySample;