import { useState, useEffect, useRef } from 'react';
import './TextResult.css';
import Header from './Header';

function TextResult({ onNavigate, currentPage, textData, whiteboardMode = false }) {
  const [showMoreDropdown, setShowMoreDropdown] = useState(false);
  const [showResultModal, setShowResultModal] = useState(false);
  const [isWhiteboardMode, setIsWhiteboardMode] = useState(whiteboardMode);
  const [selectedTool, setSelectedTool] = useState('select');
  const [isEditMode, setIsEditMode] = useState(false);
  const [userAnswers, setUserAnswers] = useState({
    q1: null,
    q2: null,
    q3: null
  });

  // 문제 데이터 state
  const [questions, setQuestions] = useState([
    {
      id: 'q1',
      number: 1,
      title: '1. (내용 이해) 윗글의 중심 내용으로 가장 적절한 것은?',
      options: [
        { id: 1, text: '플라시보는 항상 병을 완전히 치료한다.' },
        { id: 2, text: '플라시보와 노시보는 기대와 불안이 몸의 반응에 영향을 줄 수 있음을 보여 준다.' },
        { id: 3, text: '노시보 효과는 약 성분이 강할수록 더 크게 나타난다.' },
        { id: 4, text: '플라시보 효과는 오직 기분 변화로만 설명된다.' }
      ]
    },
    {
      id: 'q2',
      number: 2,
      title: '2. (어휘력) 2문단에서 \'기대\'의 의미로 가장 알맞은 것은?',
      options: [
        { id: 1, text: '어떤 일이 일어날 것이라고 미리 바라거나 믿는 마음' },
        { id: 2, text: '남의 행동을 비판적으로 평가하는 태도' },
        { id: 3, text: '위험을 피하려고 조심하는 습관' },
        { id: 4, text: '과거의 경험을 정확히 떠올리는 능력' }
      ]
    },
    {
      id: 'q3',
      number: 3,
      title: '3. (추론) 글의 설명을 바탕으로 할 때, 노시보 효과의 예로 가장 알맞은 것은?',
      options: [
        { id: 1, text: '약을 먹지 않았는데도 병이 저절로 나았다고 느낀다.' },
        { id: 2, text: '"이 약은 부작용이 심할 거야"라고 생각한 뒤 실제로 속이 메스껍다고 느낀다.' },
        { id: 3, text: '운동을 꾸준히 해서 체력이 좋아진다.' },
        { id: 4, text: '충분히 잠을 자서 피로가 줄어든다.' }
      ]
    }
  ]);

  const moreDropdownRef = useRef(null);

  // 정답 정의
  const correctAnswers = {
    q1: 2,
    q2: 1,
    q3: 2
  };

  // 문제 순서 변경
  const handleMoveQuestion = (questionId, direction) => {
    const index = questions.findIndex(q => q.id === questionId);
    const newIndex = direction === 'up' ? index - 1 : index + 1;
    
    if (newIndex >= 0 && newIndex < questions.length) {
      const newQuestions = [...questions];
      [newQuestions[index], newQuestions[newIndex]] = [newQuestions[newIndex], newQuestions[index]];
      
      // 문제 번호 재정렬
      newQuestions.forEach((q, idx) => {
        q.number = idx + 1;
        q.title = q.title.replace(/^\d+\./, `${idx + 1}.`);
      });
      
      setQuestions(newQuestions);
    }
  };

  // 문제 삭제
  const handleDeleteQuestion = (questionId) => {
    if (questions.length > 1) {
      const newQuestions = questions.filter(q => q.id !== questionId);
      
      // 문제 번호 재정렬
      newQuestions.forEach((q, idx) => {
        q.number = idx + 1;
        q.title = q.title.replace(/^\d+\./, `${idx + 1}.`);
      });
      
      setQuestions(newQuestions);
      
      // 해당 문제의 답변 제거
      const newUserAnswers = { ...userAnswers };
      delete newUserAnswers[questionId];
      setUserAnswers(newUserAnswers);
    } else {
      alert('최소 1개의 문제가 필요합니다.');
    }
  };

  // 보기 순서 변경
  const handleMoveOption = (questionId, optionId, direction) => {
    const question = questions.find(q => q.id === questionId);
    const optionIndex = question.options.findIndex(o => o.id === optionId);
    const newIndex = direction === 'up' ? optionIndex - 1 : optionIndex + 1;
    
    if (newIndex >= 0 && newIndex < question.options.length) {
      const newQuestions = questions.map(q => {
        if (q.id === questionId) {
          const newOptions = [...q.options];
          [newOptions[optionIndex], newOptions[newIndex]] = [newOptions[newIndex], newOptions[optionIndex]];
          return { ...q, options: newOptions };
        }
        return q;
      });
      
      setQuestions(newQuestions);
    }
  };

  // 보기 삭제
  const handleDeleteOption = (questionId, optionId) => {
    const question = questions.find(q => q.id === questionId);
    
    if (question.options.length > 2) {
      const newQuestions = questions.map(q => {
        if (q.id === questionId) {
          const newOptions = q.options.filter(o => o.id !== optionId);
          
          // 옵션 ID 재정렬
          newOptions.forEach((option, idx) => {
            option.id = idx + 1;
          });
          
          return { ...q, options: newOptions };
        }
        return q;
      });
      
      setQuestions(newQuestions);
    } else {
      alert('최소 2개의 보기가 필요합니다.');
    }
  };

  // 보기 추가
  const handleAddOption = (questionId) => {
    const newQuestions = questions.map(q => {
      if (q.id === questionId) {
        const newOptionId = Math.max(...q.options.map(o => o.id), 0) + 1;
        const newOption = {
          id: newOptionId,
          text: '새로운 보기를 입력하세요.'
        };
        return { ...q, options: [...q.options, newOption] };
      }
      return q;
    });
    
    setQuestions(newQuestions);
  };

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

  // 답안 선택 핸들러
  const handleAnswerSelect = (questionId, answerNumber) => {
    setUserAnswers({
      ...userAnswers,
      [questionId]: answerNumber
    });
  };

  // 채점하기
  const handleSubmit = () => {
    // 모든 문제를 풀었는지 확인
    if (userAnswers.q1 === null || userAnswers.q2 === null || userAnswers.q3 === null) {
      alert('모든 문제를 풀어주세요.');
      return;
    }
    setShowResultModal(true);
  };

  // 맞은 문제 수 계산
  const calculateScore = () => {
    let correct = 0;
    Object.keys(correctAnswers).forEach(key => {
      if (userAnswers[key] === correctAnswers[key]) {
        correct++;
      }
    });
    return correct;
  };

  // 문제 만들기 버튼 핸들러
  const handleCreateWorkbook = () => {
    const workbookData = {
      title: '플라시보와 노시보',
      ageGroup: '초등 고학년',
      subject: '어휘',
      questionTypes: ['choice', 'ox', 'short', 'match'],
      questionCount: 10,
      selectedProject: 4 // 플라시보와 노시보 프로젝트 ID
    };
    onNavigate('workbooksetuptext', workbookData);
  };

  // 문제 순서 변경
  const moveQuestion = (index, direction) => {
    const newQuestions = [...questions];
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    
    if (targetIndex < 0 || targetIndex >= newQuestions.length) return;
    
    [newQuestions[index], newQuestions[targetIndex]] = [newQuestions[targetIndex], newQuestions[index]];
    
    // 문제 번호 재정렬
    newQuestions.forEach((q, i) => {
      q.number = i + 1;
      q.title = q.title.replace(/^\d+\./, `${i + 1}.`);
    });
    
    setQuestions(newQuestions);
  };

  // 보기 순서 변경
  const moveOption = (questionIndex, optionIndex, direction) => {
    const newQuestions = [...questions];
    const question = newQuestions[questionIndex];
    const targetIndex = direction === 'up' ? optionIndex - 1 : optionIndex + 1;
    
    if (targetIndex < 0 || targetIndex >= question.options.length) return;
    
    [question.options[optionIndex], question.options[targetIndex]] = 
      [question.options[targetIndex], question.options[optionIndex]];
    
    setQuestions(newQuestions);
  };

  const score = calculateScore();
  const totalQuestions = 3;
  const percentage = Math.round((score / totalQuestions) * 100);

  return (
    <div className="text-result">
      {/* 헤더 */}
      <Header 
        onNavigate={onNavigate}
        currentPage={currentPage}
        userName="사만원"
        centerContent={
          <div className="tr-header-center">
<div className="tr-header-center">
  {!isWhiteboardMode && (
    <button className="tr-back-btn" onClick={() => onNavigate('text-setup')}>
      ‹
    </button>
  )}
  <h1 className="tr-title">플라시보와 노시보</h1>
</div>
            <h1 className="tr-title"></h1>
          </div>
        }
      />

      {/* 탭바 */}
      <nav className="tr-tabs">
        <div className="tr-tabs-left">
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
        </div>
        
        <div className="tr-tabs-right">
          {isWhiteboardMode ? (
            <>
            <button 
                className="tr-action-btn layout-btn"
                onClick={() => alert('화면구성')}
                title="화면구성"
              >
                📐 화면구성
              </button>
              <button 
                className="tr-action-btn fullscreen-btn"
                onClick={() => alert('전체화면')}
                title="전체화면"
              >
                ⛶ 전체화면
              </button>
              <button 
                className="tr-action-btn save-btn"
                onClick={() => alert('저장하기')}
                title="저장하기"
              >
                💾 저장하기
              </button>
              <div className="tr-more-dropdown-wrapper" ref={moreDropdownRef}>
                {showMoreDropdown && (
                  <div className="tr-more-dropdown">
                    <button 
                      className="tr-dropdown-item"
                      onClick={() => {
                        setShowMoreDropdown(false);
                        alert('공유 기능');
                      }}
                    >
                      <span className="tr-dropdown-icon">✈️</span>
                      <span>공유</span>
                    </button>
                    <button 
                      className="tr-dropdown-item"
                      onClick={() => {
                        setShowMoreDropdown(false);
                        alert('설정');
                      }}
                    >
                      <span className="tr-dropdown-icon">⚙️</span>
                      <span>설정</span>
                    </button>
                  </div>
                )}
              </div>
            </>
          ) : isEditMode ? (
            // 편집 모드: 저장하기 버튼만 표시
            <button 
              className="tr-action-btn save-btn"
              onClick={() => {
                setIsEditMode(false);
                alert('변경사항이 저장되었습니다.');
              }}
              title="저장하기"
            >
              💾 저장하기
            </button>
          ) : (
            // 보기 모드: 편집하기, 내려받기, 문제 만들기, 더보기 표시
            <>
              <button 
                className="tr-action-btn edit-btn"
                onClick={() => setIsEditMode(true)}
                title="편집하기"
              >
                ✂️ 편집하기
              </button>
              <button 
                className="tr-action-btn download-btn"
                onClick={() => alert('내려받기')}
                title="내려받기"
              >
                ⬇️ 내려받기
              </button>
              <button 
                className="tr-action-btn problem-btn"
                onClick={handleCreateWorkbook}
                title="문제 만들기"
              >
                ✏️ 문제 만들기
              </button>


              <div className="tr-more-dropdown-wrapper" ref={moreDropdownRef}>
                <button 
                  className="tr-action-btn more-btn"
                  onClick={() => setShowMoreDropdown(!showMoreDropdown)}
                  title="더보기"
                >
                  ⋯ 더보기
                </button>
                {showMoreDropdown && (
                  <div className="tr-more-dropdown">
                    <button 
                      className="tr-dropdown-item"
                      onClick={() => {
                        setShowMoreDropdown(false);
                        alert('공유 기능');
                      }}
                    >
                      <span className="tr-dropdown-icon">✈️</span>
                      <span>공유</span>
                    </button>
                    <button 
                      className="tr-dropdown-item"
                      onClick={() => {
                        setShowMoreDropdown(false);
                        setIsWhiteboardMode(true);
                      }}
                    >
                      <span className="tr-dropdown-icon">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <rect x="2" y="3" width="20" height="14" rx="2" />
                          <line x1="8" y1="21" x2="16" y2="21" />
                          <line x1="12" y1="17" x2="12" y2="21" />
                        </svg>
                      </span>
                      <span>판서</span>
                    </button>
                    <button 
                      className="tr-dropdown-item"
                      onClick={() => {
                        setShowMoreDropdown(false);
                        alert('설정');
                      }}
                    >
                      <span className="tr-dropdown-icon">⚙️</span>
                      <span>설정</span>
                    </button>
                  </div>
                )}
              </div>
            </>
          )}
        </div>
      </nav>

      {/* 메인 콘텐츠 */}
      <main className="tr-main">
        <div className="tr-content-wrapper">
          {/* 왼쪽: 지문 */}
          <div className="tr-passage-section">
            <div className="tr-passage-card">
              <h2 className="tr-section-title">지문</h2>
              <div className="tr-passage-content">
                <p>약을 먹었는데 실제 성분과 상관없이 몸이 좋아졌다고 느낀 적이 있다면, 우리는 플라시보(placebo) 효과를 떠올릴 수 있다. 플라시보는 원래 '기쁘게 하다'라는 뜻의 라틴어에서 온 말로, 약효가 없는 가짜 약이나 처치를 가리키기도 한다. 중요한 것은 약의 성분보다도 "효과가 있을 것"이라는 기대가 몸의 반응을 바꿀 수 있다는 점이다.</p>
                
                <p>플라시보 효과는 단순한 기분 문제가 아니라, 사람의 인지와 신체 반응이 연결되어 나타나는 현상으로 설명된다. 예를 들어 통증이 줄었다고 말하는 사람들은 실제로 통증을 조절하는 뇌의 작용이 달라지는 경우가 보고된다. 또한 의사가 자신 있게 설명하거나, 약의 모양·색·가격이 "강력해 보이는" 인상을 줄 때 기대가 커져 효과가 더 크게 나타나기도 한다.</p>
                
                <p>반대로, 나쁜 일이 생길 것이라는 믿음이 몸에 불편함을 만들어 내는 경우도 있다. 이를 노시보(nocebo) 효과라고 한다. 노시보는 '해를 끼치다'라는 뜻과 관련이 있으며, 실제로 해로운 성분이 없더라도 "부작용이 있을 것"이라는 생각이 두통, 메스꺼움, 피로 같은 증상을 일으키게 만들 수 있다. 즉 플라시보가 '좋아질 것이라는 기대'라면, 노시보는 '나빠질 것이라는 불안'과 연결된다.</p>
                
                <p>이 두 효과는 의료 현장뿐 아니라 일상에서도 나타난다. 어떤 음식을 먹으면 항상 탈이 난다고 믿는 사람은 같은 음식을 먹었을 때 더 쉽게 속이 불편해질 수 있고, 특정 날씨가 오면 몸이 아프다고 생각하는 사람은 실제로 컨디션이 더 떨어졌다고 느낄 수 있다. 다만 이런 현상이 "상상이라서 의미 없다"는 뜻은 아니다. 오히려 사람의 믿음과 해석이 몸의 상태를 바꾸는 힘을 가진다는 점을 보여 준다.</p>
                
                <p>그래서 치료나 상담에서는 플라시보와 노시보를 모두 고려해야 한다. 환자가 과도한 불안을 갖지 않도록 설명을 조절하고, 동시에 무조건 희망만 주기보다는 정확한 정보로 기대를 현실적으로 맞추는 것이 중요하다. 결국 중요한 것은 마음과 몸이 따로 움직이지 않으며, 우리가 무엇을 믿고 어떻게 받아들이는지가 우리의 경험을 달라지게 할 수 있다는 사실이다.</p>
              </div>
            </div>
          </div>

          {/* 오른쪽: 문제 */}
          <div className="tr-questions-section">
            <div className="tr-questions-card">
              <h2 className="tr-section-title">문제</h2>
              
              {/* 문제 목록 */}
              {questions.map((question, qIndex) => (
                <div key={question.id} className="tr-question">
                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                    <h3 className="tr-question-title" style={{ flex: 1 }}>
                      {question.title}
                    </h3>
                    {isEditMode && (
                      <div style={{ display: 'flex', gap: '8px' }}>
                        <div style={{ display: 'flex', gap: '4px' }}>
                          <button
                            onClick={() => moveQuestion(qIndex, 'up')}
                            disabled={qIndex === 0}
                            style={{
                              padding: '4px 8px',
                              border: '1px solid #e5e7eb',
                              borderRadius: '4px',
                              background: 'white',
                              cursor: qIndex === 0 ? 'not-allowed' : 'pointer',
                              fontSize: '14px',
                              opacity: qIndex === 0 ? 0.5 : 1
                            }}
                          >
                            ↑
                          </button>
                          <button
                            onClick={() => moveQuestion(qIndex, 'down')}
                            disabled={qIndex === questions.length - 1}
                            style={{
                              padding: '4px 8px',
                              border: '1px solid #e5e7eb',
                              borderRadius: '4px',
                              background: 'white',
                              cursor: qIndex === questions.length - 1 ? 'not-allowed' : 'pointer',
                              fontSize: '14px',
                              opacity: qIndex === questions.length - 1 ? 0.5 : 1
                            }}
                          >
                            ↓
                          </button>
                        </div>
                        <button
                          onClick={() => handleDeleteQuestion(question.id)}
                          style={{
                            padding: '4px 8px',
                            border: '1px solid #ef4444',
                            borderRadius: '4px',
                            background: 'white',
                            color: '#ef4444',
                            cursor: 'pointer',
                            fontSize: '12px',
                            height: 'fit-content'
                          }}
                          title="문제 삭제"
                        >
                          🗑️
                        </button>
                      </div>
                    )}
                  </div>
                  <div className="tr-options">
                    {question.options.map((option, oIndex) => (
                      <div key={option.id} style={{ position: 'relative' }}>
                        {/* 편집 모드일 때 X 삭제 버튼 (보기창 우상단에 걸침) */}
                        {isEditMode && (
                          <button
                            onClick={(e) => {
                              e.preventDefault();
                              e.stopPropagation();
                              handleDeleteOption(question.id, option.id);
                            }}
                            style={{
                              position: 'absolute',
                              top: '-8px',
                              right: '-8px',
                              width: '22px',
                              height: '22px',
                              border: '2px solid #d1d5db',
                              borderRadius: '50%',
                              background: 'white',
                              color: '#d1d5db',
                              cursor: 'pointer',
                              fontSize: '16px',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              zIndex: 10,
                              fontWeight: 'bold',
                              lineHeight: 1,
                              transition: 'all 0.2s',
                              boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)'
                            }}
                            onMouseEnter={(e) => {
                              e.currentTarget.style.borderColor = '#ef4444';
                              e.currentTarget.style.color = '#ef4444';
                            }}
                            onMouseLeave={(e) => {
                              e.currentTarget.style.borderColor = '#d1d5db';
                              e.currentTarget.style.color = '#d1d5db';
                            }}
                            title="보기 삭제"
                          >
                            ×
                          </button>
                        )}
                        
                        <label className={`tr-option ${userAnswers[question.id] === option.id ? 'selected' : ''}`} style={{ 
                          display: 'flex',
                          alignItems: 'center',
                          gap: '12px',
                          position: 'relative'
                        }}>
                          <input 
                            type="radio" 
                            name={question.id}
                            onChange={() => handleAnswerSelect(question.id, option.id)}
                          />
                          <span className="tr-option-number">{['①', '②', '③', '④'][oIndex]}</span>
                          <span className="tr-option-text" style={{ flex: 1 }}>{option.text}</span>
                          
                          {/* 편집 모드일 때 햄버거 아이콘 (오른쪽) */}
                          {isEditMode && (
                            <div 
                              style={{ 
                                display: 'flex', 
                                flexDirection: 'column', 
                                gap: '3px',
                                cursor: 'grab',
                                padding: '8px',
                                flexShrink: 0,
                                marginLeft: 'auto'
                              }}
                              title="위/아래 드래그하여 순서 변경"
                            >
                              <div style={{ width: '18px', height: '2px', background: '#9ca3af', borderRadius: '1px' }}></div>
                              <div style={{ width: '18px', height: '2px', background: '#9ca3af', borderRadius: '1px' }}></div>
                              <div style={{ width: '18px', height: '2px', background: '#9ca3af', borderRadius: '1px' }}></div>
                            </div>
                          )}
                        </label>
                      </div>
                    ))}
                  </div>
                  
                  {/* 편집 모드일 때 보기 추가 버튼 */}
                  {isEditMode && (
                    <button
                      onClick={() => handleAddOption(question.id)}
                      style={{
                        width: '100%',
                        padding: '12px',
                        marginTop: '12px',
                        border: '2px dashed #d1d5db',
                        borderRadius: '10px',
                        background: 'white',
                        color: '#6b7280',
                        cursor: 'pointer',
                        fontSize: '14px',
                        fontWeight: 500,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '8px',
                        transition: 'all 0.2s'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.borderColor = '#8b5cf6';
                        e.currentTarget.style.color = '#8b5cf6';
                        e.currentTarget.style.background = '#f5f3ff';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.borderColor = '#d1d5db';
                        e.currentTarget.style.color = '#6b7280';
                        e.currentTarget.style.background = 'white';
                      }}
                      title="보기 추가"
                    >
                      <span style={{ fontSize: '18px' }}>+</span>
                      <span>보기 추가하기</span>
                    </button>
                  )}
                </div>
              ))}

              {/* 채점하기 버튼 */}
              {!isWhiteboardMode && !isEditMode && (
                <button className="tr-submit-btn" onClick={handleSubmit}>
                  채점하기
                </button>
              )}
            </div>
          </div>
        </div>

        {/* 화이트보드 모드일 때 좌측 도구바 */}
        {isWhiteboardMode && (
          <div className="tr-toolbar">
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
              ◇
            </button>
            <button 
              className={`tool-btn ${selectedTool === 'text' ? 'active' : ''}`}
              onClick={() => setSelectedTool('text')}
              title="텍스트"
            >
              T
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
      </main>

      {/* 결과 모달 */}
      {showResultModal && (
        <div className="tr-modal-overlay" onClick={() => setShowResultModal(false)}>
          <div className="tr-modal" onClick={(e) => e.stopPropagation()}>
            <div className="tr-modal-header">
              <h2 className="tr-modal-title">수고하셨어요!</h2>
              <button className="tr-modal-close" onClick={() => setShowResultModal(false)}>
                ✕
              </button>
            </div>
            
            <div className="tr-modal-content">
              {/* 2열 레이아웃 */}
              <div className="tr-result-layout">
                {/* 왼쪽: 원형 차트 */}
                <div className="tr-result-left">
                  <div className="tr-score-circle">
                    <div className="tr-score-text">
                      <span className="tr-score-label"></span>
                      <span className="tr-score-number">{score}</span>
                      <span className="tr-score-percentage">정답률 {percentage}%</span>
                    </div>
                    <svg className="tr-score-ring" width="200" height="200">
                      <circle
                        cx="100"
                        cy="100"
                        r="85"
                        fill="none"
                        stroke="#e5e7eb"
                        strokeWidth="15"
                      />
                      <circle
                        cx="100"
                        cy="100"
                        r="85"
                        fill="none"
                        stroke="url(#gradient)"
                        strokeWidth="15"
                        strokeLinecap="round"
                        strokeDasharray={`${(score / totalQuestions) * 534} 534`}
                        transform="rotate(-90 100 100)"
                      />
                      <defs>
                        <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                          <stop offset="0%" stopColor="#a78bfa" />
                          <stop offset="100%" stopColor="#6366f1" />
                        </linearGradient>
                      </defs>
                    </svg>
                  </div>
                </div>

                {/* 오른쪽: 문제별 결과 카드 */}
                <div className="tr-result-right">
                  <div className={`tr-question-card ${userAnswers.q1 === correctAnswers.q1 ? 'correct' : 'incorrect'}`}>
                    <div className="tr-card-header">
                      <span className="tr-card-number">1번 내용 이해</span>
                      <span className="tr-card-icon">
                        {userAnswers.q1 === correctAnswers.q1 ? '○' : '✕'}
                      </span>
                    </div>
                  </div>

                  <div className={`tr-question-card ${userAnswers.q2 === correctAnswers.q2 ? 'correct' : 'incorrect'}`}>
                    <div className="tr-card-header">
                      <span className="tr-card-number">2번 어휘력</span>
                      <span className="tr-card-icon">
                        {userAnswers.q2 === correctAnswers.q2 ? '○' : '✕'}
                      </span>
                    </div>
                  </div>

                  <div className={`tr-question-card ${userAnswers.q3 === correctAnswers.q3 ? 'correct' : 'incorrect'}`}>
                    <div className="tr-card-header">
                      <span className="tr-card-number">3번 추론</span>
                      <span className="tr-card-icon">
                        {userAnswers.q3 === correctAnswers.q3 ? '○' : '✕'}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* 하단 상세 정보 */}
              <div className="tr-result-details">
                <div className="tr-detail-row">
                  <span className="tr-detail-label">총 문제 수</span>
                  <span className="tr-detail-value">{totalQuestions}</span>
                </div>
                <div className="tr-detail-row">
                  <span className="tr-detail-label">정답률</span>
                  <span className="tr-detail-value">{percentage}%</span>
                </div>
                <div className="tr-detail-row">
                  <span className="tr-detail-label">학습 일시</span>
                  <span className="tr-detail-value">{new Date().toLocaleString('ko-KR')}</span>
                </div>
                <div className="tr-detail-row">
                  <span className="tr-detail-label">제출 일시</span>
                  <span className="tr-detail-value">{new Date().toLocaleString('ko-KR')}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default TextResult;