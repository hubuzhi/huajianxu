import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { colorCategories } from '../data/flowers';

const colorImages = {
  red: 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=800&h=200&fit=crop',
  yellow: 'https://images.unsplash.com/photo-1520431051406-b84345849851?w=800&h=200&fit=crop',
  purple: 'https://images.unsplash.com/photo-1484154218962-a197022b5858?w=800&h=200&fit=crop',
  white: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&h=200&fit=crop',
  mixed: 'https://images.unsplash.com/photo-1504707748692-419802cf939d?w=800&h=200&fit=crop'
};

function ColorClass() {
  const navigate = useNavigate();

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <button onClick={() => navigate('/home')} style={styles.backBtn}>← 返回首页</button>
        <h1 style={styles.title}>🎨 按颜色分类</h1>
      </div>

      <div style={styles.content}>
        {colorCategories.map((colorGroup) => (
          <div
            key={colorGroup.id}
            style={{
              ...styles.colorCard,
              background: colorGroup.gradient,
              borderColor: colorGroup.borderColor
            }}
          >
            <div style={styles.cardHeader}>
              <img
                src={colorImages[colorGroup.id]}
                alt={colorGroup.name}
                style={styles.colorImage}
              />
              <div style={styles.cardTitleSection}>
                <span style={styles.colorIcon}>{colorGroup.icon}</span>
                <h2 style={{ ...styles.colorTitle, color: colorGroup.textColor }}>{colorGroup.name}</h2>
                <span style={{ ...styles.colorCount, backgroundColor: colorGroup.color }}>
                  {colorGroup.flowers.length}种
                </span>
              </div>
            </div>
            <div style={styles.flowerList}>
              {colorGroup.flowers.map((flower, index) => (
                <Link
                  key={flower}
                  to={`/flower/${flower}`}
                  style={{ ...styles.flowerLink, animationDelay: `${index * 0.1}s` }}
                >
                  <span style={{ ...styles.colorDot, backgroundColor: colorGroup.color }} />
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
    gridTemplateColumns: 'repeat(5, 1fr)',
    gap: '20px',
    maxWidth: '100%',
    margin: '0 auto',
    overflowX: 'auto',
    paddingBottom: '20px'
  },
  colorCard: {
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
  colorImage: {
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
  colorIcon: {
    fontSize: '32px'
  },
  colorTitle: {
    fontSize: '20px',
    fontWeight: '700',
    margin: 0,
    flex: 1
  },
  colorCount: {
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
    background: '#fff',
    borderRadius: '12px',
    textDecoration: 'none',
    color: '#333',
    transition: 'all 0.3s',
    animation: 'fadeInUp 0.4s ease-out forwards',
    opacity: 0,
    border: '1px solid rgba(0,0,0,0.1)'
  },
  colorDot: {
    width: '14px',
    height: '14px',
    borderRadius: '50%'
  },
  flowerName: {
    fontSize: '15px',
    fontWeight: '500',
    flex: 1,
    color: '#333'
  },
  flowerArrow: {
    fontSize: '14px',
    opacity: 0.6,
    color: '#666'
  }
};

export default ColorClass;
