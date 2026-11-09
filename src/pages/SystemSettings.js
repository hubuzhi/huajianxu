import React, { useState, useContext } from 'react';
import AdminLayout from '../components/AdminLayout';
import { useTheme } from '../context/ThemeContext';
import LinearIcons from '../components/LinearIcons';

function SystemSettings() {
  const { isDark, toggleTheme, theme } = useTheme();
  const colors = theme.colors;
  const styles = getStyles(colors);
  
  const [activeTab, setActiveTab] = useState('config');
  const [currentPage, setCurrentPage] = useState(1);
  const [showModal, setShowModal] = useState(false);

  const logsData = [
    { id: 1, user: 'admin', action: '新增花卉', target: '玫瑰', time: '2024-03-15 10:30:25', ip: '192.168.1.101' },
    { id: 2, user: 'admin', action: '审核通过', target: '春季玫瑰养护指南', time: '2024-03-15 09:20:18', ip: '192.168.1.101' },
    { id: 3, user: 'manager', action: '修改用户权限', target: '养花新手', time: '2024-03-14 16:45:33', ip: '192.168.1.102' },
    { id: 4, user: 'admin', action: '删除评论', target: '垃圾文章，误导新手！', time: '2024-03-14 14:30:42', ip: '192.168.1.101' },
    { id: 5, user: 'admin', action: '数据备份', target: '全量数据', time: '2024-03-13 11:20:00', ip: '192.168.1.101' },
    { id: 6, user: 'manager', action: '禁用用户', target: '喷子', time: '2024-03-12 15:00:55', ip: '192.168.1.102' },
    { id: 7, user: 'admin', action: '导出订单', target: '2024年3月订单', time: '2024-03-11 09:30:12', ip: '192.168.1.101' },
    { id: 8, user: 'admin', action: '系统配置更新', target: '网站标题', time: '2024-03-10 10:15:30', ip: '192.168.1.101' },
  ];

  const adminsData = [
    { id: 1, username: 'admin', realName: '管理员', role: '超级管理员', status: 'active', createTime: '2024-01-01' },
    { id: 2, username: 'manager', realName: '张经理', role: '管理员', status: 'active', createTime: '2024-02-15' },
    { id: 3, username: 'editor', realName: '李编辑', role: '编辑', status: 'inactive', createTime: '2024-03-01' },
  ];

  const settings = {
    siteName: '花朵图鉴 - 后台管理系统',
    siteDesc: '专业的花卉信息管理平台',
    logo: '',
    defaultTheme: isDark ? 'dark' : 'light',
    showCaptcha: true,
    loginAttempts: 5,
    sessionTimeout: 30,
    allowRegister: false,
    allowComment: true,
  };

  const totalPages = Math.ceil(logsData.length / 4);
  const paginatedLogs = logsData.slice((currentPage - 1) * 4, currentPage * 4);

  const handleBackup = () => {
    alert('数据备份中...\n\n备份完成！备份文件已保存到服务器。');
  };

  const handleClearLogs = () => {
    alert('操作日志已清空');
  };

  const handleAddAdmin = () => {
    setShowModal(true);
  };

  const handleSaveConfig = () => {
    alert('系统配置已保存');
  };

  const getRoleColor = (role) => {
    switch(role) {
      case '超级管理员': return { bg: 'rgba(245, 34, 45, 0.1)', color: '#f5222d' };
      case '管理员': return { bg: 'rgba(24, 144, 255, 0.1)', color: '#1890ff' };
      default: return { bg: 'rgba(250, 173, 20, 0.1)', color: '#faad14' };
    }
  };

  const getStatusColor = (status) => {
    return status === 'active' 
      ? { bg: 'rgba(82, 196, 26, 0.1)', color: '#52c41a' }
      : { bg: 'rgba(250, 173, 20, 0.1)', color: '#faad14' };
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <div style={styles.headerLeft}>
          <h2 style={styles.title}>系统设置</h2>
        </div>
      </div>

      <div style={styles.tabBar}>
        <button 
          style={{...styles.tabBtn, ...(activeTab === 'config' ? styles.activeTab : {})}}
          onClick={() => setActiveTab('config')}
        >
          <LinearIcons.settings style={{ width: '14px', height: '14px', marginRight: '6px' }} />
          基础配置
        </button>
        <button 
          style={{...styles.tabBtn, ...(activeTab === 'admins' ? styles.activeTab : {})}}
          onClick={() => setActiveTab('admins')}
        >
          <LinearIcons.users style={{ width: '14px', height: '14px', marginRight: '6px' }} />
          管理员账号
        </button>
        <button 
          style={{...styles.tabBtn, ...(activeTab === 'logs' ? styles.activeTab : {})}}
          onClick={() => setActiveTab('logs')}
        >
          <LinearIcons.history style={{ width: '14px', height: '14px', marginRight: '6px' }} />
          操作日志
        </button>
        <button 
          style={{...styles.tabBtn, ...(activeTab === 'backup' ? styles.activeTab : {})}}
          onClick={() => setActiveTab('backup')}
        >
          <LinearIcons.backup style={{ width: '14px', height: '14px', marginRight: '6px' }} />
          数据备份
        </button>
      </div>

      {activeTab === 'config' && (
        <div style={styles.formContainer}>
          <div style={styles.formHeader}>
            <h3>基础配置</h3>
          </div>
          <div style={styles.formBody}>
            <div style={styles.formRow}>
              <label style={styles.formLabel}>网站名称</label>
              <input
                type="text"
                defaultValue={settings.siteName}
                style={styles.formInput}
              />
            </div>
            <div style={styles.formRow}>
              <label style={styles.formLabel}>网站描述</label>
              <textarea
                defaultValue={settings.siteDesc}
                style={styles.formTextarea}
                rows={3}
              />
            </div>
            <div style={styles.formRow}>
              <label style={styles.formLabel}>主题切换</label>
              <div style={styles.themeToggleContainer}>
                <div style={styles.themeToggleLabel}>
                  <LinearIcons.sun style={{ width: '16px', height: '16px', marginRight: '8px' }} />
                  浅色模式
                </div>
                <button
                  onClick={toggleTheme}
                  style={{
                    ...styles.themeToggle,
                    backgroundColor: isDark ? '#722ed1' : '#d9d9d9',
                  }}
                >
                  <div style={{
                    ...styles.themeToggleKnob,
                    transform: isDark ? 'translateX(24px)' : 'translateX(4px)',
                  }}>
                    {isDark ? (
                      <LinearIcons.moon style={{ width: '14px', height: '14px', color: '#fff' }} />
                    ) : (
                      <LinearIcons.sun style={{ width: '14px', height: '14px', color: '#faad14' }} />
                    )}
                  </div>
                </button>
                <div style={styles.themeToggleLabel}>
                  <LinearIcons.moon style={{ width: '16px', height: '16px', marginRight: '8px' }} />
                  深色模式
                </div>
              </div>
            </div>
            <div style={styles.formRow}>
              <label style={styles.formLabel}>登录相关</label>
              <div style={styles.checkboxGroup}>
                <label style={styles.checkboxItem}>
                  <input type="checkbox" defaultChecked={settings.showCaptcha} />
                  <span>登录时显示验证码</span>
                </label>
                <label style={styles.checkboxItem}>
                  <input type="checkbox" defaultChecked={settings.allowRegister} />
                  <span>允许用户注册</span>
                </label>
              </div>
            </div>
            <div style={styles.formRow}>
              <label style={styles.formLabel}>登录失败次数限制</label>
              <input
                type="number"
                defaultValue={settings.loginAttempts}
                style={{...styles.formInput, width: '100px'}}
              />
              <span style={styles.formHint}>次后锁定账户</span>
            </div>
            <div style={styles.formRow}>
              <label style={styles.formLabel}>会话超时时间</label>
              <input
                type="number"
                defaultValue={settings.sessionTimeout}
                style={{...styles.formInput, width: '100px'}}
              />
              <span style={styles.formHint}>分钟</span>
            </div>
            <div style={styles.formRow}>
              <label style={styles.formLabel}>内容设置</label>
              <div style={styles.checkboxGroup}>
                <label style={styles.checkboxItem}>
                  <input type="checkbox" defaultChecked={settings.allowComment} />
                  <span>允许用户评论</span>
                </label>
              </div>
            </div>
          </div>
          <div style={styles.formFooter}>
            <button style={styles.submitBtn} onClick={handleSaveConfig}>
              <LinearIcons.save style={{ width: '14px', height: '14px', marginRight: '8px' }} />
              保存配置
            </button>
          </div>
        </div>
      )}

      {activeTab === 'admins' && (
        <div style={styles.tableContainer}>
          <div style={styles.tableHeader}>
            <button style={styles.addBtn} onClick={handleAddAdmin}>
              <LinearIcons.plus style={{ width: '14px', height: '14px', marginRight: '6px' }} />
              添加管理员
            </button>
          </div>
          <table style={styles.table}>
            <thead>
              <tr>
                <th style={styles.th}>用户名</th>
                <th style={styles.th}>真实姓名</th>
                <th style={styles.th}>角色</th>
                <th style={styles.th}>状态</th>
                <th style={styles.th}>创建时间</th>
                <th style={styles.th}>操作</th>
              </tr>
            </thead>
            <tbody>
              {adminsData.map(admin => (
                <tr key={admin.id} style={styles.tr}>
                  <td style={styles.td}><strong>{admin.username}</strong></td>
                  <td style={styles.td}>{admin.realName}</td>
                  <td style={styles.td}>
                    <span style={{
                      ...styles.roleBadge,
                      backgroundColor: getRoleColor(admin.role).bg,
                      color: getRoleColor(admin.role).color,
                    }}>
                      {admin.role}
                    </span>
                  </td>
                  <td style={styles.td}>
                    <span style={{
                      ...styles.statusBadge,
                      backgroundColor: getStatusColor(admin.status).bg,
                      color: getStatusColor(admin.status).color,
                    }}>
                      {admin.status === 'active' ? '启用' : '禁用'}
                    </span>
                  </td>
                  <td style={styles.td}>{admin.createTime}</td>
                  <td style={styles.td}>
                    <button 
                      style={styles.actionBtn}
                      onClick={() => alert(`编辑管理员「${admin.username}」`)}
                    >
                      <LinearIcons.edit style={{ width: '12px', height: '12px', marginRight: '4px' }} />
                      编辑
                    </button>
                    <button 
                      style={{...styles.actionBtn, backgroundColor: '#faad14'}}
                      onClick={() => alert(`管理员「${admin.username}」已${admin.status === 'active' ? '禁用' : '启用'}`)}
                    >
                      {admin.status === 'active' ? '禁用' : '启用'}
                    </button>
                    <button 
                      style={{...styles.actionBtn, backgroundColor: '#f5222d'}}
                      onClick={() => alert(`管理员「${admin.username}」已删除`)}
                    >
                      <LinearIcons.delete style={{ width: '12px', height: '12px', marginRight: '4px' }} />
                      删除
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {activeTab === 'logs' && (
        <div style={styles.tableContainer}>
          <div style={styles.tableHeader}>
            <button style={{...styles.addBtn, backgroundColor: '#f5222d'}} onClick={handleClearLogs}>
              <LinearIcons.delete style={{ width: '14px', height: '14px', marginRight: '6px' }} />
              清空日志
            </button>
          </div>
          <table style={styles.table}>
            <thead>
              <tr>
                <th style={styles.th}>操作人</th>
                <th style={styles.th}>操作类型</th>
                <th style={styles.th}>操作对象</th>
                <th style={styles.th}>操作时间</th>
                <th style={styles.th}>IP地址</th>
              </tr>
            </thead>
            <tbody>
              {paginatedLogs.map(log => (
                <tr key={log.id} style={styles.tr}>
                  <td style={styles.td}><strong>{log.user}</strong></td>
                  <td style={styles.td}>
                    <span style={styles.actionBadge}>{log.action}</span>
                  </td>
                  <td style={styles.td}>{log.target}</td>
                  <td style={styles.td}>{log.time}</td>
                  <td style={styles.td}>{log.ip}</td>
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
      )}

      {activeTab === 'backup' && (
        <div style={styles.backupContainer}>
          <div style={styles.backupCard}>
            <LinearIcons.backup style={{ width: '48px', height: '48px', marginBottom: '16px' }} />
            <h3 style={styles.backupTitle}>数据备份</h3>
            <p style={styles.backupDesc}>定期备份数据库，确保数据安全</p>
            <button 
              style={{...styles.submitBtn, width: '100%'}}
              onClick={handleBackup}
            >
              <LinearIcons.download style={{ width: '14px', height: '14px', marginRight: '8px' }} />
              立即备份
            </button>
          </div>
          <div style={styles.backupCard}>
            <LinearIcons.restore style={{ width: '48px', height: '48px', marginBottom: '16px' }} />
            <h3 style={styles.backupTitle}>数据恢复</h3>
            <p style={styles.backupDesc}>从备份文件恢复数据</p>
            <input
              type="file"
              accept=".sql,.bak"
              style={styles.backupFileInput}
            />
            <button 
              style={{...styles.submitBtn, width: '100%', marginTop: '12px'}}
              onClick={() => alert('数据恢复完成')}
            >
              <LinearIcons.upload style={{ width: '14px', height: '14px', marginRight: '8px' }} />
              开始恢复
            </button>
          </div>
          <div style={styles.backupCard}>
            <LinearIcons.history style={{ width: '48px', height: '48px', marginBottom: '16px' }} />
            <h3 style={styles.backupTitle}>备份历史</h3>
            <div style={styles.backupHistory}>
              <div style={styles.historyItem}>
                <span>backup_20240315.sql</span>
                <span style={styles.historyTime}>2024-03-15 11:20</span>
              </div>
              <div style={styles.historyItem}>
                <span>backup_20240314.sql</span>
                <span style={styles.historyTime}>2024-03-14 11:00</span>
              </div>
              <div style={styles.historyItem}>
                <span>backup_20240313.sql</span>
                <span style={styles.historyTime}>2024-03-13 11:00</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {showModal && (
        <div style={styles.modalOverlay} onClick={() => setShowModal(false)}>
          <div style={styles.modal} onClick={(e) => e.stopPropagation()}>
            <div style={styles.modalHeader}>
              <h3>添加管理员</h3>
              <button style={styles.closeBtn} onClick={() => setShowModal(false)}>
                <LinearIcons.x style={{ width: '16px', height: '16px' }} />
              </button>
            </div>
            <div style={styles.modalBody}>
              <div style={styles.formRow}>
                <label style={styles.formLabel}>用户名</label>
                <input type="text" placeholder="请输入用户名" style={styles.formInput} />
              </div>
              <div style={styles.formRow}>
                <label style={styles.formLabel}>真实姓名</label>
                <input type="text" placeholder="请输入真实姓名" style={styles.formInput} />
              </div>
              <div style={styles.formRow}>
                <label style={styles.formLabel}>密码</label>
                <input type="password" placeholder="请输入密码" style={styles.formInput} />
              </div>
              <div style={styles.formRow}>
                <label style={styles.formLabel}>角色</label>
                <select style={styles.formSelect}>
                  <option value="admin">超级管理员</option>
                  <option value="manager">管理员</option>
                  <option value="editor">编辑</option>
                </select>
              </div>
            </div>
            <div style={styles.modalFooter}>
              <button style={styles.cancelBtn} onClick={() => setShowModal(false)}>取消</button>
              <button style={styles.submitBtn} onClick={() => { setShowModal(false); alert('管理员添加成功'); }}>
                <LinearIcons.check style={{ width: '14px', height: '14px', marginRight: '8px' }} />
                确认添加
              </button>
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
      borderLeft: '4px solid #ff4d4f',
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
      display: 'flex',
      alignItems: 'center',
    },
    activeTab: {
      background: 'linear-gradient(135deg, #ff6b7a 0%, #ff4d4f 100%)',
      color: '#fff',
      boxShadow: '0 2px 8px rgba(255, 77, 79, 0.25)',
    },
    formContainer: {
      background: colors.surface,
      borderRadius: '12px',
      boxShadow: colors.cardShadow,
      border: `1px solid ${colors.border}`,
      overflow: 'hidden',
    },
    formHeader: {
      padding: '20px 24px',
      borderBottom: `1px solid ${colors.border}`,
    },
    formBody: {
      padding: '24px',
    },
    formRow: {
      display: 'flex',
      gap: '16px',
      alignItems: 'center',
      marginBottom: '20px',
    },
    formLabel: {
      width: '120px',
      fontSize: '14px',
      fontWeight: '500',
      color: colors.text,
      flexShrink: 0,
    },
    formInput: {
      flex: 1,
      padding: '10px 14px',
      border: `1px solid ${colors.border}`,
      borderRadius: '8px',
      fontSize: '14px',
      outline: 'none',
      transition: 'all 0.3s ease',
      background: colors.surface,
      color: colors.text,
    },
    formTextarea: {
      flex: 1,
      padding: '10px 14px',
      border: `1px solid ${colors.border}`,
      borderRadius: '8px',
      fontSize: '14px',
      resize: 'vertical',
      outline: 'none',
      transition: 'all 0.3s ease',
      background: colors.surface,
      color: colors.text,
    },
    formSelect: {
      padding: '10px 14px',
      border: `1px solid ${colors.border}`,
      borderRadius: '8px',
      fontSize: '14px',
      minWidth: '150px',
      outline: 'none',
      transition: 'all 0.3s ease',
      background: colors.surface,
      color: colors.text,
    },
    formHint: {
      fontSize: '13px',
      color: colors.textMuted,
    },
    checkboxGroup: {
      display: 'flex',
      gap: '24px',
    },
    checkboxItem: {
      display: 'flex',
      gap: '8px',
      fontSize: '14px',
      color: colors.textSecondary,
      cursor: 'pointer',
    },
    formFooter: {
      padding: '20px 24px',
      borderTop: `1px solid ${colors.border}`,
      display: 'flex',
      justifyContent: 'flex-end',
    },
    tableContainer: {
      background: colors.surface,
      borderRadius: '12px',
      boxShadow: colors.cardShadow,
      border: `1px solid ${colors.border}`,
      overflow: 'hidden',
    },
    tableHeader: {
      padding: '16px 20px',
      borderBottom: `1px solid ${colors.border}`,
      display: 'flex',
      justifyContent: 'flex-end',
    },
    addBtn: {
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
      padding: '10px 20px',
      background: 'linear-gradient(135deg, #ff6b7a 0%, #ff4d4f 100%)',
      color: '#fff',
      border: 'none',
      borderRadius: '8px',
      fontSize: '14px',
      fontWeight: '500',
      cursor: 'pointer',
      boxShadow: '0 2px 8px rgba(255, 77, 79, 0.25)',
      transition: 'all 0.3s ease',
    },
    table: {
      width: '100%',
      borderCollapse: 'collapse',
    },
    th: {
      padding: '14px 16px',
      textAlign: 'left',
      background: colors.surfaceHover,
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
    actionBadge: {
      padding: '4px 12px',
      background: 'rgba(255, 77, 79, 0.1)',
      color: '#ff4d4f',
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
      display: 'flex',
      alignItems: 'center',
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
      background: 'linear-gradient(135deg, #ff6b7a 0%, #ff4d4f 100%)',
      color: '#fff',
      borderColor: '#ff4d4f',
      boxShadow: '0 2px 8px rgba(255, 77, 79, 0.25)',
    },
    backupContainer: {
      display: 'grid',
      gridTemplateColumns: 'repeat(3, 1fr)',
      gap: '24px',
    },
    backupCard: {
      background: colors.surface,
      borderRadius: '12px',
      padding: '24px',
      textAlign: 'center',
      boxShadow: colors.cardShadow,
      border: `1px solid ${colors.border}`,
      transition: 'all 0.3s ease',
      color: colors.textSecondary,
    },
    backupTitle: {
      fontSize: '16px',
      fontWeight: '600',
      color: colors.text,
      margin: '0 0 8px 0',
    },
    backupDesc: {
      fontSize: '13px',
      color: colors.textMuted,
      margin: '0 0 20px 0',
    },
    backupFileInput: {
      width: '100%',
      padding: '10px 12px',
      border: `1px solid ${colors.border}`,
      borderRadius: '6px',
      fontSize: '13px',
      outline: 'none',
      transition: 'all 0.3s ease',
      background: colors.surface,
      color: colors.text,
    },
    backupHistory: {
      textAlign: 'left',
    },
    historyItem: {
      display: 'flex',
      justifyContent: 'space-between',
      padding: '12px 0',
      borderBottom: `1px solid ${colors.border}`,
      fontSize: '13px',
      color: colors.textSecondary,
    },
    historyTime: {
      color: colors.textMuted,
    },
    modalOverlay: {
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: 'rgba(0,0,0,0.5)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1000,
    },
    modal: {
      background: colors.surface,
      borderRadius: '12px',
      width: '450px',
      maxHeight: '90vh',
      overflowY: 'auto',
      boxShadow: '0 4px 16px rgba(0, 0, 0, 0.08)',
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
      transition: 'color 0.3s ease',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: '32px',
      height: '32px',
      borderRadius: '50%',
    },
    modalBody: {
      padding: '24px',
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
      background: colors.surface,
      border: `1px solid ${colors.border}`,
      borderRadius: '8px',
      fontSize: '14px',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      color: colors.textSecondary,
    },
    submitBtn: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '8px',
      padding: '10px 24px',
      background: 'linear-gradient(135deg, #ff6b7a 0%, #ff4d4f 100%)',
      color: '#fff',
      border: 'none',
      borderRadius: '8px',
      fontSize: '14px',
      cursor: 'pointer',
      boxShadow: '0 2px 8px rgba(255, 77, 79, 0.25)',
      transition: 'all 0.3s ease',
    },
    themeToggleContainer: {
      display: 'flex',
      alignItems: 'center',
      gap: '16px',
    },
    themeToggleLabel: {
      display: 'flex',
      alignItems: 'center',
      fontSize: '14px',
      color: colors.textSecondary,
    },
    themeToggle: {
      width: '52px',
      height: '28px',
      borderRadius: '14px',
      border: 'none',
      cursor: 'pointer',
      position: 'relative',
      transition: 'background-color 0.3s ease',
    },
    themeToggleKnob: {
      position: 'absolute',
      top: '2px',
      width: '24px',
      height: '24px',
      borderRadius: '50%',
      background: '#fff',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      transition: 'transform 0.3s ease',
      boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
    },
  };
}

function SystemSettingsWithLayout() {
  return (
    <AdminLayout activeModule="systemSettings">
      <SystemSettings />
    </AdminLayout>
  );
}

export default SystemSettingsWithLayout;
