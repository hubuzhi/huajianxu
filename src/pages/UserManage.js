import React, { useState } from 'react';
import { useTheme } from '../context/ThemeContext';
import LinearIcons from '../components/LinearIcons';
import AdminLayout from '../components/AdminLayout';

function UserManageContent() {
  const { theme } = useTheme();
  const colors = theme.colors;
  
  const [activeTab, setActiveTab] = useState('list');
  const [searchKeyword, setSearchKeyword] = useState('');
  const [selectedRole, setSelectedRole] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedItems, setSelectedItems] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [showPermissionModal, setShowPermissionModal] = useState(false);
  const [formData, setFormData] = useState({
    username: '',
    nickname: '',
    email: '',
    phone: '',
    role: 'user',
    status: 'active',
  });
  const [formErrors, setFormErrors] = useState({});
  const [detailData, setDetailData] = useState(null);
  const [hoveredRow, setHoveredRow] = useState(null);
  const [permissions, setPermissions] = useState({
    dashboard: true,
    flowerManage: true,
    userManage: false,
    contentReview: false,
    commentManage: false,
    orderManage: false,
    systemSettings: false,
    dataReports: false,
  });

  const styles = getStyles(colors);

  const roles = [
    { value: 'admin', label: '管理员' },
    { value: 'editor', label: '编辑' },
    { value: 'user', label: '普通用户' },
  ];

  const permissionList = [
    { key: 'dashboard', label: '数据总览' },
    { key: 'flowerManage', label: '花卉信息管理' },
    { key: 'userManage', label: '用户管理' },
    { key: 'contentReview', label: '内容审核/管理' },
    { key: 'commentManage', label: '评论/社区管理' },
    { key: 'orderManage', label: '订单/收藏管理' },
    { key: 'systemSettings', label: '系统设置' },
    { key: 'dataReports', label: '数据统计报表' },
  ];

  const usersData = [
    { id: 1, username: 'admin', nickname: '管理员', email: 'admin@flower.com', phone: '13800138000', role: 'admin', status: 'active', createTime: '2024-01-01', lastLogin: '2024-03-15 10:30' },
    { id: 2, username: 'editor', nickname: '小花编辑', email: 'editor@flower.com', phone: '13800138001', role: 'editor', status: 'active', createTime: '2024-01-10', lastLogin: '2024-03-14 15:20' },
    { id: 3, username: 'user001', nickname: '花园小王子', email: 'user001@flower.com', phone: '13800138002', role: 'user', status: 'active', createTime: '2024-01-15', lastLogin: '2024-03-13 09:15' },
    { id: 4, username: 'user002', nickname: '养花新手', email: 'user002@flower.com', phone: '13800138003', role: 'user', status: 'inactive', createTime: '2024-01-18', lastLogin: '2024-02-28 14:45' },
    { id: 5, username: 'user003', nickname: '爱花人士', email: 'user003@flower.com', phone: '13800138004', role: 'user', status: 'active', createTime: '2024-01-20', lastLogin: '2024-03-15 08:00' },
    { id: 6, username: 'user004', nickname: '花艺师', email: 'user004@flower.com', phone: '13800138005', role: 'user', status: 'active', createTime: '2024-01-22', lastLogin: '2024-03-14 11:30' },
    { id: 7, username: 'user005', nickname: '花仙子', email: 'user005@flower.com', phone: '13800138006', role: 'user', status: 'inactive', createTime: '2024-01-25', lastLogin: '2024-02-15 16:00' },
    { id: 8, username: 'user006', nickname: '赏花客', email: 'user006@flower.com', phone: '13800138007', role: 'user', status: 'active', createTime: '2024-01-28', lastLogin: '2024-03-12 10:15' },
  ];

  const filteredUsers = usersData.filter(user => {
    const matchKeyword = user.username.includes(searchKeyword) || user.nickname.includes(searchKeyword) || user.email.includes(searchKeyword);
    const matchRole = !selectedRole || user.role === selectedRole;
    const matchStatus = !selectedStatus || user.status === selectedStatus;
    return matchKeyword && matchRole && matchStatus;
  });

  const totalPages = Math.ceil(filteredUsers.length / 4);
  const paginatedUsers = filteredUsers.slice((currentPage - 1) * 4, currentPage * 4);

  const validateForm = () => {
    const errors = {};
    if (!formData.username.trim()) errors.username = '请输入用户名';
    if (!formData.nickname.trim()) errors.nickname = '请输入昵称';
    if (!formData.email.trim()) {
      errors.email = '请输入邮箱';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = '请输入有效的邮箱地址';
    }
    if (!formData.phone.trim()) {
      errors.phone = '请输入手机号';
    } else if (!/^1[3-9]\d{9}$/.test(formData.phone)) {
      errors.phone = '请输入有效的手机号';
    }
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = () => {
    if (validateForm()) {
      alert(isEdit ? '修改成功！' : '新增成功！');
      setShowModal(false);
      setFormData({ username: '', nickname: '', email: '', phone: '', role: 'user', status: 'active' });
      setIsEdit(false);
    }
  };

  const handleEdit = (user) => {
    setFormData(user);
    setIsEdit(true);
    setShowModal(true);
  };

  const handleViewDetail = (user) => {
    setDetailData(user);
    setShowDetailModal(true);
  };

  const handleBatchDelete = () => {
    if (selectedItems.length > 0) {
      alert(`已删除 ${selectedItems.length} 条记录`);
      setSelectedItems([]);
    } else {
      alert('请选择要删除的记录');
    }
  };

  const handleBatchStatus = (status) => {
    if (selectedItems.length > 0) {
      const statusText = status === 'active' ? '启用' : '禁用';
      alert(`已${statusText} ${selectedItems.length} 条记录`);
      setSelectedItems([]);
    } else {
      alert('请选择要操作的记录');
    }
  };

  const toggleSelectAll = () => {
    if (selectedItems.length === paginatedUsers.length) {
      setSelectedItems([]);
    } else {
      setSelectedItems(paginatedUsers.map(u => u.id));
    }
  };

  const getRoleColor = (role) => {
    switch(role) {
      case 'admin': return { bg: '#722ed120', color: '#722ed1' };
      case 'editor': return { bg: colors.infoBg, color: colors.info };
      default: return { bg: colors.tableStripe, color: colors.textSecondary };
    }
  };

  const getRoleLabel = (role) => {
    return roles.find(r => r.value === role)?.label || role;
  };

  const getStatusColor = (status) => {
    return status === 'active' 
      ? { bg: colors.successBg, color: colors.success }
      : { bg: colors.warningBg, color: colors.warning };
  };

  const getStatusLabel = (status) => {
    return status === 'active' ? '正常' : '禁用';
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <div style={styles.headerLeft}>
          <h2 style={styles.title}>用户管理</h2>
        </div>
        <div style={styles.headerRight}>
          <button 
            style={styles.exportBtn}
            onClick={() => alert('导出全部用户成功')}
          >
            <LinearIcons.download style={{ width: '14px', height: '14px', marginRight: '8px' }} />
            导出全部
          </button>
          <button 
            style={styles.addBtn}
            onClick={() => { setShowModal(true); setIsEdit(false); }}
          >
            <LinearIcons.plus style={{ width: '14px', height: '14px', marginRight: '8px' }} />
            新增用户
          </button>
        </div>
      </div>

      <div style={styles.filterSection}>
        <div style={styles.filterRow}>
          <input
            type="text"
            placeholder="搜索用户名、昵称或邮箱..."
            value={searchKeyword}
            onChange={(e) => { setSearchKeyword(e.target.value); setCurrentPage(1); }}
            style={styles.searchInput}
          />
          <select
            value={selectedRole}
            onChange={(e) => { setSelectedRole(e.target.value); setCurrentPage(1); }}
            style={styles.selectInput}
          >
            <option value="">全部角色</option>
            {roles.map(role => (
              <option key={role.value} value={role.value}>{role.label}</option>
            ))}
          </select>
          <select
            value={selectedStatus}
            onChange={(e) => { setSelectedStatus(e.target.value); setCurrentPage(1); }}
            style={styles.selectInput}
          >
            <option value="">全部状态</option>
            <option value="active">正常</option>
            <option value="inactive">禁用</option>
          </select>
        </div>

        {selectedItems.length > 0 && (
          <div style={styles.batchBar}>
            <span>已选择 {selectedItems.length} 条记录</span>
            <button style={{...styles.batchBtn, backgroundColor: colors.success}} onClick={() => handleBatchStatus('active')}>
              批量启用
            </button>
            <button style={{...styles.batchBtn, backgroundColor: colors.warning}} onClick={() => handleBatchStatus('inactive')}>
              批量禁用
            </button>
            <button style={{...styles.batchBtn, backgroundColor: colors.error}} onClick={handleBatchDelete}>
              批量删除
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
                  checked={selectedItems.length === paginatedUsers.length && paginatedUsers.length > 0}
                  onChange={toggleSelectAll}
                />
              </th>
              <th style={styles.th}>用户名</th>
              <th style={styles.th}>昵称</th>
              <th style={styles.th}>邮箱</th>
              <th style={styles.th}>手机号</th>
              <th style={styles.th}>角色</th>
              <th style={styles.th}>状态</th>
              <th style={styles.th}>创建时间</th>
              <th style={styles.th}>最后登录</th>
              <th style={styles.th}>操作</th>
            </tr>
          </thead>
          <tbody>
            {paginatedUsers.map(user => (
              <tr
                key={user.id}
                style={{
                  ...styles.tr,
                  ...(hoveredRow === user.id ? styles.trHover : {}),
                }}
                onMouseEnter={() => setHoveredRow(user.id)}
                onMouseLeave={() => setHoveredRow(null)}
              >
                <td style={styles.td}>
                  <input 
                    type="checkbox" 
                    checked={selectedItems.includes(user.id)}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setSelectedItems([...selectedItems, user.id]);
                      } else {
                        setSelectedItems(selectedItems.filter(id => id !== user.id));
                      }
                    }}
                  />
                </td>
                <td style={styles.td}><strong>{user.username}</strong></td>
                <td style={styles.td}>{user.nickname}</td>
                <td style={styles.td}>{user.email}</td>
                <td style={styles.td}>{user.phone}</td>
                <td style={styles.td}>
                  <span style={{
                    ...styles.roleBadge,
                    backgroundColor: getRoleColor(user.role).bg,
                    color: getRoleColor(user.role).color,
                  }}>
                    {getRoleLabel(user.role)}
                  </span>
                </td>
                <td style={styles.td}>
                  <span style={{
                    ...styles.statusBadge,
                    backgroundColor: getStatusColor(user.status).bg,
                    color: getStatusColor(user.status).color,
                  }}>
                    {getStatusLabel(user.status)}
                  </span>
                </td>
                <td style={styles.td}>{user.createTime}</td>
                <td style={styles.td}>{user.lastLogin}</td>
                <td style={styles.td}>
                  <button 
                    style={styles.actionBtn}
                    onClick={() => handleViewDetail(user)}
                  >查看</button>
                  <button 
                    style={{...styles.actionBtn, backgroundColor: colors.info}}
                    onClick={() => handleEdit(user)}
                  >编辑</button>
                  <button 
                    style={{...styles.actionBtn, backgroundColor: colors.error}}
                    onClick={() => alert(`用户 ${user.username} 已删除`)}
                  >删除</button>
                  {user.role !== 'admin' && (
                    <button 
                      style={{...styles.actionBtn, backgroundColor: user.status === 'active' ? colors.warning : colors.success}}
                      onClick={() => handleBatchStatus(user.status === 'active' ? 'inactive' : 'active')}
                    >
                      {user.status === 'active' ? '禁用' : '启用'}
                    </button>
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

      {showModal && (
        <div style={styles.modalOverlay} onClick={() => setShowModal(false)}>
          <div style={styles.modal} onClick={(e) => e.stopPropagation()}>
            <div style={styles.modalHeader}>
              <h3>{isEdit ? '编辑用户' : '新增用户'}</h3>
              <button style={styles.closeBtn} onClick={() => setShowModal(false)}>
                <LinearIcons.x style={{ width: '16px', height: '16px' }} />
              </button>
            </div>
            <div style={styles.modalBody}>
              <div style={styles.formRow}>
                <label style={styles.formLabel}>用户名</label>
                <input
                  type="text"
                  value={formData.username}
                  onChange={(e) => setFormData({...formData, username: e.target.value})}
                  style={{...styles.formInput, ...(formErrors.username ? styles.formInputError : {})}}
                  disabled={isEdit}
                />
                {formErrors.username && <span style={styles.errorText}>{formErrors.username}</span>}
              </div>
              <div style={styles.formRow}>
                <label style={styles.formLabel}>昵称</label>
                <input
                  type="text"
                  value={formData.nickname}
                  onChange={(e) => setFormData({...formData, nickname: e.target.value})}
                  style={{...styles.formInput, ...(formErrors.nickname ? styles.formInputError : {})}}
                />
                {formErrors.nickname && <span style={styles.errorText}>{formErrors.nickname}</span>}
              </div>
              <div style={styles.formRow}>
                <label style={styles.formLabel}>邮箱</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  style={{...styles.formInput, ...(formErrors.email ? styles.formInputError : {})}}
                />
                {formErrors.email && <span style={styles.errorText}>{formErrors.email}</span>}
              </div>
              <div style={styles.formRow}>
                <label style={styles.formLabel}>手机号</label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({...formData, phone: e.target.value})}
                  style={{...styles.formInput, ...(formErrors.phone ? styles.formInputError : {})}}
                />
                {formErrors.phone && <span style={styles.errorText}>{formErrors.phone}</span>}
              </div>
              <div style={styles.formRow}>
                <label style={styles.formLabel}>角色</label>
                <select
                  value={formData.role}
                  onChange={(e) => setFormData({...formData, role: e.target.value})}
                  style={styles.formInput}
                >
                  {roles.map(role => (
                    <option key={role.value} value={role.value}>{role.label}</option>
                  ))}
                </select>
              </div>
              <div style={styles.formRow}>
                <label style={styles.formLabel}>状态</label>
                <select
                  value={formData.status}
                  onChange={(e) => setFormData({...formData, status: e.target.value})}
                  style={styles.formInput}
                >
                  <option value="active">正常</option>
                  <option value="inactive">禁用</option>
                </select>
              </div>
            </div>
            <div style={styles.modalFooter}>
              <button style={styles.cancelBtn} onClick={() => setShowModal(false)}>取消</button>
              <button style={styles.submitBtn} onClick={handleSubmit}>{isEdit ? '保存修改' : '确认新增'}</button>
            </div>
          </div>
        </div>
      )}

      {showDetailModal && detailData && (
        <div style={styles.modalOverlay} onClick={() => setShowDetailModal(false)}>
          <div style={styles.detailModal} onClick={(e) => e.stopPropagation()}>
            <div style={styles.modalHeader}>
              <h3>用户详情</h3>
              <button style={styles.closeBtn} onClick={() => setShowDetailModal(false)}>✕</button>
            </div>
            <div style={styles.modalBody}>
              <div style={styles.detailRow}>
                <span style={styles.detailLabel}>用户名：</span>
                <span style={styles.detailValue}>{detailData.username}</span>
              </div>
              <div style={styles.detailRow}>
                <span style={styles.detailLabel}>昵称：</span>
                <span style={styles.detailValue}>{detailData.nickname}</span>
              </div>
              <div style={styles.detailRow}>
                <span style={styles.detailLabel}>邮箱：</span>
                <span style={styles.detailValue}>{detailData.email}</span>
              </div>
              <div style={styles.detailRow}>
                <span style={styles.detailLabel}>手机号：</span>
                <span style={styles.detailValue}>{detailData.phone}</span>
              </div>
              <div style={styles.detailRow}>
                <span style={styles.detailLabel}>角色：</span>
                <span style={{
                  ...styles.roleBadge,
                  backgroundColor: getRoleColor(detailData.role).bg,
                  color: getRoleColor(detailData.role).color,
                }}>
                  {getRoleLabel(detailData.role)}
                </span>
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
                <span style={styles.detailLabel}>最后登录：</span>
                <span style={styles.detailValue}>{detailData.lastLogin}</span>
              </div>
            </div>
            <div style={styles.modalFooter}>
              <button style={{...styles.actionBtn, backgroundColor: colors.info}} onClick={() => { setShowDetailModal(false); handleEdit(detailData); }}>编辑</button>
              <button style={styles.submitBtn} onClick={() => setShowDetailModal(false)}>关闭</button>
            </div>
          </div>
        </div>
      )}

      {showPermissionModal && (
        <div style={styles.modalOverlay} onClick={() => setShowPermissionModal(false)}>
          <div style={styles.modal} onClick={(e) => e.stopPropagation()}>
            <div style={styles.modalHeader}>
              <h3>权限设置</h3>
              <button style={styles.closeBtn} onClick={() => setShowPermissionModal(false)}>✕</button>
            </div>
            <div style={styles.modalBody}>
              <div style={styles.permissionGrid}>
                {permissionList.map((perm) => (
                  <label key={perm.key} style={styles.permissionItem}>
                    <input
                      type="checkbox"
                      checked={permissions[perm.key]}
                      onChange={(e) => setPermissions({...permissions, [perm.key]: e.target.checked})}
                    />
                    <span>{perm.label}</span>
                  </label>
                ))}
              </div>
            </div>
            <div style={styles.modalFooter}>
              <button style={styles.cancelBtn} onClick={() => setShowPermissionModal(false)}>取消</button>
              <button style={styles.submitBtn} onClick={() => { setShowPermissionModal(false); alert('权限设置已保存'); }}>保存设置</button>
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
    addBtn: {
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
      padding: '10px 20px',
      background: colors.primaryGradient,
      color: '#fff',
      border: 'none',
      borderRadius: '8px',
      fontSize: '14px',
      fontWeight: '500',
      cursor: 'pointer',
      boxShadow: '0 2px 8px rgba(255, 77, 79, 0.25)',
      transition: 'all 0.3s ease',
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
    detailModal: {
      background: colors.surface,
      borderRadius: '12px',
      width: '450px',
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
    formRow: {
      marginBottom: '20px',
    },
    formLabel: {
      display: 'block',
      marginBottom: '8px',
      fontSize: '14px',
      fontWeight: '500',
      color: colors.text,
    },
    formInput: {
      width: '100%',
      padding: '10px 14px',
      border: `1px solid ${colors.border}`,
      borderRadius: '8px',
      fontSize: '14px',
      outline: 'none',
      background: colors.surface,
      color: colors.text,
      transition: 'border-color 0.3s',
    },
    formInputError: {
      borderColor: colors.error,
    },
    errorText: {
      display: 'block',
      marginTop: '6px',
      fontSize: '12px',
      color: colors.error,
    },
    modalFooter: {
      display: 'flex',
      justifyContent: 'flex-end',
      gap: '12px',
      padding: '20px 24px',
      borderTop: `1px solid ${colors.border}`,
    },
    cancelBtn: {
      padding: '10px 24px',
      background: colors.surfaceHover,
      border: `1px solid ${colors.border}`,
      borderRadius: '8px',
      fontSize: '14px',
      cursor: 'pointer',
      color: colors.textSecondary,
      transition: 'all 0.3s ease',
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
    permissionGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(2, 1fr)',
      gap: '12px',
    },
    permissionItem: {
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
      fontSize: '14px',
      color: colors.textSecondary,
    },
  };
}

function UserManage() {
  return (
    <AdminLayout activeModule="userManage">
      <UserManageContent />
    </AdminLayout>
  );
}

export default UserManage;
