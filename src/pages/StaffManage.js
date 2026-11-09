import React, { useState, useMemo } from 'react';
import { useTheme } from '../context/ThemeContext';
import LinearIcons from '../components/LinearIcons';
import AdminLayout from '../components/AdminLayout';

function StaffManageContent() {
  const { theme } = useTheme();
  const colors = theme.colors;
  const styles = getStyles(colors);

  const [activeTab, setActiveTab] = useState('list');
  const [searchKeyword, setSearchKeyword] = useState('');
  const [hoveredRow, setHoveredRow] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 5;

  const [staff, setStaff] = useState([
    { id: 1, name: '管理员', account: 'admin', role: '超级管理员', department: '管理层', status: 'active', locked: false, lastLogin: '2024-03-15 10:30' },
    { id: 2, name: '张三', account: 'zhangsan', role: '运营专员', department: '运营部', status: 'active', locked: false, lastLogin: '2024-03-15 09:15' },
    { id: 3, name: '李四', account: 'lisi', role: '客服专员', department: '客服部', status: 'active', locked: false, lastLogin: '2024-03-14 16:45' },
    { id: 4, name: '王五', account: 'wangwu', role: '财务专员', department: '财务部', status: 'inactive', locked: false, lastLogin: '2024-03-10 14:20' },
    { id: 5, name: '赵六', account: 'zhaoliu', role: '仓库管理员', department: '仓储部', status: 'active', locked: false, lastLogin: '2024-03-15 08:00' },
    { id: 6, name: '孙七', account: 'sunqi', role: '运营专员', department: '运营部', status: 'active', locked: false, lastLogin: '2024-03-14 11:00' },
  ]);

  const [roles] = useState([
    { id: 1, name: '超级管理员', permissions: ['全部权限'], count: 1 },
    { id: 2, name: '运营专员', permissions: ['商品管理', '订单管理', '活动管理'], count: 3 },
    { id: 3, name: '客服专员', permissions: ['客户管理', '订单处理', '售后处理'], count: 2 },
    { id: 4, name: '财务专员', permissions: ['订单统计', '财务报表'], count: 1 },
    { id: 5, name: '仓库管理员', permissions: ['库存管理', '发货管理'], count: 1 },
  ]);

  const [logs, setLogs] = useState([
    { id: 1, time: '2024-03-15 10:30', user: '管理员', action: '登录系统', ip: '192.168.1.100' },
    { id: 2, time: '2024-03-15 09:45', user: '张三', action: '新增商品「玫瑰」', ip: '192.168.1.101' },
    { id: 3, time: '2024-03-15 09:30', user: '李四', action: '处理订单 #12345', ip: '192.168.1.102' },
    { id: 4, time: '2024-03-15 08:15', user: '赵六', action: '更新库存', ip: '192.168.1.103' },
    { id: 5, time: '2024-03-14 16:45', user: '王五', action: '导出财务报表', ip: '192.168.1.104' },
  ]);

  const [showModal, setShowModal] = useState(false);
  const [modalMode, setModalMode] = useState('add');
  const [formData, setFormData] = useState({
    name: '',
    account: '',
    role: '运营专员',
    department: '运营部',
    password: '',
  });
  const [editingId, setEditingId] = useState(null);
  const [formError, setFormError] = useState('');

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState(null);

  const [showLockModal, setShowLockModal] = useState(false);
  const [lockTarget, setLockTarget] = useState(null);

  const [showViewModal, setShowViewModal] = useState(false);
  const [viewTarget, setViewTarget] = useState(null);

  const filteredStaff = useMemo(() => {
    if (!searchKeyword) return staff;
    return staff.filter(s =>
      s.name.includes(searchKeyword) ||
      s.account.includes(searchKeyword) ||
      s.role.includes(searchKeyword) ||
      s.department.includes(searchKeyword)
    );
  }, [staff, searchKeyword]);

  const totalPages = Math.max(1, Math.ceil(filteredStaff.length / pageSize));
  const safePage = Math.min(currentPage, totalPages);
  const paginated = filteredStaff.slice((safePage - 1) * pageSize, safePage * pageSize);

  const stats = useMemo(() => {
    const total = staff.length;
    const online = staff.filter(s => s.status === 'active' && !s.locked).length;
    const roleCount = new Set(staff.map(s => s.role)).size;
    return { total, online, roleCount };
  }, [staff]);

  const addLog = (action, target) => {
    const now = new Date();
    const time = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')} ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
    setLogs(prev => [{
      id: prev.length > 0 ? Math.max(...prev.map(l => l.id)) + 1 : 1,
      time,
      user: '管理员',
      action,
      ip: '192.168.1.100',
    }, ...prev]);
  };

  const openAddModal = () => {
    setModalMode('add');
    setFormData({ name: '', account: '', role: '运营专员', department: '运营部', password: '' });
    setEditingId(null);
    setFormError('');
    setShowModal(true);
  };

  const openEditModal = (member) => {
    setModalMode('edit');
    setFormData({
      name: member.name,
      account: member.account,
      role: member.role,
      department: member.department,
      password: '',
    });
    setEditingId(member.id);
    setFormError('');
    setShowModal(true);
  };

  const validateForm = () => {
    if (!formData.name.trim()) {
      setFormError('请输入员工姓名');
      return false;
    }
    if (!formData.account.trim()) {
      setFormError('请输入登录账号');
      return false;
    }
    if (modalMode === 'add') {
      const exists = staff.some(s => s.account === formData.account);
      if (exists) {
        setFormError('该账号已存在');
        return false;
      }
      if (!formData.password || formData.password.length < 6) {
        setFormError('初始密码至少6位');
        return false;
      }
    }
    if (!formData.role) {
      setFormError('请选择角色');
      return false;
    }
    if (!formData.department) {
      setFormError('请选择部门');
      return false;
    }
    return true;
  };

  const handleSubmit = () => {
    if (!validateForm()) return;

    if (modalMode === 'add') {
      const newId = staff.length > 0 ? Math.max(...staff.map(s => s.id)) + 1 : 1;
      const now = new Date();
      const lastLogin = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')} ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
      const newStaff = {
        id: newId,
        name: formData.name,
        account: formData.account,
        role: formData.role,
        department: formData.department,
        status: 'inactive',
        locked: false,
        lastLogin,
      };
      setStaff(prev => [newStaff, ...prev]);
      addLog(`添加员工「${formData.name}」，角色：${formData.role}`, null);
    } else {
      const oldMember = staff.find(s => s.id === editingId);
      setStaff(prev => prev.map(s => s.id === editingId ? {
        ...s,
        name: formData.name,
        account: formData.account,
        role: formData.role,
        department: formData.department,
      } : s));
      if (oldMember && oldMember.role !== formData.role) {
        addLog(`修改员工「${formData.name}」角色：${oldMember.role} → ${formData.role}`, null);
      } else {
        addLog(`编辑员工「${formData.name}」信息`, null);
      }
    }
    setShowModal(false);
    setFormError('');
  };

  const openDeleteModal = (member) => {
    setDeleteTarget(member);
    setShowDeleteModal(true);
  };

  const confirmDelete = () => {
    if (deleteTarget) {
      setStaff(prev => prev.filter(s => s.id !== deleteTarget.id));
      addLog(`删除员工「${deleteTarget.name}」`, null);
    }
    setShowDeleteModal(false);
    setDeleteTarget(null);
  };

  const openLockModal = (member) => {
    setLockTarget(member);
    setShowLockModal(true);
  };

  const confirmLock = () => {
    if (lockTarget) {
      const willLock = !lockTarget.locked;
      setStaff(prev => prev.map(s => s.id === lockTarget.id ? { ...s, locked: willLock } : s));
      addLog(`${willLock ? '锁定' : '解锁'}员工账号「${lockTarget.account}」`, null);
    }
    setShowLockModal(false);
    setLockTarget(null);
  };

  const openViewModal = (member) => {
    setViewTarget(member);
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

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <div style={styles.headerLeft}>
          <h1 style={styles.title}>员工/权限管理</h1>
        </div>
        <div style={styles.headerRight}>
          <div style={styles.searchBox}>
            <LinearIcons.search style={{ width: '16px', height: '16px', color: colors.textMuted }} />
            <input
              type="text"
              placeholder="搜索员工..."
              value={searchKeyword}
              onChange={(e) => { setSearchKeyword(e.target.value); setCurrentPage(1); }}
              style={styles.searchInput}
            />
          </div>
          <button style={styles.addBtn} onClick={openAddModal}>
            <LinearIcons.plus style={{ width: '16px', height: '16px' }} />
            添加员工
          </button>
        </div>
      </div>

      <div style={styles.tabBar}>
        {[
          { id: 'list', label: '管理员列表', icon: 'users' },
          { id: 'roles', label: '角色权限', icon: 'shield' },
          { id: 'logs', label: '操作日志', icon: 'history' },
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
                <div style={styles.statLabel}>总员工数</div>
              </div>
            </div>
            <div style={styles.statCard}>
              <div style={{...styles.statIconBox, backgroundColor: colors.successBg}}>
                <LinearIcons.activity style={{ width: '20px', height: '20px', color: colors.success }} />
              </div>
              <div style={styles.statInfo}>
                <div style={styles.statValue}>{stats.online}</div>
                <div style={styles.statLabel}>在线员工</div>
              </div>
            </div>
            <div style={styles.statCard}>
              <div style={{...styles.statIconBox, backgroundColor: colors.warningBg}}>
                <LinearIcons.shield style={{ width: '20px', height: '20px', color: colors.warning }} />
              </div>
              <div style={styles.statInfo}>
                <div style={styles.statValue}>{stats.roleCount}</div>
                <div style={styles.statLabel}>角色数量</div>
              </div>
            </div>
          </div>

          <div style={styles.tableCard}>
            <table style={styles.table}>
              <thead>
                <tr>
                  <th style={styles.th}>员工ID</th>
                  <th style={styles.th}>姓名</th>
                  <th style={styles.th}>账号</th>
                  <th style={styles.th}>角色</th>
                  <th style={styles.th}>部门</th>
                  <th style={styles.th}>状态</th>
                  <th style={styles.th}>最后登录</th>
                  <th style={styles.th}>操作</th>
                </tr>
              </thead>
              <tbody>
                {paginated.length === 0 ? (
                  <tr>
                    <td colSpan="8" style={{ ...styles.td, textAlign: 'center', color: colors.textMuted, padding: '40px 0' }}>
                      暂无员工数据
                    </td>
                  </tr>
                ) : (
                  paginated.map((item, idx) => (
                    <tr
                      key={item.id}
                      style={{
                        ...styles.tr,
                        ...(hoveredRow === idx ? styles.trHover : {}),
                      }}
                      onMouseEnter={() => setHoveredRow(idx)}
                      onMouseLeave={() => setHoveredRow(null)}
                    >
                      <td style={styles.td}>#{item.id.toString().padStart(6, '0')}</td>
                      <td style={styles.td}>
                        <div style={styles.staffName}>
                          <div style={styles.avatar}>{item.name.charAt(0)}</div>
                          <span>{item.name}</span>
                        </div>
                      </td>
                      <td style={styles.td}>{item.account}</td>
                      <td style={styles.td}>
                        <span style={{
                          ...styles.roleBadge,
                          backgroundColor: item.role === '超级管理员' ? colors.primaryBg : colors.surfaceHover,
                          color: item.role === '超级管理员' ? colors.primary : colors.textSecondary,
                        }}>
                          {item.role}
                        </span>
                      </td>
                      <td style={styles.td}>{item.department}</td>
                      <td style={styles.td}>
                        {item.locked ? (
                          <span style={{
                            ...styles.statusBadge,
                            backgroundColor: colors.errorBg,
                            color: colors.error,
                          }}>
                            已锁定
                          </span>
                        ) : (
                          <span style={{
                            ...styles.statusBadge,
                            backgroundColor: item.status === 'active' ? colors.successBg : colors.warningBg,
                            color: item.status === 'active' ? colors.success : colors.warning,
                          }}>
                            {item.status === 'active' ? '在线' : '离线'}
                          </span>
                        )}
                      </td>
                      <td style={styles.td}>{item.lastLogin}</td>
                      <td style={styles.td}>
                        <div style={styles.actionBtns}>
                          <button style={styles.actionBtn} onClick={() => openViewModal(item)} title="查看">
                            <LinearIcons.eye style={{ width: '14px', height: '14px' }} />
                          </button>
                          <button style={styles.actionBtn} onClick={() => openEditModal(item)} title="编辑">
                            <LinearIcons.edit style={{ width: '14px', height: '14px' }} />
                          </button>
                          <button
                            style={{...styles.actionBtn, color: item.locked ? colors.success : colors.warning}}
                            onClick={() => openLockModal(item)}
                            title={item.locked ? '解锁' : '锁定'}
                          >
                            {item.locked ? <LinearIcons.unlock style={{ width: '14px', height: '14px' }} /> : <LinearIcons.lock style={{ width: '14px', height: '14px' }} />}
                          </button>
                          <button style={{...styles.actionBtn, color: colors.error}} onClick={() => openDeleteModal(item)} title="删除">
                            <LinearIcons.delete style={{ width: '14px', height: '14px' }} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
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

      {activeTab === 'roles' && (
        <div style={styles.content}>
          <div style={styles.roleGrid}>
            {roles.map((role) => (
              <div key={role.id} style={styles.roleCard}>
                <div style={styles.roleHeader}>
                  <div style={styles.roleIcon}>
                    <LinearIcons.shield style={{ width: '20px', height: '20px', color: colors.primary }} />
                  </div>
                  <div>
                    <h3 style={styles.roleName}>{role.name}</h3>
                    <p style={styles.roleCount}>{role.count} 人拥有此角色</p>
                  </div>
                </div>
                <div style={styles.permissionsList}>
                  <span style={styles.permissionsLabel}>权限列表:</span>
                  <div style={styles.permissionsBadges}>
                    {role.permissions.map((perm, idx) => (
                      <span key={idx} style={styles.permissionBadge}>{perm}</span>
                    ))}
                  </div>
                </div>
                <div style={styles.roleActions}>
                  <button style={styles.roleActionBtn}>编辑权限</button>
                  <button style={{...styles.roleActionBtn, background: colors.primaryGradient, color: colors.textInverse}}>分配角色</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'logs' && (
        <div style={styles.content}>
          <div style={styles.logsCard}>
            <table style={styles.table}>
              <thead>
                <tr>
                  <th style={styles.th}>时间</th>
                  <th style={styles.th}>操作人</th>
                  <th style={styles.th}>操作内容</th>
                  <th style={styles.th}>IP地址</th>
                </tr>
              </thead>
              <tbody>
                {logs.length === 0 ? (
                  <tr>
                    <td colSpan="4" style={{ ...styles.td, textAlign: 'center', color: colors.textMuted, padding: '40px 0' }}>
                      暂无操作日志
                    </td>
                  </tr>
                ) : (
                  logs.map((log, idx) => (
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
                      <td style={styles.td}>
                        <div style={styles.logUser}>
                          <div style={styles.smallAvatar}>{log.user.charAt(0)}</div>
                          <span>{log.user}</span>
                        </div>
                      </td>
                      <td style={styles.td}>{log.action}</td>
                      <td style={styles.td}>{log.ip}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {showModal && (
        <div style={styles.modalOverlay} onClick={() => { setShowModal(false); setFormError(''); }}>
          <div style={styles.modal} onClick={(e) => e.stopPropagation()}>
            <div style={styles.modalHeader}>
              <h3 style={styles.modalTitle}>
                {modalMode === 'add' ? '添加员工' : '编辑员工'}
              </h3>
              <button style={styles.modalClose} onClick={() => { setShowModal(false); setFormError(''); }}>
                <LinearIcons.x style={{ width: '18px', height: '18px' }} />
              </button>
            </div>
            <div style={styles.modalBody}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '16px' }}>
                <div>
                  <label style={labelStyle}>姓名 *</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="员工姓名"
                    style={inputStyle}
                  />
                </div>
                <div>
                  <label style={labelStyle}>登录账号 *</label>
                  <input
                    type="text"
                    value={formData.account}
                    onChange={(e) => setFormData({ ...formData, account: e.target.value })}
                    placeholder="英文账号"
                    style={inputStyle}
                    disabled={modalMode === 'edit'}
                  />
                </div>
              </div>
              {modalMode === 'add' && (
                <div style={{ marginBottom: '16px' }}>
                  <label style={labelStyle}>初始密码 * <span style={{ color: colors.textMuted, fontWeight: 'normal' }}>(至少6位)</span></label>
                  <input
                    type="password"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    placeholder="员工初始登录密码"
                    style={inputStyle}
                  />
                </div>
              )}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '8px' }}>
                <div>
                  <label style={labelStyle}>角色 *</label>
                  <select
                    value={formData.role}
                    onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                    style={inputStyle}
                  >
                    <option value="超级管理员">超级管理员</option>
                    <option value="运营专员">运营专员</option>
                    <option value="客服专员">客服专员</option>
                    <option value="财务专员">财务专员</option>
                    <option value="仓库管理员">仓库管理员</option>
                  </select>
                </div>
                <div>
                  <label style={labelStyle}>部门 *</label>
                  <select
                    value={formData.department}
                    onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                    style={inputStyle}
                  >
                    <option value="管理层">管理层</option>
                    <option value="运营部">运营部</option>
                    <option value="客服部">客服部</option>
                    <option value="财务部">财务部</option>
                    <option value="仓储部">仓储部</option>
                  </select>
                </div>
              </div>
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
              <h3 style={styles.modalTitle}>删除员工</h3>
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
                    确认删除员工「<strong>{deleteTarget.name}</strong>」？
                  </div>
                  <div style={{ color: colors.textMuted, fontSize: '13px' }}>
                    删除后将保留操作日志记录，但员工将无法继续登录系统。
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

      {showLockModal && lockTarget && (
        <div style={styles.modalOverlay} onClick={() => setShowLockModal(false)}>
          <div style={{ ...styles.modal, maxWidth: '420px' }} onClick={(e) => e.stopPropagation()}>
            <div style={styles.modalHeader}>
              <h3 style={styles.modalTitle}>{lockTarget.locked ? '解锁账号' : '锁定账号'}</h3>
              <button style={styles.modalClose} onClick={() => setShowLockModal(false)}>
                <LinearIcons.x style={{ width: '18px', height: '18px' }} />
              </button>
            </div>
            <div style={styles.modalBody}>
              <div style={{ color: colors.text, fontSize: '14px', marginBottom: '8px' }}>
                {lockTarget.locked
                  ? `确认解锁员工「${lockTarget.name}」的账号吗？解锁后该员工可正常登录系统。`
                  : `确认锁定员工「${lockTarget.name}」的账号吗？锁定后该员工将无法登录系统。`}
              </div>
              <div style={{ color: colors.textMuted, fontSize: '13px' }}>
                此操作将记录在操作日志中。
              </div>
            </div>
            <div style={styles.modalFooter}>
              <button style={styles.btnSecondary} onClick={() => setShowLockModal(false)}>取消</button>
              <button style={lockTarget.locked ? styles.btnPrimary : styles.btnDanger} onClick={confirmLock}>
                {lockTarget.locked ? '确认解锁' : '确认锁定'}
              </button>
            </div>
          </div>
        </div>
      )}

      {showViewModal && viewTarget && (
        <div style={styles.modalOverlay} onClick={() => setShowViewModal(false)}>
          <div style={{ ...styles.modal, maxWidth: '520px' }} onClick={(e) => e.stopPropagation()}>
            <div style={styles.modalHeader}>
              <h3 style={styles.modalTitle}>员工详情</h3>
              <button style={styles.modalClose} onClick={() => setShowViewModal(false)}>
                <LinearIcons.x style={{ width: '18px', height: '18px' }} />
              </button>
            </div>
            <div style={styles.modalBody}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px', padding: '12px', background: colors.surfaceHover, borderRadius: '8px' }}>
                <div style={{...styles.avatar, width: '48px', height: '48px', fontSize: '18px'}}>{viewTarget.name.charAt(0)}</div>
                <div>
                  <div style={{ fontSize: '16px', fontWeight: '600', color: colors.text }}>{viewTarget.name}</div>
                  <div style={{ fontSize: '13px', color: colors.textMuted }}>@{viewTarget.account}</div>
                </div>
              </div>
              <div style={styles.detailRow}>
                <span style={styles.detailLabel}>员工ID</span>
                <span style={styles.detailValue}>#{viewTarget.id.toString().padStart(6, '0')}</span>
              </div>
              <div style={styles.detailRow}>
                <span style={styles.detailLabel}>角色</span>
                <span style={styles.detailValue}>{viewTarget.role}</span>
              </div>
              <div style={styles.detailRow}>
                <span style={styles.detailLabel}>部门</span>
                <span style={styles.detailValue}>{viewTarget.department}</span>
              </div>
              <div style={styles.detailRow}>
                <span style={styles.detailLabel}>账号状态</span>
                <span style={styles.detailValue}>{viewTarget.locked ? '已锁定' : '正常'}</span>
              </div>
              <div style={styles.detailRow}>
                <span style={styles.detailLabel}>最后登录</span>
                <span style={styles.detailValue}>{viewTarget.lastLogin}</span>
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
    staffName: {
      display: 'flex',
      alignItems: 'center',
      gap: '10px',
    },
    avatar: {
      width: '32px',
      height: '32px',
      borderRadius: '50%',
      background: colors.primaryGradient,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: '14px',
      fontWeight: '600',
      color: colors.textInverse,
    },
    smallAvatar: {
      width: '24px',
      height: '24px',
      borderRadius: '50%',
      background: colors.surfaceHover,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: '12px',
      color: colors.textSecondary,
    },
    logUser: {
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
    },
    roleBadge: {
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
    roleGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(2, 1fr)',
      gap: '20px',
    },
    roleCard: {
      background: colors.surface,
      borderRadius: '12px',
      padding: '20px',
      boxShadow: colors.cardShadow,
      border: `1px solid ${colors.border}`,
    },
    roleHeader: {
      display: 'flex',
      alignItems: 'center',
      gap: '12px',
      marginBottom: '16px',
    },
    roleIcon: {
      width: '44px',
      height: '44px',
      background: colors.primaryBg,
      borderRadius: '10px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    roleName: {
      fontSize: '16px',
      fontWeight: '600',
      color: colors.text,
      margin: 0,
    },
    roleCount: {
      fontSize: '12px',
      color: colors.textMuted,
      margin: '2px 0 0 0',
    },
    permissionsList: {
      marginBottom: '16px',
    },
    permissionsLabel: {
      fontSize: '13px',
      color: colors.textMuted,
      marginBottom: '8px',
      display: 'block',
    },
    permissionsBadges: {
      display: 'flex',
      flexWrap: 'wrap',
      gap: '6px',
    },
    permissionBadge: {
      padding: '3px 10px',
      background: colors.surfaceHover,
      color: colors.textSecondary,
      borderRadius: '12px',
      fontSize: '12px',
    },
    roleActions: {
      display: 'flex',
      gap: '8px',
    },
    roleActionBtn: {
      flex: 1,
      padding: '8px 12px',
      background: 'transparent',
      border: `1px solid ${colors.border}`,
      borderRadius: '6px',
      color: colors.textSecondary,
      cursor: 'pointer',
      fontSize: '13px',
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

function StaffManage() {
  return (
    <AdminLayout activeModule="staffManage">
      <StaffManageContent />
    </AdminLayout>
  );
}

export default StaffManage;
