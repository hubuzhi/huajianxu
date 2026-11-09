import React from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';

function FlowerMatch() {
  const navigate = useNavigate();
  const { flowerId } = useParams();
  const location = useLocation();
  const flower = location.state;

  const matchSuggestions = {
    '玫瑰': [
      {
        type: '花束搭配',
        suggestions: [
          { partner: '百合', reason: '百合的纯洁与玫瑰的热情形成完美对比', image: '🌷' },
          { partner: '满天星', reason: '满天星作为点缀，增添浪漫氛围', image: '✨' },
          { partner: '郁金香', reason: '色彩搭配丰富，适合节日送礼', image: '🌸' },
        ],
      },
      {
        type: '花园搭配',
        suggestions: [
          { partner: '月季', reason: '同属蔷薇科，花期互补', image: '🌹' },
          { partner: '薰衣草', reason: '紫色与红色形成优雅配色', image: '💜' },
          { partner: '绣球花', reason: '花型互补，层次丰富', image: '🔵' },
        ],
      },
      {
        type: '花艺搭配',
        suggestions: [
          { partner: '尤加利叶', reason: '清新绿叶衬托玫瑰之美', image: '🌿' },
          { partner: '康乃馨', reason: '温馨组合，适合母亲节', image: '🌺' },
          { partner: '向日葵', reason: '阳光组合，活力满满', image: '🌻' },
        ],
      },
    ],
    '牡丹': [
      {
        type: '花束搭配',
        suggestions: [
          { partner: '芍药', reason: '花中之王与花中之相，富贵双全', image: '🌷' },
          { partner: '蝴蝶兰', reason: '高贵典雅，适合重要场合', image: '🦋' },
          { partner: '兰花', reason: '传统名花组合，文化底蕴深厚', image: '🌸' },
        ],
      },
      {
        type: '花园搭配',
        suggestions: [
          { partner: '梅花', reason: '四季搭配，冬春相连', image: '❄️' },
          { partner: '菊花', reason: '传统名花组合，四季轮换', image: '🌼' },
          { partner: '荷花', reason: '水陆搭配，层次丰富', image: '🪷' },
        ],
      },
    ],
    '兰花': [
      {
        type: '花束搭配',
        suggestions: [
          { partner: '文心兰', reason: '同属兰科，气质相配', image: '🌸' },
          { partner: '蝴蝶兰', reason: '优雅组合，适合室内装饰', image: '🦋' },
          { partner: '石斛兰', reason: '兰科组合，香气怡人', image: '🌺' },
        ],
      },
      {
        type: '花园搭配',
        suggestions: [
          { partner: '君子兰', reason: '观叶观花组合，气质高雅', image: '🌿' },
          { partner: '蕨类植物', reason: '绿植衬托，自然清新', image: '🌱' },
          { partner: '竹子', reason: '传统文人组合，意境深远', image: '🎋' },
        ],
      },
    ],
  };

  const currentFlowerName = flower?.name || '玫瑰';
  const suggestions = matchSuggestions[currentFlowerName] || matchSuggestions['玫瑰'];

  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <button onClick={() => navigate(-1)} style={styles.backBtn}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M19 12H5M12 19l-7-7 7-7" />
          </svg>
        </button>
        <h1 style={styles.headerTitle}>搭配建议</h1>
        <div style={styles.placeholder} />
      </header>

      <div style={styles.currentFlower}>
        <div style={styles.currentIcon}>{flower?.image || '🌹'}</div>
        <div style={styles.currentInfo}>
          <h2 style={styles.currentName}>{currentFlowerName}</h2>
          <p style={styles.currentMeaning}>花语：{flower?.meaning || '爱情'}</p>
        </div>
      </div>

      <div style={styles.suggestionList}>
        {suggestions.map((category, index) => (
          <div key={index} style={styles.categorySection}>
            <div style={styles.categoryHeader}>
              <span style={styles.categoryIcon}>
                {category.type === '花束搭配' ? '💐' : 
                 category.type === '花园搭配' ? '🏡' : '🎨'}
              </span>
              <h3 style={styles.categoryTitle}>{category.type}</h3>
            </div>
            <div style={styles.suggestionCards}>
              {category.suggestions.map((item, idx) => (
                <div key={idx} style={styles.suggestionCard}>
                  <div style={styles.partnerIcon}>{item.image}</div>
                  <div style={styles.partnerInfo}>
                    <h4 style={styles.partnerName}>{item.partner}</h4>
                    <p style={styles.partnerReason}>{item.reason}</p>
                  </div>
                  <button style={styles.tryBtn}>试试看</button>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div style={styles.tipCard}>
        <span style={styles.tipIcon}>💡</span>
        <p style={styles.tipText}>
          搭配建议可以帮助您在花束设计、花园规划和花艺创作中获得灵感，创造出更美的作品。
        </p>
      </div>
    </div>
  );
}

const styles = {
  container: {
    minHeight: '100vh',
    background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)',
    color: '#fff',
    paddingBottom: '20px',
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '16px 20px',
    background: 'rgba(255,255,255,0.05)',
    backdropFilter: 'blur(10px)',
    borderBottom: '1px solid rgba(255,255,255,0.1)',
  },
  backBtn: {
    background: 'rgba(255,255,255,0.1)',
    border: 'none',
    borderRadius: '12px',
    padding: '10px',
    cursor: 'pointer',
    color: '#fff',
    transition: 'all 0.3s ease',
  },
  headerTitle: {
    fontSize: '20px',
    fontWeight: '600',
    margin: 0,
  },
  placeholder: {
    width: '40px',
  },
  currentFlower: {
    display: 'flex',
    alignItems: 'center',
    gap: '16px',
    margin: '20px',
    padding: '20px',
    background: 'linear-gradient(135deg, rgba(255,105,180,0.15) 0%, rgba(0,206,209,0.15) 100%)',
    borderRadius: '16px',
    border: '1px solid rgba(255,255,255,0.1)',
  },
  currentIcon: {
    width: '60px',
    height: '60px',
    borderRadius: '16px',
    background: 'linear-gradient(135deg, rgba(255,105,180,0.2) 0%, rgba(0,206,209,0.2) 100%)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '32px',
  },
  currentInfo: {
    flex: 1,
  },
  currentName: {
    fontSize: '20px',
    fontWeight: '600',
    margin: '0 0 8px 0',
    color: '#fff',
  },
  currentMeaning: {
    fontSize: '14px',
    color: 'rgba(255,255,255,0.6)',
    margin: 0,
  },
  suggestionList: {
    padding: '20px',
  },
  categorySection: {
    marginBottom: '24px',
  },
  categoryHeader: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    marginBottom: '16px',
  },
  categoryIcon: {
    fontSize: '24px',
  },
  categoryTitle: {
    fontSize: '18px',
    fontWeight: '600',
    margin: 0,
    color: '#fff',
  },
  suggestionCards: {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
  },
  suggestionCard: {
    display: 'flex',
    alignItems: 'center',
    gap: '16px',
    padding: '16px',
    background: 'rgba(255,255,255,0.05)',
    borderRadius: '16px',
    border: '1px solid rgba(255,255,255,0.08)',
    transition: 'all 0.3s ease',
  },
  partnerIcon: {
    width: '50px',
    height: '50px',
    borderRadius: '12px',
    background: 'linear-gradient(135deg, rgba(255,105,180,0.2) 0%, rgba(0,206,209,0.2) 100%)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '24px',
  },
  partnerInfo: {
    flex: 1,
  },
  partnerName: {
    fontSize: '16px',
    fontWeight: '600',
    margin: '0 0 6px 0',
    color: '#fff',
  },
  partnerReason: {
    fontSize: '13px',
    color: 'rgba(255,255,255,0.6)',
    margin: 0,
    lineHeight: '1.4',
  },
  tryBtn: {
    padding: '8px 16px',
    background: 'linear-gradient(135deg, #ff69b4 0%, #ff8dc7 100%)',
    border: 'none',
    borderRadius: '12px',
    color: '#fff',
    fontSize: '13px',
    fontWeight: '500',
    cursor: 'pointer',
    boxShadow: '0 4px 15px rgba(255,105,180,0.3)',
    transition: 'all 0.3s ease',
  },
  tipCard: {
    margin: '20px',
    padding: '16px',
    background: 'linear-gradient(135deg, rgba(255,215,0,0.1) 0%, rgba(255,165,0,0.1) 100%)',
    borderRadius: '16px',
    border: '1px solid rgba(255,215,0,0.2)',
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
  },
  tipIcon: {
    fontSize: '24px',
  },
  tipText: {
    fontSize: '13px',
    color: 'rgba(255,255,255,0.7)',
    margin: 0,
    lineHeight: '1.5',
  },
};

export default FlowerMatch;