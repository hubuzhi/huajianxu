import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Collections() {
  const navigate = useNavigate();
  const [filter, setFilter] = useState('all');

  const collections = [
    {
      id: 1,
      name: '玫瑰',
      image: 'https://ts2.tc.mm.bing.net/th/id/OIP-C.6MB8WA_-c2pN1qWA1BYS_QHaE8?rs=1&pid=ImgDetMain&o=7&rm=3',
      meaning: '爱情',
      color: '#ff69b4',
      collectedAt: '2026-05-15',
      category: 'romantic',
    },
    {
      id: 2,
      name: '牡丹',
      image: 'https://img95.699pic.com/photo/50533/8043.jpg_wh860.jpg',
      meaning: '富贵',
      color: '#ffd700',
      collectedAt: '2026-05-10',
      category: 'traditional',
    },
    {
      id: 3,
      name: '兰花',
      image: 'https://imgs.699pic.com/images/402/606/664.jpg!detail.v1',
      meaning: '典雅',
      color: '#9932cc',
      collectedAt: '2026-05-08',
      category: 'traditional',
    },
    {
      id: 4,
      name: '荷花',
      image: 'https://imgs.699pic.com/images/402/635/212.jpg!detail.v1',
      meaning: '纯洁',
      color: '#00ced1',
      collectedAt: '2026-05-05',
      category: 'water',
    },
    {
      id: 5,
      name: '梅花',
      image: 'https://img95.699pic.com/photo/40254/1290.jpg_wh860.jpg',
      meaning: '坚韧',
      color: '#ffb6c1',
      collectedAt: '2026-04-28',
      category: 'traditional',
    },
    {
      id: 6,
      name: '月季',
      image: 'https://imgs.699pic.com/images/600/305/042.jpg!detail.v1',
      meaning: '美丽',
      color: '#ff1493',
      collectedAt: '2026-04-20',
      category: 'romantic',
    },
    {
      id: 7,
      name: '菊花',
      image: 'https://imgs.699pic.com/images/402/636/722.jpg!list1x.v2',
      meaning: '高洁',
      color: '#ff9a40',
      collectedAt: '2026-04-15',
      category: 'traditional',
    },
    {
      id: 8,
      name: '桂花',
      image: 'https://img95.699pic.com/photo/40253/9399.jpg_wh860.jpg',
      meaning: '吉祥',
      color: '#32cd32',
      collectedAt: '2026-04-10',
      category: 'fragrant',
    },
  ];

  const filters = [
    { id: 'all', name: '全部', count: collections.length },
    { id: 'romantic', name: '爱情花', count: collections.filter(c => c.category === 'romantic').length },
    { id: 'traditional', name: '传统名花', count: collections.filter(c => c.category === 'traditional').length },
    { id: 'fragrant', name: '香花', count: collections.filter(c => c.category === 'fragrant').length },
    { id: 'water', name: '水生花', count: collections.filter(c => c.category === 'water').length },
  ];

  const filteredCollections = filter === 'all' 
    ? collections 
    : collections.filter(c => c.category === filter);

  const handleFlowerClick = (flower) => {
    navigate(`/flower/${flower.id}`, { state: flower });
  };

  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <button onClick={() => navigate('/home')} style={styles.backBtn}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M19 12H5M12 19l-7-7 7-7" />
          </svg>
        </button>
        <h1 style={styles.headerTitle}>我的收藏</h1>
        <span style={styles.countBadge}>{collections.length} 种</span>
      </header>

      <div style={styles.filterNav}>
        {filters.map((f) => (
          <button
            key={f.id}
            style={{
              ...styles.filterBtn,
              ...(filter === f.id ? styles.activeFilter : {}),
            }}
            onClick={() => setFilter(f.id)}
          >
            {f.name}
            <span style={styles.filterCount}>{f.count}</span>
          </button>
        ))}
      </div>

      <div style={styles.collectionsGrid}>
        {filteredCollections.map((flower) => (
          <div
            key={flower.id}
            style={styles.collectionCard}
            onClick={() => handleFlowerClick(flower)}
          >
            <div style={{
              ...styles.cardImage,
              backgroundImage: `url(${flower.image})`,
            }}>
              <div style={styles.cardOverlay}>
                <span style={styles.cardName}>{flower.name}</span>
              </div>
            </div>
            <div style={styles.cardInfo}>
              <div style={styles.cardMeta}>
                <span style={{ ...styles.colorDot, backgroundColor: flower.color }} />
                <span style={styles.cardMeaning}>花语：{flower.meaning}</span>
              </div>
              <span style={styles.cardDate}>收藏于 {flower.collectedAt}</span>
            </div>
          </div>
        ))}
      </div>

      {filteredCollections.length === 0 && (
        <div style={styles.emptyState}>
          <span style={styles.emptyIcon}>🌸</span>
          <p style={styles.emptyText}>暂无收藏的花卉</p>
          <button onClick={() => navigate('/home')} style={styles.emptyBtn}>
            去图鉴看看
          </button>
        </div>
      )}
    </div>
  );
}

