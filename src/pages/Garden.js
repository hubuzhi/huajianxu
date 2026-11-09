import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Garden() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('plants');
  const [showAddModal, setShowAddModal] = useState(false);

  const gardenPlants = [
    {
      id: 1,
      name: '月季',
      image: '🌹',
      status: '健康',
      lastWatered: '今天',
      nextWater: '后天',
      plantedDate: '2026-03-15',
      notes: '开花了，颜色很漂亮',
    },
    {
      id: 2,
      name: '绿萝',
      image: '🌿',
      status: '健康',
      lastWatered: '昨天',
      nextWater: '明天',
      plantedDate: '2026-02-20',
      notes: '长势很好，叶子翠绿',
    },
    {
      id: 3,
      name: '多肉',
      image: '🪴',
      status: '需浇水',
      lastWatered: '3天前',
      nextWater: '今天',
      plantedDate: '2026-04-01',
      notes: '需要浇水了',
    },
    {
      id: 4,
      name: '兰花',
      image: '🌸',
      status: '健康',
      lastWatered: '今天',
      nextWater: '3天后',
      plantedDate: '2026-01-10',
      notes: '春兰开花，香气怡人',
    },
  ];

  const diaryEntries = [
    {
      id: 1,
      date: '2026-05-28',
      plant: '月季',
      image: '🌹',
      content: '今天给月季浇水了，发现新开了两朵花，颜色粉粉的特别好看！',
      weather: '晴',
      activity: '浇水',
    },
    {
      id: 2,
      date: '2026-05-27',
      plant: '绿萝',
      image: '🌿',
      content: '绿萝长出了新的叶子，放在阳台散射光处生长得很好。',
      weather: '多云',
      activity: '观察',
    },
    {
      id: 3,
      date: '2026-05-25',
      plant: '多肉',
      image: '🪴',
      content: '给多肉换盆了，用了新的透气花盆和颗粒土，希望能长得更好。',
      weather: '晴',
      activity: '换盆',
    },
    {
      id: 4,
      date: '2026-05-20',
      plant: '兰花',
      image: '🌸',
      content: '春兰开花了！淡淡的香气弥漫整个房间，太治愈了。',
      weather: '晴',
      activity: '记录',
    },
    {
      id: 5,
      date: '2026-05-15',
      plant: '月季',
      image: '🌹',
      content: '给月季施肥了，用的是有机肥，希望花期更长。',
      weather: '晴',
      activity: '施肥',
    },
  ];

  const renderPlants = () => (
    <div style={styles.tabContent}>
      <div style={styles.plantGrid}>
        {gardenPlants.map((plant) => (
          <div key={plant.id} style={styles.plantCard}>
            <div style={styles.plantHeader}>
              <div style={styles.plantImage}>{plant.image}</div>
              <div style={styles.plantInfo}>
                <h4 style={styles.plantName}>{plant.name}</h4>
                <span style={{
                  ...styles.statusBadge,
                  ...(plant.status === '健康' ? styles.statusHealthy : styles.statusNeedWater),
                }}>
                  {plant.status}
                </span>
              </div>
            </div>
            <div style={styles.plantDetails}>
              <div style={styles.detailRow}>
                <span style={styles.detailLabel}>上次浇水</span>
                <span style={styles.detailValue}>{plant.lastWatered}</span>
              </div>
              <div style={styles.detailRow}>
                <span style={styles.detailLabel}>下次浇水</span>
                <span style={styles.detailValue}>{plant.nextWater}</span>
              </div>
              <div style={styles.detailRow}>
                <span style={styles.detailLabel}>种植日期</span>
                <span style={styles.detailValue}>{plant.plantedDate}</span>
              </div>
            </div>
            <p style={styles.plantNote}>{plant.notes}</p>
            <div style={styles.plantActions}>
              <button style={styles.actionBtn}>浇水</button>
              <button style={styles.actionBtn}>记录</button>
              <button style={styles.actionBtn}>详情</button>
            </div>
          </div>
        ))}
      </div>
      <button style={styles.addPlantBtn} onClick={() => setShowAddModal(true)}>
        <span style={styles.addIcon}>+</span>
        添加新植物
      </button>
    </div>
  );

  const renderDiary = () => (
    <div style={styles.tabContent}>
      <div style={styles.diaryList}>
        {diaryEntries.map((entry) => (
          <div key={entry.id} style={styles.diaryCard}>
            <div style={styles.diaryHeader}>
              <div style={styles.diaryPlant}>{entry.image}</div>
              <div style={styles.diaryMeta}>
                <h4 style={styles.diaryTitle}>{entry.plant} · {entry.activity}</h4>
                <span style={styles.diaryDate}>{entry.date} · {entry.weather}</span>
              </div>
            </div>
            <p style={styles.diaryContent}>{entry.content}</p>
            <div style={styles.diaryActions}>
              <button style={styles.diaryBtn}>编辑</button>
              <button style={styles.diaryBtn}>删除</button>
            </div>
          </div>
        ))}
      </div>
      <button style={styles.addDiaryBtn}>
        <span style={styles.addIcon}>📝</span>
        写日记
      </button>
    </div>
  );

  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <button onClick={() => navigate('/home')} style={styles.backBtn}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M19 12H5M12 19l-7-7 7-7" />
          </svg>
        </button>
        <h1 style={styles.headerTitle}>我的花园</h1>
        <div style={styles.placeholder} />
      </header>

      <div style={styles.gardenOverview}>
        <div style={styles.gardenHeader}>
          <span style={styles.gardenIcon}>🏡</span>
          <div style={styles.gardenInfo}>
            <h2 style={styles.gardenName}>小花的花园</h2>
            <p style={styles.gardenStats}>{gardenPlants.length} 种植物 · {diaryEntries.length} 条记录</p>
          </div>
        </div>
        <div style={styles.gardenFlowers}>
          {gardenPlants.map((plant) => (
            <span key={plant.id} style={styles.flowerEmoji}>{plant.image}</span>
          ))}
        </div>
      </div>

      <nav style={styles.tabNav}>
        <button
          style={{ ...styles.tabBtn, ...(activeTab === 'plants' ? styles.activeTab : {}) }}
          onClick={() => setActiveTab('plants')}
        >
          我的植物
        </button>
        <button
          style={{ ...styles.tabBtn, ...(activeTab === 'diary' ? styles.activeTab : {}) }}
          onClick={() => setActiveTab('diary')}
        >
          养花日记
        </button>
      </nav>

      {activeTab === 'plants' && renderPlants()}
      {activeTab === 'diary' && renderDiary()}
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
  placeholder: {
    width: '40px',
  },
  gardenOverview: {
    margin: '20px',
    padding: '20px',
    background: 'linear-gradient(135deg, rgba(50,205,50,0.15) 0%, rgba(34,139,34,0.15) 100%)',
    borderRadius: '20px',
    border: '1px solid rgba(50,205,50,0.2)',
  },
  gardenHeader: {
    display: 'flex',
    alignItems: 'center',
    gap: '16px',
    marginBottom: '16px',
  },
  gardenIcon: {
    width: '50px',
    height: '50px',
    borderRadius: '50%',
    background: 'linear-gradient(135deg, #32cd32 0%, #228b22 100%)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '24px',
    boxShadow: '0 4px 20px rgba(50,205,50,0.3)',
  },
  gardenInfo: {
    flex: 1,
  },
  gardenName: {
    fontSize: '18px',
    fontWeight: '600',
    margin: '0 0 6px 0',
    color: '#fff',
  },
  gardenStats: {
    fontSize: '13px',
    color: 'rgba(255,255,255,0.6)',
    margin: 0,
  },
  gardenFlowers: {
    display: 'flex',
    gap: '12px',
    justifyContent: 'center',
  },
  flowerEmoji: {
    fontSize: '32px',
  },
  tabNav: {
    display: 'flex',
    gap: '8px',
    padding: '0 20px 16px',
  },
  tabBtn: {
    flex: 1,
    padding: '12px',
    background: 'rgba(255,255,255,0.05)',
    border: 'none',
    borderRadius: '12px',
    color: 'rgba(255,255,255,0.6)',
    fontSize: '14px',
    fontWeight: '500',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
  },
  activeTab: {
    background: 'linear-gradient(135deg, rgba(50,205,50,0.2) 0%, rgba(34,139,34,0.2) 100%)',
    color: '#fff',
    boxShadow: '0 4px 15px rgba(50,205,50,0.2)',
  },
  tabContent: {
    padding: '0 20px 20px',
  },
  plantGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
    gap: '16px',
    marginBottom: '16px',
  },
  plantCard: {
    background: 'rgba(255,255,255,0.05)',
    borderRadius: '16px',
    padding: '16px',
    border: '1px solid rgba(255,255,255,0.08)',
    transition: 'all 0.3s ease',
  },
  plantHeader: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    marginBottom: '12px',
  },
  plantImage: {
    width: '50px',
    height: '50px',
    borderRadius: '12px',
    background: 'linear-gradient(135deg, rgba(255,105,180,0.2) 0%, rgba(0,206,209,0.2) 100%)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '24px',
  },
  plantInfo: {
    flex: 1,
  },
  plantName: {
    fontSize: '16px',
    fontWeight: '600',
    margin: '0 0 6px 0',
    color: '#fff',
  },
  statusBadge: {
    fontSize: '12px',
    padding: '4px 10px',
    borderRadius: '10px',
  },
  statusHealthy: {
    color: '#32cd32',
    background: 'rgba(50,205,50,0.1)',
  },
  statusNeedWater: {
    color: '#ff6b6b',
    background: 'rgba(255,107,107,0.1)',
  },
  plantDetails: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
    marginBottom: '12px',
  },
  detailRow: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  detailLabel: {
    fontSize: '12px',
    color: 'rgba(255,255,255,0.5)',
  },
  detailValue: {
    fontSize: '12px',
    color: 'rgba(255,255,255,0.8)',
  },
  plantNote: {
    fontSize: '13px',
    color: 'rgba(255,255,255,0.6)',
    margin: '0 0 12px 0',
    lineHeight: '1.4',
  },
  plantActions: {
    display: 'flex',
    gap: '8px',
  },
  actionBtn: {
    flex: 1,
    padding: '8px',
    background: 'rgba(255,255,255,0.1)',
    border: 'none',
    borderRadius: '8px',
    color: 'rgba(255,255,255,0.8)',
    fontSize: '12px',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
  },
  addPlantBtn: {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px',
    padding: '14px',
    background: 'rgba(255,255,255,0.05)',
    border: '2px dashed rgba(255,255,255,0.2)',
    borderRadius: '16px',
    color: 'rgba(255,255,255,0.6)',
    fontSize: '14px',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
  },
  addIcon: {
    fontSize: '18px',
  },
  diaryList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
    marginBottom: '16px',
  },
  diaryCard: {
    background: 'rgba(255,255,255,0.05)',
    borderRadius: '16px',
    padding: '16px',
    border: '1px solid rgba(255,255,255,0.08)',
    transition: 'all 0.3s ease',
  },
  diaryHeader: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    marginBottom: '12px',
  },
  diaryPlant: {
    width: '40px',
    height: '40px',
    borderRadius: '10px',
    background: 'linear-gradient(135deg, rgba(255,105,180,0.2) 0%, rgba(0,206,209,0.2) 100%)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '20px',
  },
  diaryMeta: {
    flex: 1,
  },
  diaryTitle: {
    fontSize: '15px',
    fontWeight: '600',
    margin: '0 0 4px 0',
    color: '#fff',
  },
  diaryDate: {
    fontSize: '12px',
    color: 'rgba(255,255,255,0.5)',
  },
  diaryContent: {
    fontSize: '14px',
    color: 'rgba(255,255,255,0.7)',
    margin: '0 0 12px 0',
    lineHeight: '1.6',
  },
  diaryActions: {
    display: 'flex',
    gap: '8px',
  },
  diaryBtn: {
    padding: '6px 12px',
    background: 'rgba(255,255,255,0.1)',
    border: 'none',
    borderRadius: '8px',
    color: 'rgba(255,255,255,0.6)',
    fontSize: '12px',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
  },
  addDiaryBtn: {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px',
    padding: '14px',
    background: 'linear-gradient(135deg, #32cd32 0%, #228b22 100%)',
    border: 'none',
    borderRadius: '16px',
    color: '#fff',
    fontSize: '14px',
    fontWeight: '500',
    cursor: 'pointer',
    boxShadow: '0 4px 15px rgba(50,205,50,0.3)',
    transition: 'all 0.3s ease',
  },
};

export default Garden;