import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Community() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('square');
  const [likedPosts, setLikedPosts] = useState(new Set());
  const [activeTopic, setActiveTopic] = useState('全部');

  const topicFilters = ['全部', '#春季养花指南', '#阳台花园改造', '#新手必看', '#花艺设计', '#多肉植物'];

  const posts = [
    {
      id: 1,
      user: '花园小王子',
      avatar: '👨‍🌾',
      time: '2小时前',
      content: '今天我的月季终于开花了！好开心呀~花花长得特别漂亮，颜色粉粉嫩嫩的，感觉整个阳台都被点亮了✨',
      images: ['🌸', '🌺', '🌷'],
      likes: 128,
      comments: 23,
      topic: '#春季养花指南',
    },
    {
      id: 2,
      user: '养花新手小白',
      avatar: '🌱',
      time: '5小时前',
      content: '求助！我的绿萝叶子发黄是什么原因？是不是浇水太多了？有没有花友能帮我看看？',
      images: ['🌿'],
      likes: 45,
      comments: 67,
      topic: '#新手求助',
    },
    {
      id: 3,
      user: '花艺师阿雅',
      avatar: '👩‍🎨',
      time: '昨天',
      content: '分享一个简单的瓶插花技巧：斜切花根、每天换水、加一点点盐，可以延长花期哦～大家试试看！',
      images: ['💐', '🌹'],
      likes: 256,
      comments: 89,
      topic: '#花艺技巧',
    },
    {
      id: 4,
      user: '多肉控',
      avatar: '🌵',
      time: '2天前',
      content: '我的多肉们终于服盆了！从一片叶子到现在的老桩，太有成就感了，分享给大家～',
      images: ['🪴'],
      likes: 189,
      comments: 34,
      topic: '#多肉植物',
    },
    {
      id: 5,
      user: '兰花爱好者',
      avatar: '🌸',
      time: '3天前',
      content: '今年春兰开得特别好，淡淡的香气弥漫整个房间，太治愈了！',
      images: ['🌺', '🌼'],
      likes: 312,
      comments: 56,
      topic: '#兰花鉴赏',
    },
  ];

  const topics = [
    { id: 1, name: '#春季养花指南', posts: 1280, heat: '12.8万' },
    { id: 2, name: '#阳台花园改造', posts: 860, heat: '8.6万' },
    { id: 3, name: '#新手必看养花技巧', posts: 620, heat: '6.2万' },
    { id: 4, name: '#花艺设计大赛', posts: 450, heat: '4.5万' },
    { id: 5, name: '#多肉植物养护', posts: 380, heat: '3.8万' },
    { id: 6, name: '#月季品种推荐', posts: 290, heat: '2.9万' },
  ];

  const activities = [
    {
      id: 1,
      title: '🌸 春季最美花园摄影大赛',
      description: '晒出你的花园美照，赢取丰厚奖品！',
      participants: 256,
      endTime: '2026-06-15',
      status: '进行中',
      image: '🏆',
    },
    {
      id: 2,
      title: '🌺 新手养花打卡挑战',
      description: '连续打卡30天，记录你的养花成长之路',
      participants: 189,
      endTime: '2026-06-30',
      status: '进行中',
      image: '📝',
    },
    {
      id: 3,
      title: '🌹 花艺作品分享周',
      description: '分享你的花艺作品，获得专业点评',
      participants: 145,
      endTime: '2026-06-10',
      status: '即将结束',
      image: '🎨',
    },
    {
      id: 4,
      title: '🌻 多肉养护知识竞赛',
      description: '答题赢积分，学习多肉养护知识',
      participants: 320,
      endTime: '2026-06-20',
      status: '进行中',
      image: '📚',
    },
  ];

  const handleLike = (postId) => {
    const newLiked = new Set(likedPosts);
    if (newLiked.has(postId)) {
      newLiked.delete(postId);
    } else {
      newLiked.add(postId);
    }
    setLikedPosts(newLiked);
  };

  const handlePostClick = (postId) => {
    navigate(`/community/post/${postId}`);
  };

  const renderSquare = () => (
    <div style={styles.squareLayout}>
      <div style={styles.squareMain}>
        <div style={styles.topicFilters}>
          {topicFilters.map((topic) => (
            <button
              key={topic}
              onClick={() => setActiveTopic(topic)}
              style={{
                ...styles.topicFilterBtn,
                ...(activeTopic === topic ? styles.activeTopicFilter : {}),
              }}
            >
              {topic}
            </button>
          ))}
        </div>
        <div style={styles.postList}>
          {posts.map((post) => (
          <div key={post.id} style={styles.postCard} onClick={() => handlePostClick(post.id)}>
            <div style={styles.postHeader}>
              <div style={styles.postAvatar}>{post.avatar}</div>
              <div style={styles.postUserInfo}>
                <span style={styles.postUserName}>{post.user}</span>
                <span style={styles.postTime}>{post.time}</span>
              </div>
              <span style={styles.topicTag}>{post.topic}</span>
            </div>
            <p style={styles.postContent}>{post.content}</p>
            <div style={styles.postImages}>
              {post.images.map((img, idx) => (
                <span key={idx} style={styles.postImage}>{img}</span>
              ))}
            </div>
            <div style={styles.postActions}>
              <button
                style={{
                  ...styles.actionBtn,
                  ...(likedPosts.has(post.id) ? styles.likedBtn : {}),
                }}
                onClick={(e) => {
                  e.stopPropagation();
                  handleLike(post.id);
                }}
              >
                <span style={styles.actionIcon}>{likedPosts.has(post.id) ? '❤️' : '🤍'}</span>
                <span>{likedPosts.has(post.id) ? post.likes + 1 : post.likes}</span>
              </button>
              <button style={styles.actionBtn}>
                <span style={styles.actionIcon}>💬</span>
                <span>{post.comments}</span>
              </button>
              <button style={styles.actionBtn}>
                <span style={styles.actionIcon}>🔗</span>
                <span>分享</span>
              </button>
            </div>
          </div>
        ))}
      </div>
      </div>

      <aside style={styles.activeUsersPanel}>
        <h4 style={styles.activeUsersTitle}>🏆 活跃用户榜</h4>
        <div style={styles.activeUsersList}>
          {[
            { rank: 1, name: '花园小王子', avatar: '👨‍🌾', flowers: 156, badge: '🌹' },
            { rank: 2, name: '花艺师阿雅', avatar: '👩‍🎨', flowers: 142, badge: '💐' },
            { rank: 3, name: '多肉控', avatar: '🌵', flowers: 128, badge: '🌵' },
            { rank: 4, name: '兰花爱好者', avatar: '🌸', flowers: 98, badge: '🌺' },
            { rank: 5, name: '养花新手', avatar: '🌱', flowers: 67, badge: '🌷' },
          ].map((user) => (
            <div key={user.rank} style={styles.activeUserItem}>
              <span style={{
                ...styles.activeUserRank,
                color: user.rank <= 3 ? '#ffd700' : 'rgba(255,255,255,0.5)',
              }}>{user.rank}</span>
              <span style={styles.activeUserAvatar}>{user.avatar}</span>
              <div style={styles.activeUserInfo}>
                <span style={styles.activeUserName}>{user.name}</span>
                <span style={styles.activeUserFlowers}>🌸 {user.flowers}</span>
              </div>
            </div>
          ))}
        </div>
      </aside>
    </div>
  );

  const renderTopics = () => (
    <div style={styles.tabContent}>
      <div style={styles.topicList}>
        {topics.map((topic) => (
          <div key={topic.id} style={styles.topicCard}>
            <div style={styles.topicInfo}>
              <h4 style={styles.topicName}>{topic.name}</h4>
              <p style={styles.topicStats}>
                <span>{topic.posts} 帖子</span>
                <span style={styles.topicDot}>·</span>
                <span>热度 {topic.heat}</span>
              </p>
            </div>
            <button style={styles.joinBtn}>参与讨论</button>
          </div>
        ))}
      </div>
    </div>
  );

  const renderActivities = () => (
    <div style={styles.tabContent}>
      <div style={styles.activityList}>
        {activities.map((activity) => (
          <div key={activity.id} style={styles.activityCard}>
            <div style={styles.activityImage}>{activity.image}</div>
            <div style={styles.activityContent}>
              <div style={styles.activityHeader}>
                <h4 style={styles.activityTitle}>{activity.title}</h4>
                <span style={{
                  ...styles.activityStatus,
                  ...(activity.status === '即将结束' ? styles.endingStatus : {}),
                }}>
                  {activity.status}
                </span>
              </div>
              <p style={styles.activityDesc}>{activity.description}</p>
              <div style={styles.activityFooter}>
                <span style={styles.activityMeta}>👥 {activity.participants}人参与</span>
                <span style={styles.activityMeta}>📅 截止：{activity.endTime}</span>
                <button style={styles.participateBtn}>立即参与</button>
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
        <h1 style={styles.headerTitle}>花友社区</h1>
        <button style={styles.publishBtn}>发布</button>
      </header>

      <nav style={styles.tabNav}>
        <button
          style={{ ...styles.tabBtn, ...(activeTab === 'square' ? styles.activeTab : {}) }}
          onClick={() => setActiveTab('square')}
        >
          动态广场
        </button>
        <button
          style={{ ...styles.tabBtn, ...(activeTab === 'topics' ? styles.activeTab : {}) }}
          onClick={() => setActiveTab('topics')}
        >
          话题讨论
        </button>
        <button
          style={{ ...styles.tabBtn, ...(activeTab === 'activities' ? styles.activeTab : {}) }}
          onClick={() => setActiveTab('activities')}
        >
          活动专区
        </button>
      </nav>

      {activeTab === 'square' && renderSquare()}
      {activeTab === 'topics' && renderTopics()}
      {activeTab === 'activities' && renderActivities()}
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
  publishBtn: {
    background: 'linear-gradient(135deg, #ff69b4 0%, #ff8dc7 100%)',
    border: 'none',
    borderRadius: '20px',
    padding: '8px 20px',
    color: '#fff',
    fontSize: '14px',
    fontWeight: '500',
    cursor: 'pointer',
    boxShadow: '0 4px 15px rgba(255,105,180,0.3)',
    transition: 'all 0.3s ease',
  },
  tabNav: {
    display: 'flex',
    gap: '8px',
    padding: '12px 20px',
    background: 'rgba(255,255,255,0.03)',
    borderBottom: '1px solid rgba(255,255,255,0.05)',
  },
  tabBtn: {
    flex: 1,
    padding: '12px 16px',
    background: 'transparent',
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
    padding: '16px 20px',
  },
  squareLayout: {
    display: 'flex',
    gap: '20px',
    padding: '16px 20px',
  },
  squareMain: {
    flex: 1,
  },
  topicFilters: {
    display: 'flex',
    gap: '8px',
    flexWrap: 'wrap',
    marginBottom: '16px',
  },
  topicFilterBtn: {
    padding: '8px 16px',
    background: 'rgba(255,255,255,0.05)',
    border: '1px solid rgba(255,255,255,0.1)',
    borderRadius: '20px',
    color: 'rgba(255,255,255,0.7)',
    fontSize: '13px',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
  },
  activeTopicFilter: {
    background: 'linear-gradient(135deg, rgba(255,105,180,0.2) 0%, rgba(0,206,209,0.2) 100%)',
    borderColor: 'rgba(255,105,180,0.3)',
    color: '#fff',
  },
  activeUsersPanel: {
    width: '260px',
    background: 'rgba(255,255,255,0.05)',
    borderRadius: '16px',
    padding: '16px',
    border: '1px solid rgba(255,255,255,0.08)',
    height: 'fit-content',
    position: 'sticky',
    top: '20px',
  },
  activeUsersTitle: {
    fontSize: '14px',
    fontWeight: '600',
    color: 'rgba(255,255,255,0.8)',
    margin: '0 0 16px 0',
  },
  activeUsersList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
  },
  activeUserItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    padding: '8px',
    borderRadius: '10px',
    transition: 'all 0.3s ease',
    cursor: 'pointer',
  },
  activeUserRank: {
    fontSize: '16px',
    fontWeight: '700',
    width: '24px',
  },
  activeUserAvatar: {
    fontSize: '24px',
  },
  activeUserInfo: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
  },
  activeUserName: {
    fontSize: '13px',
    color: '#fff',
    fontWeight: '500',
  },
  activeUserFlowers: {
    fontSize: '11px',
    color: 'rgba(255,255,255,0.5)',
  },
  postList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
  },
  postCard: {
    background: 'rgba(255,255,255,0.05)',
    borderRadius: '16px',
    padding: '16px',
    border: '1px solid rgba(255,255,255,0.08)',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
  },
  postHeader: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    marginBottom: '12px',
  },
  postAvatar: {
    width: '40px',
    height: '40px',
    borderRadius: '50%',
    background: 'linear-gradient(135deg, rgba(255,105,180,0.3) 0%, rgba(0,206,209,0.3) 100%)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '20px',
  },
  postUserInfo: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    gap: '2px',
  },
  postUserName: {
    fontSize: '14px',
    fontWeight: '600',
    color: '#fff',
  },
  postTime: {
    fontSize: '12px',
    color: 'rgba(255,255,255,0.5)',
  },
  topicTag: {
    fontSize: '12px',
    color: '#00ced1',
    background: 'rgba(0,206,209,0.1)',
    padding: '4px 10px',
    borderRadius: '12px',
  },
  postContent: {
    fontSize: '14px',
    lineHeight: '1.6',
    color: 'rgba(255,255,255,0.9)',
    marginBottom: '12px',
  },
  postImages: {
    display: 'flex',
    gap: '8px',
    marginBottom: '12px',
  },
  postImage: {
    width: '80px',
    height: '80px',
    borderRadius: '12px',
    background: 'rgba(255,255,255,0.1)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '32px',
  },
  postActions: {
    display: 'flex',
    gap: '16px',
    paddingTop: '12px',
    borderTop: '1px solid rgba(255,255,255,0.05)',
  },
  actionBtn: {
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    background: 'transparent',
    border: 'none',
    color: 'rgba(255,255,255,0.6)',
    fontSize: '13px',
    cursor: 'pointer',
    padding: '6px 12px',
    borderRadius: '8px',
    transition: 'all 0.3s ease',
  },
  actionIcon: {
    fontSize: '16px',
  },
  likedBtn: {
    color: '#ff69b4',
  },
  topicList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
  },
  topicCard: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    background: 'rgba(255,255,255,0.05)',
    borderRadius: '16px',
    padding: '16px',
    border: '1px solid rgba(255,255,255,0.08)',
    transition: 'all 0.3s ease',
  },
  topicInfo: {
    flex: 1,
  },
  topicName: {
    fontSize: '16px',
    fontWeight: '600',
    color: '#fff',
    margin: '0 0 6px 0',
  },
  topicStats: {
    fontSize: '13px',
    color: 'rgba(255,255,255,0.5)',
    margin: 0,
  },
  topicDot: {
    margin: '0 8px',
  },
  joinBtn: {
    background: 'linear-gradient(135deg, rgba(0,206,209,0.2) 0%, rgba(32,178,170,0.2) 100%)',
    border: '1px solid rgba(0,206,209,0.3)',
    borderRadius: '20px',
    padding: '8px 16px',
    color: '#00ced1',
    fontSize: '13px',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
  },
  activityList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
  },
  activityCard: {
    display: 'flex',
    gap: '16px',
    background: 'rgba(255,255,255,0.05)',
    borderRadius: '16px',
    padding: '16px',
    border: '1px solid rgba(255,255,255,0.08)',
    transition: 'all 0.3s ease',
  },
  activityImage: {
    width: '80px',
    height: '80px',
    borderRadius: '12px',
    background: 'linear-gradient(135deg, rgba(255,105,180,0.2) 0%, rgba(0,206,209,0.2) 100%)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '36px',
    flexShrink: 0,
  },
  activityContent: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
  },
  activityHeader: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  activityTitle: {
    fontSize: '15px',
    fontWeight: '600',
    color: '#fff',
    margin: 0,
  },
  activityStatus: {
    fontSize: '12px',
    color: '#32cd32',
    background: 'rgba(50,205,50,0.1)',
    padding: '4px 10px',
    borderRadius: '10px',
  },
  endingStatus: {
    color: '#ff6b6b',
    background: 'rgba(255,107,107,0.1)',
  },
  activityDesc: {
    fontSize: '13px',
    color: 'rgba(255,255,255,0.6)',
    margin: 0,
  },
  activityFooter: {
    display: 'flex',
    alignItems: 'center',
    gap: '16px',
    marginTop: 'auto',
  },
  activityMeta: {
    fontSize: '12px',
    color: 'rgba(255,255,255,0.5)',
  },
  participateBtn: {
    marginLeft: 'auto',
    background: 'linear-gradient(135deg, #ff69b4 0%, #ff8dc7 100%)',
    border: 'none',
    borderRadius: '16px',
    padding: '6px 14px',
    color: '#fff',
    fontSize: '12px',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
  },
};

export default Community;