const styles = {
  container: {
    minHeight: '100vh',
    background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)',
    color: '#fff',
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
  countBadge: {
    fontSize: '14px',
    color: '#00ced1',
    background: 'rgba(0,206,209,0.1)',
    padding: '6px 12px',
    borderRadius: '12px',
  },
  filterNav: {
    display: 'flex',
    gap: '8px',
    padding: '16px 20px',
    overflowX: 'auto',
  },
  filterBtn: {
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    padding: '10px 16px',
    background: 'rgba(255,255,255,0.05)',
    border: '1px solid rgba(255,255,255,0.1)',
    borderRadius: '20px',
    color: 'rgba(255,255,255,0.7)',
    fontSize: '13px',
    cursor: 'pointer',
    whiteSpace: 'nowrap',
    transition: 'all 0.3s ease',
  },
  activeFilter: {
    background: 'linear-gradient(135deg, rgba(255,105,180,0.2) 0%, rgba(0,206,209,0.2) 100%)',
    borderColor: 'rgba(255,105,180,0.3)',
    color: '#fff',
  },
  filterCount: {
    fontSize: '12px',
    color: 'rgba(255,255,255,0.5)',
  },
  collectionsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
    gap: '16px',
    padding: '20px',
  },
  collectionCard: {
    background: 'rgba(255,255,255,0.05)',
    borderRadius: '16px',
    overflow: 'hidden',
    border: '1px solid rgba(255,255,255,0.08)',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
  },
  cardImage: {
    height: '140px',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    position: 'relative',
  },
  cardOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: '12px',
    background: 'linear-gradient(to top, rgba(0,0,0,0.7), transparent)',
  },
  cardName: {
    fontSize: '16px',
    fontWeight: '600',
    color: '#fff',
  },
  cardInfo: {
    padding: '12px',
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
  },
  cardMeta: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
  },
  colorDot: {
    width: '12px',
    height: '12px',
    borderRadius: '50%',
  },
  cardMeaning: {
    fontSize: '13px',
    color: 'rgba(255,255,255,0.7)',
  },
  cardDate: {
    fontSize: '12px',
    color: 'rgba(255,255,255,0.5)',
  },
  emptyState: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '60px 20px',
    textAlign: 'center',
  },
  emptyIcon: {
    fontSize: '64px',
    marginBottom: '16px',
  },
  emptyText: {
    fontSize: '16px',
    color: 'rgba(255,255,255,0.6)',
    margin: '0 0 20px 0',
  },
  emptyBtn: {
    background: 'linear-gradient(135deg, #ff69b4 0%, #ff8dc7 100%)',
    border: 'none',
    borderRadius: '20px',
    padding: '12px 24px',
    color: '#fff',
    fontSize: '14px',
    cursor: 'pointer',
    boxShadow: '0 4px 15px rgba(255,105,180,0.3)',
    transition: 'all 0.3s ease',
  },
};

export default Collections;