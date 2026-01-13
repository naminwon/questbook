import { useState, useEffect, useRef } from 'react';
import './Header.css';

function Header({ 
  onNavigate,
  currentPage,
  centerContent = null,
  userName = "사만원"
}) {
  const [showUserDropdown, setShowUserDropdown] = useState(false);
  const [showMoreDropdown, setShowMoreDropdown] = useState(false);
  const [showLanguageDropdown, setShowLanguageDropdown] = useState(false);
  
  const userDropdownRef = useRef(null);
  const moreDropdownRef = useRef(null);
  const languageDropdownRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (userDropdownRef.current && !userDropdownRef.current.contains(event.target)) {
        setShowUserDropdown(false);
      }
      if (moreDropdownRef.current && !moreDropdownRef.current.contains(event.target)) {
        setShowMoreDropdown(false);
      }
      if (languageDropdownRef.current && !languageDropdownRef.current.contains(event.target)) {
        setShowLanguageDropdown(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const services = [
    { id: 'learning-material', label: '학습자료 만들기', icon: '📚' },
    { id: 'text', label: '지문 만들기', icon: '📝' },
    { id: 'vocabulary', label: '단어장 만들기', icon: '📖' },
    { id: 'problem', label: '문제 만들기', icon: '✏️' },
    { id: 'grading', label: '채점하기', icon: '✅' },
    { id: 'whiteboard', label: '화이트 보드', icon: '🎨' }
  ];

  return (
    <header className="unified-header">
      <div 
        className="header-logo" 
        onClick={() => onNavigate('main')}
      >
        <span className="logo-text">Questbook</span>
      </div>

      <div className="header-center">
        {centerContent}
      </div>

      <div className="header-right">
        <div className="header-menu-item" ref={userDropdownRef}>
          <button 
            className="header-btn"
            onClick={() => {
              setShowUserDropdown(!showUserDropdown);
              setShowMoreDropdown(false);
              setShowLanguageDropdown(false);
            }}
          >
            <span className="user-icon">👤</span>
            <span className="user-name">{userName}</span>
            <span className={`dropdown-arrow ${showUserDropdown ? 'open' : ''}`}>▼</span>
          </button>
          
          {showUserDropdown && (
            <div className="header-dropdown">
              <button 
                className="dropdown-item"
                onClick={() => {
                  setShowUserDropdown(false);
                  onNavigate('projects');
                }}
              >
                <span className="dropdown-icon">📁</span>
                <span>내 프로젝트</span>
              </button>
              <button 
                className="dropdown-item"
                onClick={() => {
                  setShowUserDropdown(false);
                  onNavigate('settings', currentPage);
                }}
              >
                <span className="dropdown-icon">⚙️</span>
                <span>마이 페이지</span>
              </button>
            </div>
          )}
        </div>

        <div className="header-menu-item" ref={moreDropdownRef}>
          <button 
            className="header-icon-btn"
            onClick={() => {
              setShowMoreDropdown(!showMoreDropdown);
              setShowUserDropdown(false);
              setShowLanguageDropdown(false);
            }}
            title="더보기"
          >
            ⋯
          </button>
          
          {showMoreDropdown && (
            <div className="header-dropdown">
              {services.map((service) => (
                <button 
                  key={service.id}
                  className="dropdown-item"
                  onClick={() => {
                    setShowMoreDropdown(false);
                    if (service.id === 'learning-material') {
                      onNavigate('learning-material');
                    } else if (service.id === 'whiteboard') {
                      onNavigate('whiteboard');
                    } else if (service.id === 'vocabulary') {
                      onNavigate('vocabulary-setup');
                    } else if (service.id === 'text') {
                      onNavigate('text-setup');
                    } else if (service.id === 'problem') {
                      onNavigate('workbook-setup');
                    } else {
                      alert(`${service.label} 기능은 준비 중입니다.`);
                    }
                  }}
                >
                  <span className="dropdown-icon">{service.icon}</span>
                  <span>{service.label}</span>
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="header-menu-item" ref={languageDropdownRef}>
          <button 
            className="header-icon-btn"
            onClick={() => {
              setShowLanguageDropdown(!showLanguageDropdown);
              setShowUserDropdown(false);
              setShowMoreDropdown(false);
            }}
            title="언어 선택"
          >
            🌐
          </button>
          
          {showLanguageDropdown && (
            <div className="header-dropdown">
              <button className="dropdown-item">
                <span className="dropdown-icon">🇰🇷</span>
                <span>한국어</span>
              </button>
              <button className="dropdown-item">
                <span className="dropdown-icon">🇺🇸</span>
                <span>English</span>
              </button>
            </div>
          )}
        </div>

        <button 
          className="header-icon-btn logout-btn"
          onClick={() => onNavigate('home')}
          title="로그아웃"
        >
          🚪
        </button>
      </div>
    </header>
  );
}

export default Header;