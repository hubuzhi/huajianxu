import React, { useState, useMemo, useEffect, useRef } from 'react';
import { useTheme } from '../context/ThemeContext';
import LinearIcons from '../components/LinearIcons';
import AdminLayout from '../components/AdminLayout';

function MarketingManageContent() {
  const { theme } = useTheme();
  const colors = theme.colors;
  const styles = getStyles(colors);

  const [activeTab, setActiveTab] = useState('list');
  const [searchKeyword, setSearchKeyword] = useState('');
  const [hoveredRow, setHoveredRow] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 5;

  const [serverNow, setServerNow] = useState(() => new Date().toISOString().slice(0, 10));
  const [serverTimeStr, setServerTimeStr] = useState(() => {
    const d = new Date();
    return d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0') + '-' + String(d.getDate()).padStart(2, '0') + ' ' +
      String(d.getHours()).padStart(2, '0') + ':' + String(d.getMinutes()).padStart(2, '0') + ':' + String(d.getSeconds()).padStart(2, '0');
  });

  const [activities, setActivities] = useState([
    { id: 1, name: '618年中大促', type: '满减活动', startTime: '2026-06-01', endTime: '2026-06-04', participants: 0, sales: '¥0', rule: '满300减50' },
    { id: 2, name: '春季新品促销', type: '满减活动', startTime: '2024-03-01', endTime: '2024-03-31', participants: 523, sales: '¥28,560', rule: '满300减50' },
    { id: 3, name: '妇女节特惠', type: '折扣活动', startTime: '2024-03-06', endTime: '2024-03-08', participants: 318, sales: '¥15,230', rule: '全场8.5折' },
    { id: 4, name: '会员日专属', type: '积分活动', startTime: '2024-03-15', endTime: '2024-03-15', participants: 189, sales: '¥8,920', rule: '双倍积分' },
    { id: 5, name: '新客专享', type: '优惠券', startTime: '2024-02-01', endTime: '2024-12-31', participants: 456, sales: '¥35,680', rule: '新客立减30' },
    { id: 6, name: '情人节活动', type: '套餐活动', startTime: '2024-02-10', endTime: '2024-02-14', participants: 672, sales: '¥42,150', rule: '玫瑰套餐9折' },
    { id: 7, name: '母亲节献礼', type: '满减活动', startTime: '2024-05-01', endTime: '2024-05-15', participants: 421, sales: '¥26,890', rule: '满500减80' },
    { id: 8, name: '七夕浪漫季', type: '折扣活动', startTime: '2026-08-01', endTime: '2026-08-15', participants: 0, sales: '¥0', rule: '满200减30' },
  ]);

  const [statusLogs, setStatusLogs] = useState([
    { id: 1, time: '2024-03-01 00:00:01', activity: '春季新品促销', from: '未开始', to: '进行中', operator: '系统' },
    { id: 2, time: '2024-03-31 23:59:59', activity: '春季新品促销', from: '进行中', to: '已结束', operator: '系统' },
  ]);

  const [showModal, setShowModal] = useState(false);
  const [modalMode, setModalMode] = useState('add');
  const [formData, setFormData] = useState({ name: '', type: '满减活动', startTime: '', endTime: '', rule: '' });
  const [editingId, setEditingId] = useState(null);
  const [formError, setFormError] = useState('');
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [showViewModal, setShowViewModal] = useState(false);
  const [viewTarget, setViewTarget] = useState(null);

  const lastStatusMap = useRef({});

  useEffect(() => {
    const tick = () => {
      const d = new Date();
      setServerNow(d.toISOString().slice(0, 10));
      const pad = n => String(n).padStart(2, '0');
      setServerTimeStr(d.getFullYear() + '-' + pad(d.getMonth() + 1) + '-' + pad(d.getDate()) + ' ' +
        pad(d.getHours()) + ':' + pad(d.getMinutes()) + ':' + pad(d.getSeconds()));
    };
    tick();
    const id = setInterval(tick, 60000);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    const newLogs = [];
    activities.forEach(a => {
      let cur = 'upcoming';
      if (a.startTime && a.endTime) {
        if (serverNow < a.startTime) cur = 'upcoming';
        else if (serverNow > a.endTime) cur = 'ended';
        else cur = 'active';
      }
      const prev = lastStatusMap.current[a.id];
      if (prev && prev !== cur) {
        const labelMap = { upcoming: '未开始', active: '进行中', ended: '已结束' };
        newLogs.push({
          id: Date.now() + a.id,
          time: serverTimeStr,
          activity: a.name,
          from: labelMap[prev],
          to: labelMap[cur],
          operator: '系统',
        });
      }
      lastStatusMap.current[a.id] = cur;
    });
    if (newLogs.length > 0) {
      setStatusLogs(prev => [...newLogs, ...prev]);
    }
  }, [serverNow, activities, serverTimeStr]);

  const activitiesWithStatus = useMemo(() => {
    return activities.map(a => {
      let s = 'upcoming';
      if (a.startTime && a.endTime) {
        if (serverNow < a.startTime) s = 'upcoming';
        else if (serverNow > a.endTime) s = 'ended';
        else s = 'active';
      }
      return { ...a, computedStatus: s };
    });
  }, [activities, serverNow]);

  const filtered = useMemo(() => {
    if (!searchKeyword) return activitiesWithStatus;
    return activitiesWithStatus.filter(a => a.name.includes(searchKeyword));
  }, [activitiesWithStatus, searchKeyword]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const safePage = Math.min(currentPage, totalPages);
  const paginated = filtered.slice((safePage - 1) * pageSize, safePage * pageSize);

  const stats = useMemo(() => {
    let active = 0, upcoming = 0, ended = 0;
    let totalP = 0, totalS = 0;
    activitiesWithStatus.forEach(a => {
      if (a.computedStatus === 'active') active++;
      if (a.computedStatus === 'upcoming') upcoming++;
      if (a.computedStatus === 'ended') ended++;
      totalP += a.participants;
      const num = parseInt(a.sales.replace(/[^0-9]/g, '')) || 0;
      totalS += num;
    });
    return {
      activeCount: active,
      upcomingCount: upcoming,
      endedCount: ended,
      totalParticipants: totalP,
      totalSales: '¥' + totalS.toLocaleString(),
    };
  }, [activitiesWithStatus]);

  const editingActivity = activitiesWithStatus.find(a => a.id === editingId);
  const isActiveEditing = modalMode === 'edit' && editingActivity && editingActivity.computedStatus === 'active';
  const isEndedEditing = modalMode === 'edit' && editingActivity && editingActivity.computedStatus === 'ended';
  const isActiveView = showViewModal && viewTarget && viewTarget.computedStatus === 'active';

  const openAddModal = () => {
    setModalMode('add');
    setFormData({ name: '', type: '满减活动', startTime: serverNow, endTime: '', rule: '' });
    setEditingId(null);
    setFormError('');
    setShowModal(true);
  };

  const openEditModal = (activity) => {
    setModalMode('edit');
    setFormData({
      name: activity.name,
      type: activity.type,
      startTime: activity.startTime,
      endTime: activity.endTime,
      rule: activity.rule || '',
    });
    setEditingId(activity.id);
    setFormError('');
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setFormError('');
  };

  const validateForm = () => {
    if (!formData.name.trim()) {
      setFormError('请输入活动名称');
      return false;
    }
    if (!formData.startTime || !formData.endTime) {
      setFormError('请选择活动起止时间');
      return false;
    }
    if (formData.startTime > formData.endTime) {
      setFormError('结束时间不能早于开始时间');
      return false;
    }

    if (isActiveEditing) {
      if (formData.startTime !== editingActivity.startTime) {
        setFormError('进行中的活动不允许修改开始时间，避免影响已参与用户');
        return false;
      }
    }

    if (isEndedEditing) {
      if (formData.startTime !== editingActivity.startTime ||
          formData.endTime !== editingActivity.endTime ||
          formData.type !== editingActivity.type) {
        setFormError('已结束的活动不可修改类型和时间，仅允许修改活动名称和说明');
        return false;
      }
    } else {
      if (!formData.rule.trim()) {
        setFormError('请输入活动规则');
        return false;
      }
    }
    return true;
  };

  const handleSubmit = () => {
    if (!validateForm()) return;

    if (modalMode === 'add') {
      const maxId = activities.length > 0 ? Math.max(...activities.map(a => a.id)) : 0;
      const newAct = {
        id: maxId + 1,
        name: formData.name,
        type: formData.type,
        startTime: formData.startTime,
        endTime: formData.endTime,
        participants: 0,
        sales: '¥0',
        rule: formData.rule,
      };
      setActivities([newAct, ...activities]);
    } else {
      setActivities(activities.map(a => a.id === editingId ? {
        ...a,
        name: formData.name,
        type: formData.type,
        startTime: formData.startTime,
        endTime: formData.endTime,
        rule: formData.rule,
      } : a));
    }
    closeModal();
  };

  const openDeleteModal = (activity) => {
    setDeleteTarget(activity);
    setShowDeleteModal(true);
  };

  const confirmDelete = () => {
    if (deleteTarget) {
      setActivities(activities.filter(a => a.id !== deleteTarget.id));
    }
    setShowDeleteModal(false);
    setDeleteTarget(null);
  };

  const openViewModal = (activity) => {
    setViewTarget(activity);
    setShowViewModal(true);
  };

  const inputStyle = {
    width: '100%', padding: '10px 12px',
    border: '1px solid ' + colors.border,
    borderRadius: '8px',
    background: colors.background,
    color: colors.text,
    fontSize: '14px',
    outline: 'none',
    boxSizing: 'border-box',
  };

  const labelStyle = {
    display: 'block', fontSize: '13px', fontWeight: '500',
    color: colors.textSecondary, marginBottom: '6px',
  };

  const getStatusInfo = (s) => {
    if (s === 'active') return { label: '进行中', bg: colors.successBg, color: colors.success };
    if (s === 'upcoming') return { label: '未开始', bg: colors.infoBg, color: colors.info };
    return { label: '已结束', bg: colors.warningBg, color: colors.warning };
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <div style={styles.headerLeft}>
          <h1 style={styles.title}>营销活动管理</h1>
          <span style={styles.serverTimeBadge}>
            <LinearIcons.clock style={{ width: '12px', height: '12px' }} />
            服务器时间：{serverTimeStr}
          </span>
        </div>
        <div style={styles.headerRight}>
          <div style={styles.searchBox}>
            <LinearIcons.search style={{ width: '16px', height: '16px', color: colors.textMuted }} />
            <input
              type="text"
              placeholder="搜索活动..."
              value={searchKeyword}
              onChange={(e) => { setSearchKeyword(e.target.value); setCurrentPage(1); }}
              style={styles.searchInput}
            />
          </div>
          <button style={styles.addBtn} onClick={openAddModal}>
            <LinearIcons.plus style={{ width: '16px', height: '16px' }} />
            新建活动
          </button>
        </div>
      </div>

      <div style={styles.tabBar}>
        {[
          { id: 'list', label: '活动列表', icon: 'gift' },
          { id: 'statusLog', label: '状态变更日志', icon: 'history' },
          { id: 'coupons', label: '优惠券管理', icon: 'tag' },
          { id: 'data', label: '活动数据', icon: 'barChart' },
        ].map((tab) => {
          const Ico = LinearIcons[tab.icon];
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              style={{ ...styles.tabBtn, ...(activeTab === tab.id ? styles.activeTab : {}) }}
            >
              {activeTab === tab.id && Ico && <Ico style={{ width: '14px', height: '14px', marginRight: '6px' }} />}
              {tab.label}
            </button>
          );
        })}
      </div>

      {activeTab === 'list' && (
        <div style={styles.content}>
          <div style={styles.statsRow}>
            <div style={styles.statCard}>
              <div style={{ ...styles.statIconBox, backgroundColor: colors.successBg }}>
                <LinearIcons.gift style={{ width: '20px', height: '20px', color: colors.success }} />
              </div>
              <div style={styles.statInfo}>
                <div style={styles.statValue}>{stats.activeCount}</div>
                <div style={styles.statLabel}>进行中活动</div>
              </div>
            </div>
            <div style={styles.statCard}>
              <div style={{ ...styles.statIconBox, backgroundColor: colors.infoBg }}>
                <LinearIcons.clock style={{ width: '20px', height: '20px', color: colors.info }} />
              </div>
              <div style={styles.statInfo}>
                <div style={styles.statValue}>{stats.upcomingCount}</div>
                <div style={styles.statLabel}>未开始活动</div>
              </div>
            </div>
            <div style={styles.statCard}>
              <div style={{ ...styles.statIconBox, backgroundColor: colors.warningBg }}>
                <LinearIcons.users style={{ width: '20px', height: '20px', color: colors.warning }} />
              </div>
              <div style={styles.statInfo}>
                <div style={styles.statValue}>{stats.totalParticipants.toLocaleString()}</div>
                <div style={styles.statLabel}>参与用户数</div>
              </div>
            </div>
            <div style={styles.statCard}>
              <div style={{ ...styles.statIconBox, backgroundColor: colors.primaryBg }}>
                <LinearIcons.barChart style={{ width: '20px', height: '20px', color: colors.primary }} />
              </div>
              <div style={styles.statInfo}>
                <div style={styles.statValue}>{stats.totalSales}</div>
                <div style={styles.statLabel}>活动销售额</div>
              </div>
            </div>
          </div>

          <div style={styles.tableCard}>
            <table style={styles.table}>
              <thead>
                <tr>
                  <th style={styles.th}>活动名称</th>
                  <th style={styles.th}>活动类型</th>
                  <th style={styles.th}>状态</th>
                  <th style={styles.th}>开始时间</th>
                  <th style={styles.th}>结束时间</th>
                  <th style={styles.th}>参与人数</th>
                  <th style={styles.th}>销售额</th>
                  <th style={styles.th}>操作</th>
                </tr>
              </thead>
              <tbody>
                {paginated.length === 0 ? (
                  <tr>
                    <td colSpan="8" style={{ ...styles.td, textAlign: 'center', color: colors.textMuted, padding: '40px 0' }}>
                      暂无活动数据
                    </td>
                  </tr>
                ) : (
                  paginated.map((activity, idx) => {
                    const si = getStatusInfo(activity.computedStatus);
                    return (
                      <tr
                        key={activity.id}
                        style={{ ...styles.tr, ...(hoveredRow === idx ? styles.trHover : {}) }}
                        onMouseEnter={() => setHoveredRow(idx)}
                        onMouseLeave={() => setHoveredRow(null)}
                      >
                        <td style={styles.td}>
                          <div style={styles.activityName}>
                            <LinearIcons.gift style={{ width: '16px', height: '16px', color: colors.primary, marginRight: '8px' }} />
                            {activity.name}
                          </div>
                        </td>
                        <td style={styles.td}><span style={styles.typeBadge}>{activity.type}</span></td>
                        <td style={styles.td}>
                          <span style={{ ...styles.statusBadge, backgroundColor: si.bg, color: si.color }}>
                            {si.label}
                          </span>
                        </td>
                        <td style={styles.td}>{activity.startTime}</td>
                        <td style={styles.td}>{activity.endTime}</td>
                        <td style={styles.td}>{activity.participants}</td>
                        <td style={styles.td}><span style={{ color: colors.primary, fontWeight: '500' }}>{activity.sales}</span></td>
                        <td style={styles.td}>
                          <div style={styles.actionBtns}>
                            <button style={styles.actionBtn} onClick={() => openViewModal(activity)} title="查看">
                              <LinearIcons.eye style={{ width: '14px', height: '14px' }} />
                            </button>
                            <button style={styles.actionBtn} onClick={() => openEditModal(activity)} title="编辑">
                              <LinearIcons.edit style={{ width: '14px', height: '14px' }} />
                            </button>
                            <button style={{ ...styles.actionBtn, color: colors.error }} onClick={() => openDeleteModal(activity)} title="删除">
                              <LinearIcons.delete style={{ width: '14px', height: '14px' }} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
            <div style={styles.pagination}>
              <button style={styles.paginationBtn} onClick={() => setCurrentPage(Math.max(1, currentPage - 1))} disabled={safePage === 1}>上一页</button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(p => (
                <button
                  key={p}
                  onClick={() => setCurrentPage(p)}
                  style={{ ...styles.paginationBtn, ...(safePage === p ? styles.activePaginationBtn : {}) }}
                >{p}</button>
              ))}
              <button style={styles.paginationBtn} onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))} disabled={safePage === totalPages}>下一页</button>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'statusLog' && (
        <div style={styles.content}>
          <div style={styles.logCard}>
            <div style={styles.logHeader}>
              <h3 style={styles.logTitle}>活动状态变更日志</h3>
              <span style={styles.logSubtitle}>系统将根据服务器时间自动记录状态变更</span>
            </div>
            <table style={styles.table}>
              <thead>
                <tr>
                  <th style={styles.th}>时间</th>
                  <th style={styles.th}>活动</th>
                  <th style={styles.th}>状态变更</th>
                  <th style={styles.th}>操作人</th>
                </tr>
              </thead>
              <tbody>
                {statusLogs.length === 0 ? (
                  <tr>
                    <td colSpan="4" style={{ ...styles.td, textAlign: 'center', color: colors.textMuted, padding: '40px 0' }}>
                      暂无状态变更记录
                    </td>
                  </tr>
                ) : (
                  statusLogs.map((log, idx) => (
                    <tr
                      key={log.id}
                      style={{ ...styles.tr, ...(hoveredRow === idx ? styles.trHover : {}) }}
                      onMouseEnter={() => setHoveredRow(idx)}
                      onMouseLeave={() => setHoveredRow(null)}
                    >
                      <td style={styles.td}>{log.time}</td>
                      <td style={styles.td}>{log.activity}</td>
                      <td style={styles.td}>
                        <span style={{ ...styles.statusBadge, backgroundColor: colors.surfaceHover, color: colors.textSecondary }}>
                          {log.from} → {log.to}
                        </span>
                      </td>
                      <td style={styles.td}>{log.operator}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {activeTab === 'coupons' && (
        <div style={styles.content}>
          <div style={styles.couponGrid}>
            {[
              { id: 1, name: '新人专享券', type: '满减券', discount: '满100减20', total: 500, used: 328, status: 'active' },
              { id: 2, name: '会员折扣券', type: '折扣券', discount: '9折优惠', total: 300, used: 156, status: 'active' },
              { id: 3, name: '满减优惠券', type: '满减券', discount: '满200减50', total: 200, used: 89, status: 'active' },
              { id: 4, name: '限时秒杀券', type: '满减券', discount: '满50减15', total: 100, used: 100, status: 'ended' },
            ].map((coupon) => (
              <div key={coupon.id} style={{ ...styles.couponCard, borderColor: coupon.status === 'ended' ? colors.border : colors.primary }}>
                <div style={styles.couponLeft}>
                  <div style={styles.couponDiscount}>{coupon.discount}</div>
                </div>
                <div style={styles.couponRight}>
                  <div style={styles.couponName}>{coupon.name}</div>
                  <div style={styles.couponType}>{coupon.type}</div>
                  <div style={styles.couponStats}>
                    <span>已使用 {coupon.used}/{coupon.total}</span>
                  </div>
                </div>
                {coupon.status === 'ended' && (
                  <div style={styles.couponExpired}>已过期</div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'data' && (
        <div style={styles.content}>
          <div style={styles.chartCard}>
            <div style={styles.chartHeader}>
              <h3 style={styles.chartTitle}>活动数据趋势</h3>
            </div>
            <div style={styles.chartContainer}>
              <svg viewBox="0 0 700 250" style={{ width: '100%', height: '250px' }}>
                {[0, 5000, 10000, 15000].map((val, idx) => (
                  <text key={idx} x="40" y={220 - (val / 15000) * 180} fill={colors.textMuted} fontSize="11" textAnchor="end">
                    {val / 1000}k
                  </text>
                ))}
                {[
                  { date: '3月1日', sales: 5200 },
                  { date: '3月5日', sales: 8900 },
                  { date: '3月10日', sales: 7200 },
                  { date: '3月15日', sales: 11500 },
                  { date: '3月20日', sales: 8100 },
                  { date: '3月25日', sales: 9800 },
                  { date: '3月30日', sales: 10500 },
                ].map((item, idx) => {
                  const x = 70 + idx * 95;
                  const h = (item.sales / 15000) * 180;
                  const y = 220 - h;
                  return (
                    <g key={idx}>
                      <rect x={x} y={y} width={60} height={h} fill={colors.primaryGradient} rx="4" />
                      <text x={x + 30} y={240} fill={colors.textMuted} fontSize="11" textAnchor="middle">{item.date}</text>
                      <text x={x + 30} y={y - 8} fill={colors.textSecondary} fontSize="11" textAnchor="middle">¥{item.sales}</text>
                    </g>
                  );
                })}
              </svg>
            </div>
          </div>

          <div style={styles.dataCards}>
            <div style={styles.dataCard}>
              <div style={styles.dataIcon}>
                <LinearIcons.gift style={{ width: '24px', height: '24px', color: colors.primary }} />
              </div>
              <div style={styles.dataInfo}>
                <div style={styles.dataValue}>5,678</div>
                <div style={styles.dataLabel}>活动参与人次</div>
              </div>
              <div style={{ ...styles.dataTrend, color: colors.success }}>
                <LinearIcons.arrowRight style={{ width: '14px', height: '14px' }} /> +12%
              </div>
            </div>
            <div style={styles.dataCard}>
              <div style={styles.dataIcon}>
                <LinearIcons.barChart style={{ width: '24px', height: '24px', color: colors.success }} />
              </div>
              <div style={styles.dataInfo}>
                <div style={styles.dataValue}>¥89,230</div>
                <div style={styles.dataLabel}>活动带动销售额</div>
              </div>
              <div style={{ ...styles.dataTrend, color: colors.success }}>
                <LinearIcons.arrowRight style={{ width: '14px', height: '14px' }} /> +8%
              </div>
            </div>
            <div style={styles.dataCard}>
              <div style={styles.dataIcon}>
                <LinearIcons.users style={{ width: '24px', height: '24px', color: colors.warning }} />
              </div>
              <div style={styles.dataInfo}>
                <div style={styles.dataValue}>1,234</div>
                <div style={styles.dataLabel}>新增客户</div>
              </div>
              <div style={{ ...styles.dataTrend, color: colors.success }}>
                <LinearIcons.arrowRight style={{ width: '14px', height: '14px' }} /> +15%
              </div>
            </div>
          </div>
        </div>
      )}

      {showModal && (
        <div style={styles.modalOverlay} onClick={closeModal}>
          <div style={styles.modal} onClick={(e) => e.stopPropagation()}>
            <div style={styles.modalHeader}>
              <h3 style={styles.modalTitle}>
                {modalMode === 'add' ? '新建活动' : '编辑活动'}
              </h3>
              <button style={styles.modalClose} onClick={closeModal}>
                <LinearIcons.x style={{ width: '18px', height: '18px' }} />
              </button>
            </div>
            <div style={styles.modalBody}>
              {isActiveEditing && (
                <div style={{ ...styles.statusHint, backgroundColor: colors.successBg, color: colors.success, borderColor: colors.success }}>
                  <LinearIcons.alertCircle style={{ width: '14px', height: '14px' }} />
                  该活动正在进行中，开始时间不可修改，仅可调整其他信息
                </div>
              )}
              {isEndedEditing && (
                <div style={{ ...styles.statusHint, backgroundColor: colors.warningBg, color: colors.warning, borderColor: colors.warning }}>
                  <LinearIcons.alertCircle style={{ width: '14px', height: '14px' }} />
                  该活动已结束，仅允许修改活动名称和说明
                </div>
              )}
              <div style={{ marginBottom: '16px' }}>
                <label style={labelStyle}>活动名称 *</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="如：春季新品促销"
                  style={inputStyle}
                />
              </div>
              <div style={{ marginBottom: '16px' }}>
                <label style={labelStyle}>活动类型 *</label>
                <select
                  value={formData.type}
                  onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                  style={{ ...inputStyle, ...(isEndedEditing ? { opacity: 0.5, cursor: 'not-allowed' } : {}) }}
                  disabled={isEndedEditing}
                >
                  <option value="满减活动">满减活动</option>
                  <option value="折扣活动">折扣活动</option>
                  <option value="积分活动">积分活动</option>
                  <option value="优惠券">优惠券</option>
                  <option value="套餐活动">套餐活动</option>
                </select>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '16px' }}>
                <div>
                  <label style={labelStyle}>
                    开始时间 *
                    {isActiveEditing && <span style={styles.lockedTag}>已锁定</span>}
                  </label>
                  <input
                    type="date"
                    value={formData.startTime}
                    onChange={(e) => setFormData({ ...formData, startTime: e.target.value })}
                    style={{
                      ...inputStyle,
                      ...((isActiveEditing || isEndedEditing) ? { opacity: 0.5, cursor: 'not-allowed', backgroundColor: colors.surfaceHover } : {}),
                    }}
                    disabled={isActiveEditing || isEndedEditing}
                  />
                </div>
                <div>
                  <label style={labelStyle}>结束时间 *</label>
                  <input
                    type="date"
                    value={formData.endTime}
                    onChange={(e) => setFormData({ ...formData, endTime: e.target.value })}
                    style={{
                      ...inputStyle,
                      ...(isEndedEditing ? { opacity: 0.5, cursor: 'not-allowed', backgroundColor: colors.surfaceHover } : {}),
                    }}
                    disabled={isEndedEditing}
                  />
                </div>
              </div>
              <div style={{ marginBottom: '8px' }}>
                <label style={labelStyle}>
                  活动规则 / 说明 *
                  {isEndedEditing && <span style={styles.lockedTag}>已结束-仅可修改说明</span>}
                </label>
                <textarea
                  value={formData.rule}
                  onChange={(e) => setFormData({ ...formData, rule: e.target.value })}
                  placeholder={isEndedEditing ? "可补充活动说明..." : "如：满300减50、全场8.5折..."}
                  style={{
                    ...inputStyle,
                    minHeight: '80px',
                    resize: 'vertical',
                    fontFamily: 'inherit',
                    ...(isEndedEditing ? { borderColor: colors.warning } : {}),
                  }}
                />
              </div>
              {formError && (
                <div style={{ color: colors.error, fontSize: '13px', marginTop: '8px' }}>{formError}</div>
              )}
            </div>
            <div style={styles.modalFooter}>
              <button style={styles.btnSecondary} onClick={closeModal}>取消</button>
              <button style={styles.btnPrimary} onClick={handleSubmit}>
                {modalMode === 'add' ? '创建活动' : '保存修改'}
              </button>
            </div>
          </div>
        </div>
      )}

      {showDeleteModal && deleteTarget && (
        <div style={styles.modalOverlay} onClick={() => setShowDeleteModal(false)}>
          <div style={{ ...styles.modal, maxWidth: '420px' }} onClick={(e) => e.stopPropagation()}>
            <div style={styles.modalHeader}>
              <h3 style={styles.modalTitle}>删除确认</h3>
              <button style={styles.modalClose} onClick={() => setShowDeleteModal(false)}>
                <LinearIcons.x style={{ width: '18px', height: '18px' }} />
              </button>
            </div>
            <div style={styles.modalBody}>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                <div style={{
                  width: '40px', height: '40px', borderRadius: '50%',
                  background: colors.errorBg, display: 'flex', alignItems: 'center', justifyContent: 'center',
                  flexShrink: 0,
                }}>
                  <LinearIcons.alertCircle style={{ width: '20px', height: '20px', color: colors.error }} />
                </div>
                <div>
                  <div style={{ color: colors.text, fontSize: '14px', marginBottom: '4px' }}>
                    确认删除活动「<strong>{deleteTarget.name}</strong>」？
                  </div>
                  <div style={{ color: colors.textMuted, fontSize: '13px' }}>
                    删除后该活动相关数据将无法恢复，请谨慎操作。
                  </div>
                </div>
              </div>
            </div>
            <div style={styles.modalFooter}>
              <button style={styles.btnSecondary} onClick={() => setShowDeleteModal(false)}>取消</button>
              <button style={styles.btnDanger} onClick={confirmDelete}>确认删除</button>
            </div>
          </div>
        </div>
      )}

      {showViewModal && viewTarget && (
        <div style={styles.modalOverlay} onClick={() => setShowViewModal(false)}>
          <div style={{ ...styles.modal, maxWidth: '520px' }} onClick={(e) => e.stopPropagation()}>
            <div style={styles.modalHeader}>
              <h3 style={styles.modalTitle}>活动详情</h3>
              <button style={styles.modalClose} onClick={() => setShowViewModal(false)}>
                <LinearIcons.x style={{ width: '18px', height: '18px' }} />
              </button>
            </div>
            <div style={styles.modalBody}>
              {isActiveView && (
                <div style={{ ...styles.statusHint, backgroundColor: colors.successBg, color: colors.success, borderColor: colors.success, marginBottom: '16px' }}>
                  <LinearIcons.clock style={{ width: '14px', height: '14px' }} />
                  该活动正在进行中，开始时间不可修改
                </div>
              )}
              <div style={styles.detailRow}>
                <span style={styles.detailLabel}>活动名称</span>
                <span style={styles.detailValue}>{viewTarget.name}</span>
              </div>
              <div style={styles.detailRow}>
                <span style={styles.detailLabel}>活动类型</span>
                <span style={styles.detailValue}>{viewTarget.type}</span>
              </div>
              <div style={styles.detailRow}>
                <span style={styles.detailLabel}>活动状态</span>
                <span style={{
                  ...styles.statusBadge,
                  backgroundColor: getStatusInfo(viewTarget.computedStatus).bg,
                  color: getStatusInfo(viewTarget.computedStatus).color,
                }}>
                  {getStatusInfo(viewTarget.computedStatus).label}
                </span>
              </div>
              <div style={styles.detailRow}>
                <span style={styles.detailLabel}>活动周期</span>
                <span style={styles.detailValue}>{viewTarget.startTime} 至 {viewTarget.endTime}</span>
              </div>
              <div style={styles.detailRow}>
                <span style={styles.detailLabel}>活动规则</span>
                <span style={styles.detailValue}>{viewTarget.rule || '暂无'}</span>
              </div>
              <div style={styles.detailRow}>
                <span style={styles.detailLabel}>参与人数</span>
                <span style={styles.detailValue}>{viewTarget.participants} 人</span>
              </div>
              <div style={styles.detailRow}>
                <span style={styles.detailLabel}>销售额</span>
                <span style={{ ...styles.detailValue, color: colors.primary, fontWeight: '600' }}>{viewTarget.sales}</span>
              </div>
            </div>
            <div style={styles.modalFooter}>
              <button style={styles.btnPrimary} onClick={() => setShowViewModal(false)}>关闭</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function getStyles(colors) {
  return {
    container: { minHeight: '100vh', background: colors.background, padding: '24px' },
    header: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' },
    headerLeft: { display: 'flex', alignItems: 'center', gap: '16px' },
    title: {
      fontSize: '22px', fontWeight: '600', color: colors.text,
      margin: 0, paddingLeft: '12px',
      borderLeft: '4px solid ' + colors.primary,
    },
    serverTimeBadge: {
      display: 'inline-flex', alignItems: 'center', gap: '6px',
      padding: '4px 10px', background: colors.surface, color: colors.textMuted,
      border: '1px solid ' + colors.border, borderRadius: '12px',
      fontSize: '12px', fontFamily: 'monospace',
    },
    headerRight: { display: 'flex', gap: '12px' },
    searchBox: {
      display: 'flex', alignItems: 'center',
      background: colors.surface, border: '1px solid ' + colors.border,
      borderRadius: '8px', padding: '8px 12px', gap: '8px',
    },
    searchInput: { border: 'none', background: 'transparent', outline: 'none', color: colors.text, fontSize: '14px', width: '200px' },
    addBtn: {
      display: 'flex', alignItems: 'center', gap: '8px',
      padding: '10px 20px', background: colors.primaryGradient,
      color: colors.textInverse, border: 'none', borderRadius: '8px',
      fontSize: '14px', cursor: 'pointer', transition: 'all 0.3s ease',
      boxShadow: '0 2px 8px rgba(255, 77, 79, 0.25)',
    },
    tabBar: {
      display: 'flex', gap: '8px', marginBottom: '24px',
      background: colors.surface, padding: '8px', borderRadius: '10px',
      boxShadow: colors.cardShadow, border: '1px solid ' + colors.border,
    },
    tabBtn: {
      padding: '10px 24px', background: 'transparent',
      border: 'none', borderRadius: '8px', fontSize: '14px',
      cursor: 'pointer', transition: 'all 0.3s ease', color: colors.textSecondary,
    },
    activeTab: {
      background: colors.primaryGradient, color: colors.textInverse,
      boxShadow: '0 2px 8px rgba(255, 77, 79, 0.25)',
    },
    content: { display: 'flex', flexDirection: 'column', gap: '24px' },
    statsRow: { display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px' },
    statCard: {
      background: colors.surface, borderRadius: '12px', padding: '20px',
      display: 'flex', alignItems: 'center', gap: '16px',
      boxShadow: colors.cardShadow, border: '1px solid ' + colors.border,
    },
    statIconBox: {
      width: '48px', height: '48px', borderRadius: '12px',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
    },
    statInfo: { flex: 1 },
    statValue: { fontSize: '24px', fontWeight: '600', color: colors.text },
    statLabel: { fontSize: '13px', color: colors.textMuted, marginTop: '4px' },
    tableCard: {
      background: colors.surface, borderRadius: '12px',
      boxShadow: colors.cardShadow, border: '1px solid ' + colors.border,
      overflow: 'hidden',
    },
    table: { width: '100%', borderCollapse: 'collapse' },
    th: {
      padding: '14px 16px', textAlign: 'left', fontSize: '13px', fontWeight: '600',
      color: colors.textSecondary, background: colors.tableHeader,
      borderBottom: '1px solid ' + colors.border, whiteSpace: 'nowrap',
    },
    td: { padding: '14px 16px', fontSize: '14px', color: colors.text, borderBottom: '1px solid ' + colors.border },
    tr: { transition: 'background 0.25s' },
    trHover: { background: colors.surfaceHover },
    activityName: { display: 'flex', alignItems: 'center' },
    typeBadge: {
      padding: '4px 12px', background: colors.infoBg, color: colors.info,
      borderRadius: '20px', fontSize: '12px', fontWeight: '500',
    },
    statusBadge: {
      padding: '4px 12px', borderRadius: '20px', fontSize: '12px',
      fontWeight: '500', display: 'inline-block',
    },
    actionBtns: { display: 'flex', gap: '8px' },
    actionBtn: {
      padding: '6px 10px', background: colors.surfaceHover, border: 'none',
      borderRadius: '6px', cursor: 'pointer', color: colors.textSecondary, transition: 'all 0.25s',
    },
    pagination: {
      display: 'flex', justifyContent: 'center', alignItems: 'center',
      gap: '8px', padding: '16px', borderTop: '1px solid ' + colors.border,
    },
    paginationBtn: {
      padding: '8px 16px', background: 'transparent',
      border: '1px solid ' + colors.border, borderRadius: '6px',
      color: colors.textSecondary, cursor: 'pointer', transition: 'all 0.25s',
    },
    activePaginationBtn: {
      background: colors.primaryGradient, borderColor: colors.primary, color: colors.textInverse,
    },
    couponGrid: { display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '20px' },
    couponCard: {
      display: 'flex', background: colors.surface, borderRadius: '12px',
      border: '3px solid', overflow: 'hidden', position: 'relative',
    },
    couponLeft: {
      width: '120px', background: colors.primaryGradient,
      display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '24px',
    },
    couponDiscount: { fontSize: '24px', fontWeight: '600', color: colors.textInverse },
    couponRight: { flex: 1, padding: '20px' },
    couponName: { fontSize: '16px', fontWeight: '600', color: colors.text, marginBottom: '4px' },
    couponType: { fontSize: '13px', color: colors.textMuted, marginBottom: '12px' },
    couponStats: { fontSize: '12px', color: colors.textSecondary },
    couponExpired: {
      position: 'absolute', top: 0, right: 0,
      background: colors.warningBg, color: colors.warning,
      padding: '4px 12px', fontSize: '12px',
    },
    chartCard: {
      background: colors.surface, borderRadius: '12px', padding: '24px',
      boxShadow: colors.cardShadow, border: '1px solid ' + colors.border,
    },
    chartHeader: { marginBottom: '20px' },
    chartTitle: { fontSize: '16px', fontWeight: '600', color: colors.text, margin: 0 },
    chartContainer: { width: '100%' },
    dataCards: { display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px' },
    dataCard: {
      display: 'flex', alignItems: 'center', gap: '16px',
      background: colors.surface, borderRadius: '12px', padding: '20px',
      boxShadow: colors.cardShadow, border: '1px solid ' + colors.border,
    },
    dataIcon: {
      width: '48px', height: '48px', background: colors.surfaceHover,
      borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center',
    },
    dataInfo: { flex: 1 },
    dataValue: { fontSize: '24px', fontWeight: '600', color: colors.text },
    dataLabel: { fontSize: '13px', color: colors.textMuted },
    dataTrend: {
      fontSize: '13px', fontWeight: '500',
      display: 'flex', alignItems: 'center', gap: '4px',
    },
    statusHint: {
      display: 'flex', alignItems: 'center', gap: '8px',
      padding: '10px 12px', borderRadius: '8px', fontSize: '13px',
      marginBottom: '16px', border: '1px solid',
    },
    lockedTag: {
      display: 'inline-block', marginLeft: '8px',
      padding: '2px 6px', background: colors.warningBg, color: colors.warning,
      borderRadius: '4px', fontSize: '11px', fontWeight: '500',
    },
    logCard: {
      background: colors.surface, borderRadius: '12px',
      boxShadow: colors.cardShadow, border: '1px solid ' + colors.border,
      overflow: 'hidden',
    },
    logHeader: {
      padding: '20px 24px', borderBottom: '1px solid ' + colors.border,
      display: 'flex', justifyContent: 'space-between', alignItems: 'center',
    },
    logTitle: { fontSize: '16px', fontWeight: '600', color: colors.text, margin: 0 },
    logSubtitle: { fontSize: '12px', color: colors.textMuted },
    modalOverlay: {
      position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
      background: 'rgba(0, 0, 0, 0.5)', display: 'flex',
      alignItems: 'center', justifyContent: 'center', zIndex: 1000, padding: '20px',
    },
    modal: {
      background: colors.surface, borderRadius: '12px',
      width: '100%', maxWidth: '560px', maxHeight: '90vh',
      overflow: 'auto', boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3)',
    },
    modalHeader: {
      display: 'flex', justifyContent: 'space-between', alignItems: 'center',
      padding: '20px 24px', borderBottom: '1px solid ' + colors.border,
    },
    modalTitle: { fontSize: '18px', fontWeight: '600', color: colors.text, margin: 0 },
    modalClose: {
      background: 'transparent', border: 'none', cursor: 'pointer',
      color: colors.textMuted, padding: '4px', display: 'flex', alignItems: 'center',
    },
    modalBody: { padding: '24px' },
    modalFooter: {
      display: 'flex', justifyContent: 'flex-end', gap: '12px',
      padding: '16px 24px', borderTop: '1px solid ' + colors.border,
    },
    btnPrimary: {
      padding: '10px 20px', background: colors.primaryGradient,
      color: colors.textInverse, border: 'none', borderRadius: '8px',
      fontSize: '14px', fontWeight: '500', cursor: 'pointer',
    },
    btnSecondary: {
      padding: '10px 20px', background: 'transparent',
      color: colors.textSecondary, border: '1px solid ' + colors.border,
      borderRadius: '8px', fontSize: '14px', fontWeight: '500', cursor: 'pointer',
    },
    btnDanger: {
      padding: '10px 20px', background: colors.error,
      color: colors.textInverse, border: 'none', borderRadius: '8px',
      fontSize: '14px', fontWeight: '500', cursor: 'pointer',
    },
    detailRow: { display: 'flex', padding: '10px 0', borderBottom: '1px solid ' + colors.border },
    detailLabel: { width: '100px', fontSize: '13px', color: colors.textMuted },
    detailValue: { flex: 1, fontSize: '14px', color: colors.text },
  };
}

function MarketingManage() {
  return (
    <AdminLayout activeModule="marketingManage">
      <MarketingManageContent />
    </AdminLayout>
  );
}

export default MarketingManage;
