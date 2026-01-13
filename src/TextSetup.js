import { useState } from 'react';
import './TextSetup.css';
import Header from './Header';

function TextSetup({ onBack, onCreate, onNavigate, currentPage }) {
  const [formData, setFormData] = useState({
    topic: '',
    domain: '',
    textType: '',
    paragraphs: 5,
    wordCount: 1500,
    targetAudience: null,
    questionCount: 3,
    includeVocab: false
  });

  const domains = [
    { id: 'humanities', label: '인문' },
    { id: 'social', label: '사회' },
    { id: 'science', label: '과학' },
    { id: 'technology', label: '기술' },
    { id: 'art', label: '예술' },
    { id: 'complex', label: '복합' }
  ];

  const topicExamples = [
    { domain: '인문', domainId: 'humanities', text: '플라시보와 노시보', icon: '📚' },
    { domain: '사회', domainId: 'social', text: '헌법의 중요성', icon: '⚖️' },
    { domain: '과학', domainId: 'science', text: '달은 왜 계속 나를 쫓아올까?', icon: '🌙' },
    { domain: '기술', domainId: 'technology', text: '우리 집을 핸드폰 안에', icon: '📱' },
    { domain: '예술', domainId: 'art', text: '동양화의 시작', icon: '🎨' }
  ];

  const textTypes = [
    { id: 'explanatory', label: '설명문' },
    { id: 'argumentative', label: '논설문' },
    { id: 'report', label: '보고서' },
    { id: 'article', label: '기사문' },
    { id: 'narrative', label: '서사글' },
    { id: 'descriptive', label: '묘사글' }
  ];

  const targetAudiences = [
    { id: 'elementary_low', label: '초등 저학년', age: '7-9세' },
    { id: 'elementary_high', label: '초등 고학년', age: '10-12세' },
    { id: 'middle', label: '중학생', age: '13-15세' },
    { id: 'high', label: '고등학생', age: '16-18세' }
  ];

  const handleTopicExample = (example) => {
    setFormData({
      ...formData,
      topic: example.text,
      domain: example.domain
    });
  };

  const handleCreate = () => {
    if (!formData.topic.trim()) {
      alert('글의 주제를 입력해주세요.');
      return;
    }
    if (!formData.domain) {
      alert('주제 영역을 선택해주세요.');
      return;
    }
    if (!formData.textType) {
      alert('글의 종류를 선택해주세요.');
      return;
    }
    if (!formData.targetAudience) {
      alert('학습 대상을 선택해주세요.');
      return;
    }
    onCreate(formData);
  };

  return (
    <div className="text-setup-page">
      <Header 
        onNavigate={onNavigate}
        currentPage={currentPage}
        userName="사만원"
      />

      <main className="ts-main">
        <div className="ts-content">
          <div className="ts-form">
            {/* 글의 주제 입력 */}
            <div className="ts-form-group">
              <label className="ts-label">
                글의 주제 <span className="required">*</span>
              </label>
              <input
                type="text"
                className="ts-input"
                placeholder="주제를 입력해주세요."
                value={formData.topic}
                onChange={(e) => setFormData({...formData, topic: e.target.value})}
              />
              
              {/* 주제 예제 */}
              <div className="ts-examples">
                <p className="ts-examples-label">예제 주제</p>
                <div className="ts-examples-grid-new">
                  {topicExamples.map((example, index) => (
                    <div
                      key={index}
                      className="ts-example-card"
                      onClick={() => handleTopicExample(example)}
                    >
                      <span className="ts-example-icon">{example.icon}</span>
                      <div className="ts-example-content">
                        <span className="ts-example-domain">{example.domain}</span>
                        <span className="ts-example-text">{example.text}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* 주제 영역 선택 */}
            <div className="ts-form-group">
              <label className="ts-label">
                주제 영역 <span className="required">*</span>
              </label>
              <div className="ts-domain-grid">
                {domains.map((domain) => (
                  <button
                    key={domain.id}
                    className={`ts-domain-btn ${formData.domain === domain.label ? 'active' : ''}`}
                    onClick={() => setFormData({...formData, domain: domain.label})}
                  >
                    {domain.label}
                  </button>
                ))}
              </div>
            </div>

            {/* 글의 종류 */}
            <div className="ts-form-group">
              <label className="ts-label">
                글의 종류 <span className="required">*</span>
              </label>
              <div className="ts-texttype-grid">
                {textTypes.map((type) => (
                  <button
                    key={type.id}
                    className={`ts-texttype-btn ${formData.textType === type.label ? 'active' : ''}`}
                    onClick={() => setFormData({...formData, textType: type.label})}
                  >
                    {type.label}
                  </button>
                ))}
              </div>
            </div>

            {/* 문단 수와 글자수 */}
            <div className="ts-form-row">
              <div className="ts-form-group-inline">
                <label className="ts-label">문단 수</label>
                <div className="ts-number-input-wrapper">
                  <input
                    type="number"
                    className="ts-number-input"
                    min="1"
                    max="10"
                    value={formData.paragraphs}
                    onChange={(e) => setFormData({...formData, paragraphs: parseInt(e.target.value) || 1})}
                  />
                  <span className="ts-unit">개</span>
                </div>
              </div>

              <div className="ts-form-group-inline">
                <label className="ts-label">글자수</label>
                <div className="ts-number-input-wrapper">
                  <input
                    type="number"
                    className="ts-number-input"
                    min="100"
                    max="5000"
                    step="100"
                    value={formData.wordCount}
                    onChange={(e) => setFormData({...formData, wordCount: parseInt(e.target.value) || 100})}
                  />
                  <span className="ts-unit">자 이하</span>
                </div>
              </div>
            </div>

            {/* 학습 대상 */}
            <div className="ts-form-group">
              <label className="ts-label">
                학습 대상 <span className="required">*</span>
              </label>
              <div className="ts-audience-grid">
                {targetAudiences.map((audience) => (
                  <button
                    key={audience.id}
                    className={`ts-audience-btn ${formData.targetAudience === audience.id ? 'active' : ''}`}
                    onClick={() => setFormData({...formData, targetAudience: audience.id})}
                  >
                    <div className="ts-audience-label">{audience.label}</div>
                    <div className="ts-audience-age">{audience.age}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* 기본문항 */}
            <div className="ts-form-group">
              <div className="ts-question-header">
                <label className="ts-label">기본문항</label>
                <div className="ts-vocab-toggle">
                  <label className="ts-sublabel">어휘 문항 포함</label>
                  <div className="ts-toggle-wrapper">
                    <button
                      className={`ts-toggle ${formData.includeVocab ? 'active' : ''}`}
                      onClick={() => setFormData({...formData, includeVocab: !formData.includeVocab})}
                    >
                      <div className="ts-toggle-slider"></div>
                    </button>
                    <span className="ts-toggle-label">
                      {formData.includeVocab ? 'ON' : 'OFF'}
                    </span>
                  </div>
                </div>
              </div>
              <div className="ts-question-section">
                <div className="ts-count-buttons">
                  {[0, 1, 2, 3].map((count) => (
                    <button
                      key={count}
                      className={`ts-count-btn ${formData.questionCount === count ? 'active' : ''}`}
                      onClick={() => setFormData({...formData, questionCount: count})}
                    >
                      {count}개
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* 하단 버튼 */}
            <div className="ts-footer">
              <button className="ts-btn-cancel" onClick={onBack}>
                취소
              </button>
              <button className="ts-btn-create" onClick={handleCreate}>
                지문 만들기
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default TextSetup;