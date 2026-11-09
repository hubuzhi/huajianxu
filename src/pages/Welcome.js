import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function Welcome() {
  const navigate = useNavigate();
  const [sparkles, setSparkles] = useState([]);
  const [auraParticles, setAuraParticles] = useState([]);

  useEffect(() => {
    const newSparkles = [];
    for (let i = 0; i < 100; i++) {
      newSparkles.push({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: 1 + Math.random() * 2,
        duration: 2 + Math.random() * 3,
        delay: Math.random() * 4,
        color: ['#fff', '#ffd700', '#ff69b4', '#00ffff'][Math.floor(Math.random() * 4)],
      });
    }
    setSparkles(newSparkles);

    const newAuraParticles = [];
    for (let i = 0; i < 30; i++) {
      newAuraParticles.push({
        id: i,
        angle: (360 / 30) * i + Math.random() * 20,
        radius: 180 + Math.random() * 140,
        size: 2 + Math.random() * 4,
        duration: 3 + Math.random() * 2,
        delay: Math.random() * 3,
        opacity: 0.3 + Math.random() * 0.4,
      });
    }
    setAuraParticles(newAuraParticles);
  }, []);

  const handleClick = () => {
    navigate('/home');
  };

  return (
    <div style={styles.container} onClick={handleClick}>
      <div style={styles.backgroundGlow} />
      <div style={styles.sparklesContainer}>
        {sparkles.map((sparkle) => (
          <div
            key={sparkle.id}
            style={{
              ...styles.sparkle,
              left: `${sparkle.x}%`,
              top: `${sparkle.y}%`,
              width: `${sparkle.size}px`,
              height: `${sparkle.size}px`,
              background: sparkle.color,
              animationDuration: `${sparkle.duration}s`,
              animationDelay: `${sparkle.delay}s`,
            }}
          />
        ))}
      </div>
      <div style={styles.auraContainer}>
        <div style={styles.auraLayer1} />
        <div style={styles.auraLayer2} />
        <div style={styles.auraLayer3} />
        {auraParticles.map((particle) => (
          <div
            key={particle.id}
            style={{
              ...styles.auraParticle,
              '--angle': `${particle.angle}deg`,
              '--radius': `${particle.radius}px`,
              width: `${particle.size}px`,
              height: `${particle.size}px`,
              opacity: particle.opacity,
              animationDuration: `${particle.duration}s`,
              animationDelay: `${particle.delay}s`,
            }}
          />
        ))}
      </div>
      <div style={styles.textContainer}>
        <h1 style={styles.text}>欢迎来到花的世界</h1>
        <p style={styles.subText}>点击任意位置进入</p>
      </div>
    </div>
  );
}

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh',
    backgroundColor: '#0a0a12',
    cursor: 'pointer',
    position: 'relative',
    overflow: 'hidden',
  },
  backgroundGlow: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    background: 'radial-gradient(ellipse at center, rgba(60,20,80,0.3) 0%, rgba(10,10,18,1) 75%)',
  },
  sparklesContainer: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    pointerEvents: 'none',
  },
  sparkle: {
    position: 'absolute',
    borderRadius: '50%',
    animation: 'sparkleFade ease-in-out infinite',
    boxShadow: '0 0 8px currentColor, 0 0 12px currentColor',
  },
  auraContainer: {
    position: 'absolute',
    width: '1000px',
    height: '500px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    pointerEvents: 'none',
  },
  auraLayer1: {
    position: 'absolute',
    width: '100%',
    height: '160px',
    background: 'radial-gradient(ellipse at center, rgba(255,105,180,0.25) 0%, rgba(147,112,219,0.15) 40%, rgba(64,224,208,0.1) 70%, transparent 100%)',
    borderRadius: '50%',
    animation: 'auraBreath1 4s ease-in-out infinite',
    filter: 'blur(40px)',
  },
  auraLayer2: {
    position: 'absolute',
    width: '85%',
    height: '120px',
    background: 'radial-gradient(ellipse at center, rgba(255,105,180,0.35) 0%, rgba(147,112,219,0.25) 50%, transparent 80%)',
    borderRadius: '50%',
    animation: 'auraBreath2 3.5s ease-in-out infinite reverse',
    filter: 'blur(30px)',
  },
  auraLayer3: {
    position: 'absolute',
    width: '65%',
    height: '85px',
    background: 'radial-gradient(ellipse at center, rgba(255,215,0,0.3) 0%, rgba(255,105,180,0.25) 40%, rgba(147,112,219,0.15) 70%, transparent 100%)',
    borderRadius: '50%',
    animation: 'auraBreath3 3s ease-in-out infinite',
    filter: 'blur(20px)',
  },
  auraParticle: {
    position: 'absolute',
    width: '4px',
    height: '4px',
    background: '#fff',
    borderRadius: '50%',
    boxShadow: '0 0 6px rgba(255,105,180,0.8), 0 0 12px rgba(147,112,219,0.6)',
    animation: 'auraOrbit 4s linear infinite',
  },
  textContainer: {
    position: 'relative',
    zIndex: 1,
    textAlign: 'center',
    padding: '20px',
  },
  text: {
    fontSize: '56px',
    background: 'linear-gradient(90deg, #ff69b4, #ffd700, #00ffff, #9932cc, #ff69b4)',
    backgroundSize: '200% 100%',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
    animation: 'textShimmer 4s linear infinite, textFloat 3s ease-in-out infinite',
    textShadow: '0 0 30px rgba(255,105,180,0.5), 0 0 60px rgba(0,255,255,0.25)',
    margin: 0,
    fontFamily: '"Ma Shan Zheng", "STXingkai", "楷体", serif',
    letterSpacing: '4px',
  },
  subText: {
    fontSize: '20px',
    color: 'rgba(255,255,255,0.75)',
    marginTop: '24px',
    fontFamily: '"Ma Shan Zheng", "STXingkai", "楷体", serif',
    letterSpacing: '2px',
    textShadow: '0 0 10px rgba(255,105,180,0.3)',
  },
};

const styleSheet = document.createElement('style');
styleSheet.textContent = `
  @keyframes sparkleFade {
    0%, 100% { 
      opacity: 0; 
      transform: scale(0); 
    }
    50% { 
      opacity: 1; 
      transform: scale(1); 
    }
  }

  @keyframes auraBreath1 {
    0%, 100% {
      transform: scaleX(1) scaleY(1);
      opacity: 0.6;
    }
    50% {
      transform: scaleX(1.15) scaleY(1.2);
      opacity: 0.85;
    }
  }

  @keyframes auraBreath2 {
    0%, 100% {
      transform: scaleX(1) scaleY(1);
      opacity: 0.5;
    }
    50% {
      transform: scaleX(1.2) scaleY(1.15);
      opacity: 0.75;
    }
  }

  @keyframes auraBreath3 {
    0%, 100% {
      transform: scaleX(1) scaleY(1);
      opacity: 0.4;
    }
    50% {
      transform: scaleX(1.25) scaleY(1.3);
      opacity: 0.65;
    }
  }

  @keyframes auraOrbit {
    0% {
      transform: rotate(0deg) translateX(var(--radius)) rotate(0deg);
      opacity: 0;
    }
    10% {
      opacity: 1;
    }
    90% {
      opacity: 1;
    }
    100% {
      transform: rotate(360deg) translateX(var(--radius)) rotate(-360deg);
      opacity: 0;
    }
  }

  @keyframes textShimmer {
    0% { background-position: 0% 50%; }
    100% { background-position: 200% 50%; }
  }

  @keyframes textFloat {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(-6px); }
  }
`;
document.head.appendChild(styleSheet);

export default Welcome;