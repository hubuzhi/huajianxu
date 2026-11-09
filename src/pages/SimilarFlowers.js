import React from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';

function SimilarFlowers() {
  const navigate = useNavigate();
  const { flowerId } = useParams();
  const location = useLocation();
  const flower = location.state;

  const similarFlowersData = {
    '玫瑰': [
      {
        name: '月季',
        image: '🌹',
        similarity: 95,
        color: '#ff1493',
        differences: '花期更长，花朵较小，刺较少',
        common: '同属蔷薇科，花型相似，香气浓郁',
      },
      {
        name: '蔷薇',
        image: '🌸',
        similarity: 90,
        color: '#ff69b4',
        differences: '花朵较小，多为簇生，攀援性强',
        common: '同属蔷薇科，花色丰富，香气怡人',
      },
      {
        name: '牡丹',
        image: '🌺',
        similarity: 75,
        color: '#ffd700',
        differences: '花朵更大，无刺，花期较短',
        common: '同为观赏名花，花型华贵，寓意美好',
      },
      {
        name: '芍药',
        image: '🌷',
        similarity: 70,
        color: '#ff6b6b',
        differences: '草本植物，花朵稍小，花期较晚',
        common: '花型相似，同为富贵之花，观赏价值高',
      },
    ],
    '牡丹': [
      {
        name: '芍药',
        image: '🌷',
        similarity: 95,
        color: '#ff6b6b',
        differences: '草本植物，花期较晚，花朵稍小',
        common: '花型相似，同为富贵象征，观赏价值高',
      },
      {
        name: '玫瑰',
        image: '🌹',
        similarity: 75,
        color: '#ff69b4',
        differences: '花朵较小，有刺，花期较长',
        common: '同为名贵观赏花卉，花型华贵',
      },
      {
        name: '荷花',
        image: '🪷',
        similarity: 60,
        color: '#00ced1',
        differences: '水生植物，花朵形状不同',
        common: '同为传统名花，寓意美好',
      },
    ],
    '兰花': [
      {
        name: '君子兰',
        image: '🌿',
        similarity: 80,
        color: '#32cd32',
        differences: '叶片更宽，花朵较小，花期不同',
        common: '同为观叶观花植物，气质高雅',
      },
      {
        name: '蝴蝶兰',
        image: '🦋',
        similarity: 75,
        color: '#ff69b4',
        differences: '花朵形状似蝴蝶，花期较长',
        common: '同属兰科，气质高雅，观赏性强',
      },
      {
        name: '文心兰',
        image: '🌸',
        similarity: 70,
        color: '#ffd700',
        differences: '花朵小巧，形似跳舞女郎',
        common: '同属兰科，香气怡人，适合室内',
      },
    ],
  };

  const currentFlowerName = flower?.name || '玫瑰';
  const similarFlowers = similarFlowersData[currentFlowerName] || similarFlowersData['玫瑰'];

  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <button onClick={() => navigate(-1)} style={styles.backBtn}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M19 12H5M12 19l-7-7 7-7" />
          </svg>
        </button>
        <h1 style={styles.headerTitle}>相似花卉推荐</h1>
        <div style={styles.placeholder} />
      </header>

      <div style={styles.currentFlower}>
        <div style={styles.currentIcon}>{flower?.image || '🌹'}</div>
        <div style={styles.currentInfo}>
          <h2 style={styles.currentName}>{currentFlowerName}</h2>
          <p style={styles.currentMeaning}>花语：{flower?.meaning || '爱情'}</p>
        </div>
      </div>

      <div style={styles.similarityList}>
        <h3 style={styles.sectionTitle}>相似花卉</h3>
        {similarFlowers.map((item, index) => (
          <div key={index} style={styles.similarityCard}>
            <div style={styles.cardHeader}>
              <div style={styles.flowerIcon}>{item.image}</div>
              <div style={styles.flowerInfo}>
                <h4 style={styles.flowerName}>{item.name}</h4>
                <div style={styles.similarityBar}>
                  <div style={styles.similarityTrack}>
                    <div style={{
                      ...styles.similarityFill,
                      width: `${item.similarity}%`,
                      backgroundColor: item.color,
                    }} />
                  </div>
                  <span style={styles.similarityValue}>相似度 {item.similarity}%</span>
                </div>
              </div>
            </div>

            <div style={styles.compareSection}>
              <div style={styles.compareItem}>
                <span style={styles.compareLabel}>相同点</span>
                <p style={styles.compareText}>{item.common}</p>
              </div>
              <div style={styles.compareItem}>
                <span style={styles.compareLabel}>不同点</span>
                <p style={styles.compareText}>{item.differences}</p>
              </div>
            </div>

            <div style={styles.cardActions}>
              <button style={styles.viewBtn}>查看详情</button>
              <button style={styles.collectBtn}>收藏</button>
            </div>
          </div>
        ))}
      </div>

      <div style={styles.tipCard}>
        <span style={styles.tipIcon}>💡</span>
        <p style={styles.tipText}>
          相似花卉可以帮助您更好地了解花卉之间的关系，选择适合自己养护条件的品种。
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
  similarityList: {
    padding: '20px',
  },
  sectionTitle: {
    fontSize: '16px',
    fontWeight: '600',
    margin: '0 0 16px 0',
    color: '#fff',
  },
  similarityCard: {
    background: 'rgba(255,255,255,0.05)',
    borderRadius: '16px',
    padding: '16px',
    marginBottom: '16px',
    border: '1px solid rgba(255,255,255,0.08)',
    transition: 'all 0.3s ease',
  },
  cardHeader: {
    display: 'flex',
    alignItems: 'center',
    gap: '16px',
    marginBottom: '16px',
  },
  flowerIcon: {
    width: '50px',
    height: '50px',
    borderRadius: '12px',
    background: 'linear-gradient(135deg, rgba(255,105,180,0.2) 0%, rgba(0,206,209,0.2) 100%)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '24px',
  },
  flowerInfo: {
    flex: 1,
  },
  flowerName: {
    fontSize: '16px',
    fontWeight: '600',
    margin: '0 0 8px 0',
    color: '#fff',
  },
  similarityBar: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
  },
  similarityTrack: {
    flex: 1,
    height: '6px',
    background: 'rgba(255,255,255,0.1)',
    borderRadius: '3px',
    overflow: 'hidden',
  },
  similarityFill: {
    height: '100%',
    borderRadius: '3px',
  },
  similarityValue: {
    fontSize: '12px',
    color: 'rgba(255,255,255,0.5)',
  },
  compareSection: {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
    marginBottom: '16px',
  },
  compareItem: {
    display: 'flex',
    flexDirection: 'column',
    gap: '4px',
  },
  compareLabel: {
    fontSize: '12px',
    color: '#00ced1',
    fontWeight: '500',
  },
  compareText: {
    fontSize: '13px',
    color: 'rgba(255,255,255,0.7)',
    margin: 0,
    lineHeight: '1.5',
  },
  cardActions: {
    display: 'flex',
    gap: '12px',
  },
  viewBtn: {
    flex: 1,
    padding: '10px',
    background: 'linear-gradient(135deg, #00ced1 0%, #20b2aa 100%)',
    border: 'none',
    borderRadius: '12px',
    color: '#fff',
    fontSize: '14px',
    fontWeight: '500',
    cursor: 'pointer',
    boxShadow: '0 4px 15px rgba(0,206,209,0.3)',
    transition: 'all 0.3s ease',
  },
  collectBtn: {
    flex: 1,
    padding: '10px',
    background: 'rgba(255,255,255,0.1)',
    border: '1px solid rgba(255,255,255,0.2)',
    borderRadius: '12px',
    color: 'rgba(255,255,255,0.8)',
    fontSize: '14px',
    cursor: 'pointer',
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

export default SimilarFlowers;