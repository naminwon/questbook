import { useState } from 'react';
import './App.css';
import Home from './Home';
import Login from './Login';
import ProjectManagement from './ProjectManagement';
import ProfileDropdown from './ProfileDropdown';
import Settings from './Settings';
import LearningMaterial from './LearningMaterial';
import PlanningForm from './PlanningForm';
import LearningResult from './LearningResult';
import Header from './Header';
import WhiteboardSetup from './WhiteboardSetup';
import Whiteboard from './Whiteboard';
import WhiteboardSample from './WhiteboardSample';
import VocabularySetup from './VocabularySetup';
import Vocabulary from './Vocabulary';
import VocabularySample from './VocabularySample';
import TextSetup from './TextSetup';
import TextResult from './TextResult';
import WorkbookSetup from './WorkbookSetup';
import WorkbookSetupLearning from './WorkbookSetupLearning';
import WorkbookSetupText from './WorkbookSetupText';
import WorkbookSetupVocabulary from './WorkbookSetupVocabulary';
import WorkbookResult from './WorkbookResult';

function App() {
  const [hoveredCard, setHoveredCard] = useState(null);
  const [currentPage, setCurrentPage] = useState('home');
  const [selectedPrompt, setSelectedPrompt] = useState('');
  const [previousPage, setPreviousPage] = useState('main');
  const [showWhiteboardSetup, setShowWhiteboardSetup] = useState(false);
  const [whiteboardData, setWhiteboardData] = useState(null);
  const [vocabularyData, setVocabularyData] = useState(null);
  const [textData, setTextData] = useState(null);
  const [workbookData, setWorkbookData] = useState(null);
  
  const features = [
    { id: 1, title: '학습자료 만들기', icon: '📚', description: 'AI로 맞춤형 학습자료 생성', page: 'learning-material' },
    { id: 3, title: '지문 만들기', icon: '📝', description: '주제에 따른 지문과 문제 생성', page: 'text' },
    { id: 5, title: '단어장 만들기', icon: '📖', description: '스마트 학습 단어 생성', page: 'vocabulary' },
    { id: 2, title: '문제 만들기', icon: '✏️', description: '다양한 유형의 문제 자동 생성', page: 'problem' },
    { id: 4, title: '채점하기', icon: '✅', description: '자동 채점 및 분석', page: 'grading' },
    { id: 6, title: '화이트보드', icon: '🎨', description: '실시간 협업 학습 공간', page: 'whiteboard' },
  ];

  // 페이지 네비게이션 핸들러
  const handleNavigate = (page, data = null) => {
    if (page === 'settings' && data) {
      setPreviousPage(data);
    }
    if (page === 'whiteboard') {
      setWhiteboardData(data);
    }
    if (page === 'vocabulary' && data) {
      setVocabularyData(data);
    }
    if (page === 'text' && data) {
      setTextData(data);
    }
    if (page === 'workbooksetuptext' && data) {
      setWorkbookData(data);
    }
    if (page === 'workbook-setup-learning' && data) {
      setWorkbookData(data);
    }
    if (page === 'workbooksetupvocabulary' && data) {
      setWorkbookData(data);
    }
    setCurrentPage(page);
  };

  const handleCardClick = (page) => {
    if (page === 'learning-material') {
      setCurrentPage('learning-material');
    } else if (page === 'whiteboard') {
        setWhiteboardData(null);      // ✅ (궤일) 이전 데이터 초기화
        setCurrentPage('whiteboard');
    } else if (page === 'vocabulary') {
      setCurrentPage('vocabulary-setup');
    } else if (page === 'text') {
      setCurrentPage('text-setup');
    } else if (page === 'problem') {
      setWorkbookData(null);
      setCurrentPage('workbook-setup');
    } else {
      alert('🎉 로그인이 필요한 서비스입니다.\n\n현재 기능은 이용하시려면 먼저 로그인해주세요.');
    }
  };

  const handleWhiteboardCreate = (projectData) => {
    setWhiteboardData(projectData);
    setCurrentPage('whiteboard');
  };

  const handleVocabularyCreate = (projectData) => {
    setVocabularyData(projectData);
    setCurrentPage('vocabulary');
  };

  const handleTextCreate = (projectData) => {
    setTextData(projectData);
    setCurrentPage('text-result');
  };

  const handleWorkbookCreate = (projectData) => {
    setWorkbookData(projectData);
    setCurrentPage('workbook-result');
  };

  const handlePromptSubmit = (prompt) => {
    setSelectedPrompt(prompt);
    setCurrentPage('planning-form');
  };

  // 현재 페이지 렌더링
  const renderCurrentPage = () => {
    // Home 페이지
    if (currentPage === 'home') {
      return <Home onLoginClick={() => setCurrentPage('login')} />;
    }

    // Login 페이지
    if (currentPage === 'login') {
      return (
        <Login 
          onLogin={() => setCurrentPage('main')}
          onBack={() => setCurrentPage('home')}
        />
      );
    }

    // Settings 페이지
    if (currentPage === 'settings') {
      return (
        <Settings 
          onBack={() => setCurrentPage(previousPage)}
          onNavigate={handleNavigate}
          currentPage={currentPage}
          userName="사만원"
        />
      );
    }

    // ProjectManagement 페이지
    if (currentPage === 'projects') {
      return (
        <ProjectManagement 
          onBack={() => setCurrentPage('main')}
          onLogout={() => setCurrentPage('home')}
          onSettings={() => handleNavigate('settings', 'projects')}
          onNavigate={handleNavigate}
          onProjectClick={(project) => {
            console.log('프로젝트 클릭:', project);
          }}
        />
      );
    }

    // Learning Material 페이지
    if (currentPage === 'learning-material') {
      return (
        <LearningMaterial 
          onHome={() => setCurrentPage('main')}
          onNext={handlePromptSubmit}
          onNavigate={handleNavigate}
          currentPage={currentPage}
        />
      );
    }

    // Planning Form 페이지
    if (currentPage === 'planning-form') {
      return (
        <PlanningForm 
          onHome={() => setCurrentPage('main')}
          onBack={() => setCurrentPage('learning-material')}
          onNext={() => setCurrentPage('learning-result')}
          onNavigate={handleNavigate}
          currentPage={currentPage}
          initialPrompt={selectedPrompt}
        />
      );
    }

    // Learning Result 페이지
    if (currentPage === 'learning-result') {
      return (
        <LearningResult 
          onHome={() => setCurrentPage('main')}
          onBack={() => setCurrentPage('planning-form')}
          onNavigate={handleNavigate}
          currentPage={currentPage}
          whiteboardMode={false}
        />
      );
    }

    // LearningResult 화이트보드 모드
    if (currentPage === 'learning-result-whiteboard') {
      return (
        <LearningResult 
          onHome={() => setCurrentPage('main')}
          onBack={() => setCurrentPage('projects')}
          onNavigate={handleNavigate}
          currentPage={currentPage}
          whiteboardMode={true}
        />
      );
    }

    // Whiteboard 페이지
    if (currentPage === 'whiteboard') {
      return (
        <Whiteboard 
          onNavigate={handleNavigate}
          currentPage={currentPage}
          projectData={whiteboardData}
        />
      );
    }

    // WhiteboardSample 페이지
    if (currentPage === 'whiteboard-sample') {
      return (
        <WhiteboardSample 
          onNavigate={handleNavigate}
          currentPage={currentPage}
          projectData={whiteboardData}
        />
      );
    }

    // WhiteboardSetup 페이지
    if (currentPage === 'whiteboard-setup') {
      return (
        <WhiteboardSetup
          onBack={() => setCurrentPage('main')}
          onCreate={handleWhiteboardCreate}
          onNavigate={handleNavigate}
          currentPage={currentPage}
        />
      );
    }

    // VocabularySetup 페이지
    if (currentPage === 'vocabulary-setup') {
      return (
        <VocabularySetup
          onBack={() => setCurrentPage('main')}
          onCreate={handleVocabularyCreate}
          onNavigate={handleNavigate}
          currentPage={currentPage}
        />
      );
    }

    // Vocabulary 페이지
    if (currentPage === 'vocabulary') {
      return (
        <Vocabulary 
          onNavigate={handleNavigate}
          currentPage={currentPage}
          vocabularyData={vocabularyData}
        />
      );
    }

    // VocabularySample 페이지
    if (currentPage === 'vocabulary-sample') {
      return (
        <VocabularySample 
          onNavigate={handleNavigate}
          currentPage={currentPage}
          vocabularyData={{ title: '초등 영어 필수 어휘' }}
        />
      );
    }

    // TextSetup 페이지
    if (currentPage === 'text-setup') {
      return (
        <TextSetup
          onBack={() => setCurrentPage('main')}
          onCreate={handleTextCreate}
          onNavigate={handleNavigate}
          currentPage={currentPage}
        />
      );
    }

    // TextResult 페이지
    if (currentPage === 'text-result') {
      return (
        <TextResult
          onNavigate={handleNavigate}
          currentPage={currentPage}
          textData={textData}
        />
      );
    }

    // TextResult 화이트보드 모드
    if (currentPage === 'text-result-whiteboard') {
      return (
        <TextResult
          onNavigate={handleNavigate}
          currentPage={currentPage}
          textData={textData}
          whiteboardMode={true}
        />
      );
    }


    // WorkbookSetup 페이지
    if (currentPage === 'workbook-setup') {
      return (
        <WorkbookSetup
          onBack={() => setCurrentPage('main')}
          onCreate={handleWorkbookCreate}
          onNavigate={handleNavigate}
          currentPage={currentPage}
        />
      );
    }

    // WorkbookSetupLearning 페이지
    if (currentPage === 'workbook-setup-learning') {
      return (
        <WorkbookSetupLearning
          onBack={() => setCurrentPage('main')}
          onCreate={handleWorkbookCreate}
          onNavigate={handleNavigate}
          currentPage={currentPage}
          initialData={workbookData}
        />
      );
    }

    // WorkbookSetupText 페이지
    if (currentPage === 'workbooksetuptext') {
      return (
        <WorkbookSetupText
          onBack={() => setCurrentPage('main')}
          onCreate={handleWorkbookCreate}
          onNavigate={handleNavigate}
          currentPage={currentPage}
          initialData={workbookData}
        />
      );
    }

    // WorkbookSetupVocabulary 페이지
    if (currentPage === 'workbooksetupvocabulary') {
      return (
        <WorkbookSetupVocabulary
          onBack={() => setCurrentPage('main')}
          onCreate={handleWorkbookCreate}
          onNavigate={handleNavigate}
          currentPage={currentPage}
          initialData={workbookData}
        />
      );
    }

    // WorkbookResult 페이지
    if (currentPage === 'workbook-result') {
      return (
        <WorkbookResult
          onNavigate={handleNavigate}
          currentPage={currentPage}
          workbookData={workbookData}
        />
      );
    }

    // 메인 페이지 (로그인 후)
    if (currentPage === 'main') {
      return (
        <div className="App">
          <Header 
            onNavigate={handleNavigate}
            currentPage="main"
            userName="사만원"
          />

          <main className="main">
            <div className="hero">
              <h1 className="hero-title">
                기술을 통해<br />
                교사와 학생의 미래를 꿈꿉니다.
              </h1>
              <p className="hero-subtitle">
                AI 기반 교육 도구로 더 나은 학습 경험을 만들어보세요
              </p>
            </div>

            <div className="features-container">
              <h2 className="features-title">모든 교육 도구를 한 곳에서</h2>
              <div className="features-grid">
                {features.map((feature) => (
                  <div
                    key={feature.id}
                    className={`feature-card ${hoveredCard === feature.id ? 'hovered' : ''}`}
                    onMouseEnter={() => setHoveredCard(feature.id)}
                    onMouseLeave={() => setHoveredCard(null)}
                    onClick={() => handleCardClick(feature.page)}
                  >
                    <div className="feature-icon">{feature.icon}</div>
                    <h3 className="feature-title">{feature.title}</h3>
                    <p className="feature-description">{feature.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </main>

          <footer className="footer">
            <p>© 2025 Questbook. All rights reserved.</p>
          </footer>
        </div>
      );
    }

    return null;
  };

  // 메인 렌더링
  return (
    <>
      {renderCurrentPage()}
    </>
  );
}

export default App;