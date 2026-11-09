import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

function PostDetail() {
  const navigate = useNavigate();
  const { postId } = useParams();
  const [liked, setLiked] = useState(false);
  const [commentText, setCommentText] = useState('');

  const post = {
    id: postId || 1,
    user: {
      name: '花园小王子',
      avatar: '👨‍🌾',
      level: 'Lv.6',
      followers: 128,
    },
    time: '2小时前',
    content: '今天我的月季终于开花了！好开心呀~花花长得特别漂亮，颜色粉粉嫩嫩的，感觉整个阳台都被点亮了✨ 从买回来到现在已经养了三个月，终于看到成果了！分享一下我的养护心得：每周浇水2-3次，放在阳光充足的地方，定期施肥，最重要的是要有耐心和爱心～',
    images: ['🌸', '🌺', '🌷'],
    likes: 128,
    comments: 23,
    shares: 15,
    topic: '#春季养花指南',
    tags: ['月季', '开花', '养护心得'],
  };

  const comments = [
    {
      id: 1,
      user: '花艺师阿雅',
      avatar: '👩‍🎨',
      content: '太漂亮了！月季养护得真好，颜色很正👍',
      time: '1小时前',
      likes: 12,
    },
    {
      id: 2,
      user: '养花新手小白',
      avatar: '🌱',
      content: '请问用的什么肥料呀？我的月季一直不开花',
      time: '30分钟前',
      likes: 5,
    },
    {
      id: 3,
      user: '多肉控',
      avatar: '🌵',
      content: '我也想养月季了！请问新手适合什么品种？',
      time: '20分钟前',
      likes: 3,
    },
    {
      id: 4,
      user: '兰花爱好者',
      avatar: '🌸',
      content: '阳台党羡慕了，我家阳台光照不够',
      time: '10分钟前',
      likes: 8,
    },
  ];

  const handleLike = () => {
    setLiked(!liked);
  };

  const handleCommentSubmit = () => {
    if (commentText.trim()) {
      alert('评论发布成功！');
      setCommentText('');
    }
  };

  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <button onClick={() => navigate('/community')} style={styles.backBtn}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M19 12H5M12 19l-7-7 7-7" />
          </svg>
        </button>
        <h1 style={styles.headerTitle}>帖子详情</h1>
        <button style={styles.shareBtn}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="18" cy="5" r="3" />
            <circle cx="6" cy="12" r="3" />
            <circle cx="18" cy="19" r="3" />
            <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
            <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
          </svg>
        </button>
      </header>

      <div style={styles.postContent}>
        <div style={styles.postHeader}>
          <div style={styles.userInfo}>
            <div style={styles.avatar}>{post.user.avatar}</div>
            <div style={styles.userDetails}>
              <div style={styles.userNameRow}>
                <span style={styles.userName}>{post.user.name}</span>
                <span style={styles.userLevel}>{post.user.level}</span>
              </div>
              <span style={styles.userFollowers}>{post.user.followers} 粉丝</span>
            </div>
          </div>
          <button style={styles.followBtn}>关注</button>
        </div>

        <div style={styles.postMeta}>
          <span style={styles.postTime}>{post.time}</span>
          <span style={styles.topicTag}>{post.topic}</span>
        </div>

        <p style={styles.postText}>{post.content}</p>

        <div style={styles.postImages}>
          {post.images.map((img, idx) => (
            <div key={idx} style={styles.imageBox}>{img}</div>
          ))}
        </div>

        <div style={styles.postTags}>
          {post.tags.map((tag, idx) => (
            <span key={idx} style={styles.tag}>#{tag}</span>
          ))}
        </div>

        <div style={styles.postStats}>
          <button
            style={{ ...styles.statBtn, ...(liked ? styles.likedBtn : {}) }}
            onClick={handleLike}
          >
            <span style={styles.statIcon}>{liked ? '❤️' : '🤍'}</span>
            <span>{liked ? post.likes + 1 : post.likes}</span>
          </button>
          <button style={styles.statBtn}>
            <span style={styles.statIcon}>💬</span>
            <span>{post.comments}</span>
          </button>
          <button style={styles.statBtn}>
            <span style={styles.statIcon}>🔗</span>
            <span>{post.shares}</span>
          </button>
        </div>
      </div>

      <div style={styles.commentsSection}>
        <h3 style={styles.commentsTitle}>评论 ({comments.length})</h3>
        <div style={styles.commentsList}>
          {comments.map((comment) => (
            <div key={comment.id} style={styles.commentCard}>
              <div style={styles.commentAvatar}>{comment.avatar}</div>
              <div style={styles.commentContent}>
                <div style={styles.commentHeader}>
                  <span style={styles.commentUser}>{comment.user}</span>
                  <span style={styles.commentTime}>{comment.time}</span>
                </div>
                <p style={styles.commentText}>{comment.content}</p>
                <div style={styles.commentActions}>
                  <button style={styles.commentLikeBtn}>
                    <span>❤️</span>
                    <span>{comment.likes}</span>
                  </button>
                  <button style={styles.replyBtn}>回复</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div style={styles.commentInput}>
        <input
          type="text"
          placeholder="写下你的评论..."
          value={commentText}
          onChange={(e) => setCommentText(e.target.value)}
          style={styles.input}
        />
        <button
          style={styles.submitBtn}
          onClick={handleCommentSubmit}
          disabled={!commentText.trim()}
        >
          发送
        </button>
      </div>
    </div>
  );
}

const styles = {
  container: {
    minHeight: '100vh',
    background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)',
    color: '#fff',
    paddingBottom: '80px',
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '16px 20px',
    background: 'rgba(255,255,255,0.05)',
    backdropFilter: 'blur(10px)',
    borderBottom: '1px solid rgba(255,255,255,0.1)',
    position: 'sticky',
    top: 0,
    zIndex: 10,
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
  shareBtn: {
    background: 'rgba(255,255,255,0.1)',
    border: 'none',
    borderRadius: '12px',
    padding: '10px',
    cursor: 'pointer',
    color: '#fff',
    transition: 'all 0.3s ease',
  },
  postContent: {
    padding: '20px',
    borderBottom: '1px solid rgba(255,255,255,0.05)',
  },
  postHeader: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: '16px',
  },
  userInfo: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
  },
  avatar: {
    width: '50px',
    height: '50px',
    borderRadius: '50%',
    background: 'linear-gradient(135deg, rgba(255,105,180,0.3) 0%, rgba(0,206,209,0.3) 100%)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '24px',
  },
  userDetails: {
    display: 'flex',
    flexDirection: 'column',
    gap: '4px',
  },
  userNameRow: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
  },
  userName: {
    fontSize: '16px',
    fontWeight: '600',
    color: '#fff',
  },
  userLevel: {
    fontSize: '12px',
    color: '#ffd700',
    background: 'rgba(255,215,0,0.1)',
    padding: '2px 8px',
    borderRadius: '8px',
  },
  userFollowers: {
    fontSize: '12px',
    color: 'rgba(255,255,255,0.5)',
  },
  followBtn: {
    background: 'linear-gradient(135deg, #ff69b4 0%, #ff8dc7 100%)',
    border: 'none',
    borderRadius: '20px',
    padding: '8px 20px',
    color: '#fff',
    fontSize: '13px',
    fontWeight: '500',
    cursor: 'pointer',
    boxShadow: '0 4px 15px rgba(255,105,180,0.3)',
    transition: 'all 0.3s ease',
  },
  postMeta: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    marginBottom: '12px',
  },
  postTime: {
    fontSize: '13px',
    color: 'rgba(255,255,255,0.5)',
  },
  topicTag: {
    fontSize: '13px',
    color: '#00ced1',
    background: 'rgba(0,206,209,0.1)',
    padding: '4px 12px',
    borderRadius: '12px',
  },
  postText: {
    fontSize: '15px',
    lineHeight: '1.8',
    color: 'rgba(255,255,255,0.9)',
    margin: '0 0 16px 0',
  },
  postImages: {
    display: 'flex',
    gap: '12px',
    marginBottom: '16px',
  },
  imageBox: {
    width: '100px',
    height: '100px',
    borderRadius: '16px',
    background: 'linear-gradient(135deg, rgba(255,105,180,0.2) 0%, rgba(0,206,209,0.2) 100%)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '40px',
  },
  postTags: {
    display: 'flex',
    gap: '8px',
    marginBottom: '16px',
  },
  tag: {
    fontSize: '13px',
    color: 'rgba(255,255,255,0.6)',
  },
  postStats: {
    display: 'flex',
    gap: '16px',
    paddingTop: '16px',
    borderTop: '1px solid rgba(255,255,255,0.05)',
  },
  statBtn: {
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    background: 'transparent',
    border: 'none',
    color: 'rgba(255,255,255,0.6)',
    fontSize: '14px',
    cursor: 'pointer',
    padding: '8px 16px',
    borderRadius: '12px',
    transition: 'all 0.3s ease',
  },
  likedBtn: {
    color: '#ff69b4',
    background: 'rgba(255,105,180,0.1)',
  },
  statIcon: {
    fontSize: '18px',
  },
  commentsSection: {
    padding: '20px',
  },
  commentsTitle: {
    fontSize: '16px',
    fontWeight: '600',
    margin: '0 0 16px 0',
    color: '#fff',
  },
  commentsList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
  },
  commentCard: {
    display: 'flex',
    gap: '12px',
  },
  commentAvatar: {
    width: '36px',
    height: '36px',
    borderRadius: '50%',
    background: 'linear-gradient(135deg, rgba(255,105,180,0.2) 0%, rgba(0,206,209,0.2) 100%)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '18px',
    flexShrink: 0,
  },
  commentContent: {
    flex: 1,
  },
  commentHeader: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    marginBottom: '6px',
  },
  commentUser: {
    fontSize: '14px',
    fontWeight: '500',
    color: '#fff',
  },
  commentTime: {
    fontSize: '12px',
    color: 'rgba(255,255,255,0.5)',
  },
  commentText: {
    fontSize: '14px',
    color: 'rgba(255,255,255,0.8)',
    margin: '0 0 8px 0',
    lineHeight: '1.5',
  },
  commentActions: {
    display: 'flex',
    gap: '12px',
  },
  commentLikeBtn: {
    display: 'flex',
    alignItems: 'center',
    gap: '4px',
    background: 'transparent',
    border: 'none',
    color: 'rgba(255,255,255,0.5)',
    fontSize: '12px',
    cursor: 'pointer',
    padding: '4px 8px',
    borderRadius: '6px',
    transition: 'all 0.3s ease',
  },
  replyBtn: {
    background: 'transparent',
    border: 'none',
    color: 'rgba(255,255,255,0.5)',
    fontSize: '12px',
    cursor: 'pointer',
    padding: '4px 8px',
    borderRadius: '6px',
    transition: 'all 0.3s ease',
  },
  commentInput: {
    position: 'fixed',
    bottom: 0,
    left: 0,
    right: 0,
    display: 'flex',
    gap: '12px',
    padding: '16px 20px',
    background: 'rgba(26,26,46,0.95)',
    backdropFilter: 'blur(10px)',
    borderTop: '1px solid rgba(255,255,255,0.1)',
  },
  input: {
    flex: 1,
    padding: '12px 16px',
    background: 'rgba(255,255,255,0.1)',
    border: '1px solid rgba(255,255,255,0.1)',
    borderRadius: '12px',
    color: '#fff',
    fontSize: '14px',
    outline: 'none',
  },
  submitBtn: {
    padding: '12px 20px',
    background: 'linear-gradient(135deg, #ff69b4 0%, #ff8dc7 100%)',
    border: 'none',
    borderRadius: '12px',
    color: '#fff',
    fontSize: '14px',
    fontWeight: '500',
    cursor: 'pointer',
    boxShadow: '0 4px 15px rgba(255,105,180,0.3)',
    transition: 'all 0.3s ease',
    opacity: 1,
  },
};

export default PostDetail;