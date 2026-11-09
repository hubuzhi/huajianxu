import React, { useState } from 'react';
import { useTheme } from '../context/ThemeContext';
import LinearIcons from '../components/LinearIcons';
import AdminLayout from '../components/AdminLayout';

function OrderManageContent() {
  const { theme } = useTheme();
  const colors = theme.colors;
  
  const [activeTab, setActiveTab] = useState('orders');
  const [searchKeyword, setSearchKeyword] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedItems, setSelectedItems] = useState([]);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [detailData, setDetailData] = useState(null);
  const [hoveredRow, setHoveredRow] = useState(null);

  const styles = getStyles(colors);

  const ordersData = [
    { id: 'ORD001', user: '花园小王子', item: '玫瑰种子', quantity: 2, amount: 48.00, status: 'completed', createTime: '2024-03-15 10:30', payTime: '2024-03-15 10:35' },
    { id: 'ORD002', user: '养花新手', item: '牡丹盆栽', quantity: 1, amount: 128.00, status: 'pending', createTime: '2024-03-15 09:20', payTime: '-' },
    { id: 'ORD003', user: '爱花人士', item: '兰花肥料', quantity: 3, amount: 36.00, status: 'completed', createTime: '2024-03-14 16:45', payTime: '2024-03-14 16:50' },
    { id: 'ORD004', user: '花艺师', item: '荷花种球', quantity: 5, amount: 60.00, status: 'shipped', createTime: '2024-03-14 14:30', payTime: '2024-03-14 14:35' },
    { id: 'ORD005', user: '小花仙子', item: '菊花苗', quantity: 4, amount: 56.00, status: 'completed', createTime: '2024-03-13 11:20', payTime: '2024-03-13 11:25' },
    { id: 'ORD006', user: '赏花客', item: '郁金香种球', quantity: 10, amount: 80.00, status: 'pending', createTime: '2024-03-12 15:00', payTime: '-' },
    { id: 'ORD007', user: '花之守护者', item: '桂花树苗', quantity: 2, amount: 156.00, status: 'shipped', createTime: '2024-03-11 09:30', payTime: '2024-03-11 09:35' },
    { id: 'ORD008', user: '梅花开', item: '梅花盆景', quantity: 1, amount: 288.00, status: 'cancelled', createTime: '2024-03-10 10:15', payTime: '-' },
  ];

  const [favoritesData, setFavoritesData] = useState([
    { id: 1, user: '花园小王子', flower: '玫瑰', flowerIcon: '🌹', status: 'active', createTime: '2024-03-15' },
    { id: 2, user: '养花新手', flower: '牡丹', flowerIcon: '🌸', status: 'active', createTime: '2024-03-15' },
    { id: 3, user: '爱花人士', flower: '兰花', flowerIcon: '🌺', status: 'active', createTime: '2024-03-14' },
    { id: 4, user: '花艺师', flower: '荷花', flowerIcon: '🪷', status: 'active', createTime: '2024-03-14' },
    { id: 5, user: '小花仙子', flower: '菊花', flowerIcon: '🌼', status: 'active', createTime: '2024-03-13' },
    { id: 6, user: '赏花客', flower: '郁金香', flowerIcon: '🌷', status: 'active', createTime: '2024-03-12' },
    { id: 7, user: '花之守护者', flower: '桂花', flowerIcon: '🌿', status: 'active', createTime: '2024-03-11' },
    { id: 8, user: '梅花开', flower: '梅花', flowerIcon: '❄️', status: 'active', createTime: '2024-03-10' },
  ]);

  const handleCancelFavorite = (fav) => {
    if (window.confirm(`确定要取消收藏「${fav.flower}」吗？`)) {
      setFavoritesData(prev => prev.filter(item => item.id !== fav.id));
      alert(`「${fav.flower}」已成功取消收藏`);
    }
  };

  const filteredOrders = ordersData.filter(order => {
    const matchKeyword = order.id.includes(searchKeyword) || order.user.includes(searchKeyword) || order.item.includes(searchKeyword);
    const matchStatus = !selectedStatus || order.status === selectedStatus;
    return matchKeyword && matchStatus;
  });

  const totalPages = Math.ceil(filteredOrders.length / 4);
  const paginatedOrders = filteredOrders.slice((currentPage - 1) * 4, currentPage * 4);

  const completedCount = ordersData.filter(o => o.status === 'completed').length;
  const pendingCount = ordersData.filter(o => o.status === 'pending').length;
  const shippedCount = ordersData.filter(o => o.status === 'shipped').length;
  const cancelledCount = ordersData.filter(o => o.status === 'cancelled').length;
  const totalAmount = ordersData.filter(o => o.status !== 'cancelled').reduce((sum, o) => sum + o.amount, 0);

  const getStatusLabel = (status) => {
    switch(status) {
      case 'pending': return '待付款';
      case 'paid': return '已付款';
      case 'shipped': return '已发货';
      case 'completed': return '已完成';
      case 'cancelled': return '已取消';
      default: return status;
    }
  };

  const getStatusColor = (status) => {
    switch(status) {
      case 'pending': return { bg: colors.warningBg, color: colors.warning };
      case 'paid': return { bg: colors.infoBg, color: colors.info };
      case 'shipped': return { bg: '#722ed120', color: '#722ed1' };
      case 'completed': return { bg: colors.successBg, color: colors.success };
      case 'cancelled': return { bg: colors.errorBg, color: colors.error };
      default: return { bg: colors.tableStripe, color: colors.textMuted };
    }
  };

  const handleViewDetail = (order) => {
    setDetailData(order);
    setShowDetailModal(true);
  };

  const handleShip = (order) => {
    alert(`订单 ${order.id} 已发货`);
  };

  const handleBatchExport = () => {
    if (selectedItems.length > 0) {
      alert(`已导出 ${selectedItems.length} 条订单`);
      setSelectedItems([]);
    } else {
      alert('请选择要导出的订单');
    }
  };

  const toggleSelectAll = () => {
    if (selectedItems.length === paginatedOrders.length) {
      setSelectedItems([]);
    } else {
      setSelectedItems(paginatedOrders.map(o => o.id));
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <div style={styles.headerLeft}>
          <h2 style={styles.title}>订单/收藏管理</h2>
        </div>
        <div style={styles.headerRight}>
          {activeTab === 'orders' && (
            <button 
              style={styles.exportBtn}
              onClick={handleBatchExport}
            >
              <span>📥</span> 导出选中
            </button>
          )}
        </div>
      </div>

      <div style={styles.tabBar}>
        <button 
          style={{...styles.tabBtn, ...(activeTab === 'orders' ? styles.activeTab : {})}}
          onClick={() => setActiveTab('orders')}
        >订单管理</button>
        <button 
          style={{...styles.tabBtn, ...(activeTab === 'favorites' ? styles.activeTab : {})}}
          onClick={() => setActiveTab('favorites')}
        >收藏管理</button>
      </div>

      {activeTab === 'orders' ? (
        <>
          <div style={styles.statsRow}>
            <div style={{...styles.statCard, borderLeftColor: colors.info}}>
              <div style={styles.statValue}>¥{totalAmount.toFixed(2)}</div>
              <div style={styles.statLabel}>订单总额</div>
            </div>
            <div style={{...styles.statCard, borderLeftColor: colors.warning}}>
              <div style={styles.statValue}>{pendingCount}</div>
              <div style={styles.statLabel}>待付款</div>
            </div>
            <div style={{...styles.statCard, borderLeftColor: '#722ed1'}}>
              <div style={styles.statValue}>{shippedCount}</div>
              <div style={styles.statLabel}>已发货</div>
            </div>
            <div style={{...styles.statCard, borderLeftColor: colors.success}}>
              <div style={styles.statValue}>{completedCount}</div>
              <div style={styles.statLabel}>已完成</div>
            </div>
          </div>

          <div style={styles.filterSection}>
            <div style={styles.filterRow}>
              <input
                type="text"
                placeholder="搜索订单号、用户或商品..."
                value={searchKeyword}
                onChange={(e) => { setSearchKeyword(e.target.value); setCurrentPage(1); }}
                style={styles.searchInput}
              />
              <select
                value={selectedStatus}
                onChange={(e) => { setSelectedStatus(e.target.value); setCurrentPage(1); }}
                style={styles.selectInput}
              >
                <option value="">全部状态</option>
                <option value="pending">待付款</option>
                <option value="paid">已付款</option>
                <option value="shipped">已发货</option>
                <option value="completed">已完成</option>
                <option value="cancelled">已取消</option>
              </select>
              <button 
                style={styles.exportBtn}
                onClick={() => alert('导出全部订单成功')}
              >
                <span>📥</span> 全部导出
              </button>
            </div>

            {selectedItems.length > 0 && (
              <div style={styles.batchBar}>
                <span>已选择 {selectedItems.length} 条记录</span>
                <button style={{...styles.batchBtn, backgroundColor: colors.info}} onClick={handleBatchExport}>
                  导出选中
                </button>
              </div>
            )}
          </div>

          <div style={styles.tableContainer}>
            <table style={styles.table}>
              <thead>
                <tr>
                  <th style={styles.th}>
                    <input 
                      type="checkbox" 
                      checked={selectedItems.length === paginatedOrders.length && paginatedOrders.length > 0}
                      onChange={toggleSelectAll}
                    />
                  </th>
                  <th style={styles.th}>订单号</th>
                  <th style={styles.th}>用户</th>
                  <th style={styles.th}>商品</th>
                  <th style={styles.th}>数量</th>
                  <th style={styles.th}>金额</th>
                  <th style={styles.th}>状态</th>
                  <th style={styles.th}>创建时间</th>
                  <th style={styles.th}>付款时间</th>
                  <th style={styles.th}>操作</th>
                </tr>
              </thead>
              <tbody>
                {paginatedOrders.map(order => (
                  <tr
                    key={order.id}
                    style={{
                      ...styles.tr,
                      ...(hoveredRow === order.id ? styles.trHover : {}),
                    }}
                    onMouseEnter={() => setHoveredRow(order.id)}
                    onMouseLeave={() => setHoveredRow(null)}
                  >
                    <td style={styles.td}>
                      <input 
                        type="checkbox" 
                        checked={selectedItems.includes(order.id)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setSelectedItems([...selectedItems, order.id]);
                          } else {
                            setSelectedItems(selectedItems.filter(id => id !== order.id));
                          }
                        }}
                      />
                    </td>
                    <td style={styles.td}><strong>{order.id}</strong></td>
                    <td style={styles.td}>{order.user}</td>
                    <td style={styles.td}>{order.item}</td>
                    <td style={styles.td}>x{order.quantity}</td>
                    <td style={styles.td}><strong>¥{order.amount.toFixed(2)}</strong></td>
                    <td style={styles.td}>
                      <span style={{
                        ...styles.statusBadge,
                        backgroundColor: getStatusColor(order.status).bg,
                        color: getStatusColor(order.status).color,
                      }}>
                        {getStatusLabel(order.status)}
                      </span>
                    </td>
                    <td style={styles.td}>{order.createTime}</td>
                    <td style={styles.td}>{order.payTime}</td>
                    <td style={styles.td}>
                      <button 
                        style={styles.actionBtn}
                        onClick={() => handleViewDetail(order)}
                      >查看</button>
                      {order.status === 'paid' && (
                        <button 
                          style={{...styles.actionBtn, backgroundColor: '#722ed1'}}
                          onClick={() => handleShip(order)}
                        >发货</button>
                      )}
                      {order.status === 'pending' && (
                        <button 
                          style={{...styles.actionBtn, backgroundColor: colors.error}}
                          onClick={() => alert(`订单 ${order.id} 已取消`)}
                        >取消</button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div style={styles.pagination}>
              <button 
                style={styles.pageBtn}
                disabled={currentPage === 1}
                onClick={() => setCurrentPage(p => p - 1)}
              >上一页</button>
              {Array.from({ length: totalPages }, (_, i) => (
                <button 
                  key={i + 1}
                  style={{
                    ...styles.pageBtn,
                    ...(currentPage === i + 1 ? styles.activePageBtn : {}),
                  }}
                  onClick={() => setCurrentPage(i + 1)}
                >
                  {i + 1}
                </button>
              ))}
              <button 
                style={styles.pageBtn}
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage(p => p + 1)}
              >下一页</button>
            </div>
          </div>
        </>
      ) : (
        <div style={styles.tableContainer}>
          <table style={styles.table}>
            <thead>
              <tr>
                <th style={styles.th}>用户</th>
                <th style={styles.th}>收藏花卉</th>
                <th style={styles.th}>状态</th>
                <th style={styles.th}>收藏时间</th>
                <th style={styles.th}>操作</th>
              </tr>
            </thead>
            <tbody>
              {favoritesData.map(fav => (
                <tr key={fav.id} style={styles.tr}>
                  <td style={styles.td}>{fav.user}</td>
                  <td style={styles.td}>
                    <span style={{fontSize: '20px', marginRight: '8px'}}>{fav.flowerIcon}</span>
                    {fav.flower}
                  </td>
                  <td style={styles.td}>
                    <span style={{
                      ...styles.statusBadge,
                      backgroundColor: fav.status === 'active' ? colors.successBg : colors.warningBg,
                      color: fav.status === 'active' ? colors.success : colors.warning,
                    }}>
                      {fav.status === 'active' ? '已收藏' : '已取消'}
                    </span>
                  </td>
                  <td style={styles.td}>{fav.createTime}</td>
                  <td style={styles.td}>
                    <button 
                      style={{...styles.actionBtn, backgroundColor: colors.error}}
                      onClick={() => handleCancelFavorite(fav)}
                    >取消收藏</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {showDetailModal && detailData && (
        <div style={styles.modalOverlay} onClick={() => setShowDetailModal(false)}>
          <div style={styles.modal} onClick={(e) => e.stopPropagation()}>
            <div style={styles.modalHeader}>
              <h3>订单详情 - {detailData.id}</h3>
              <button style={styles.closeBtn} onClick={() => setShowDetailModal(false)}>✕</button>
            </div>
            <div style={styles.modalBody}>
              <div style={styles.detailRow}>
                <span style={styles.detailLabel}>订单号：</span>
                <span style={styles.detailValue}>{detailData.id}</span>
              </div>
              <div style={styles.detailRow}>
                <span style={styles.detailLabel}>用户：</span>
                <span style={styles.detailValue}>{detailData.user}</span>
              </div>
              <div style={styles.detailRow}>
                <span style={styles.detailLabel}>商品：</span>
                <span style={styles.detailValue}>{detailData.item}</span>
              </div>
              <div style={styles.detailRow}>
                <span style={styles.detailLabel}>数量：</span>
                <span style={styles.detailValue}>x{detailData.quantity}</span>
              </div>
              <div style={styles.detailRow}>
                <span style={styles.detailLabel}>金额：</span>
                <span style={{...styles.detailValue, color: colors.error, fontWeight: '600'}}>¥{detailData.amount.toFixed(2)}</span>
              </div>
              <div style={styles.detailRow}>
                <span style={styles.detailLabel}>状态：</span>
                <span style={{
                  ...styles.statusBadge,
                  backgroundColor: getStatusColor(detailData.status).bg,
                  color: getStatusColor(detailData.status).color,
                }}>
                  {getStatusLabel(detailData.status)}
                </span>
              </div>
              <div style={styles.detailRow}>
                <span style={styles.detailLabel}>创建时间：</span>
                <span style={styles.detailValue}>{detailData.createTime}</span>
              </div>
              <div style={styles.detailRow}>
                <span style={styles.detailLabel}>付款时间：</span>
                <span style={styles.detailValue}>{detailData.payTime}</span>
              </div>
            </div>
            <div style={styles.modalFooter}>
              {detailData.status === 'paid' && (
                <button style={{...styles.submitBtn, backgroundColor: '#722ed1'}} onClick={() => { setShowDetailModal(false); handleShip(detailData); }}>确认发货</button>
              )}
              <button style={styles.submitBtn} onClick={() => setShowDetailModal(false)}>关闭</button>
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
    headerRight: {
      display: 'flex',
      gap: '12px',
    },
    title: {
      fontSize: '22px',
      fontWeight: '600',
      color: colors.text,
      margin: 0,
      paddingLeft: '12px',
      borderLeft: `4px solid ${colors.primary}`,
    },
    exportBtn: {
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
      padding: '10px 20px',
      background: colors.surface,
      color: colors.textSecondary,
      border: `1px solid ${colors.border}`,
      borderRadius: '8px',
      fontSize: '14px',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
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
      color: '#fff',
      boxShadow: '0 2px 8px rgba(255, 77, 79, 0.25)',
    },
    statsRow: {
      display: 'flex',
      gap: '16px',
      marginBottom: '24px',
    },
    statCard: {
      flex: 1,
      background: colors.surface,
      borderRadius: '12px',
      padding: '20px 24px',
      borderLeft: '4px solid',
      boxShadow: colors.cardShadow,
      border: `1px solid ${colors.border}`,
      transition: 'all 0.3s ease',
    },
    statValue: {
      fontSize: '28px',
      fontWeight: '600',
      color: colors.text,
      marginBottom: '4px',
    },
    statLabel: {
      fontSize: '13px',
      color: colors.textMuted,
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
      width: '220px',
      outline: 'none',
      background: colors.surface,
      color: colors.text,
      transition: 'border-color 0.3s',
    },
    selectInput: {
      padding: '10px 16px',
      border: `1px solid ${colors.border}`,
      borderRadius: '8px',
      fontSize: '14px',
      minWidth: '150px',
      outline: 'none',
      background: colors.surface,
      color: colors.text,
      transition: 'border-color 0.3s',
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
      color: '#fff',
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
      color: colors.textSecondary,
      letterSpacing: '0.5px',
    },
    tr: {
      borderBottom: `1px solid ${colors.border}`,
      transition: 'all 0.3s ease',
    },
    trHover: {
      backgroundColor: colors.surfaceHover,
      transform: 'translateY(-1px)',
      boxShadow: '0 2px 8px rgba(0, 0, 0, 0.06)',
    },
    td: {
      padding: '14px 16px',
      fontSize: '14px',
      color: colors.textSecondary,
    },
    statusBadge: {
      padding: '4px 12px',
      borderRadius: '20px',
      fontSize: '12px',
      fontWeight: '500',
    },
    actionBtn: {
      padding: '6px 14px',
      background: colors.surfaceHover,
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
      color: colors.text,
      transition: 'all 0.3s ease',
    },
    activePageBtn: {
      background: colors.primaryGradient,
      color: '#fff',
      borderColor: colors.primary,
      boxShadow: '0 2px 8px rgba(255, 77, 79, 0.3)',
    },
    modalOverlay: {
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: 'rgba(0, 0, 0, 0.5)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1000,
      animation: 'fadeIn 0.3s ease',
    },
    modal: {
      background: colors.surface,
      borderRadius: '12px',
      width: '500px',
      maxHeight: '90vh',
      overflowY: 'auto',
      boxShadow: '0 8px 32px rgba(0, 0, 0, 0.15)',
    },
    modalHeader: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '20px 24px',
      borderBottom: `1px solid ${colors.border}`,
      color: colors.text,
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
    detailRow: {
      display: 'flex',
      gap: '8px',
      marginBottom: '12px',
    },
    detailLabel: {
      fontSize: '14px',
      color: colors.textMuted,
      fontWeight: '500',
    },
    detailValue: {
      fontSize: '14px',
      color: colors.text,
    },
    modalFooter: {
      display: 'flex',
      justifyContent: 'flex-end',
      gap: '12px',
      padding: '20px 24px',
      borderTop: `1px solid ${colors.border}`,
    },
    submitBtn: {
      padding: '10px 24px',
      background: colors.primaryGradient,
      border: 'none',
      borderRadius: '8px',
      fontSize: '14px',
      fontWeight: '500',
      cursor: 'pointer',
      color: '#fff',
      boxShadow: '0 2px 8px rgba(255, 77, 79, 0.25)',
      transition: 'all 0.3s ease',
    },
  };
}

function OrderManage() {
  return (
    <AdminLayout activeModule="orderManage">
      <OrderManageContent />
    </AdminLayout>
  );
}

export default OrderManage;
