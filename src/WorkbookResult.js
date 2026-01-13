import React, { useState, useRef, useEffect } from 'react';
import './WorkbookResult.css';
import Header from './Header';

function WorkbookResult({ onNavigate, currentPage, workbookData }) {
  const [showMoreDropdown, setShowMoreDropdown] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const moreDropdownRef = useRef(null);

  // 숫자를 원문자로 변환하는 함수
  const toCircledNumber = (num) => {
    const circledNumbers = ['①', '②', '③', '④', '⑤', '⑥', '⑦', '⑧', '⑨', '⑩'];
    return circledNumbers[num - 1] || num.toString();
  };

  // 초기 문제 데이터 (MD 파일의 문제들 + 해설 포함)
  const [questions, setQuestions] = useState([
    { id: 1, type: '선택형', question: '다음 중 **광합성의 정의**로 가장 알맞은 것은?', options: ['식물이 빛을 이용하여 **이산화탄소와 물로부터 양분을 만들고 산소를 내보내는 과정**입니다.', '식물이 뿌리에서 흡수한 물을 잎에서 증발시키는 과정입니다.', '식물이 밤에만 기체를 교환하는 과정입니다.', '식물이 산소를 흡수하여 에너지를 얻는 과정입니다.', '식물이 세포 분열로 개체 수를 늘리는 과정입니다.'], answer: '①', explanation: '광합성은 빛 에너지를 이용하여 이산화탄소와 물로부터 양분(포도당 등)을 만들고 산소를 만드는 과정입니다. ②는 물이 잎에서 증발하는 증산 작용에 해당합니다. ③은 기체 교환이 밤에만 일어난다는 내용인데, 기체 교환은 낮과 밤 모두 가능합니다. ④는 산소를 이용하여 에너지를 얻는 호흡에 해당합니다. ⑤는 생식·생장과 관련된 설명입니다. 그러므로 정답은 ① 입니다.' },
    { id: 2, type: '선택형', question: '광합성이 주로 일어나는 장소로 가장 알맞은 것은?', options: ['뿌리털', '엽록체', '기공', '잎맥(관다발)', '씨'], answer: '②', explanation: '광합성은 식물 세포 안의 엽록체에서 주로 일어납니다. ①은 물과 양분을 흡수하는 구조입니다. ③은 기체가 드나드는 통로입니다. ④는 물과 양분을 이동시키는 통로입니다. ⑤는 씨앗의 부분으로 광합성이 일어나는 장소라고 보기 어렵습니다. 그러므로 정답은 ② 입니다.' },
    { id: 3, type: '다중선택형', question: '다음 중 **광합성에 \'재료(들어가는 물질)\'**로 해당하는 것을 모두 고르시오.', options: ['물', '산소', '이산화탄소', '포도당', '빛(빛 에너지)'], answer: '①, ③, ⑤', explanation: '광합성은 물과 이산화탄소가 반응하여 포도당과 산소가 만들어지는 과정이며, 이때 빛 에너지가 필요합니다. ①은 광합성의 재료입니다. ③은 광합성의 재료입니다. ⑤는 반응을 진행시키는 데 필요한 에너지입니다. ②는 광합성의 결과로 만들어지는 물질입니다. ④는 광합성으로 만들어지는 양분입니다. 그러므로 정답은 ①, ③, ⑤ 입니다.' },
    { id: 4, type: '선택형', question: '잎의 **기공**에 대한 설명으로 가장 알맞은 것은?', options: ['빛을 흡수하는 색소입니다.', '광합성으로 만들어진 양분을 저장하는 기관입니다.', '잎에서 **기체가 드나드는 통로**입니다.', '물을 흡수하는 구조입니다.', '씨가 발아할 때 자라는 부분입니다.'], answer: '③', explanation: '기공은 잎에서 이산화탄소가 들어오고 산소와 수증기가 나갈 수 있는 통로입니다. ①은 엽록소의 설명입니다. ②는 저장 기관(예: 뿌리, 줄기 등)에 대한 설명에 가깝습니다. ④는 뿌리털과 관련된 설명입니다. ⑤는 발아 과정의 기관 설명입니다. 그러므로 정답은 ③ 입니다.' },
    { id: 5, type: '단답형', question: '광합성 결과 만들어지는 대표적인 **양분**의 이름을 쓰시오.', answer: '포도당', explanation: '광합성으로 만들어지는 대표적인 양분은 포도당이며, 포도당은 식물이 에너지를 저장하고 이용하는 데 사용됩니다. 그러므로 정답은 포도당 입니다.' },
    { id: 6, type: 'OX 선택형', question: '광합성은 빛 에너지를 이용하여 화학 에너지(양분)로 저장하는 과정입니다.', answer: 'O', explanation: '광합성은 빛 에너지를 포도당과 같은 양분 속에 화학 에너지 형태로 저장하는 과정입니다. 그러므로 정답은 O 입니다.' },
    { id: 7, type: '선택형', question: '광합성에서 **엽록소**의 역할로 가장 알맞은 것은?', options: ['물을 흡수합니다.', '빛 에너지를 흡수합니다.', '산소를 포도당으로 바꿉니다.', '뿌리에서 잎으로 양분을 운반합니다.', '기공을 여닫습니다.'], answer: '②', explanation: '엽록소는 빛을 흡수하여 광합성이 일어나도록 돕는 색소입니다. ①은 뿌리털의 기능과 관련이 있습니다. ③은 광합성의 물질 변화와 맞지 않습니다. ④는 관다발을 통한 이동과 관련된 설명입니다. ⑤는 공변세포의 작용과 관련이 있습니다. 그러므로 정답은 ② 입니다.' },
    { id: 8, type: '연결형', question: '왼쪽의 용어와 오른쪽의 설명을 알맞게 연결하시오.', table: [['A. 엽록체', '① 잎에서 기체가 드나드는 구멍'], ['B. 엽록소', '② 광합성이 주로 일어나는 세포 소기관'], ['C. 기공', '③ 빛 에너지를 흡수하는 초록색 색소'], ['D. 포도당', '④ 광합성으로 만들어지는 양분']], answer: 'A-②, B-③, C-①, D-④', explanation: '엽록체는 광합성이 일어나는 장소입니다. (A-②) 엽록소는 빛 에너지를 흡수하는 색소입니다. (B-③) 기공은 잎에서 기체가 드나드는 구멍입니다. (C-①) 포도당은 광합성으로 만들어지는 양분입니다. (D-④) 그러므로 정답은 A-②, B-③, C-①, D-④ 입니다.' },
    { id: 9, type: '선택형', question: '광합성에서 **산소**에 대한 설명으로 가장 알맞은 것은?', options: ['광합성의 재료이며, 식물은 산소를 주로 흡수합니다.', '광합성의 결과로 생성되며, 일부는 기공을 통해 밖으로 나갑니다.', '광합성으로 만들어진 양분의 다른 이름입니다.', '빛과 만나면 물로 변합니다.', '잎맥을 통해 뿌리로만 이동합니다.'], answer: '②', explanation: '광합성 결과로 산소가 만들어지고, 잎의 기공을 통해 밖으로 나갈 수 있습니다. ①은 산소가 재료라고 하였는데, 산소는 보통 광합성의 결과물로 다룹니다. ③은 양분을 가리키는 말이 아니므로 적절하지 않습니다. ④는 광합성의 물질 변화와 맞지 않습니다. ⑤는 산소가 뿌리로만 이동한다고 보기 어렵고, 주로 기체 형태로 기공을 통해 이동합니다. 그러므로 정답은 ② 입니다.' },
    { id: 10, type: '다중선택형', question: '광합성의 **중요성**으로 알맞은 것을 모두 고르시오.', options: ['생태계에서 먹이사슬의 출발점이 되는 양분을 제공합니다.', '대기 중 이산화탄소의 양을 늘립니다.', '대기 중 산소를 공급합니다.', '지구의 탄소 순환에 영향을 줍니다.', '밤에만 일어나기 때문에 낮 활동과는 무관합니다.'], answer: '①, ③, ④', explanation: '광합성은 식물이 양분을 만들어 생태계의 에너지 흐름을 시작하게 합니다. ① 광합성은 산소를 생성하여 대기 중 산소를 공급합니다. ③ 광합성은 이산화탄소를 소비하므로 탄소 순환에 큰 영향을 줍니다. ④ ②는 광합성이 이산화탄소를 늘린다고 하였는데, 광합성은 이산화탄소를 재료로 사용합니다. ⑤는 광합성이 밤에만 일어난다는 내용인데, 광합성은 빛이 필요하므로 주로 낮에 일어납니다. 그러므로 정답은 ①, ③, ④ 입니다.' },
    { id: 11, type: '선택형', question: '식물이 광합성에 필요한 물을 주로 얻는 방법으로 가장 알맞은 것은?', options: ['잎이 공기 중 수증기를 흡수합니다.', '기공에서 물이 만들어집니다.', '뿌리가 토양의 물을 흡수하여 잎으로 운반합니다.', '씨에서 물이 계속 생성됩니다.', '엽록소가 물을 직접 만듭니다.'], answer: '③', explanation: '식물은 주로 뿌리에서 토양의 물을 흡수하고, 관다발을 통해 잎으로 운반합니다. ①은 물의 주된 획득 방법으로 보기 어렵습니다. ②는 기공의 기능과 맞지 않습니다. ④는 씨가 물을 계속 생성한다는 설명과 맞지 않습니다. ⑤는 엽록소의 기능과 맞지 않습니다. 그러므로 정답은 ③ 입니다.' },
    { id: 12, type: 'OX 선택형', question: '이산화탄소는 광합성의 결과로 만들어져 대기 중으로 방출됩니다.', answer: 'X', explanation: '이산화탄소는 광합성에서 주로 \'재료\'로 들어가며, 광합성 결과로 산소와 양분이 만들어집니다. 그러므로 정답은 X 입니다.' },
    { id: 13, type: '단답형', question: '광합성에서 **이산화탄소가 들어오는 주된 길**은 무엇입니까? (한 단어로)', answer: '기공', explanation: '이산화탄소는 잎의 기공을 통해 식물 안으로 들어옵니다. 그러므로 정답은 기공 입니다.' },
    { id: 14, type: '순서형', question: '다음은 광합성이 일어날 때 나타나는 과정의 일부입니다. **일어나는 순서대로** 기호를 나열하시오.', items: ['(가) 엽록소가 빛 에너지를 흡수합니다.', '(나) 산소가 만들어져 일부는 밖으로 나갑니다.', '(다) 이산화탄소가 잎으로 들어옵니다.', '(라) 물이 뿌리에서 흡수되어 잎으로 이동합니다.', '(마) 포도당이 만들어집니다.'], answer: '(다) → (라) → (가) → (마) → (나)', explanation: '먼저 이산화탄소가 기공을 통해 잎으로 들어옵니다. (다) 그 다음 물이 뿌리에서 흡수되어 잎으로 이동합니다. (라) 이후 엽록소가 빛 에너지를 흡수하여 반응이 진행됩니다. (가) 그 결과 포도당이 만들어집니다. (마) 마지막으로 산소가 생성되어 일부가 밖으로 나갑니다. (나) 그러므로 정답은 (다) → (라) → (가) → (마) → (나) 입니다.' },
    { id: 15, type: '선택형', question: '다음 중 **빛이 부족할 때** 광합성에 대해 예상할 수 있는 변화로 가장 알맞은 것은?', options: ['포도당 생성이 증가합니다.', '산소 생성이 증가합니다.', '포도당 생성이 감소합니다.', '물 흡수가 즉시 0이 됩니다.', '이산화탄소가 더 많이 만들어집니다.'], answer: '③', explanation: '광합성은 빛 에너지가 필요하므로 빛이 부족하면 광합성 속도가 줄어들고 포도당 생성이 감소할 수 있습니다. ①, ②는 빛 부족 상황과 반대 경향입니다. ④는 물 흡수가 즉시 0이 된다고 보기 어렵습니다. ⑤는 광합성 자체가 이산화탄소를 만드는 과정이 아닙니다. 그러므로 정답은 ③ 입니다.' },
    { id: 16, type: '다중선택형', question: '다음 중 **광합성 과정에서 관찰되는 것**을 모두 고르시오.', options: ['잎에서 산소가 밖으로 나갈 수 있습니다.', '잎에서 이산화탄소가 계속 만들어져 밖으로만 나갑니다.', '잎에서 만들어진 양분은 식물의 다른 부분으로 이동할 수 있습니다.', '빛 에너지는 양분 형태의 에너지로 저장될 수 있습니다.', '광합성은 엽록체가 없는 동물 세포에서 주로 일어납니다.'], answer: '①, ③, ④', explanation: '광합성 결과 만들어진 산소는 기공을 통해 밖으로 나갈 수 있습니다. ① 광합성으로 만들어진 양분은 식물체 내에서 다른 기관으로 이동할 수 있습니다. ③ 빛 에너지는 양분 속에 화학 에너지 형태로 저장됩니다. ④ ②는 이산화탄소가 광합성 중에 계속 만들어져 나간다고 하였는데, 광합성에서는 이산화탄소를 주로 사용합니다. ⑤는 광합성이 엽록체가 있는 식물 세포에서 주로 일어난다는 점과 맞지 않습니다. 그러므로 정답은 ①, ③, ④ 입니다.' },
    { id: 17, type: '선택형', question: '다음 중 광합성의 **반응 전(들어가는 것)과 반응 후(나오는 것)**의 관계로 가장 알맞은 것은?', options: ['물 + 산소 → 이산화탄소 + 포도당', '이산화탄소 + 물 → 포도당 + 산소', '포도당 + 산소 → 이산화탄소 + 물', '포도당 + 이산화탄소 → 산소 + 물', '산소 + 빛 → 이산화탄소 + 포도당'], answer: '②', explanation: '광합성은 이산화탄소와 물이 반응하여 포도당과 산소가 만들어지는 과정으로 정리할 수 있습니다. ③은 포도당과 산소가 반응하여 이산화탄소와 물이 되는 호흡의 형태에 가깝습니다. 나머지 선택지는 반응 전후 물질의 관계가 광합성과 맞지 않습니다. 그러므로 정답은 ② 입니다.' },
    { id: 18, type: '연결형', question: '광합성에서 각 물질(또는 에너지)의 **역할**을 알맞게 연결하시오.', table: [['A. 빛 에너지', '① 광합성으로 만들어지는 양분'], ['B. 이산화탄소', '② 광합성의 재료 중 하나로 잎으로 들어옵니다'], ['C. 포도당', '③ 광합성에 필요한 에너지를 제공합니다'], ['D. 산소', '④ 광합성 결과로 생성되어 일부는 밖으로 나갑니다']], answer: 'A-③, B-②, C-①, D-④', explanation: '빛 에너지는 광합성 반응이 진행되도록 필요한 에너지를 제공합니다. (A-③) 이산화탄소는 광합성의 재료로 잎에 들어옵니다. (B-②) 포도당은 광합성으로 만들어지는 양분입니다. (C-①) 산소는 광합성 결과로 생성되어 일부가 기공을 통해 밖으로 나갑니다. (D-④) 그러므로 정답은 A-③, B-②, C-①, D-④ 입니다.' },
    { id: 19, type: '단답형', question: '광합성의 중요성 중 하나로, 생태계에서 대부분의 생물이 에너지를 얻는 출발점이 되는 물질을 무엇이라고 합니까?', answer: '양분(포도당)', explanation: '식물은 광합성을 통해 포도당과 같은 양분을 만들고, 이 양분이 먹이사슬을 통해 다른 생물로 전달되며 에너지의 출발점이 됩니다. 그러므로 정답은 양분(포도당) 입니다.' },
    { id: 20, type: '선택형', question: '다음 중 **광합성이 지구 환경에 미치는 영향**으로 가장 알맞은 것은?', options: ['대기 중 산소를 줄이고 이산화탄소를 늘립니다.', '대기 중 산소를 늘리고 이산화탄소를 줄이는 데 도움을 줍니다.', '대기 조성과는 관계가 없습니다.', '물을 모두 소모하여 지구의 물을 줄입니다.', '오직 바다에서만 일어나 육지 생태계와는 무관합니다.'], answer: '②', explanation: '광합성은 이산화탄소를 재료로 사용하고 산소를 생성하므로, 대기 중 산소를 늘리고 이산화탄소를 줄이는 데 도움이 됩니다. 나머지 선택지는 광합성의 물질 변화와 환경적 의미를 반대로 말하거나 과장한 내용입니다. 그러므로 정답은 ② 입니다.' }
  ]);

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

  // 문제 순서 변경
  const handleMoveQuestion = (questionId, direction) => {
    const currentIndex = questions.findIndex(q => q.id === questionId);
    if (currentIndex === -1) return;

    const newQuestions = [...questions];
    if (direction === 'up' && currentIndex > 0) {
      [newQuestions[currentIndex], newQuestions[currentIndex - 1]] = 
      [newQuestions[currentIndex - 1], newQuestions[currentIndex]];
    } else if (direction === 'down' && currentIndex < questions.length - 1) {
      [newQuestions[currentIndex], newQuestions[currentIndex + 1]] = 
      [newQuestions[currentIndex + 1], newQuestions[currentIndex]];
    }
    setQuestions(newQuestions);
  };

  // 문제 삭제
  const handleDeleteQuestion = (questionId) => {
    if (window.confirm('이 문제를 삭제하시겠습니까?')) {
      setQuestions(questions.filter(q => q.id !== questionId));
    }
  };

  // 문제 추가
  const handleAddQuestion = () => {
    const newId = Math.max(...questions.map(q => q.id)) + 1;
    const newQuestion = {
      id: newId,
      type: '선택형',
      question: '새로운 문제를 입력하세요.',
      options: ['선택지 1', '선택지 2', '선택지 3', '선택지 4'],
      answer: '①',
      explanation: '해설을 입력하세요.'
    };
    setQuestions([...questions, newQuestion]);
  };

  // 문제 유형 변경
  const handleChangeQuestionType = (questionId, newType) => {
    setQuestions(questions.map(q => {
      if (q.id === questionId) {
        // 유형에 따라 기본 구조 설정
        let updatedQuestion = { ...q, type: newType };
        
        if (newType === '선택형' || newType === '다중선택형') {
          updatedQuestion.options = q.options || ['선택지 1', '선택지 2', '선택지 3', '선택지 4'];
          updatedQuestion.answer = newType === '선택형' ? '①' : '①, ②';
          delete updatedQuestion.table;
          delete updatedQuestion.items;
        } else if (newType === '단답형') {
          updatedQuestion.answer = '정답을 입력하세요';
          delete updatedQuestion.options;
          delete updatedQuestion.table;
          delete updatedQuestion.items;
        } else if (newType === 'OX 선택형') {
          updatedQuestion.answer = 'O';
          delete updatedQuestion.options;
          delete updatedQuestion.table;
          delete updatedQuestion.items;
        } else if (newType === '연결형') {
          updatedQuestion.table = [
            ['A. 항목1', '① 설명1'],
            ['B. 항목2', '② 설명2']
          ];
          updatedQuestion.answer = 'A-①, B-②';
          delete updatedQuestion.options;
          delete updatedQuestion.items;
        } else if (newType === '순서형') {
          updatedQuestion.items = ['(가) 첫 번째', '(나) 두 번째'];
          updatedQuestion.answer = '(가) → (나)';
          delete updatedQuestion.options;
          delete updatedQuestion.table;
        }
        
        return updatedQuestion;
      }
      return q;
    }));
  };

  // 문제 재생성
  const handleRegenerateQuestion = (questionId) => {
    alert(`${questionId}번 문제를 다시 생성합니다.`);
    // 실제로는 AI API 호출 등으로 문제를 재생성
  };

  // 편집 모드 토글
  const handleEditToggle = () => {
    if (isEditMode) {
      // 저장하기 버튼 클릭 시
      alert('저장되었습니다.');
    }
    setIsEditMode(!isEditMode);
  };

  // 마크다운 텍스트를 HTML로 변환 (bold 처리)
  const renderMarkdown = (text) => {
    if (!text) return text;
    
    // **텍스트** -> <strong>텍스트</strong>
    const parts = text.split(/(\*\*.*?\*\*)/g);
    return parts.map((part, index) => {
      if (part.startsWith('**') && part.endsWith('**')) {
        return <strong key={index}>{part.slice(2, -2)}</strong>;
      }
      return part;
    });
  };

  return (
    <div className="workbook-result-page">
      <Header 
        onNavigate={onNavigate}
        currentPage={currentPage}
        userName="사만원"
        centerContent={
          <div className="page-title-center">
            <button 
              className="back-btn-inline"
              onClick={() => onNavigate('workbook-setup')}
              title="뒤로 가기"
            >
              ‹
            </button>
            <h1 className="page-title-text">빛으로 만드는 식물의 에너지</h1>
          </div>
        }
      />

      {/* 탭바 - VocabularySample 스타일 */}
      <div className="vocab-tabs-bar">
        <div className="vocab-tabs-right">
          <button 
            className={`vocab-action-btn ${isEditMode ? 'save-btn' : 'edit-btn'}`}
            onClick={handleEditToggle}
            title={isEditMode ? '저장하기' : '편집하기'}
          >
            {isEditMode ? '💾 저장하기' : '✂️ 편집하기'}
          </button>
          {!isEditMode && (
            <>
              <button 
                className="vocab-action-btn download-btn"
                onClick={() => alert('내려받기')}
                title="내려받기"
              >
                ⬇️ 내려받기
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

      {/* 메인 컨테이너 */}
      <main className="wr-main">
        <div className="wr-container">
          <div className="questions-section">
            <div className="questions-header">
              <h2 className="questions-title">문제 리스트 {questions.length}</h2>
            </div>

            <div className="questions-list">
              {questions.map((question, index) => (
                <div key={question.id} className="question-item">
                  <div className="question-header">
                    <div className="question-number">
                      <span className="question-drag-handle">≡</span>
                      {index + 1}번
                    </div>
                    
                    {isEditMode ? (
                      <div className="question-type-edit">
                        <select 
                          className="question-type-select"
                          value={question.type}
                          onChange={(e) => handleChangeQuestionType(question.id, e.target.value)}
                        >
                          <option value="선택형">선택형</option>
                          <option value="다중선택형">다중선택형</option>
                          <option value="단답형">단답형</option>
                          <option value="OX 선택형">OX 선택형</option>
                          <option value="연결형">연결형</option>
                          <option value="순서형">순서형</option>
                        </select>
                        <button 
                          className="question-regenerate-btn"
                          onClick={() => handleRegenerateQuestion(question.id)}
                          title="문제 다시 만들기"
                        >
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M21.5 2v6h-6M2.5 22v-6h6M2 11.5a10 10 0 0 1 18.8-4.3M22 12.5a10 10 0 0 1-18.8 4.2"/>
                          </svg>
                        </button>
                      </div>
                    ) : (
                      <div className="question-type-badge">{question.type}</div>
                    )}
                    
                    {isEditMode && (
                      <div className="question-actions">
                        <button 
                          className="question-action-btn"
                          onClick={() => handleMoveQuestion(question.id, 'up')}
                          disabled={index === 0}
                          title="위로 이동"
                        >
                          ↑
                        </button>
                        <button 
                          className="question-action-btn"
                          onClick={() => handleMoveQuestion(question.id, 'down')}
                          disabled={index === questions.length - 1}
                          title="아래로 이동"
                        >
                          ↓
                        </button>
                        <button 
                          className="question-action-btn delete"
                          onClick={() => handleDeleteQuestion(question.id)}
                          title="삭제"
                        >
                          🗑️
                        </button>
                      </div>
                    )}
                  </div>
                  
                  <div className="question-content">
                    <div className="question-text">{renderMarkdown(question.question)}</div>
                    
                    {question.options && (
                      <div className="question-options">
                        {question.options.map((option, optIdx) => (
                          <div key={optIdx} className="question-option">
                            {toCircledNumber(optIdx + 1)} {renderMarkdown(option)}
                          </div>
                        ))}
                      </div>
                    )}
                    
                    {question.table && (
                      <div className="question-table">
                        <table>
                          <tbody>
                            {question.table.map((row, rowIdx) => (
                              <tr key={rowIdx}>
                                <td className="table-left">{row[0]}</td>
                                <td className="table-arrow">→</td>
                                <td className="table-right">{row[1]}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    )}
                    
                    {question.items && (
                      <div className="question-items">
                        {question.items.map((item, itemIdx) => (
                          <div key={itemIdx} className="question-item-text">
                            {item}
                          </div>
                        ))}
                      </div>
                    )}
                    
                    <div className="question-answer">
                      <strong>정답:</strong> {question.answer}
                    </div>
                    
                    {question.explanation && (
                      <div className="question-explanation">
                        <strong>해설:</strong> {question.explanation}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
            
            {isEditMode && (
              <button className="add-question-btn" onClick={handleAddQuestion}>
                <span className="add-icon">+</span> 문제 추가하기
              </button>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

export default WorkbookResult;