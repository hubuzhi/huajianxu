import React from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { flowersData } from '../data/flowers';

function FlowerDetail() {
  const { flowerName } = useParams();
  const navigate = useNavigate();
  
  const flower = flowersData.find(f => f.name === flowerName);
  
  if (!flower) {
    return (
      <div style={styles.container}>
        <div style={styles.notFound}>
          <h2>🌸 未找到该花卉</h2>
          <button onClick={() => navigate('/home')} style={styles.backBtn}>返回首页</button>
        </div>
      </div>
    );
  }

  const similarFlowersData = flowersData.filter(
    f => flower.similarFlowers.includes(f.name)
  );

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <button onClick={() => navigate(-1)} style={styles.backBtn}>← 返回</button>
        <button onClick={() => navigate('/home')} style={styles.homeBtn}>🏠 首页</button>
      </div>

      <div style={styles.content}>
        <div style={styles.mainCard}>
          <div style={styles.imageSection}>
            <img 
              src={flower.image} 
              alt={flower.name}
              style={styles.flowerImage}
              onError={(e) => {
                e.target.src = `https://via.placeholder.com/600x400/FFB6C1/FFFFFF?text=${encodeURIComponent(flower.name)}`;
              }}
            />
          </div>

          <div style={styles.infoSection}>
            <h1 style={{ ...styles.title, color: flower.color }}>{flower.name}</h1>
            
            <div style={styles.tags}>
              <span style={{ ...styles.tag, backgroundColor: flower.color }}>
                {flower.colorCategory}
              </span>
              <span style={styles.tag}>{flower.season}</span>
            </div>

            <div style={styles.detailGrid}>
              <div style={styles.detailItem}>
                <span style={styles.detailIcon}>📅</span>
                <div>
                  <span style={styles.detailLabel}>花期</span>
                  <span style={styles.detailValue}>{flower.bloomPeriod}</span>
                </div>
              </div>
              <div style={styles.detailItem}>
                <span style={styles.detailIcon}>🌱</span>
                <div>
                  <span style={styles.detailLabel}>生长习性</span>
                  <span style={styles.detailValue}>{flower.habitat}</span>
                </div>
              </div>
            </div>

            <div style={styles.descriptionSection}>
              <h3 style={styles.sectionTitle}>🌸 花卉介绍</h3>
              <p style={styles.descriptionText}>{flower.description}</p>
            </div>

            {similarFlowersData.length > 0 && (
              <div style={styles.similarSection}>
                <h3 style={styles.sectionTitle}>💐 相似花卉推荐</h3>
                <div style={styles.similarGrid}>
                  {similarFlowersData.map((similarFlower) => (
                    <Link 
                      key={similarFlower.name} 
                      to={`/flower/${similarFlower.name}`}
                      style={styles.similarCard}
                    >
                      <img 
                        src={similarFlower.image} 
                        alt={similarFlower.name}
                        style={styles.similarImage}
                        onError={(e) => {
                          e.target.src = `https://via.placeholder.com/100x100/FFB6C1/FFFFFF?text=${encodeURIComponent(similarFlower.name)}`;
                        }}
                      />
                      <span style={styles.similarName}>{similarFlower.name}</span>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: {
    minHeight: '100vh',
    background: 'linear-gradient(135deg, #1926d4ff 0%, #82560eff 50%, #137a41ff 100%)',
    padding: '20px',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
  },
  header: {
    display: 'flex',
    gap: '15px',
    marginBottom: '30px',
    justifyContent: 'flex-start'
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
  homeBtn: {
    padding: '10px 20px',
    background: 'rgba(255, 182, 193, 0.3)',
    border: '1px solid rgba(255, 182, 193, 0.5)',
    borderRadius: '25px',
    color: '#333',
    cursor: 'pointer',
    fontSize: '14px',
    transition: 'all 0.3s'
  },
  content: {
    maxWidth: '900px',
    margin: '0 auto'
  },
  mainCard: {
    background: '#fff',
    borderRadius: '20px',
    overflow: 'hidden',
    boxShadow: '0 8px 30px rgba(0,0,0,0.08)'
  },
  imageSection: {
    width: '100%',
    height: '400px',
    overflow: 'hidden'
  },
  flowerImage: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    transition: 'transform 0.5s'
  },
  infoSection: {
    padding: '30px'
  },
  title: {
    fontSize: '36px',
    fontWeight: '700',
    margin: '0 0 20px 0'
  },
  tags: {
    display: 'flex',
    gap: '10px',
    marginBottom: '25px'
  },
  tag: {
    padding: '6px 16px',
    borderRadius: '20px',
    fontSize: '13px',
    color: '#fff',
    fontWeight: '500',
    backgroundColor: '#90A4AE'
  },
  detailGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
    gap: '20px',
    marginBottom: '30px'
  },
  detailItem: {
    display: 'flex',
    gap: '12px',
    padding: '15px',
    background: 'rgba(0,0,0,0.03)',
    borderRadius: '12px'
  },
  detailIcon: {
    fontSize: '24px'
  },
  detailLabel: {
    display: 'block',
    fontSize: '12px',
    color: '#999',
    marginBottom: '4px'
  },
  detailValue: {
    fontSize: '15px',
    color: '#333',
    fontWeight: '500'
  },
  descriptionSection: {
    marginBottom: '30px'
  },
  sectionTitle: {
    fontSize: '18px',
    color: '#333',
    fontWeight: '600',
    margin: '0 0 15px 0'
  },
  descriptionText: {
    fontSize: '15px',
    color: '#666',
    lineHeight: '1.8',
    margin: 0
  },
  similarSection: {
    marginTop: '30px',
    paddingTop: '20px',
    borderTop: '1px solid rgba(0,0,0,0.1)'
  },
  similarGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(120px, 1fr))',
    gap: '15px'
  },
  similarCard: {
    background: 'rgba(0,0,0,0.03)',
    borderRadius: '12px',
    overflow: 'hidden',
    textDecoration: 'none',
    transition: 'all 0.3s'
  },
  similarImage: {
    width: '100%',
    height: '100px',
    objectFit: 'cover'
  },
  similarName: {
    display: 'block',
    padding: '10px',
    textAlign: 'center',
    color: '#333',
    fontSize: '14px',
    fontWeight: '500'
  },
  notFound: {
    textAlign: 'center',
    padding: '100px 20px',
    color: '#333'
  }
};

export default FlowerDetail;
