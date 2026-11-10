import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { flowersData } from '../data/flowers';
import AdminLayout from '../components/AdminLayout';

function FlowerHome() {
  const [selectedFlower, setSelectedFlower] = useState(flowersData[0]);
  const [searchKeyword, setSearchKeyword] = useState('');

  const flowerMeanings = {
    '玫瑰': '爱情、浪漫',
    '牡丹': '富贵、吉祥',
    '菊花': '高洁、坚贞',
    '兰花': '高雅、典雅',
    '梅花': '坚韧、不屈',
    '荷花': '纯洁、正直',
    '桂花': '吉祥、美好',
    '月季': '幸福、美好',
    '杜鹃': '繁荣、吉祥',
    '山茶': '理想的爱',
    '郁金香': '完美的爱情',
    '百合': '纯洁、神圣',
    '茉莉': '忠贞、尊敬',
    '水仙': '纯洁、吉祥',
    '薰衣草': '等待爱情',
    '樱花': '浪漫、短暂',
    '紫罗兰': '永恒的美',
    '鸢尾': '信仰、希望',
    '康乃馨': '母爱、祝福',
    '向日葵': '忠诚、阳光',
  };

  const getDefaultMeaning = (flowerName) => {
    return flowerMeanings[flowerName] || '美好祝福';
  };

  const getFeatures = (flowerName) => {
    const featuresMap = {
      '玫瑰': ['花朵较大', '香气浓郁', '刺较多', '花期较长'],
      '牡丹': ['花型硕大', '色彩艳丽', '雍容华贵', '品种繁多'],
      '菊花': ['品种繁多', '花色丰富', '花型多样', '耐寒性强'],
      '兰花': ['花色淡雅', '香气清幽', '姿态高雅', '喜半阴'],
      '梅花': ['傲雪凌霜', '坚韧不拔', '香气清雅', '早春开花'],
      '荷花': ['出淤泥不染', '亭亭玉立', '水生植物', '夏季开花'],
      '桂花': ['香气浓郁', '四季常青', '适应性强', '秋季开花'],
      '月季': ['花期长', '花色丰富', '花型优美', '适应性强'],
      '杜鹃': ['花色艳丽', '品种繁多', '春季开花', '喜凉爽'],
      '山茶': ['花型优美', '花色丰富', '四季常青', '冬季开花'],
      '郁金香': ['花型优美', '色彩丰富', '春季开花', '球根花卉'],
      '百合': ['花型优雅', '香气清新', '寓意美好', '多年生'],
      '茉莉': ['香气浓郁', '花期较长', '喜温暖', '常绿灌木'],
      '水仙': ['姿态优美', '香气清新', '冬季开花', '球根花卉'],
      '薰衣草': ['香气独特', '紫色花海', '喜阳光', '多年生'],
      '樱花': ['花团锦簇', '浪漫唯美', '春季开花', '落叶乔木'],
      '紫罗兰': ['花色淡雅', '香气清幽', '春季开花', '多年生'],
      '鸢尾': ['花型独特', '色彩丰富', '春季开花', '多年生'],
      '康乃馨': ['花色丰富', '花期较长', '寓意美好', '切花首选'],
      '向日葵': ['追随阳光', '花盘硕大', '夏季开花', '一年生'],
    };
    return featuresMap[flowerName] || ['美丽花卉', '观赏性强'];
  };

  const filteredFlowers = flowersData.filter(flower =>
    flower.name.toLowerCase().includes(searchKeyword.toLowerCase())
  );

  return (
    <AdminLayout activeModule="flowerManage">
      <div style={styles.container}>
        {/* 顶部标题和搜索 */}
        <div style={styles.header}>
          <div style={styles.titleSection}>
            <span style={styles.logo}>🌸</span>
            <h1 style={styles.title}>花朵图鉴</h1>
          </div>
          <div style={styles.searchSection}>
            <input
              type="text"
              placeholder="搜索花卉..."
              value={searchKeyword}
              onChange={(e) => setSearchKeyword(e.target.value)}
              style={styles.searchInput}
            />
            <span style={styles.searchIcon}>🔍</span>
          </div>
        </div>

        <div style={styles.mainContent}>
          {/* 左侧花卉列表 */}
          <aside style={styles.sidebar}>
            <h3 style={styles.sidebarTitle}>花卉列表</h3>
            <div style={styles.flowerList}>
              {filteredFlowers.map((flower) => (
                <button
                  key={flower.name}
                  onClick={() => setSelectedFlower(flower)}
                  style={{
                    ...styles.flowerItem,
                    ...(selectedFlower.name === flower.name ? styles.activeFlowerItem : {}),
                    borderLeftColor: flower.color,
                  }}
                >
                  <span style={{ ...styles.flowerColorDot, backgroundColor: flower.color }} />
                  <span style={styles.flowerName}>{flower.name}</span>
                </button>
              ))}
            </div>
          </aside>

          {/* 中间花卉详情 */}
          <main style={styles.contentArea}>
            {selectedFlower && (
              <div style={styles.flowerCard}>
                {/* 花卉大图 */}
                <div style={styles.imageContainer}>
                  <img
                    src={selectedFlower.image}
                    alt={selectedFlower.name}
                    style={styles.flowerImage}
                    onError={(e) => {
                      e.target.onerror = null;
                        e.target.src = '/images/fallback.svg';
                    }}
                  />
                  <div style={styles.imageOverlay}>
                    <h2 style={styles.flowerTitle}>{selectedFlower.name}</h2>
                    <div style={styles.flowerTags}>
                      <span style={{ ...styles.tag, backgroundColor: selectedFlower.color }}>
                        {selectedFlower.colorCategory}
                      </span>
                      <span style={styles.tag}>{selectedFlower.season}</span>
                    </div>
                  </div>
                </div>

                {/* 花卉信息 */}
                <div style={styles.infoGrid}>
                  <div style={styles.infoCard}>
                    <span style={styles.infoIcon}>💝</span>
                    <div>
                      <span style={styles.infoLabel}>花语</span>
                      <span style={styles.infoValue}>
                        {selectedFlower.meaning || getDefaultMeaning(selectedFlower.name)}
                      </span>
                    </div>
                  </div>
                  <div style={styles.infoCard}>
                    <span style={styles.infoIcon}>📅</span>
                    <div>
                      <span style={styles.infoLabel}>花期</span>
                      <span style={styles.infoValue}>{selectedFlower.bloomPeriod}</span>
                    </div>
                  </div>
                  <div style={styles.infoCard}>
                    <span style={styles.infoIcon}>🌱</span>
                    <div>
                      <span style={styles.infoLabel}>生长习性</span>
                      <span style={styles.infoValue}>{selectedFlower.habitat}</span>
                    </div>
                  </div>
                  <div style={styles.infoCard}>
                    <span style={styles.infoIcon}>🎨</span>
                    <div>
                      <span style={styles.infoLabel}>代表色</span>
                      <span style={{ ...styles.infoValue, display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <span style={{ width: '20px', height: '20px', borderRadius: '50%', backgroundColor: selectedFlower.color }} />
                        {selectedFlower.colorCategory}
                      </span>
                    </div>
                  </div>
                </div>

                {/* 花卉介绍 */}
                <div style={styles.descriptionSection}>
                  <h3 style={styles.sectionTitle}>🌸 花卉介绍</h3>
                  <p style={styles.descriptionText}>{selectedFlower.description}</p>
                </div>

                {/* 主要特点 */}
                <div style={styles.featuresSection}>
                  <h3 style={styles.sectionTitle}>✨ 主要特点</h3>
                  <div style={styles.featuresTags}>
                    {getFeatures(selectedFlower.name).map((feature, idx) => (
                      <span key={idx} style={{ ...styles.featureTag, backgroundColor: selectedFlower.color + '30', color: selectedFlower.color }}>
                        {feature}
                      </span>
                    ))}
                  </div>
                </div>

                {/* 查看详情按钮 */}
                <div style={styles.actionSection}>
                  <Link to={`/flower/${selectedFlower.name}`} style={styles.detailBtn}>
                    查看详情 →
                  </Link>
                </div>
              </div>
            )}
          </main>

          {/* 右侧推荐 */}
          <aside style={styles.rightSidebar}>
            <div style={styles.widget}>
              <h3 style={styles.widgetTitle}>📚 今日推荐</h3>
              <div style={styles.recommendList}>
                <div style={styles.recommendItem}>
                  <span style={styles.recommendIcon}>🌷</span>
                  <span style={styles.recommendText}>春季赏花指南</span>
                  <span style={styles.recommendTime}>3小时前</span>
                </div>
                <div style={styles.recommendItem}>
                  <span style={styles.recommendIcon}>🌿</span>
                  <span style={styles.recommendText}>如何养护月季</span>
                  <span style={styles.recommendTime}>1天前</span>
                </div>
                <div style={styles.recommendItem}>
                  <span style={styles.recommendIcon}>🎨</span>
                  <span style={styles.recommendText}>花艺设计技巧</span>
                  <span style={styles.recommendTime}>3天前</span>
                </div>
              </div>
            </div>

            <div style={styles.widget}>
              <h3 style={styles.widgetTitle}>🏆 我的成就</h3>
              <div style={styles.achievementList}>
                <div style={styles.achievementItem}>
                  <span style={styles.achievementIcon}>🌸</span>
                  <span style={styles.achievementText}>已收集</span>
                  <span style={styles.achievementValue}>8/20</span>
                </div>
                <div style={styles.achievementItem}>
                  <span style={styles.achievementIcon}>📖</span>
                  <span style={styles.achievementText}>已浏览</span>
                  <span style={styles.achievementValue}>15种</span>
                </div>
                <div style={styles.achievementItem}>
                  <span style={styles.achievementIcon}>🔥</span>
                  <span style={styles.achievementText}>连续签到</span>
                  <span style={styles.achievementValue}>7天</span>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </AdminLayout>
  );
}

const styles = {
  container: {
    minHeight: '100%',
    background: 'linear-gradient(135deg, #fff5f8 0%, #f0f4ff 100%)',
    padding: '20px',
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '16px 20px',
    background: 'rgba(255, 255, 255, 0.9)',
    borderRadius: '16px',
    boxShadow: '0 2px 10px rgba(0,0,0,0.05)',
    marginBottom: '20px',
  },
  titleSection: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
  },
  logo: {
    fontSize: '28px',
  },
  title: {
    fontSize: '22px',
    fontWeight: '700',
    color: '#333',
    margin: 0,
  },
  searchSection: {
    position: 'relative',
    width: '300px',
  },
  searchInput: {
    width: '100%',
    padding: '10px 35px 10px 14px',
    border: '1px solid #e8e8e8',
    borderRadius: '20px',
    fontSize: '14px',
    background: '#f8f9fa',
    outline: 'none',
    transition: 'all 0.3s',
  },
  searchIcon: {
    position: 'absolute',
    right: '12px',
    top: '50%',
    transform: 'translateY(-50%)',
    fontSize: '14px',
  },
  mainContent: {
    display: 'flex',
    gap: '20px',
  },
  sidebar: {
    width: '180px',
    background: '#fff',
    borderRadius: '16px',
    padding: '16px',
    boxShadow: '0 2px 10px rgba(0,0,0,0.05)',
    height: 'fit-content',
  },
  sidebarTitle: {
    fontSize: '15px',
    fontWeight: '600',
    color: '#333',
    margin: '0 0 14px 0',
    paddingBottom: '10px',
    borderBottom: '1px solid #f0f0f0',
  },
  flowerList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '4px',
  },
  flowerItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    padding: '8px 10px',
    background: 'transparent',
    border: 'none',
    borderLeft: '3px solid transparent',
    cursor: 'pointer',
    transition: 'all 0.3s',
    textAlign: 'left',
  },
  activeFlowerItem: {
    background: '#f5f7fa',
    borderRadius: '8px',
  },
  flowerColorDot: {
    width: '8px',
    height: '8px',
    borderRadius: '50%',
  },
  flowerName: {
    fontSize: '13px',
    color: '#333',
    fontWeight: '500',
  },
  contentArea: {
    flex: 1,
  },
  flowerCard: {
    background: '#fff',
    borderRadius: '16px',
    overflow: 'hidden',
    boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
  },
  imageContainer: {
    position: 'relative',
    height: '300px',
  },
  flowerImage: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  },
  imageOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: '24px',
    background: 'linear-gradient(transparent, rgba(0,0,0,0.6))',
  },
  flowerTitle: {
    fontSize: '28px',
    fontWeight: '700',
    color: '#fff',
    margin: '0 0 10px 0',
  },
  flowerTags: {
    display: 'flex',
    gap: '8px',
  },
  tag: {
    padding: '5px 14px',
    borderRadius: '16px',
    fontSize: '12px',
    color: '#fff',
    fontWeight: '500',
    backgroundColor: '#90A4AE',
  },
  infoGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(4, 1fr)',
    gap: '14px',
    padding: '20px',
    borderBottom: '1px solid #f0f0f0',
  },
  infoCard: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    padding: '14px',
    background: 'rgba(0,0,0,0.03)',
    borderRadius: '10px',
  },
  infoIcon: {
    fontSize: '20px',
  },
  infoLabel: {
    display: 'block',
    fontSize: '11px',
    color: '#999',
    marginBottom: '3px',
  },
  infoValue: {
    fontSize: '13px',
    color: '#333',
    fontWeight: '500',
  },
  descriptionSection: {
    padding: '20px',
    borderBottom: '1px solid #f0f0f0',
  },
  sectionTitle: {
    fontSize: '16px',
    fontWeight: '600',
    color: '#333',
    margin: '0 0 12px 0',
  },
  descriptionText: {
    fontSize: '14px',
    color: '#666',
    lineHeight: '1.7',
    margin: 0,
  },
  featuresSection: {
    padding: '20px',
    borderBottom: '1px solid #f0f0f0',
  },
  featuresTags: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '8px',
  },
  featureTag: {
    padding: '6px 14px',
    borderRadius: '16px',
    fontSize: '13px',
    fontWeight: '500',
  },
  actionSection: {
    padding: '20px',
    textAlign: 'right',
  },
  detailBtn: {
    display: 'inline-block',
    padding: '10px 26px',
    background: 'linear-gradient(135deg, #ff6b9d 0%, #c44569 100%)',
    color: '#fff',
    borderRadius: '24px',
    fontSize: '13px',
    fontWeight: '600',
    textDecoration: 'none',
    transition: 'all 0.3s',
  },
  rightSidebar: {
    width: '260px',
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
  },
  widget: {
    background: '#fff',
    borderRadius: '14px',
    padding: '16px',
    boxShadow: '0 2px 10px rgba(0,0,0,0.05)',
  },
  widgetTitle: {
    fontSize: '14px',
    fontWeight: '600',
    color: '#333',
    margin: '0 0 14px 0',
  },
  recommendList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
  },
  recommendItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    padding: '8px',
    background: '#f8f9fa',
    borderRadius: '8px',
    cursor: 'pointer',
  },
  recommendIcon: {
    fontSize: '16px',
  },
  recommendText: {
    flex: 1,
    fontSize: '13px',
    color: '#333',
  },
  recommendTime: {
    fontSize: '11px',
    color: '#999',
  },
  achievementList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
  },
  achievementItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    padding: '10px',
    background: 'linear-gradient(135deg, #fff5f8 0%, #fff 100%)',
    borderRadius: '8px',
  },
  achievementIcon: {
    fontSize: '18px',
  },
  achievementText: {
    flex: 1,
    fontSize: '13px',
    color: '#666',
  },
  achievementValue: {
    fontSize: '13px',
    fontWeight: '600',
    color: '#ff6b9d',
  },
};

export default FlowerHome;
