import { useState } from 'react';
import './Settings.css';
import Header from './Header';

function Settings({ onBack, onNavigate, currentPage, userName = "선생님" }) {
  const [activeTab, setActiveTab] = useState('profile');
  const [settings, setSettings] = useState({
    name: userName,
    email: 'teacher@questbook.com',
    school: '서울교육고등학교',
    subject: '과학',
    theme: 'light',
    notifications: true,
    emailAlerts: true,
    autoSave: true,
    language: 'ko'
  });

  const tabs = [
    { id: 'profile', label: '프로필', icon: '👤' },
    { id: 'preferences', label: '환경설정', icon: '⚙️' },
    { id: 'notifications', label: '알림', icon: '🔔' },
    { id: 'account', label: '계정', icon: '🔐' }
  ];

  const handleInputChange = (field, value) => {
    setSettings({
      ...settings,
      [field]: value
    });
  };

  const handleSave = () => {
    alert('설정이 저장되었습니다!');
    onBack();
  };

  return (
    <div className="settings-page">
      {/* 헤더 */}
      <Header 
        onNavigate={onNavigate}
        currentPage={currentPage}
        userName={userName}
        centerContent={
          <h1 className="settings-title">마이 페이지</h1>
        }
      />

      <div className="settings-container">
        {/* 탭 네비게이션 */}
        <nav className="settings-nav">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              className={`settings-tab ${activeTab === tab.id ? 'active' : ''}`}
              onClick={() => setActiveTab(tab.id)}
            >
              <span className="tab-icon">{tab.icon}</span>
              <span>{tab.label}</span>
            </button>
          ))}
        </nav>

        {/* 설정 컨텐츠 */}
        <div className="settings-content">
          {/* 프로필 탭 */}
          {activeTab === 'profile' && (
            <div className="settings-section">
              <h2 className="section-title">프로필 정보</h2>
              <p className="section-description">
                회원님의 기본 정보를 관리합니다.
              </p>

              <div className="profile-avatar-section">
                <div className="large-avatar">
                  <span className="avatar-icon">👤</span>
                </div>
                <button className="change-avatar-btn">프로필 사진 변경</button>
              </div>

              <div className="form-group">
                <label className="form-label">이름</label>
                <input
                  type="text"
                  className="form-input"
                  value={settings.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                />
              </div>

              <div className="form-group">
                <label className="form-label">이메일</label>
                <input
                  type="email"
                  className="form-input"
                  value={settings.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                />
              </div>

              <div className="form-group">
                <label className="form-label">학교</label>
                <input
                  type="text"
                  className="form-input"
                  value={settings.school}
                  onChange={(e) => handleInputChange('school', e.target.value)}
                />
              </div>

              <div className="form-group">
                <label className="form-label">담당 과목</label>
                <select 
                  className="form-select"
                  value={settings.subject}
                  onChange={(e) => handleInputChange('subject', e.target.value)}
                >
                  <option value="과학">과학</option>
                  <option value="수학">수학</option>
                  <option value="국어">국어</option>
                  <option value="영어">영어</option>
                  <option value="사회">사회</option>
                  <option value="기타">기타</option>
                </select>
              </div>
            </div>
          )}

          {/* 환경설정 탭 */}
          {activeTab === 'preferences' && (
            <div className="settings-section">
              <h2 className="section-title">환경설정</h2>
              <p className="section-description">
                Questbook 사용 환경을 맞춤 설정합니다.
              </p>

              <div className="setting-item">
                <div className="setting-info">
                  <h3 className="setting-label">다크모드</h3>
                  <p className="setting-desc">어두운 테마를 사용합니다.</p>
                </div>
                <label className="toggle-switch">
                  <input 
                    type="checkbox" 
                    checked={settings.theme === 'dark'}
                    onChange={(e) => handleInputChange('theme', e.target.checked ? 'dark' : 'light')}
                  />
                  <span className="toggle-slider"></span>
                </label>
              </div>

              <div className="setting-item">
                <div className="setting-info">
                  <h3 className="setting-label">자동 저장</h3>
                  <p className="setting-desc">작업 중 자동으로 저장합니다.</p>
                </div>
                <label className="toggle-switch">
                  <input 
                    type="checkbox" 
                    checked={settings.autoSave}
                    onChange={(e) => handleInputChange('autoSave', e.target.checked)}
                  />
                  <span className="toggle-slider"></span>
                </label>
              </div>

              <div className="form-group">
                <label className="form-label">언어</label>
                <select 
                  className="form-select"
                  value={settings.language}
                  onChange={(e) => handleInputChange('language', e.target.value)}
                >
                  <option value="ko">한국어</option>
                  <option value="en">English</option>
                  <option value="ja">日本語</option>
                </select>
              </div>
            </div>
          )}

          {/* 알림 탭 */}
          {activeTab === 'notifications' && (
            <div className="settings-section">
              <h2 className="section-title">알림 설정</h2>
              <p className="section-description">
                받고 싶은 알림을 선택합니다.
              </p>

              <div className="setting-item">
                <div className="setting-info">
                  <h3 className="setting-label">푸시 알림</h3>
                  <p className="setting-desc">브라우저 알림을 받습니다.</p>
                </div>
                <label className="toggle-switch">
                  <input 
                    type="checkbox" 
                    checked={settings.notifications}
                    onChange={(e) => handleInputChange('notifications', e.target.checked)}
                  />
                  <span className="toggle-slider"></span>
                </label>
              </div>

              <div className="setting-item">
                <div className="setting-info">
                  <h3 className="setting-label">이메일 알림</h3>
                  <p className="setting-desc">중요한 업데이트를 이메일로 받습니다.</p>
                </div>
                <label className="toggle-switch">
                  <input 
                    type="checkbox" 
                    checked={settings.emailAlerts}
                    onChange={(e) => handleInputChange('emailAlerts', e.target.checked)}
                  />
                  <span className="toggle-slider"></span>
                </label>
              </div>
            </div>
          )}

          {/* 계정 탭 */}
          {activeTab === 'account' && (
            <div className="settings-section">
              <h2 className="section-title">계정 관리</h2>
              <p className="section-description">
                비밀번호 변경 및 계정 보안을 관리합니다.
              </p>

              <button className="action-button secondary">
                비밀번호 변경
              </button>

              <div className="danger-zone">
                <h3 className="danger-title">위험 영역</h3>
                <p className="danger-desc">
                  계정을 삭제하면 모든 데이터가 영구적으로 삭제됩니다.
                </p>
                <button className="action-button danger">
                  계정 삭제
                </button>
              </div>
            </div>
          )}

          {/* 저장 버튼 */}
          <div className="settings-footer">
            <button className="cancel-btn" onClick={onBack}>
              취소
            </button>
            <button 
              className="save-btn" 
              onClick={handleSave}
              style={{ color: '#ffffff' }}
            >
              저장하기
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Settings;