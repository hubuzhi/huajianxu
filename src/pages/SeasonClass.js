import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { seasonCategories } from '../data/flowers';

const seasonImages = {
  spring: '/images/banner-season-spring.svg',
  summer: '/images/banner-season-summer.svg',
  autumn: '/images/banner-season-autumn.svg',
  winter: '/images/banner-season-winter.svg'
};

function SeasonClass() {
  const navigate = useNavigate();

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <button onClick={() => navigate('/home')} style={styles.backBtn}>← 返回首页</button>
        <h1 style={styles.title}>🌸 按季节分类</h1>
      </div>

      <div style={styles.content}>
        {seasonCategories.map((season) => (
          <div
            key={season.id}
            style={{
              ...styles.seasonCard,
              background: season.gradient,
              borderColor: season.borderColor
            }}
          >
            <div style={styles.cardHeader}>
              <img
                src={seasonImages[season.id]}
                alt={season.name}
                style={styles.seasonImage}
              />
              <div style={styles.cardTitleSection}>
                <span style={styles.seasonIcon}>{season.icon}</span>
                <h2 style={{ ...styles.seasonTitle, color: season.textColor }}>{season.name}</h2>
                <span style={{ ...styles.seasonCount, backgroundColor: season.color }}>
                  {season.flowers.length}种
                </span>
              </div>
            </div>
            <div style={styles.flowerList}>
              {season.flowers.map((flower, index) => (
                <Link
                  key={flower}
                  to={`/flower/${flower}`}
                  style={{ ...styles.flowerLink, animationDelay: `${index * 0.1}s` }}
                >
                  <span style={styles.flowerIcon}>🌼</span>
                  <span style={styles.flowerName}>{flower}</span>
                  <span style={styles.flowerArrow}>→</span>
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

const styles = {
  container: {
    minHeight: '100vh',
    background: 'linear-gradient(135deg, #FAF8F5 0%, #F5F0E8 50%, #F8F4EC 100%)',
    padding: '20px',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    gap: '20px',
    marginBottom: '30px',
    flexWrap: 'wrap'
  },
  backBtn: {
    padding: '10px 20px',
    background: 'rgba(255, 182, 193, 0.3)',
    border: '1px solid rgba(255, 182, 193, 0.5)',
    borderRadius: '25px',
    color: '#333',
    cursor: 'pointer',
    fontSize: '14px',
    transition: 'all 0.3s'
  },
  title: {
    color: '#333',
    fontSize: '28px',
    fontWeight: '600',
    margin: 0
  },
  content: {
    display: 'grid',
    gridTemplateColumns: 'repeat(4, 1fr)',
    gap: '20px',
    maxWidth: '100%',
    margin: '0 auto',
    overflowX: 'auto',
    paddingBottom: '20px'
  },
  seasonCard: {
    borderRadius: '20px',
    overflow: 'hidden',
    border: '1px solid',
    boxShadow: '0 8px 30px rgba(0,0,0,0.08)',
    transition: 'transform 0.3s, box-shadow 0.3s'
  },
  cardHeader: {
    position: 'relative',
    height: '150px'
  },
  seasonImage: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    opacity: 0.9
  },
  cardTitleSection: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: '20px',
    background: 'linear-gradient(transparent, rgba(255,255,255,0.85))',
    display: 'flex',
    alignItems: 'center',
    gap: '12px'
  },
  seasonIcon: {
    fontSize: '32px'
  },
  seasonTitle: {
    fontSize: '20px',
    fontWeight: '700',
    margin: 0,
    flex: 1
  },
  seasonCount: {
    padding: '5px 14px',
    borderRadius: '20px',
    fontSize: '12px',
    color: '#fff',
    fontWeight: '600'
  },
  flowerList: {
    padding: '20px'
  },
  flowerLink: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    padding: '14px 18px',
    marginBottom: '10px',
    background: 'rgba(50, 50, 50, 0.7)',
    borderRadius: '12px',
    textDecoration: 'none',
    color: '#fff',
    transition: 'all 0.3s',
    animation: 'fadeInUp 0.4s ease-out forwards',
    opacity: 0
  },
  flowerIcon: {
    fontSize: '18px'
  },
  flowerName: {
    fontSize: '15px',
    fontWeight: '500',
    flex: 1,
    color: '#fff'
  },
  flowerArrow: {
    fontSize: '14px',
    opacity: 0.8,
    color: '#fff'
  }
};

export default SeasonClass;
