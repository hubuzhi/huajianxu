import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Tutorials() {
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState('beginner');
  const [selectedTutorial, setSelectedTutorial] = useState(null);

  const categories = [
    { id: 'beginner', name: '新手插花', icon: '🌸' },
    { id: 'festival', name: '节日花艺', icon: '🎉' },
    { id: 'dried', name: '干花制作', icon: '💐' },
  ];

  const tutorials = {
    beginner: [
      {
        id: 1,
        title: '基础花束绑扎技巧',
        image: '💐',
        difficulty: '入门',
        duration: '15分钟',
        materials: ['鲜花若干', '剪刀', '丝带', '包装纸'],
        steps: [
          '选择3-5朵主花，如玫瑰或康乃馨',
          '将花朵呈螺旋状排列，高度错落有致',
          '用手指固定花束，逐步添加配花和绿叶',
          '用花艺胶带或丝带固定花束底部',
          '修剪花枝，使底部整齐',
          '用包装纸包裹花束，系上丝带装饰',
        ],
        tips: '初学者建议选择花杆较硬的花材，更容易操作',
      },
      {
        id: 2,
        title: '简单瓶插花入门',
        image: '🏺',
        difficulty: '入门',
        duration: '10分钟',
        materials: ['花瓶', '鲜花', '清水', '营养液'],
        steps: [
          '选择合适高度的花瓶，清洗干净',
          '将花枝斜切45度，增加吸水面积',
          '去除花枝下部叶片，避免泡水腐烂',
          '按照高度层次插入花瓶',
          '加入清水和营养液',
          '每2-3天换水一次',
        ],
        tips: '瓶插花的高度建议是花瓶高度的1.5-2倍',
      },
      {
        id: 3,
        title: '花篮插花基础',
        image: '🧺',
        difficulty: '简单',
        duration: '20分钟',
        materials: ['花篮', '花泥', '鲜花', '绿叶'],
        steps: [
          '将花泥浸水后放入花篮',
          '先插绿叶打底，确定整体形状',
          '插入主花，注意高低层次',
          '添加配花填充空隙',
          '调整花朵朝向，使整体协调',
          '检查是否有空隙，适当补充',
        ],
        tips: '花泥要充分浸水，确保花材能吸收水分',
      },
    ],
    festival: [
      {
        id: 4,
        title: '春节年宵花插花',
        image: '🧧',
        difficulty: '中等',
        duration: '30分钟',
        materials: ['年宵花', '红色丝带', '金色装饰', '花瓶'],
        steps: [
          '选择红色系花卉，如银柳、冬青',
          '搭配金色装饰物，增添喜庆氛围',
          '将花枝修剪成合适长度',
          '按照高低层次插入花瓶',
          '系上红色丝带或中国结',
          '添加小灯笼等装饰点缀',
        ],
        tips: '春节插花以红色、金色为主，寓意吉祥如意',
      },
      {
        id: 5,
        title: '情人节玫瑰花束',
        image: '🌹',
        difficulty: '中等',
        duration: '25分钟',
        materials: ['红玫瑰', '配花', '包装纸', '丝带'],
        steps: [
          '选择11朵或99朵红玫瑰',
          '将玫瑰花呈螺旋状排列',
          '添加满天星或情人草点缀',
          '用包装纸包裹花束',
          '系上红色丝带蝴蝶结',
          '喷洒保鲜液延长花期',
        ],
        tips: '玫瑰要选择花苞饱满、花瓣紧实的',
      },
      {
        id: 6,
        title: '中秋花篮制作',
        image: '🌕',
        difficulty: '中等',
        duration: '35分钟',
        materials: ['菊花', '桂花', '花篮', '装饰品'],
        steps: [
          '选择秋季花卉，如菊花、桂花',
          '准备圆形花篮，放入花泥',
          '以菊花为主花，呈圆形布置',
          '添加桂花点缀，增加香气',
          '可加入小灯笼或月亮装饰',
          '整体呈现丰收团圆的氛围',
        ],
        tips: '中秋花艺以金黄色为主，象征丰收团圆',
      },
    ],
    dried: [
      {
        id: 7,
        title: '自然风干法',
        image: '🌿',
        difficulty: '简单',
        duration: '2-3周',
        materials: ['鲜花', '绳子', '挂钩', '干燥剂'],
        steps: [
          '选择花苞饱满、无损伤的鲜花',
          '去除多余的叶片',
          '将花束倒挂在通风干燥处',
          '避免阳光直射，保持阴凉',
          '等待2-3周完全干燥',
          '可喷定型喷雾保持颜色',
        ],
        tips: '适合玫瑰、薰衣草、满天星等花材',
      },
      {
        id: 8,
        title: '硅胶干燥法',
        image: '💎',
        difficulty: '中等',
        duration: '3-5天',
        materials: ['鲜花', '硅胶干燥剂', '密封盒'],
        steps: [
          '准备一个密封盒和硅胶干燥剂',
          '在盒底铺一层干燥剂',
          '将花朵放入，花瓣朝上',
          '小心倒入干燥剂覆盖花朵',
          '密封盒子，等待3-5天',
          '取出花朵，轻轻清理干燥剂',
        ],
        tips: '硅胶干燥法能更好地保持花朵的颜色和形状',
      },
      {
        id: 9,
        title: '干花相框制作',
        image: '🖼️',
        difficulty: '简单',
        duration: '1小时',
        materials: ['干花', '相框', '胶水', '镊子'],
        steps: [
          '准备一个深色背景的相框',
          '设计干花的摆放位置',
          '用镊子小心夹取干花',
          '用胶水固定干花位置',
          '注意层次和颜色搭配',
          '等待胶水完全干透后装框',
        ],
        tips: '选择颜色鲜艳的干花效果更好',
      },
    ],
  };

  const handleTutorialClick = (tutorial) => {
    setSelectedTutorial(tutorial);
  };

  const handleBack = () => {
    setSelectedTutorial(null);
  };

  const renderTutorialList = () => (
    <div style={styles.content}>
      <div style={styles.categoryNav}>
        {categories.map((cat) => (
          <button
            key={cat.id}
            style={{
              ...styles.categoryBtn,
              ...(activeCategory === cat.id ? styles.activeCategory : {}),
            }}
            onClick={() => setActiveCategory(cat.id)}
          >
            <span style={styles.categoryIcon}>{cat.icon}</span>
            {cat.name}
          </button>
        ))}
      </div>

      <div style={styles.tutorialList}>
        {tutorials[activeCategory].map((tutorial) => (
          <div
            key={tutorial.id}
            style={styles.tutorialCard}
            onClick={() => handleTutorialClick(tutorial)}
          >
            <div style={styles.tutorialImage}>{tutorial.image}</div>
            <div style={styles.tutorialInfo}>
              <h4 style={styles.tutorialTitle}>{tutorial.title}</h4>
              <div style={styles.tutorialMeta}>
                <span style={styles.difficulty}>{tutorial.difficulty}</span>
                <span style={styles.duration}>⏱️ {tutorial.duration}</span>
              </div>
              <p style={styles.tutorialTip}>{tutorial.tips}</p>
            </div>
            <div style={styles.arrowIcon}>→</div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderTutorialDetail = () => (
    <div style={styles.detailContent}>
      <button onClick={handleBack} style={styles.backButton}>
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M19 12H5M12 19l-7-7 7-7" />
        </svg>
        返回列表
      </button>

      <div style={styles.detailHeader}>
        <div style={styles.detailImage}>{selectedTutorial.image}</div>
        <div style={styles.detailInfo}>
          <h2 style={styles.detailTitle}>{selectedTutorial.title}</h2>
          <div style={styles.detailMeta}>
            <span style={styles.difficultyBadge}>{selectedTutorial.difficulty}</span>
            <span style={styles.durationText}>⏱️ {selectedTutorial.duration}</span>
          </div>
        </div>
      </div>

      <div style={styles.section}>
        <h3 style={styles.sectionTitle}>所需材料</h3>
        <div style={styles.materialsList}>
          {selectedTutorial.materials.map((material, index) => (
            <span key={index} style={styles.materialTag}>{material}</span>
          ))}
        </div>
      </div>

      <div style={styles.section}>
        <h3 style={styles.sectionTitle}>步骤详解</h3>
        <div style={styles.stepsList}>
          {selectedTutorial.steps.map((step, index) => (
            <div key={index} style={styles.stepItem}>
              <div style={styles.stepNumber}>{index + 1}</div>
              <p style={styles.stepText}>{step}</p>
            </div>
          ))}
        </div>
      </div>

      <div style={styles.tipsSection}>
        <h3 style={styles.sectionTitle}>💡 小贴士</h3>
        <p style={styles.tipsText}>{selectedTutorial.tips}</p>
      </div>

      <button style={styles.startBtn}>开始学习</button>
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
        <h1 style={styles.headerTitle}>花艺教程</h1>
        <div style={styles.placeholder} />
      </header>

      {selectedTutorial ? renderTutorialDetail() : renderTutorialList()}
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
  content: {
    padding: '20px',
  },
  categoryNav: {
    display: 'flex',
    gap: '12px',
    marginBottom: '20px',
    overflowX: 'auto',
    paddingBottom: '8px',
  },
  categoryBtn: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    padding: '12px 20px',
    background: 'rgba(255,255,255,0.05)',
    border: '1px solid rgba(255,255,255,0.1)',
    borderRadius: '20px',
    color: 'rgba(255,255,255,0.7)',
    fontSize: '14px',
    fontWeight: '500',
    cursor: 'pointer',
    whiteSpace: 'nowrap',
    transition: 'all 0.3s ease',
  },
  activeCategory: {
    background: 'linear-gradient(135deg, rgba(255,105,180,0.2) 0%, rgba(255,182,193,0.2) 100%)',
    borderColor: 'rgba(255,105,180,0.3)',
    color: '#fff',
  },
  categoryIcon: {
    fontSize: '18px',
  },
  tutorialList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
  },
  tutorialCard: {
    display: 'flex',
    alignItems: 'center',
    gap: '16px',
    background: 'rgba(255,255,255,0.05)',
    borderRadius: '16px',
    padding: '16px',
    border: '1px solid rgba(255,255,255,0.08)',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
  },
  tutorialImage: {
    width: '70px',
    height: '70px',
    borderRadius: '12px',
    background: 'linear-gradient(135deg, rgba(255,105,180,0.2) 0%, rgba(0,206,209,0.2) 100%)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '32px',
    flexShrink: 0,
  },
  tutorialInfo: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
  },
  tutorialTitle: {
    fontSize: '16px',
    fontWeight: '600',
    margin: 0,
    color: '#fff',
  },
  tutorialMeta: {
    display: 'flex',
    gap: '12px',
  },
  difficulty: {
    fontSize: '12px',
    color: '#ffd700',
    background: 'rgba(255,215,0,0.1)',
    padding: '4px 10px',
    borderRadius: '10px',
  },
  duration: {
    fontSize: '12px',
    color: 'rgba(255,255,255,0.6)',
  },
  tutorialTip: {
    fontSize: '12px',
    color: 'rgba(255,255,255,0.5)',
    margin: 0,
    lineHeight: '1.4',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
  },
  arrowIcon: {
    fontSize: '20px',
    color: 'rgba(255,255,255,0.3)',
  },
  detailContent: {
    padding: '20px',
  },
  backButton: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    background: 'rgba(255,255,255,0.1)',
    border: 'none',
    borderRadius: '12px',
    padding: '10px 16px',
    color: 'rgba(255,255,255,0.8)',
    fontSize: '14px',
    cursor: 'pointer',
    marginBottom: '20px',
    transition: 'all 0.3s ease',
  },
  detailHeader: {
    display: 'flex',
    gap: '20px',
    marginBottom: '24px',
  },
  detailImage: {
    width: '100px',
    height: '100px',
    borderRadius: '16px',
    background: 'linear-gradient(135deg, rgba(255,105,180,0.2) 0%, rgba(0,206,209,0.2) 100%)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '48px',
    flexShrink: 0,
  },
  detailInfo: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    gap: '12px',
  },
  detailTitle: {
    fontSize: '24px',
    fontWeight: '600',
    margin: 0,
    color: '#fff',
  },
  detailMeta: {
    display: 'flex',
    gap: '12px',
  },
  difficultyBadge: {
    fontSize: '13px',
    color: '#ffd700',
    background: 'rgba(255,215,0,0.1)',
    padding: '6px 14px',
    borderRadius: '12px',
  },
  durationText: {
    fontSize: '13px',
    color: 'rgba(255,255,255,0.6)',
  },
  section: {
    marginBottom: '24px',
  },
  sectionTitle: {
    fontSize: '18px',
    fontWeight: '600',
    margin: '0 0 16px 0',
    color: '#fff',
  },
  materialsList: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '10px',
  },
  materialTag: {
    fontSize: '13px',
    color: '#00ced1',
    background: 'rgba(0,206,209,0.1)',
    padding: '8px 16px',
    borderRadius: '20px',
    border: '1px solid rgba(0,206,209,0.2)',
  },
  stepsList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
  },
  stepItem: {
    display: 'flex',
    gap: '16px',
    alignItems: 'flex-start',
  },
  stepNumber: {
    width: '32px',
    height: '32px',
    borderRadius: '50%',
    background: 'linear-gradient(135deg, #ff69b4 0%, #ff8dc7 100%)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '14px',
    fontWeight: '600',
    flexShrink: 0,
  },
  stepText: {
    fontSize: '15px',
    color: 'rgba(255,255,255,0.8)',
    margin: 0,
    lineHeight: '1.6',
    flex: 1,
    paddingTop: '4px',
  },
  tipsSection: {
    background: 'linear-gradient(135deg, rgba(255,215,0,0.1) 0%, rgba(255,165,0,0.1) 100%)',
    borderRadius: '16px',
    padding: '16px',
    marginBottom: '24px',
    border: '1px solid rgba(255,215,0,0.2)',
  },
  tipsText: {
    fontSize: '14px',
    color: 'rgba(255,255,255,0.8)',
    margin: 0,
    lineHeight: '1.6',
  },
  startBtn: {
    width: '100%',
    padding: '16px',
    background: 'linear-gradient(135deg, #ff69b4 0%, #ff8dc7 100%)',
    border: 'none',
    borderRadius: '16px',
    color: '#fff',
    fontSize: '16px',
    fontWeight: '600',
    cursor: 'pointer',
    boxShadow: '0 4px 20px rgba(255,105,180,0.3)',
    transition: 'all 0.3s ease',
  },
};

export default Tutorials;