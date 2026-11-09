import React, { useState } from 'react';
import AdminLayout from '../components/AdminLayout';
import { useTheme } from '../context/ThemeContext';

function CommentManage() {
  const { theme } = useTheme();
  const colors = theme.colors;
  const [activeTab, setActiveTab] = useState('all');
  const [searchKeyword, setSearchKeyword] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedItems, setSelectedItems] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [hoveredRow, setHoveredRow] = useState(null);
  const [detailData, setDetailData] = useState(null);

  const commentsData = [
    { id: 1, content: '这篇文章写得真好！', author: '花园小王子', authorAvatar: '👨‍🌾', postTitle: '春季玫瑰养护指南', status: 'normal', createTime: '2024-03-15 10:45', likes: 12 },
    { id: 2, content: '学到了很多，谢谢分享！', author: '养花新手', authorAvatar: '🌱', postTitle: '春季玫瑰养护指南', status: 'normal', createTime: '2024-03-15 11:00', likes: 8 },
    { id: 3, content: '垃圾文章，误导新手！', author: '喷子', authorAvatar: '👿', postTitle: '春季玫瑰养护指南', status: 'reported', createTime: '2024-03-15 11:30', likes: 0, reports: 3 },
    { id: 4, content: '感谢分享，很实用！', author: '爱花人士', authorAvatar: '🌺', postTitle: '我家的牡丹开花了', status: 'normal', createTime: '2024-03-15 12:00', likes: 15 },
    { id: 5, content: '图片很美！', author: '花艺师', authorAvatar: '🎨', postTitle: '夏日荷花欣赏', status: 'normal', createTime: '2024-03-14 15:30', likes: 22 },
    { id: 6, content: '胡说八道！', author: '黑粉', authorAvatar: '💀', postTitle: '秋季菊花种植技巧', status: 'reported', createTime: '2024-03-13 16:00', likes: 1, reports: 5 },
    { id: 7, content: '写得很详细，收藏了！', author: '小花仙子', authorAvatar: '🧚', postTitle: '冬季梅花养护', status: 'normal', createTime: '2024-03-10 11:30', likes: 18 },
    { id: 8, content: '请问还有其他品种推荐吗？', author: '赏花客', authorAvatar: '👀', postTitle: '我的花园日记', status: 'normal', createTime: '2024-03-11 10:00', likes: 5 },
  ];

  const postsData = [
    { id: 1, title: '春季玫瑰养护指南', author: '花园小王子', category: '养护心得', status: 'active', createTime: '2024-03-15', comments: 12 },
    { id: 2, title: '我家的牡丹开花了', author: '养花新手', category: '花卉分享', status: 'active', createTime: '2024-03-15', comments: 8 },
    { id: 3, title: '如何防治花卉病虫害？', author: '爱花人士', category: '问答交流', status: 'active', createTime: '2024-03-14', comments: 15 },
    { id: 4, title: '夏日荷花欣赏', author: '花艺师', category: '花卉分享', status: 'active', createTime: '2024-03-14', comments: 22 },
    { id: 5, title: '秋季菊花种植技巧', author: '小花仙子', category: '养护心得', status: 'active', createTime: '2024-03-13', comments: 6 },
    { id: 6, title: '我的花园日记', author: '花之守护者', category: '话题讨论', status: 'active', createTime: '2024-03-11', comments: 18 },
  ];

  const filteredComments = commentsData.filter(comment => {
    const matchKeyword = comment.content.includes(searchKeyword) || comment.author.includes(searchKeyword);
    const matchStatus = activeTab === 'all' || 
                        (activeTab === 'reported' && comment.status === 'reported') ||
                        (activeTab === 'normal' && comment.status === 'normal');
    return matchKeyword && matchStatus;
  });

  const totalPages = Math.ceil(filteredComments.length / 4);
  const paginatedComments = filteredComments.slice((currentPage - 1) * 4, currentPage * 4);

  const reportedCount = commentsData.filter(c => c.status === 'reported').length;

  const handleViewDetail = (comment) => {
    setDetailData(comment);
    setShowDetailModal(true);
  };

  const handleDelete = (comment) => {
    alert(`评论「${comment.content.substring(0, 20)}...」已删除`);
  };

  const handleApprove = (comment) => {
    alert(`评论「${comment.content.substring(0, 20)}...」已恢复正常`);
  };

  const handleBatchDelete = () => {
    if (selectedItems.length > 0) {
      alert(`已删除 ${selectedItems.length} 条评论`);
      setSelectedItems([]);
    } else {
      alert('请选择要删除的评论');
    }
  };

  const toggleSelectAll = () => {
    if (selectedItems.length === paginatedComments.length) {
      setSelectedItems([]);
    } else {
      setSelectedItems(paginatedComments.map(c => c.id));
    }
  };

  return (
    <div style={getStyles(colors).container}>
      {/* 顶部操作栏 */}
      <div style={getStyles(colors).header}>
        <div style={getStyles(colors).headerLeft}>
          <h2 style={getStyles(colors).title}>评论/社区管理</h2>
        </div>
      </div>

      {/* 标签切换 */}
      <div style={getStyles(colors).tabBar}>
        <button 
          style={{...getStyles(colors).tabBtn, ...(activeTab === 'all' ? getStyles(colors).activeTab : {})}}
          onClick={() => { setActiveTab('all'); setCurrentPage(1); }}
        >全部评论 ({commentsData.length})</button>
        <button 
          style={{...getStyles(colors).tabBtn, ...(activeTab === 'reported' ? getStyles(colors).activeTab : {})}}
          onClick={() => { setActiveTab('reported'); setCurrentPage(1); }}
        >举报处理 ({reportedCount})</button>
        <button 
          style={{...getStyles(colors).tabBtn, ...(activeTab === 'topics' ? getStyles(colors).activeTab : {})}}
          onClick={() => setActiveTab('topics')}
        >话题管理</button>
      </div>

      {activeTab !== 'topics' ? (
        <>
          {/* 搜索筛选区 */}
          <div style={getStyles(colors).filterSection}>
            <div style={getStyles(colors).filterRow}>
              <input
                type="text"
                placeholder="搜索评论内容或作者..."
                value={searchKeyword}
                onChange={(e) => { setSearchKeyword(e.target.value); setCurrentPage(1); }}
                style={getStyles(colors).searchInput}
              />
            </div>

            {/* 批量操作 */}
            {selectedItems.length > 0 && (
              <div style={getStyles(colors).batchBar}>
                <span>已选择 {selectedItems.length} 条记录</span>
                <button style={{...getStyles(colors).batchBtn, backgroundColor: colors.error}} onClick={handleBatchDelete}>
                  批量删除
                </button>
              </div>
            )}
          </div>

          {/* 评论表格 */}
          <div style={getStyles(colors).tableContainer}>
            <table style={getStyles(colors).table}>
              <thead>
                <tr>
                  <th style={getStyles(colors).th}>
                    <input 
                      type="checkbox" 
                      checked={selectedItems.length === paginatedComments.length && paginatedComments.length > 0}
                      onChange={toggleSelectAll}
                    />
                  </th>
                  <th style={getStyles(colors).th}>评论内容</th>
                  <th style={getStyles(colors).th}>作者</th>
                  <th style={getStyles(colors).th}>所属帖子</th>
                  <th style={getStyles(colors).th}>点赞</th>
                  <th style={getStyles(colors).th}>状态</th>
                  <th style={getStyles(colors).th}>时间</th>
                  <th style={getStyles(colors).th}>操作</th>
                </tr>
              </thead>
              <tbody>
                {paginatedComments.map(comment => (
                  <tr
                    key={comment.id}
                    style={{
                      ...getStyles(colors).tr,
                      ...(hoveredRow === comment.id ? getStyles(colors).trHover : {}),
                    }}
                    onMouseEnter={() => setHoveredRow(comment.id)}
                    onMouseLeave={() => setHoveredRow(null)}
                  >
                    <td style={getStyles(colors).td}>
                      <input 
                        type="checkbox" 
                        checked={selectedItems.includes(comment.id)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setSelectedItems([...selectedItems, comment.id]);
                          } else {
                            setSelectedItems(selectedItems.filter(id => id !== comment.id));
                          }
                        }}
                      />
                    </td>
                    <td style={getStyles(colors).td}>{comment.content}</td>
                    <td style={getStyles(colors).td}>
                      <span style={getStyles(colors).authorAvatar}>{comment.authorAvatar}</span>
                      <span style={getStyles(colors).authorName}>{comment.author}</span>
                    </td>
                    <td style={getStyles(colors).td}>{comment.postTitle}</td>
                    <td style={getStyles(colors).td}>❤️ {comment.likes}</td>
                    <td style={getStyles(colors).td}>
                      <span style={{
                        ...getStyles(colors).statusBadge,
                        backgroundColor: comment.status === 'reported' ? colors.errorBg : colors.successBg,
                        color: comment.status === 'reported' ? colors.error : colors.success,
                      }}>
                        {comment.status === 'reported' ? `被举报(${comment.reports})` : '正常'}
                      </span>
                    </td>
                    <td style={getStyles(colors).td}>{comment.createTime}</td>
                    <td style={getStyles(colors).td}>
                      <button 
                        style={getStyles(colors).actionBtn}
                        onClick={() => handleViewDetail(comment)}
                      >查看</button>
                      {comment.status === 'reported' && (
                        <button 
                          style={{...getStyles(colors).actionBtn, backgroundColor: colors.success}}
                          onClick={() => handleApprove(comment)}
                        >通过</button>
                      )}
                      <button 
                        style={{...getStyles(colors).actionBtn, backgroundColor: colors.error}}
                        onClick={() => handleDelete(comment)}
                      >删除</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* 分页 */}
            <div style={getStyles(colors).pagination}>
              <button 
                style={getStyles(colors).pageBtn}
                disabled={currentPage === 1}
                onClick={() => setCurrentPage(p => p - 1)}
              >上一页</button>
              {Array.from({ length: totalPages }, (_, i) => (
                <button 
                  key={i + 1}
                  style={{
                    ...getStyles(colors).pageBtn,
                    ...(currentPage === i + 1 ? getStyles(colors).activePageBtn : {}),
                  }}
                  onClick={() => setCurrentPage(i + 1)}
                >
                  {i + 1}
                </button>
              ))}
              <button 
                style={getStyles(colors).pageBtn}
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage(p => p + 1)}
              >下一页</button>
            </div>
          </div>
        </>
      ) : (
        /* 话题管理 */
        <div style={getStyles(colors).tableContainer}>
          <table style={getStyles(colors).table}>
            <thead>
              <tr>
                <th style={getStyles(colors).th}>标题</th>
                <th style={getStyles(colors).th}>作者</th>
                <th style={getStyles(colors).th}>分类</th>
                <th style={getStyles(colors).th}>评论数</th>
                <th style={getStyles(colors).th}>状态</th>
                <th style={getStyles(colors).th}>创建时间</th>
                <th style={getStyles(colors).th}>操作</th>
              </tr>
            </thead>
            <tbody>
              {postsData.map(post => (
                <tr key={post.id} style={getStyles(colors).tr}>
                  <td style={getStyles(colors).td}>{post.title}</td>
                  <td style={getStyles(colors).td}>{post.author}</td>
                  <td style={getStyles(colors).td}>
                    <span style={getStyles(colors).categoryBadge}>{post.category}</span>
                  </td>
                  <td style={getStyles(colors).td}>💬 {post.comments}</td>
                  <td style={getStyles(colors).td}>
                    <span style={{
                      ...getStyles(colors).statusBadge,
                      backgroundColor: post.status === 'active' ? colors.successBg : colors.warningBg,
                      color: post.status === 'active' ? colors.success : colors.warning,
                    }}>
                      {post.status === 'active' ? '正常' : '已关闭'}
                    </span>
                  </td>
                  <td style={getStyles(colors).td}>{post.createTime}</td>
                  <td style={getStyles(colors).td}>
                    <button 
                      style={{...getStyles(colors).actionBtn, backgroundColor: colors.info}}
                      onClick={() => alert(`查看帖子「${post.title}」`)}
                    >查看</button>
                    <button 
                      style={{...getStyles(colors).actionBtn, backgroundColor: colors.warning}}
                      onClick={() => alert(`帖子「${post.title}」已${post.status === 'active' ? '关闭' : '开启'}`)}
                    >
                      {post.status === 'active' ? '关闭' : '开启'}
                    </button>
                    <button 
                      style={{...getStyles(colors).actionBtn, backgroundColor: colors.error}}
                      onClick={() => alert(`帖子「${post.title}」已删除`)}
                    >删除</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* 详情弹窗 */}
      {showDetailModal && detailData && (
        <div style={getStyles(colors).modalOverlay} onClick={() => setShowDetailModal(false)}>
          <div style={getStyles(colors).modal} onClick={(e) => e.stopPropagation()}>
            <div style={getStyles(colors).modalHeader}>
              <h3>评论详情</h3>
              <button style={getStyles(colors).closeBtn} onClick={() => setShowDetailModal(false)}>✕</button>
            </div>
            <div style={getStyles(colors).modalBody}>
              <div style={getStyles(colors).detailHeader}>
                <span style={getStyles(colors).detailAvatar}>{detailData.authorAvatar}</span>
                <div style={getStyles(colors).detailMeta}>
                  <span style={getStyles(colors).detailAuthor}>{detailData.author}</span>
                  <span style={getStyles(colors).detailTime}>{detailData.createTime}</span>
                </div>
              </div>
              <div style={getStyles(colors).detailPost}>
                所属帖子：{detailData.postTitle}
              </div>
              <div style={getStyles(colors).detailContent}>
                {detailData.content}
              </div>
              <div style={getStyles(colors).detailLikes}>
                ❤️ {detailData.likes} 点赞
              </div>
              {detailData.status === 'reported' && (
                <div style={getStyles(colors).detailReport}>
                  ⚠️ 被举报 {detailData.reports} 次
                </div>
              )}
            </div>
            <div style={getStyles(colors).modalFooter}>
              {detailData.status === 'reported' && (
                <button style={{...getStyles(colors).submitBtn, backgroundColor: colors.success}} onClick={() => { setShowDetailModal(false); handleApprove(detailData); }}>通过审核</button>
              )}
              <button style={{...getStyles(colors).submitBtn, backgroundColor: colors.error}} onClick={() => { setShowDetailModal(false); handleDelete(detailData); }}>删除评论</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function getStyles(colors) {
  return {
    container: {
      minHeight: '100vh',
      background: colors.background,
      padding: '24px',
    },
    header: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: '24px',
    },
    headerLeft: {
      display: 'flex',
      alignItems: 'center',
    },
    title: {
      fontSize: '22px',
      fontWeight: '600',
      color: colors.text,
      margin: 0,
      paddingLeft: '12px',
      borderLeft: `4px solid ${colors.primary}`,
    },
    tabBar: {
      display: 'flex',
      gap: '8px',
      marginBottom: '24px',
      background: colors.surface,
      padding: '8px',
      borderRadius: '10px',
      boxShadow: colors.cardShadow,
      border: `1px solid ${colors.border}`,
    },
    tabBtn: {
      padding: '10px 24px',
      background: 'transparent',
      border: 'none',
      borderRadius: '8px',
      fontSize: '14px',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      color: colors.textSecondary,
    },
    activeTab: {
      background: colors.primaryGradient,
      color: colors.textInverse,
      boxShadow: '0 2px 8px rgba(255, 77, 79, 0.25)',
    },
    filterSection: {
      background: colors.surface,
      padding: '20px 24px',
      borderRadius: '12px',
      marginBottom: '24px',
      boxShadow: colors.cardShadow,
      border: `1px solid ${colors.border}`,
    },
    filterRow: {
      display: 'flex',
      gap: '16px',
      alignItems: 'center',
      flexWrap: 'wrap',
    },
    searchInput: {
      padding: '10px 16px',
      border: `1px solid ${colors.border}`,
      borderRadius: '8px',
      fontSize: '14px',
      width: '250px',
      outline: 'none',
      transition: 'border-color 0.3s',
      background: colors.surface,
      color: colors.text,
    },
    batchBar: {
      display: 'flex',
      alignItems: 'center',
      gap: '12px',
      marginTop: '16px',
      paddingTop: '16px',
      borderTop: `1px solid ${colors.border}`,
    },
    batchBtn: {
      padding: '8px 16px',
      color: colors.textInverse,
      border: 'none',
      borderRadius: '6px',
      fontSize: '13px',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
    },
    tableContainer: {
      background: colors.surface,
      borderRadius: '12px',
      boxShadow: colors.cardShadow,
      border: `1px solid ${colors.border}`,
      overflow: 'hidden',
    },
    table: {
      width: '100%',
      borderCollapse: 'collapse',
    },
    th: {
      padding: '14px 16px',
      textAlign: 'left',
      background: colors.tableHeader,
      borderBottom: `1px solid ${colors.border}`,
      fontSize: '13px',
      fontWeight: '600',
      color: colors.text,
      letterSpacing: '0.5px',
    },
    tr: {
      borderBottom: `1px solid ${colors.border}`,
      transition: 'all 0.3s ease',
    },
    trHover: {
      backgroundColor: colors.surfaceHover,
      transform: 'translateY(-1px)',
      boxShadow: colors.cardShadowHover,
    },
    td: {
      padding: '14px 16px',
      fontSize: '14px',
      color: colors.textSecondary,
    },
    authorAvatar: {
      fontSize: '18px',
      marginRight: '8px',
    },
    authorName: {
      color: colors.text,
    },
    categoryBadge: {
      padding: '4px 12px',
      background: colors.errorBg,
      color: colors.primary,
      borderRadius: '20px',
      fontSize: '12px',
      fontWeight: '500',
    },
    statusBadge: {
      padding: '4px 12px',
      borderRadius: '20px',
      fontSize: '12px',
      fontWeight: '500',
    },
    actionBtn: {
      padding: '6px 14px',
      background: colors.surface,
      color: colors.textSecondary,
      border: `1px solid ${colors.border}`,
      borderRadius: '6px',
      fontSize: '12px',
      cursor: 'pointer',
      marginRight: '8px',
      transition: 'all 0.3s ease',
    },
    pagination: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      gap: '8px',
      padding: '20px',
    },
    pageBtn: {
      padding: '8px 16px',
      background: colors.surface,
      border: `1px solid ${colors.border}`,
      borderRadius: '6px',
      fontSize: '14px',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      color: colors.textSecondary,
    },
    activePageBtn: {
      background: colors.primaryGradient,
      color: colors.textInverse,
      borderColor: colors.primary,
      boxShadow: '0 2px 8px rgba(255, 77, 79, 0.3)',
    },
    modalOverlay: {
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: colors.modalOverlay,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1000,
      animation: 'fadeIn 0.3s ease',
    },
    modal: {
      background: colors.surface,
      borderRadius: '12px',
      width: '450px',
      maxHeight: '90vh',
      overflowY: 'auto',
      boxShadow: '0 8px 32px rgba(0, 0, 0, 0.12)',
    },
    modalHeader: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '20px 24px',
      borderBottom: `1px solid ${colors.border}`,
    },
    closeBtn: {
      background: 'none',
      border: 'none',
      fontSize: '20px',
      cursor: 'pointer',
      color: colors.textMuted,
      transition: 'color 0.3s',
    },
    modalBody: {
      padding: '24px',
    },
    detailHeader: {
      display: 'flex',
      alignItems: 'center',
      gap: '12px',
      marginBottom: '16px',
    },
    detailAvatar: {
      fontSize: '32px',
    },
    detailMeta: {
      flex: 1,
    },
    detailAuthor: {
      display: 'block',
      fontSize: '14px',
      fontWeight: '500',
      color: colors.text,
      marginBottom: '4px',
    },
    detailTime: {
      fontSize: '12px',
      color: colors.textMuted,
    },
    detailPost: {
      fontSize: '13px',
      color: colors.textMuted,
      marginBottom: '16px',
    },
    detailContent: {
      fontSize: '14px',
      color: colors.text,
      lineHeight: '1.8',
      marginBottom: '16px',
    },
    detailLikes: {
      fontSize: '13px',
      color: colors.textMuted,
      marginBottom: '8px',
    },
    detailReport: {
      fontSize: '13px',
      color: colors.error,
      padding: '8px',
      background: colors.errorBg,
      borderRadius: '4px',
    },
    modalFooter: {
      display: 'flex',
      justifyContent: 'flex-end',
      gap: '12px',
      padding: '20px',
      borderTop: `1px solid ${colors.border}`,
    },
    submitBtn: {
      padding: '10px 24px',
      background: colors.primary,
      color: colors.textInverse,
      border: 'none',
      borderRadius: '4px',
      fontSize: '14px',
      cursor: 'pointer',
    },
  };
}

function CommentManageWithLayout() {
  return (
    <AdminLayout activeModule="commentManage">
      <CommentManage />
    </AdminLayout>
  );
}

export default CommentManageWithLayout;
