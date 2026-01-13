import './App.css';

function Home({ onLoginClick }) {
  return (
    <div className="App">
      <header className="header">
        <div className="logo">
          <span className="logo-text">Questbook</span>
        </div>
        <nav>
          <button className="nav-button" onClick={onLoginClick}>
            로그인
          </button>
        </nav>
      </header>

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
            <div className="feature-card">
              <div className="feature-icon">📚</div>
              <h3 className="feature-title">학습자료 만들기</h3>
              <p className="feature-description">AI로 맞춤형 학습자료 생성</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">📝</div>
              <h3 className="feature-title">지문 만들기</h3>
              <p className="feature-description">주제에 따른 지문과 문제 생성</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">📖</div>
              <h3 className="feature-title">단어장 만들기</h3>
              <p className="feature-description">스마트 학습 단어 생성</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">✏️</div>
              <h3 className="feature-title">문제 만들기</h3>
              <p className="feature-description">다양한 유형의 문제 자동 생성</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">✅</div>
              <h3 className="feature-title">채점하기</h3>
              <p className="feature-description">자동 채점 및 분석</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">🎨</div>
              <h3 className="feature-title">화이트보드</h3>
              <p className="feature-description">실시간 협업 학습 공간</p>
            </div>
          </div>
        </div>
      </main>

      <footer className="footer">
        <p>© 2025 Questbook. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default Home;