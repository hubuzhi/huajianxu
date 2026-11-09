import React, { useState, useMemo } from 'react';
import { useTheme } from '../context/ThemeContext';
import LinearIcons from '../components/LinearIcons';
import AdminLayout from '../components/AdminLayout';

function CustomerManageContent() {
  const { theme } = useTheme();
  const colors = theme.colors;
  const styles = getStyles(colors);

  const [activeTab, setActiveTab] = useState('list');
  const [searchKeyword, setSearchKeyword] = useState('');
  const [hoveredRow, setHoveredRow] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 5;

  const [customers, setCustomers] = useState([
    { id: 1, name: '张三', phone: '138****1234', level: 'VIP会员', points: 2580, registerTime: '2024-03-15', status: 'active' },
    { id: 2, name: '李四', phone: '139****5678', level: '黄金会员', points: 1850, registerTime: '2024-04-20', status: 'active' },
    { id: 3, name: '王五', phone: '137****9012', level: '普通会员', points: 620, registerTime: '2024-05-10', status: 'active' },
    { id: 4, name: '赵六', phone: '136****3456', level: 'VIP会员', points: 3200, registerTime: '2024-02-28', status: 'active' },
    { id: 5, name: '钱七', phone: '135****7890', level: '白银会员', points: 980, registerTime: '2024-06-05', status: 'inactive' },
    { id: 6, name: '孙八', phone: '134****2345', level: '黄金会员', points: 1480, registerTime: '2024-07-12', status: 'active' },
  ]);

  const [pointLogs, setPointLogs] = useState([
    { id: 1, time: '2024-03-15 10:30', customer: '张三', change: '+200', reason: '购物消费', operator: '系统' },
    { id: 2, time: '2024-03-14 14:20', customer: '李四', change: '+150', reason: '完成评价', operator: '系统' },
    { id: 3, time: '2024-03-13 09:15', customer: '王五', change: '-50', reason: '兑换优惠券', operator: '管理员' },
  ]);

  const [showModal, setShowModal] = useState(false);
  const [modalMode, setModalMode] = useState('add');
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    level: '普通会员',
    points: 0,
  });
  const [editingId, setEditingId] = useState(null);
  const [formError, setFormError] = useState('');

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState(null);

  const [showViewModal, setShowViewModal] = useState(false);
  const [viewTarget, setViewTarget] = useState(null);

  const filteredCustomers = useMemo(() => {
    if (!searchKeyword) return customers;
    return customers.filter(c =>
      c.name.includes(searchKeyword) ||
      c.phone.includes(searchKeyword) ||
      c.level.includes(searchKeyword)
    );
  }, [customers, searchKeyword]);

  const totalPages = Math.max(1, Math.ceil(filteredCustomers.length / pageSize));
  const safePage = Math.min(currentPage, totalPages);
  const paginated = filteredCustomers.slice((safePage - 1) * pageSize, safePage * pageSize);

  const stats = useMemo(() => {
    const total = customers.length;
    const active = customers.filter(c => c.status === 'active').length;
    const vip = customers.filter(c => c.level === 'VIP会员').length;
    return { total, active, vip };
  }, [customers]);

  const addPointLog = (customer, change, reason, operator) => {
    const now = new Date();
    const time = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')} ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
    setPointLogs(prev => [{
      id: prev.length > 0 ? Math.max(...prev.map(l => l.id)) + 1 : 1,
      time,
      customer,
      change: change > 0 ? `+${change}` : `${change}`,
      reason,
      operator,
    }, ...prev]);
  };

  const openAddModal = () => {
    setModalMode('add');
    setFormData({ name: '', phone: '', level: '普通会员', points: 0 });
    setEditingId(null);
    setFormError('');
    setShowModal(true);
  };

  const openEditModal = (customer) => {
    setModalMode('edit');
    setFormData({
      name: customer.name,
      phone: customer.phone,
      level: customer.level,
      points: customer.points,
    });
    setEditingId(customer.id);
    setFormError('');
    setShowModal(true);
  };

  const validateForm = () => {
    if (!formData.name.trim()) {
      setFormError('请输入客户姓名');
      return false;
    }
    if (!formData.phone.trim()) {
      setFormError('请输入手机号');
      return false;
    }
    const phoneReg = /^1[3-9]\d{9}$/;
    const phoneDigits = formData.phone.replace(/\*/g, '0').replace(/\D/g, '');
    if (!phoneReg.test(phoneDigits) && !formData.phone.includes('*')) {
      if (formData.phone.length !== 11) {
        setFormError('请输入正确的11位手机号');
        return false;
      }
    }
    if (formData.points < 0) {
      setFormError('积分不能为负数');
      return false;
    }
    return true;
  };

  const handleSubmit = () => {
    if (!validateForm()) return;

    if (modalMode === 'add') {
      const newId = customers.length > 0 ? Math.max(...customers.map(c => c.id)) + 1 : 1;
      const now = new Date();
      const registerTime = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`;
      const newCustomer = {
        id: newId,
        name: formData.name,
        phone: formData.phone,
        level: formData.level,
        points: Number(formData.points) || 0,
        registerTime,
        status: 'active',
      };
      setCustomers(prev => [newCustomer, ...prev]);
      if (Number(formData.points) > 0) {
        addPointLog(formData.name, Number(formData.points), '初始积分', '管理员');
      }
    } else {
      const oldCustomer = customers.find(c => c.id === editingId);
      const newPoints = Number(formData.points) || 0;
      setCustomers(prev => prev.map(c => c.id === editingId ? {
        ...c,
        name: formData.name,
        phone: formData.phone,
        level: formData.level,
        points: newPoints,
      } : c));
      if (oldCustomer && oldCustomer.points !== newPoints) {
        const change = newPoints - oldCustomer.points;
        addPointLog(formData.name, change, '管理员调整', '管理员');
      }
    }
    setShowModal(false);
    setFormError('');
  };

  const openDeleteModal = (customer) => {
    setDeleteTarget(customer);
    setShowDeleteModal(true);
  };

  const confirmDelete = () => {
    if (deleteTarget) {
      setCustomers(prev => prev.filter(c => c.id !== deleteTarget.id));
    }
    setShowDeleteModal(false);
    setDeleteTarget(null);
  };

  const openViewModal = (customer) => {
    setViewTarget(customer);
    setShowViewModal(true);
  };

  const inputStyle = {
    width: '100%',
    padding: '10px 12px',
    border: `1px solid ${colors.border}`,
    borderRadius: '8px',
    background: colors.background,
    color: colors.text,
    fontSize: '14px',
    outline: 'none',
    boxSizing: 'border-box',
  };

  const labelStyle = {
    display: 'block',
    fontSize: '13px',
    fontWeight: '500',
    color: colors.textSecondary,
    marginBottom: '6px',
  };

  const levelColor = (level) => {
    if (level === 'VIP会员') return { bg: colors.primaryBg, color: colors.primary };
    if (level === '黄金会员') return { bg: colors.warningBg, color: colors.warning };
    if (level === '白银会员') return { bg: colors.infoBg, color: colors.info };
    return { bg: colors.surface, color: colors.textSecondary };
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <div style={styles.headerLeft}>
          <h1 style={styles.title}>客户/会员管理</h1>
        </div>
        <div style={styles.headerRight}>
          <div style={styles.searchBox}>
            <LinearIcons.search style={{ width: '16px', height: '16px', color: colors.textMuted }} />
            <input
              type="text"
              placeholder="搜索客户..."
              value={searchKeyword}
              onChange={(e) => { setSearchKeyword(e.target.value); setCurrentPage(1); }}
              style={styles.searchInput}
            />
          </div>
          <button style={styles.addBtn} onClick={openAddModal}>
            <LinearIcons.plus style={{ width: '16px', height: '16px' }} />
            新增客户
          </button>
        </div>
      </div>

      <div style={styles.tabBar}>
        {[
          { id: 'list', label: '客户列表', icon: 'users' },
          { id: 'points', label: '积分变更日志', icon: 'history' },
          { id: 'level', label: '会员等级', icon: 'shield' },
          { id: 'labels', label: '客户标签', icon: 'tag' },
        ].map((tab) => {
          const IconComponent = LinearIcons[tab.icon];
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              style={{
                ...styles.tabBtn,
                ...(activeTab === tab.id ? styles.activeTab : {}),
              }}
            >
              {activeTab === tab.id && IconComponent && <IconComponent style={{ width: '14px', height: '14px', marginRight: '6px' }} />}
              {tab.label}
            </button>
          );
        })}
      </div>

      {activeTab === 'list' && (
        <div style={styles.content}>
          <div style={styles.statsRow}>
            <div style={styles.statCard}>
              <div style={{...styles.statIconBox, backgroundColor: colors.primaryBg}}>
                <LinearIcons.users style={{ width: '20px', height: '20px', color: colors.primary }} />
              </div>
              <div style={styles.statInfo}>
                <div style={styles.statValue}>{stats.total}</div>
                <div style={styles.statLabel}>总客户数</div>
              </div>
            </div>
            <div style={styles.statCard}>
              <div style={{...styles.statIconBox, backgroundColor: colors.successBg}}>
                <LinearIcons.activity style={{ width: '20px', height: '20px', color: colors.success }} />
              </div>
              <div style={styles.statInfo}>
                <div style={styles.statValue}>{stats.active}</div>
                <div style={styles.statLabel}>活跃客户</div>
              </div>
            </div>
            <div style={styles.statCard}>
              <div style={{...styles.statIconBox, backgroundColor: colors.warningBg}}>
                <LinearIcons.shield style={{ width: '20px', height: '20px', color: colors.warning }} />
              </div>
              <div style={styles.statInfo}>
                <div style={styles.statValue}>{stats.vip}</div>
                <div style={styles.statLabel}>VIP会员</div>
              </div>
            </div>
          </div>

          <div style={styles.tableCard}>
            <table style={styles.table}>
              <thead>
                <tr>
                  <th style={styles.th}>客户ID</th>
                  <th style={styles.th}>客户名称</th>
                  <th style={styles.th}>手机号</th>
                  <th style={styles.th}>会员等级</th>
                  <th style={styles.th}>积分</th>
                  <th style={styles.th}>注册时间</th>
                  <th style={styles.th}>状态</th>
                  <th style={styles.th}>操作</th>
                </tr>
              </thead>
              <tbody>
                {paginated.length === 0 ? (
                  <tr>
                    <td colSpan="8" style={{ ...styles.td, textAlign: 'center', color: colors.textMuted, padding: '40px 0' }}>
                      暂无客户数据
                    </td>
                  </tr>
                ) : (
                  paginated.map((customer, idx) => {
                    const lc = levelColor(customer.level);
                    return (
                      <tr
                        key={customer.id}
                        style={{
                          ...styles.tr,
                          ...(hoveredRow === idx ? styles.trHover : {}),
                        }}
                        onMouseEnter={() => setHoveredRow(idx)}
                        onMouseLeave={() => setHoveredRow(null)}
                      >
                        <td style={styles.td}>#{customer.id.toString().padStart(6, '0')}</td>
                        <td style={styles.td}>{customer.name}</td>
                        <td style={styles.td}>{customer.phone}</td>
                        <td style={styles.td}>
                          <span style={{
                            ...styles.levelBadge,
                            backgroundColor: lc.bg,
                            color: lc.color,
                          }}>
                            {customer.level}
                          </span>
                        </td>
                        <td style={styles.td}>{customer.points.toLocaleString()}</td>
                        <td style={styles.td}>{customer.registerTime}</td>
                        <td style={styles.td}>
                          <span style={{
                            ...styles.statusBadge,
                            backgroundColor: customer.status === 'active' ? colors.successBg : colors.warningBg,
                            color: customer.status === 'active' ? colors.success : colors.warning,
                          }}>
                            {customer.status === 'active' ? '活跃' : '不活跃'}
                          </span>
                        </td>
                        <td style={styles.td}>
                          <div style={styles.actionBtns}>
                            <button style={styles.actionBtn} onClick={() => openViewModal(customer)} title="查看">
                              <LinearIcons.eye style={{ width: '14px', height: '14px' }} />
                            </button>
                            <button style={styles.actionBtn} onClick={() => openEditModal(customer)} title="编辑">
                              <LinearIcons.edit style={{ width: '14px', height: '14px' }} />
                            </button>
                            <button style={{...styles.actionBtn, color: colors.error}} onClick={() => openDeleteModal(customer)} title="删除">
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
              <button style={styles.paginationBtn} onClick={() => setCurrentPage(p => Math.max(1, p - 1))} disabled={safePage === 1}>上一页</button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(p => (
                <button
                  key={p}
                  onClick={() => setCurrentPage(p)}
                  style={{...styles.paginationBtn, ...(safePage === p ? styles.activePaginationBtn : {})}}
                >
                  {p}
                </button>
              ))}
              <button style={styles.paginationBtn} onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))} disabled={safePage === totalPages}>下一页</button>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'points' && (
        <div style={styles.content}>
          <div style={styles.logsCard}>
            <table style={styles.table}>
              <thead>
                <tr>
                  <th style={styles.th}>时间</th>
                  <th style={styles.th}>客户</th>
                  <th style={styles.th}>积分变动</th>
                  <th style={styles.th}>原因</th>
                  <th style={styles.th}>操作人</th>
                </tr>
              </thead>
              <tbody>
                {pointLogs.length === 0 ? (
                  <tr>
                    <td colSpan="5" style={{ ...styles.td, textAlign: 'center', color: colors.textMuted, padding: '40px 0' }}>
                      暂无积分变更记录
                    </td>
                  </tr>
                ) : (
                  pointLogs.map((log, idx) => (
                    <tr
                      key={log.id}
                      style={{
                        ...styles.tr,
                        ...(hoveredRow === idx ? styles.trHover : {}),
                      }}
                      onMouseEnter={() => setHoveredRow(idx)}
                      onMouseLeave={() => setHoveredRow(null)}
                    >
                      <td style={styles.td}>{log.time}</td>
                      <td style={styles.td}>{log.customer}</td>
                      <td style={styles.td}>
                        <span style={{
                          ...styles.statusBadge,
                          backgroundColor: log.change.startsWith('+') ? colors.successBg : colors.errorBg,
                          color: log.change.startsWith('+') ? colors.success : colors.error,
                        }}>
                          {log.change}
                        </span>
                      </td>
                      <td style={styles.td}>{log.reason}</td>
                      <td style={styles.td}>{log.operator}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {activeTab === 'level' && (
        <div style={styles.content}>
          <div style={styles.levelGrid}>
            {['普通会员', '白银会员', '黄金会员', 'VIP会员'].map((level, idx) => (
              <div key={level} style={styles.levelCard}>
                <div style={{
                  ...styles.levelIcon,
                  backgroundColor: idx === 3 ? colors.primaryBg :
                                   idx === 2 ? colors.warningBg :
                                   idx === 1 ? colors.infoBg : colors.surface,
                }}>
                  <span style={{ fontSize: '24px' }}>
                    {idx === 3 ? '👑' : idx === 2 ? '🥇' : idx === 1 ? '🥈' : '🎖️'}
                  </span>
                </div>
                <h3 style={styles.levelTitle}>{level}</h3>
                <p style={styles.levelDesc}>
                  {idx === 3 ? '尊享专属服务与最高折扣' :
                   idx === 2 ? '享受会员专属优惠' :
                   idx === 1 ? '基础会员权益' : '入门会员'}
                </p>
                <div style={styles.levelStats}>
                  <div>
                    <div style={styles.levelStatValue}>{[456, 312, 289, 177][idx]}</div>
                    <div style={styles.levelStatLabel}>人数</div>
                  </div>
                  <div>
                    <div style={styles.levelStatValue}>{['10%', '8%', '5%', '3%'][idx]}</div>
                    <div style={styles.levelStatLabel}>折扣</div>
                  </div>
                </div>
                <button style={styles.levelBtn}>编辑规则</button>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'labels' && (
        <div style={styles.content}>
          <div style={styles.labelSection}>
            <div style={styles.labelHeader}>
              <h3 style={styles.labelTitle}>客户标签</h3>
              <button style={styles.addLabelBtn}>
                <LinearIcons.plus style={{ width: '14px', height: '14px' }} />
                添加标签
              </button>
            </div>
            <div style={styles.labelGrid}>
              {['新客户', '活跃', '沉睡', '流失'].map((label, idx) => (
                <div key={label} style={styles.labelCard}>
                  <div style={{
                    ...styles.labelDot,
                    backgroundColor: [colors.primary, colors.success, colors.warning, colors.error][idx],
                  }} />
                  <span style={styles.labelName}>{label}</span>
                  <span style={styles.labelCount}>128</span>
                  <button style={styles.labelDelete}>
                    <LinearIcons.x style={{ width: '12px', height: '12px' }} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {showModal && (
        <div style={styles.modalOverlay} onClick={() => { setShowModal(false); setFormError(''); }}>
          <div style={styles.modal} onClick={(e) => e.stopPropagation()}>
            <div style={styles.modalHeader}>
              <h3 style={styles.modalTitle}>
                {modalMode === 'add' ? '新增客户' : '编辑客户'}
              </h3>
              <button style={styles.modalClose} onClick={() => { setShowModal(false); setFormError(''); }}>
                <LinearIcons.x style={{ width: '18px', height: '18px' }} />
              </button>
            </div>
            <div style={styles.modalBody}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '16px' }}>
                <div>
                  <label style={labelStyle}>客户姓名 *</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="客户姓名"
                    style={inputStyle}
                  />
                </div>
                <div>
                  <label style={labelStyle}>手机号 *</label>
                  <input
                    type="text"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="11位手机号"
                    style={inputStyle}
                    maxLength={11}
                  />
                </div>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '8px' }}>
                <div>
                  <label style={labelStyle}>会员等级 *</label>
                  <select
                    value={formData.level}
                    onChange={(e) => setFormData({ ...formData, level: e.target.value })}
                    style={inputStyle}
                  >
                    <option value="普通会员">普通会员</option>
                    <option value="白银会员">白银会员</option>
                    <option value="黄金会员">黄金会员</option>
                    <option value="VIP会员">VIP会员</option>
                  </select>
                </div>
                <div>
                  <label style={labelStyle}>初始积分</label>
                  <input
                    type="number"
                    value={formData.points}
                    onChange={(e) => setFormData({ ...formData, points: e.target.value })}
                    placeholder="0"
                    min="0"
                    style={inputStyle}
                  />
                </div>
              </div>
              {modalMode === 'edit' && (
                <div style={{ fontSize: '12px', color: colors.textMuted, marginTop: '8px' }}>
                  积分变更将自动记录到「积分变更日志」
                </div>
              )}
              {formError && (
                <div style={{ color: colors.error, fontSize: '13px', marginTop: '8px' }}>
                  {formError}
                </div>
              )}
            </div>
            <div style={styles.modalFooter}>
              <button style={styles.btnSecondary} onClick={() => { setShowModal(false); setFormError(''); }}>取消</button>
              <button style={styles.btnPrimary} onClick={handleSubmit}>
                {modalMode === 'add' ? '确认添加' : '保存修改'}
              </button>
            </div>
          </div>
        </div>
      )}

      {showDeleteModal && deleteTarget && (
        <div style={styles.modalOverlay} onClick={() => setShowDeleteModal(false)}>
          <div style={{ ...styles.modal, maxWidth: '420px' }} onClick={(e) => e.stopPropagation()}>
            <div style={styles.modalHeader}>
              <h3 style={styles.modalTitle}>删除客户</h3>
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
                    确认删除客户「<strong>{deleteTarget.name}</strong>」？
                  </div>
                  <div style={{ color: colors.textMuted, fontSize: '13px' }}>
                    删除后该客户的会员信息和积分将一并清除，且无法恢复。
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
              <h3 style={styles.modalTitle}>客户详情</h3>
              <button style={styles.modalClose} onClick={() => setShowViewModal(false)}>
                <LinearIcons.x style={{ width: '18px', height: '18px' }} />
              </button>
            </div>
            <div style={styles.modalBody}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '20px', padding: '16px', background: colors.surfaceHover, borderRadius: '8px' }}>
                <div style={{...styles.avatar, width: '56px', height: '56px', fontSize: '20px', background: colors.primaryGradient, color: colors.textInverse}}>{viewTarget.name.charAt(0)}</div>
                <div>
                  <div style={{ fontSize: '18px', fontWeight: '600', color: colors.text }}>{viewTarget.name}</div>
                  <div style={{ fontSize: '13px', color: colors.textMuted }}>{viewTarget.phone}</div>
                </div>
              </div>
              <div style={styles.detailRow}>
                <span style={styles.detailLabel}>客户ID</span>
                <span style={styles.detailValue}>#{viewTarget.id.toString().padStart(6, '0')}</span>
              </div>
              <div style={styles.detailRow}>
                <span style={styles.detailLabel}>会员等级</span>
                <span style={styles.detailValue}>{viewTarget.level}</span>
              </div>
              <div style={styles.detailRow}>
                <span style={styles.detailLabel}>当前积分</span>
                <span style={{ ...styles.detailValue, color: colors.primary, fontWeight: '600' }}>{viewTarget.points.toLocaleString()}</span>
              </div>
              <div style={styles.detailRow}>
                <span style={styles.detailLabel}>注册时间</span>
                <span style={styles.detailValue}>{viewTarget.registerTime}</span>
              </div>
              <div style={styles.detailRow}>
                <span style={styles.detailLabel}>账号状态</span>
                <span style={styles.detailValue}>{viewTarget.status === 'active' ? '活跃' : '不活跃'}</span>
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
      gap: '16px',
    },
    title: {
      fontSize: '22px',
      fontWeight: '600',
      color: colors.text,
      margin: 0,
      paddingLeft: '12px',
      borderLeft: `4px solid ${colors.primary}`,
    },
    headerRight: {
      display: 'flex',
      gap: '12px',
    },
    searchBox: {
      display: 'flex',
      alignItems: 'center',
      background: colors.surface,
      border: `1px solid ${colors.border}`,
      borderRadius: '8px',
      padding: '8px 12px',
      gap: '8px',
    },
    searchInput: {
      border: 'none',
      background: 'transparent',
      outline: 'none',
      color: colors.text,
      fontSize: '14px',
      width: '200px',
    },
    addBtn: {
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
      padding: '10px 20px',
      background: colors.primaryGradient,
      color: colors.textInverse,
      border: 'none',
      borderRadius: '8px',
      fontSize: '14px',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      boxShadow: '0 2px 8px rgba(255, 77, 79, 0.25)',
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
    content: {
      display: 'flex',
      flexDirection: 'column',
      gap: '24px',
    },
    statsRow: {
      display: 'grid',
      gridTemplateColumns: 'repeat(3, 1fr)',
      gap: '16px',
    },
    statCard: {
      background: colors.surface,
      borderRadius: '12px',
      padding: '20px',
      display: 'flex',
      alignItems: 'center',
      gap: '16px',
      boxShadow: colors.cardShadow,
      border: `1px solid ${colors.border}`,
    },
    statIconBox: {
      width: '48px',
      height: '48px',
      borderRadius: '12px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    statInfo: {
      flex: 1,
    },
    statValue: {
      fontSize: '24px',
      fontWeight: '600',
      color: colors.text,
    },
    statLabel: {
      fontSize: '13px',
      color: colors.textMuted,
      marginTop: '4px',
    },
    tableCard: {
      background: colors.surface,
      borderRadius: '12px',
      boxShadow: colors.cardShadow,
      border: `1px solid ${colors.border}`,
      overflow: 'hidden',
    },
    logsCard: {
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
      fontSize: '13px',
      fontWeight: '600',
      color: colors.textSecondary,
      background: colors.tableHeader,
      borderBottom: `1px solid ${colors.border}`,
      whiteSpace: 'nowrap',
    },
    td: {
      padding: '14px 16px',
      fontSize: '14px',
      color: colors.text,
      borderBottom: `1px solid ${colors.border}`,
    },
    tr: {
      transition: 'background 0.25s',
    },
    trHover: {
      background: colors.surfaceHover,
    },
    avatar: {
      width: '32px',
      height: '32px',
      borderRadius: '50%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: '14px',
      fontWeight: '600',
    },
    levelBadge: {
      padding: '4px 12px',
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
    actionBtns: {
      display: 'flex',
      gap: '8px',
    },
    actionBtn: {
      padding: '6px 10px',
      background: colors.surfaceHover,
      border: 'none',
      borderRadius: '6px',
      cursor: 'pointer',
      color: colors.textSecondary,
      transition: 'all 0.25s',
    },
    pagination: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      gap: '8px',
      padding: '16px',
      borderTop: `1px solid ${colors.border}`,
    },
    paginationBtn: {
      padding: '8px 16px',
      background: 'transparent',
      border: `1px solid ${colors.border}`,
      borderRadius: '6px',
      color: colors.textSecondary,
      cursor: 'pointer',
      transition: 'all 0.25s',
    },
    activePaginationBtn: {
      background: colors.primaryGradient,
      borderColor: colors.primary,
      color: colors.textInverse,
    },
    levelGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(4, 1fr)',
      gap: '20px',
    },
    levelCard: {
      background: colors.surface,
      borderRadius: '12px',
      padding: '24px',
      boxShadow: colors.cardShadow,
      border: `1px solid ${colors.border}`,
      textAlign: 'center',
    },
    levelIcon: {
      width: '64px',
      height: '64px',
      borderRadius: '50%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      margin: '0 auto 16px',
    },
    levelTitle: {
      fontSize: '16px',
      fontWeight: '600',
      color: colors.text,
      margin: 0,
      marginBottom: '8px',
    },
    levelDesc: {
      fontSize: '13px',
      color: colors.textMuted,
      margin: 0,
      marginBottom: '16px',
    },
    levelStats: {
      display: 'flex',
      justifyContent: 'center',
      gap: '32px',
      marginBottom: '16px',
    },
    levelStatValue: {
      fontSize: '18px',
      fontWeight: '600',
      color: colors.text,
    },
    levelStatLabel: {
      fontSize: '12px',
      color: colors.textMuted,
    },
    levelBtn: {
      padding: '8px 20px',
      background: colors.surfaceHover,
      border: `1px solid ${colors.border}`,
      borderRadius: '6px',
      color: colors.textSecondary,
      cursor: 'pointer',
      fontSize: '13px',
    },
    labelSection: {
      background: colors.surface,
      borderRadius: '12px',
      padding: '20px',
      boxShadow: colors.cardShadow,
      border: `1px solid ${colors.border}`,
    },
    labelHeader: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: '16px',
    },
    labelTitle: {
      fontSize: '16px',
      fontWeight: '600',
      color: colors.text,
      margin: 0,
    },
    addLabelBtn: {
      display: 'flex',
      alignItems: 'center',
      gap: '6px',
      padding: '6px 14px',
      background: colors.primaryGradient,
      color: colors.textInverse,
      border: 'none',
      borderRadius: '6px',
      cursor: 'pointer',
      fontSize: '13px',
    },
    labelGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
      gap: '12px',
    },
    labelCard: {
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
      padding: '10px 12px',
      background: colors.surfaceHover,
      borderRadius: '8px',
    },
    labelDot: {
      width: '8px',
      height: '8px',
      borderRadius: '50%',
    },
    labelName: {
      flex: 1,
      fontSize: '14px',
      color: colors.text,
    },
    labelCount: {
      fontSize: '12px',
      color: colors.textMuted,
    },
    labelDelete: {
      background: 'transparent',
      border: 'none',
      cursor: 'pointer',
      color: colors.textMuted,
      padding: '2px',
      display: 'flex',
      alignItems: 'center',
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
      padding: '20px',
    },
    modal: {
      background: colors.surface,
      borderRadius: '12px',
      width: '100%',
      maxWidth: '560px',
      maxHeight: '90vh',
      overflow: 'auto',
      boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3)',
    },
    modalHeader: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '20px 24px',
      borderBottom: `1px solid ${colors.border}`,
    },
    modalTitle: {
      fontSize: '18px',
      fontWeight: '600',
      color: colors.text,
      margin: 0,
    },
    modalClose: {
      background: 'transparent',
      border: 'none',
      cursor: 'pointer',
      color: colors.textMuted,
      padding: '4px',
      display: 'flex',
      alignItems: 'center',
    },
    modalBody: {
      padding: '24px',
    },
    modalFooter: {
      display: 'flex',
      justifyContent: 'flex-end',
      gap: '12px',
      padding: '16px 24px',
      borderTop: `1px solid ${colors.border}`,
    },
    btnPrimary: {
      padding: '10px 20px',
      background: colors.primaryGradient,
      color: colors.textInverse,
      border: 'none',
      borderRadius: '8px',
      fontSize: '14px',
      fontWeight: '500',
      cursor: 'pointer',
    },
    btnSecondary: {
      padding: '10px 20px',
      background: 'transparent',
      color: colors.textSecondary,
      border: `1px solid ${colors.border}`,
      borderRadius: '8px',
      fontSize: '14px',
      fontWeight: '500',
      cursor: 'pointer',
    },
    btnDanger: {
      padding: '10px 20px',
      background: colors.error,
      color: colors.textInverse,
      border: 'none',
      borderRadius: '8px',
      fontSize: '14px',
      fontWeight: '500',
      cursor: 'pointer',
    },
    detailRow: {
      display: 'flex',
      padding: '10px 0',
      borderBottom: `1px solid ${colors.border}`,
    },
    detailLabel: {
      width: '100px',
      fontSize: '13px',
      color: colors.textMuted,
    },
    detailValue: {
      flex: 1,
      fontSize: '14px',
      color: colors.text,
    },
  };
}

function CustomerManage() {
  return (
    <AdminLayout activeModule="customerManage">
      <CustomerManageContent />
    </AdminLayout>
  );
}

export default CustomerManage;
