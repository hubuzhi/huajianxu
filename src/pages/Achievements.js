import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Achievements() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('badges');

  const userStats = {
    level: 8,
    title: '花之守护者',
    exp: 80,
    nextLevel: 100,
    totalDays: 45,
    flowersCollected: 8,
    postsCreated: 12,
    likesReceived: 256,
  };

  const achievements = [
    {
      id: 1,
      name: '初识花语',
      icon: '🌱',
      description: '收集第一朵花卉',
      progress: 100,
      completed: true,
      completedAt: '2026-04-01',
      reward: '10积分',
    },
    {
      id: 2,
      name: '花语入门',
      icon: '🌸',
      description: '收集5朵花卉',
      progress: 100,
      completed: true,
      completedAt: '2026-04-15',
      reward: '50积分',
    },
    {
      id: 3,
      name: '花语达人',
      icon: '🌺',
      description: '收集10朵花卉',
      progress: 80,
      completed: false,
      current: 8,
      target: 10,
      reward: '100积分',
    },
    {
      id: 4,
      name: '签到新手',
      icon: '📅',
      description: '连续签到7天',
      progress: 100,
      completed: true,
      completedAt: '2026-04-20',
      reward: '30积分',
    },
    {
      id: 5,
      name: '签到达人',
      icon: '📆',
      description: '连续签到30天',
      progress: 23,
      completed: false,
      current: 7,
      target: 30,
      reward: '200积分',
    },
    {
      id: 6,
      name: '社交达人',
      icon: '💬',
      description: '发布10篇帖子',
      progress: 100,
      completed: true,
      completedAt: '2026-05-10',
      reward: '80积分',
    },
    {
      id: 7,
      name: '人气之星',
      icon: '⭐',
      description: '获得100个点赞',
      progress: 100,
      completed: true,
      completedAt: '2026-05-15',
      reward: '150积分',
    },
    {
      id: 8,
      name: '花艺大师',
      icon: '🎨',
      description: '完成5个花艺教程',
      progress: 60,
      completed: false,
      current: 3,
      target: 5,
      reward: '300积分',
    },
    {
      id: 9,
      name: '花园主人',
      icon: '🏡',
      description: '养护10种花卉',
      progress: 40,
      completed: false,
      current: 4,
      target: 10,
      reward: '500积分',
    },
    {
      id: 10,
      name: '花语大师',
      icon: '🏆',
      description: '收集全部20种花卉',
      progress: 40,
      completed: false,
      current: 8,
      target: 20,
      reward: '1000积分 + 专属徽章',
    },
  ];

  const badges = [
    { id: 1, name: '春之使者', icon: '🌷', earned: true },
    { id: 2, name: '花语守护', icon: '🛡️', earned: true },
    { id: 3, name: '签到达人', icon: '📅', earned: true },
    { id: 4, name: '社交之星', icon: '💫', earned: true },
    { id: 5, name: '花艺学徒', icon: '✨', earned: false },
    { id: 6, name: '花园主人', icon: '🏡', earned: false },
    { id: 7, name: '花语大师', icon: '👑', earned: false },
    { id: 8, name: '全能花匠', icon: '🌟', earned: false },
  ];

  const renderBadges = () => (
    <div style={styles.tabContent}>
      <div style={styles.badgeGrid}>
        {badges.map((badge) => (
          <div key={badge.id} style={{
            ...styles.badgeCard,
            ...(badge.earned ? styles.badgeEarned : styles.badgeLocked),
          }}>
            <div style={styles.badgeIcon}>{badge.icon}</div>
            <span style={styles.badgeName}>{badge.name}</span>
            {!badge.earned && <span style={styles.lockedIcon}>🔒</span>}
          </div>
        ))}
      </div>
    </div>
  );

  const renderAchievements = () => (
    <div style={styles.tabContent}>
      <div style={styles.achievementList}>
        {achievements.map((achievement) => (
          <div key={achievement.id} style={{
            ...styles.achievementCard,
            ...(achievement.completed ? styles.achievementCompleted : {}),
          }}>
            <div style={styles.achievementIcon}>{achievement.icon}</div>
            <div style={styles.achievementInfo}>
              <div style={styles.achievementHeader}>
                <h4 style={styles.achievementName}>{achievement.name}</h4>
                {achievement.completed && (
                  <span style={styles.completedBadge}>✓ 已完成</span>
                )}
              </div>
              <p style={styles.achievementDesc}>{achievement.description}</p>
              {!achievement.completed && (
                <div style={styles.progressSection}>
                  <div style={styles.progressBar}>
                    <div style={{
                      ...styles.progressFill,
                      width: `${achievement.progress}%`,
                    }} />
                  </div>
                  <span style={styles.progressText}>
                    {achievement.current}/{achievement.target}
                  </span>
                </div>
              )}
              <div style={styles.rewardSection}>
                <span style={styles.rewardIcon}>🎁</span>
                <span style={styles.rewardText}>{achievement.reward}</span>
              </div>
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
        <h1 style={styles.headerTitle}>成就系统</h1>
        <div style={styles.placeholder} />
      </header>

      <div style={styles.levelCard}>
        <div style={styles.levelHeader}>
          <div style={styles.levelIcon}>🏆</div>
          <div style={styles.levelInfo}>
            <h2 style={styles.levelTitle}>Lv.{userStats.level} {userStats.title}</h2>
            <div style={styles.levelProgress}>
              <div style={styles.levelBar}>
                <div style={{
                  ...styles.levelFill,
                  width: `${(userStats.exp / userStats.nextLevel) * 100}%`,
                }} />
              </div>
              <span style={styles.levelText}>
                {userStats.exp}/{userStats.nextLevel} 升级
              </span>
            </div>
          </div>
        </div>
        <div style={styles.statsGrid}>
          <div style={styles.statItem}>
            <span style={styles.statIcon}>📅</span>
            <span style={styles.statValue}>{userStats.totalDays}天</span>
            <span style={styles.statLabel}>累计签到</span>
          </div>
          <div style={styles.statItem}>
            <span style={styles.statIcon}>🌸</span>
            <span style={styles.statValue}>{userStats.flowersCollected}</span>
            <span style={styles.statLabel}>收集花卉</span>
          </div>
          <div style={styles.statItem}>
            <span style={styles.statIcon}>📝</span>
            <span style={styles.statValue}>{userStats.postsCreated}</span>
            <span style={styles.statLabel}>发布帖子</span>
          </div>
          <div style={styles.statItem}>
            <span style={styles.statIcon}>❤️</span>
            <span style={styles.statValue}>{userStats.likesReceived}</span>
            <span style={styles.statLabel}>获得点赞</span>
          </div>
        </div>
      </div>

      <nav style={styles.tabNav}>
        <button
          style={{ ...styles.tabBtn, ...(activeTab === 'badges' ? styles.activeTab : {}) }}
          onClick={() => setActiveTab('badges')}
        >
          我的徽章
        </button>
        <button
          style={{ ...styles.tabBtn, ...(activeTab === 'achievements' ? styles.activeTab : {}) }}
          onClick={() => setActiveTab('achievements')}
        >
          成就列表
        </button>
      </nav>

      {activeTab === 'badges' && renderBadges()}
      {activeTab === 'achievements' && renderAchievements()}
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
  levelCard: {
    margin: '20px',
    padding: '20px',
    background: 'linear-gradient(135deg, rgba(255,105,180,0.15) 0%, rgba(0,206,209,0.15) 100%)',
    borderRadius: '20px',
    border: '1px solid rgba(255,255,255,0.1)',
  },
  levelHeader: {
    display: 'flex',
    alignItems: 'center',
    gap: '16px',
    marginBottom: '20px',
  },
  levelIcon: {
    width: '60px',
    height: '60px',
    borderRadius: '50%',
    background: 'linear-gradient(135deg, #ffd700 0%, #ffb347 100%)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '28px',
    boxShadow: '0 4px 20px rgba(255,215,0,0.3)',
  },
  levelInfo: {
    flex: 1,
  },
  levelTitle: {
    fontSize: '18px',
    fontWeight: '600',
    margin: '0 0 12px 0',
    color: '#fff',
  },
  levelProgress: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
  },
  levelBar: {
    flex: 1,
    height: '8px',
    background: 'rgba(255,255,255,0.1)',
    borderRadius: '4px',
    overflow: 'hidden',
  },
  levelFill: {
    height: '100%',
    background: 'linear-gradient(90deg, #ffd700, #ffb347)',
    borderRadius: '4px',
  },
  levelText: {
    fontSize: '12px',
    color: 'rgba(255,255,255,0.6)',
  },
  statsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(4, 1fr)',
    gap: '12px',
  },
  statItem: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '4px',
    padding: '12px',
    background: 'rgba(255,255,255,0.05)',
    borderRadius: '12px',
  },
  statIcon: {
    fontSize: '20px',
  },
  statValue: {
    fontSize: '16px',
    fontWeight: '600',
    color: '#fff',
  },
  statLabel: {
    fontSize: '11px',
    color: 'rgba(255,255,255,0.5)',
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
    background: 'linear-gradient(135deg, rgba(255,105,180,0.2) 0%, rgba(0,206,209,0.2) 100%)',
    color: '#fff',
    boxShadow: '0 4px 15px rgba(255,105,180,0.2)',
  },
  tabContent: {
    padding: '0 20px 20px',
  },
  badgeGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(4, 1fr)',
    gap: '12px',
  },
  badgeCard: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '8px',
    padding: '16px 12px',
    borderRadius: '16px',
    transition: 'all 0.3s ease',
  },
  badgeEarned: {
    background: 'linear-gradient(135deg, rgba(255,215,0,0.15) 0%, rgba(255,179,71,0.15) 100%)',
    border: '1px solid rgba(255,215,0,0.3)',
  },
  badgeLocked: {
    background: 'rgba(255,255,255,0.05)',
    border: '1px solid rgba(255,255,255,0.1)',
    opacity: 0.6,
  },
  badgeIcon: {
    fontSize: '32px',
  },
  badgeName: {
    fontSize: '12px',
    color: 'rgba(255,255,255,0.8)',
    textAlign: 'center',
  },
  lockedIcon: {
    fontSize: '14px',
    color: 'rgba(255,255,255,0.5)',
  },
  achievementList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
  },
  achievementCard: {
    display: 'flex',
    gap: '16px',
    padding: '16px',
    borderRadius: '16px',
    border: '1px solid rgba(255,255,255,0.08)',
    transition: 'all 0.3s ease',
  },
  achievementCompleted: {
    background: 'linear-gradient(135deg, rgba(50,205,50,0.1) 0%, rgba(34,139,34,0.1) 100%)',
    borderColor: 'rgba(50,205,50,0.2)',
  },
  achievementIcon: {
    width: '50px',
    height: '50px',
    borderRadius: '12px',
    background: 'rgba(255,255,255,0.1)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '24px',
    flexShrink: 0,
  },
  achievementInfo: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
  },
  achievementHeader: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  achievementName: {
    fontSize: '16px',
    fontWeight: '600',
    margin: 0,
    color: '#fff',
  },
  completedBadge: {
    fontSize: '12px',
    color: '#32cd32',
    background: 'rgba(50,205,50,0.1)',
    padding: '4px 10px',
    borderRadius: '10px',
  },
  achievementDesc: {
    fontSize: '13px',
    color: 'rgba(255,255,255,0.6)',
    margin: 0,
  },
  progressSection: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
  },
  progressBar: {
    flex: 1,
    height: '6px',
    background: 'rgba(255,255,255,0.1)',
    borderRadius: '3px',
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    background: 'linear-gradient(90deg, #00ced1, #20b2aa)',
    borderRadius: '3px',
  },
  progressText: {
    fontSize: '12px',
    color: 'rgba(255,255,255,0.5)',
  },
  rewardSection: {
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
  },
  rewardIcon: {
    fontSize: '14px',
  },
  rewardText: {
    fontSize: '12px',
    color: '#ffd700',
  },
};

export default Achievements;