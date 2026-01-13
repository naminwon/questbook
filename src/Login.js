import { useState } from 'react';
import './Login.css';

function Login({ onLogin, onBack }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email && password) {
      onLogin();
    } else {
      alert('이메일과 비밀번호를 입력해주세요.');
    }
  };

  return (
    <div className="login-page">
      {/* 헤더 */}
      <header className="login-header">
        <div className="login-logo" onClick={onBack} style={{ cursor: 'pointer' }}>
          <span className="logo-text">Questbook</span>
        </div>
      </header>

      {/* 메인 로그인 영역 */}
      <main className="login-main">
        <div className="login-container">
          <div className="login-box">
            <h1 className="login-title">로그인</h1>
            <p className="login-subtitle">Questbook에 오신 것을 환영합니다</p>

            <form className="login-form" onSubmit={handleSubmit}>
              <div className="form-group">
                <label className="form-label">이메일</label>
                <input
                  type="email"
                  className="form-input"
                  placeholder="example@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div className="form-group">
                <label className="form-label">비밀번호</label>
                <input
                  type="password"
                  className="form-input"
                  placeholder="비밀번호를 입력하세요"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              <div className="form-options">
                <label className="checkbox-label">
                  <input type="checkbox" />
                  <span>로그인 상태 유지</span>
                </label>
                <a href="#" className="forgot-link">비밀번호 찾기</a>
              </div>

              <button type="submit" className="login-button">
                로그인
              </button>
            </form>

            <div className="divider">
              <span>또는</span>
            </div>

            <div className="social-login">
              <button className="social-button google">
                <span className="social-icon">G</span>
                Google로 계속하기
              </button>
              <button className="social-button kakao">
                <span className="social-icon">K</span>
                카카오로 계속하기
              </button>
            </div>

            <div className="signup-prompt">
              계정이 없으신가요? <a href="#" className="signup-link">회원가입</a>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Login;