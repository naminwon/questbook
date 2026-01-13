import { useState, useEffect, useRef } from 'react';
import './ProfileDropdown.css';

function ProfileDropdown({ onLogout, onSettings, userName = "선생님" }) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  // 외부 클릭 감지
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  const handleMenuClick = (action) => {
    setIsOpen(false);
    action();
  };

  return (
    <div className="profile-dropdown" ref={dropdownRef}>
      <button 
        className="profile-button" 
        onClick={() => setIsOpen(!isOpen)}
        aria-label="프로필 메뉴"
      >
        <div className="profile-avatar">
          <span className="avatar-icon">👤</span>
        </div>
        <span className="profile-name">{userName}</span>
        <span className={`dropdown-arrow ${isOpen ? 'open' : ''}`}>▼</span>
      </button>

      {isOpen && (
        <div className="dropdown-menu">
          <div className="dropdown-header">
            <div className="dropdown-avatar">👤</div>
            <div className="dropdown-user-info">
              <div className="dropdown-user-name">{userName}</div>
              <div className="dropdown-user-role">교사</div>
            </div>
          </div>

          <div className="dropdown-divider"></div>

          <button 
            className="dropdown-item"
            onClick={() => handleMenuClick(onSettings)}
          >
            <span className="dropdown-icon">⚙️</span>
            <span>설정</span>
          </button>

          <button 
            className="dropdown-item"
            onClick={() => handleMenuClick(() => {
              if (window.confirm('로그아웃 하시겠습니까?')) {
                onLogout();
              }
            })}
          >
            <span className="dropdown-icon">🚪</span>
            <span>로그아웃</span>
          </button>
        </div>
      )}
    </div>
  );
}

export default ProfileDropdown;
