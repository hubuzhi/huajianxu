import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Tools() {
  const navigate = useNavigate();
  const [activeTool, setActiveTool] = useState('water');
  const [reminders, setReminders] = useState([
    { id: 1, plant: '月季', time: '08:00', days: ['一', '三', '五'], enabled: true },
    { id: 2, plant: '绿萝', time: '18:00', days: ['二', '四', '六'], enabled: true },
    { id: 3, plant: '多肉', time: '10:00', days: ['日'], enabled: false },
  ]);

  const plants = [
    {
      name: '月季',
      image: '🌹',
      light: '充足阳光',
      hours: '6-8小时/天',
      tips: '喜阳光充足，耐寒性较强，夏季需适当遮阴',
    },
    {
      name: '绿萝',
      image: '🌿',
      light: '散射光',
      hours: '3-4小时/天',
      tips: '喜半阴环境，避免强光直射，适合室内养护',
    },
    {
      name: '多肉',
      image: '🪴',
      light: '充足阳光',
      hours: '4-6小时/天',
      tips: '喜阳光充足，夏季需遮阴，冬季可全日照',
    },
    {
      name: '兰花',
      image: '🌸',
      light: '散射光',
      hours: '2-4小时/天',
      tips: '喜半阴环境，忌强光直射，适合明亮散射光',
    },
  ];

  const pests = [
    {
      id: 1,
      name: '蚜虫',
      image: '🐛',
      symptoms: '叶片卷曲、发黄，嫩芽上有小虫',
      treatment: '用肥皂水或辣椒水喷洒，严重时使用吡虫啉',
      prevention: '保持通风，定期检查叶片背面',
    },
    {
      id: 2,
      name: '红蜘蛛',
      image: '🕷️',
      symptoms: '叶片出现黄白色斑点，有细丝网',
      treatment: '增加空气湿度，用阿维菌素喷洒',
      prevention: '保持空气湿润，避免干燥环境',
    },
    {
      id: 3,
      name: '白粉病',
      image: '🦠',
      symptoms: '叶片表面有白色粉状物',
      treatment: '剪除病叶，喷洒多菌灵或硫磺粉',
      prevention: '保持通风，避免叶片积水',
    },
    {
      id: 4,
      name: '根腐病',
      image: '🥀',
      symptoms: '叶片发黄萎蔫，根部发黑腐烂',
      treatment: '换土换盆，剪除烂根，用多菌灵消毒',
      prevention: '控制浇水，保持土壤透气',
    },
  ];

  const toggleReminder = (id) => {
    setReminders(reminders.map(r => 
      r.id === id ? { ...r, enabled: !r.enabled } : r
    ));
  };

  const renderWaterReminder = () => (
    <div style={styles.toolContent}>
      <div style={styles.toolHeader}>
        <h2 style={styles.toolTitle}>浇水提醒</h2>
        <p style={styles.toolDesc}>设置浇水提醒，让您的花卉健康成长</p>
      </div>

      <div style={styles.reminderList}>
        {reminders.map((reminder) => (
          <div key={reminder.id} style={styles.reminderCard}>
            <div style={styles.reminderInfo}>
              <span style={styles.reminderIcon}>💧</span>
              <div style={styles.reminderDetails}>
                <h4 style={styles.reminderName}>{reminder.plant}</h4>
                <p style={styles.reminderTime}>
                  {reminder.time} · 每周{reminder.days.join('、')}
                </p>
              </div>
            </div>
            <div style={styles.reminderActions}>
              <label style={styles.toggle}>
                <input
                  type="checkbox"
                  checked={reminder.enabled}
                  onChange={() => toggleReminder(reminder.id)}
                  style={styles.toggleInput}
                />
                <span style={{
                  ...styles.toggleSlider,
                  ...(reminder.enabled ? styles.toggleActive : {}),
                }} />
              </label>
              <button style={styles.editBtn}>编辑</button>
            </div>
          </div>
        ))}
      </div>

      <button style={styles.addBtn}>
        <span style={styles.addIcon}>+</span>
        添加新提醒
      </button>

      <div style={styles.tipsCard}>
        <h4 style={styles.tipsTitle}>浇水小贴士</h4>
        <ul style={styles.tipsList}>
          <li style={styles.tipsItem}>早晨或傍晚浇水最佳</li>
          <li style={styles.tipsItem}>浇水要浇透，见干见湿</li>
          <li style={styles.tipsItem}>夏季增加浇水频率</li>
          <li style={styles.tipsItem}>冬季减少浇水次数</li>
        </ul>
      </div>
    </div>
  );

  const renderLightGuide = () => (
    <div style={styles.toolContent}>
      <div style={styles.toolHeader}>
        <h2 style={styles.toolTitle}>光照建议</h2>
        <p style={styles.toolDesc}>了解不同花卉的光照需求</p>
      </div>

      <div style={styles.plantGrid}>
        {plants.map((plant, index) => (
          <div key={index} style={styles.plantCard}>
            <div style={styles.plantImage}>{plant.image}</div>
            <div style={styles.plantInfo}>
              <h4 style={styles.plantName}>{plant.name}</h4>
              <div style={styles.lightInfo}>
                <span style={styles.lightLabel}>光照需求</span>
                <span style={styles.lightValue}>{plant.light}</span>
              </div>
              <div style={styles.lightInfo}>
                <span style={styles.lightLabel}>光照时长</span>
                <span style={styles.lightValue}>{plant.hours}</span>
              </div>
              <p style={styles.plantTips}>{plant.tips}</p>
            </div>
          </div>
        ))}
      </div>

      <div style={styles.lightMeter}>
        <h4 style={styles.meterTitle}>当前光照强度</h4>
        <div style={styles.meterBar}>
          <div style={styles.meterFill} />
        </div>
        <div style={styles.meterLabels}>
          <span>弱</span>
          <span>适中</span>
          <span>强</span>
        </div>
        <p style={styles.meterStatus}>当前光照适中，适合大部分室内植物</p>
      </div>
    </div>
  );

  const renderPestIdentify = () => (
    <div style={styles.toolContent}>
      <div style={styles.toolHeader}>
        <h2 style={styles.toolTitle}>病虫害识别</h2>
        <p style={styles.toolDesc}>常见病虫害及防治方法</p>
      </div>

      <div style={styles.uploadArea}>
        <div style={styles.uploadBox}>
          <span style={styles.uploadIcon}>📷</span>
          <p style={styles.uploadText}>上传植物照片进行识别</p>
          <p style={styles.uploadHint}>支持 JPG、PNG 格式</p>
        </div>
        <button style={styles.uploadBtn}>选择照片</button>
      </div>

      <div style={styles.pestList}>
        <h4 style={styles.listTitle}>常见病虫害</h4>
        {pests.map((pest) => (
          <div key={pest.id} style={styles.pestCard}>
            <div style={styles.pestHeader}>
              <span style={styles.pestImage}>{pest.image}</span>
              <h5 style={styles.pestName}>{pest.name}</h5>
            </div>
            <div style={styles.pestSection}>
              <span style={styles.pestLabel}>症状：</span>
              <span style={styles.pestValue}>{pest.symptoms}</span>
            </div>
            <div style={styles.pestSection}>
              <span style={styles.pestLabel}>治疗：</span>
              <span style={styles.pestValue}>{pest.treatment}</span>
            </div>
            <div style={styles.pestSection}>
              <span style={styles.pestLabel}>预防：</span>
              <span style={styles.pestValue}>{pest.prevention}</span>
            </div>
          </div>
        ))}
      </div>
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
        <h1 style={styles.headerTitle}>养花工具</h1>
        <div style={styles.placeholder} />
      </header>

      <nav style={styles.toolNav}>
        <button
          style={{ ...styles.toolBtn, ...(activeTool === 'water' ? styles.activeTool : {}) }}
          onClick={() => setActiveTool('water')}
        >
          <span style={styles.toolBtnIcon}>💧</span>
          浇水提醒
        </button>
        <button
          style={{ ...styles.toolBtn, ...(activeTool === 'light' ? styles.activeTool : {}) }}
          onClick={() => setActiveTool('light')}
        >
          <span style={styles.toolBtnIcon}>☀️</span>
          光照建议
        </button>
        <button
          style={{ ...styles.toolBtn, ...(activeTool === 'pest' ? styles.activeTool : {}) }}
          onClick={() => setActiveTool('pest')}
        >
          <span style={styles.toolBtnIcon}>🔍</span>
          病虫害识别
        </button>
      </nav>

      {activeTool === 'water' && renderWaterReminder()}
      {activeTool === 'light' && renderLightGuide()}
      {activeTool === 'pest' && renderPestIdentify()}
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
  toolNav: {
    display: 'flex',
    gap: '8px',
    padding: '12px 20px',
    background: 'rgba(255,255,255,0.03)',
    borderBottom: '1px solid rgba(255,255,255,0.05)',
  },
  toolBtn: {
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '6px',
    padding: '12px 8px',
    background: 'transparent',
    border: 'none',
    borderRadius: '12px',
    color: 'rgba(255,255,255,0.6)',
    fontSize: '13px',
    fontWeight: '500',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
  },
  activeTool: {
    background: 'linear-gradient(135deg, rgba(0,206,209,0.2) 0%, rgba(32,178,170,0.2) 100%)',
    color: '#fff',
    boxShadow: '0 4px 15px rgba(0,206,209,0.2)',
  },
  toolBtnIcon: {
    fontSize: '16px',
  },
  toolContent: {
    padding: '20px',
  },
  toolHeader: {
    marginBottom: '20px',
  },
  toolTitle: {
    fontSize: '24px',
    fontWeight: '600',
    margin: '0 0 8px 0',
    background: 'linear-gradient(90deg, #00ced1, #20b2aa)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
  },
  toolDesc: {
    fontSize: '14px',
    color: 'rgba(255,255,255,0.6)',
    margin: 0,
  },
  reminderList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
    marginBottom: '16px',
  },
  reminderCard: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    background: 'rgba(255,255,255,0.05)',
    borderRadius: '16px',
    padding: '16px',
    border: '1px solid rgba(255,255,255,0.08)',
    transition: 'all 0.3s ease',
  },
  reminderInfo: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
  },
  reminderIcon: {
    fontSize: '28px',
  },
  reminderDetails: {
    display: 'flex',
    flexDirection: 'column',
    gap: '4px',
  },
  reminderName: {
    fontSize: '16px',
    fontWeight: '600',
    margin: 0,
    color: '#fff',
  },
  reminderTime: {
    fontSize: '13px',
    color: 'rgba(255,255,255,0.5)',
    margin: 0,
  },
  reminderActions: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
  },
  toggle: {
    position: 'relative',
    display: 'inline-block',
    width: '48px',
    height: '26px',
  },
  toggleInput: {
    opacity: 0,
    width: 0,
    height: 0,
  },
  toggleSlider: {
    position: 'absolute',
    cursor: 'pointer',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'rgba(255,255,255,0.2)',
    borderRadius: '26px',
    transition: 'all 0.3s ease',
  },
  toggleActive: {
    background: 'linear-gradient(135deg, #00ced1 0%, #20b2aa 100%)',
  },
  editBtn: {
    background: 'rgba(255,255,255,0.1)',
    border: 'none',
    borderRadius: '8px',
    padding: '6px 12px',
    color: 'rgba(255,255,255,0.8)',
    fontSize: '13px',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
  },
  addBtn: {
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
    marginBottom: '20px',
  },
  addIcon: {
    fontSize: '18px',
  },
  tipsCard: {
    background: 'linear-gradient(135deg, rgba(0,206,209,0.1) 0%, rgba(32,178,170,0.1) 100%)',
    borderRadius: '16px',
    padding: '16px',
    border: '1px solid rgba(0,206,209,0.2)',
  },
  tipsTitle: {
    fontSize: '15px',
    fontWeight: '600',
    margin: '0 0 12px 0',
    color: '#00ced1',
  },
  tipsList: {
    margin: 0,
    padding: '0 0 0 20px',
  },
  tipsItem: {
    fontSize: '13px',
    color: 'rgba(255,255,255,0.7)',
    marginBottom: '8px',
    lineHeight: '1.5',
  },
  plantGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
    gap: '12px',
    marginBottom: '20px',
  },
  plantCard: {
    background: 'rgba(255,255,255,0.05)',
    borderRadius: '16px',
    padding: '16px',
    border: '1px solid rgba(255,255,255,0.08)',
    transition: 'all 0.3s ease',
  },
  plantImage: {
    width: '60px',
    height: '60px',
    borderRadius: '12px',
    background: 'linear-gradient(135deg, rgba(255,105,180,0.2) 0%, rgba(0,206,209,0.2) 100%)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '32px',
    marginBottom: '12px',
  },
  plantInfo: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
  },
  plantName: {
    fontSize: '16px',
    fontWeight: '600',
    margin: 0,
    color: '#fff',
  },
  lightInfo: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  lightLabel: {
    fontSize: '12px',
    color: 'rgba(255,255,255,0.5)',
  },
  lightValue: {
    fontSize: '12px',
    color: '#00ced1',
    fontWeight: '500',
  },
  plantTips: {
    fontSize: '12px',
    color: 'rgba(255,255,255,0.6)',
    margin: 0,
    lineHeight: '1.4',
  },
  lightMeter: {
    background: 'rgba(255,255,255,0.05)',
    borderRadius: '16px',
    padding: '16px',
    border: '1px solid rgba(255,255,255,0.08)',
  },
  meterTitle: {
    fontSize: '15px',
    fontWeight: '600',
    margin: '0 0 12px 0',
    color: '#fff',
  },
  meterBar: {
    height: '8px',
    background: 'rgba(255,255,255,0.1)',
    borderRadius: '4px',
    overflow: 'hidden',
    marginBottom: '8px',
  },
  meterFill: {
    width: '60%',
    height: '100%',
    background: 'linear-gradient(90deg, #32cd32, #ffd700, #ff6b6b)',
    borderRadius: '4px',
  },
  meterLabels: {
    display: 'flex',
    justifyContent: 'space-between',
    fontSize: '12px',
    color: 'rgba(255,255,255,0.5)',
    marginBottom: '12px',
  },
  meterStatus: {
    fontSize: '13px',
    color: '#32cd32',
    margin: 0,
    textAlign: 'center',
  },
  uploadArea: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '12px',
    marginBottom: '24px',
  },
  uploadBox: {
    width: '100%',
    padding: '40px 20px',
    background: 'rgba(255,255,255,0.05)',
    border: '2px dashed rgba(255,255,255,0.2)',
    borderRadius: '16px',
    textAlign: 'center',
  },
  uploadIcon: {
    fontSize: '48px',
    display: 'block',
    marginBottom: '12px',
  },
  uploadText: {
    fontSize: '15px',
    color: 'rgba(255,255,255,0.8)',
    margin: '0 0 8px 0',
  },
  uploadHint: {
    fontSize: '12px',
    color: 'rgba(255,255,255,0.5)',
    margin: 0,
  },
  uploadBtn: {
    background: 'linear-gradient(135deg, #00ced1 0%, #20b2aa 100%)',
    border: 'none',
    borderRadius: '20px',
    padding: '10px 24px',
    color: '#fff',
    fontSize: '14px',
    fontWeight: '500',
    cursor: 'pointer',
    boxShadow: '0 4px 15px rgba(0,206,209,0.3)',
    transition: 'all 0.3s ease',
  },
  pestList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
  },
  listTitle: {
    fontSize: '16px',
    fontWeight: '600',
    margin: '0 0 12px 0',
    color: '#fff',
  },
  pestCard: {
    background: 'rgba(255,255,255,0.05)',
    borderRadius: '16px',
    padding: '16px',
    border: '1px solid rgba(255,255,255,0.08)',
    transition: 'all 0.3s ease',
  },
  pestHeader: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    marginBottom: '12px',
  },
  pestImage: {
    fontSize: '28px',
  },
  pestName: {
    fontSize: '16px',
    fontWeight: '600',
    margin: 0,
    color: '#fff',
  },
  pestSection: {
    marginBottom: '8px',
  },
  pestLabel: {
    fontSize: '13px',
    color: '#ff69b4',
    fontWeight: '500',
  },
  pestValue: {
    fontSize: '13px',
    color: 'rgba(255,255,255,0.7)',
  },
};

export default Tools;