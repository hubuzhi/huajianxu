import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import LinearIcons from './LinearIcons';

function AdminLayout({ children, activeModule }) {
  const navigate = useNavigate();
  const { theme, isDark, toggleTheme } = useTheme();
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [accountDropdown, setAccountDropdown] = useState(false);
  const [hoveredMenu, setHoveredMenu] = useState(null);
  const colors = theme.colors;
  const styles = getStyles(colors, isDark);

  const menuItems = [
    { id: 'dashboard', label: '数据总览', icon: 'dashboard', path: '/home' },
    { id: 'flowerDetail', label: '花卉商品详情', icon: 'flower', path: '/flower-detail' },
    { id: 'flowerManage', label: '花束商品管理', icon: 'flower', path: '/admin/flowers' },
    { id: 'orderManage', label: '订单管理', icon: 'shoppingCart', path: '/admin/orders' },
    { id: 'customerManage', label: '客户/会员管理', icon: 'users', path: '/admin/customers' },
    { id: 'marketingManage', label: '营销活动管理', icon: 'gift', path: '/admin/marketing' },
    { id: 'contentManage', label: '店铺评论管理', icon: 'file', path: '/admin/content' },
    { id: 'dataReports', label: '数据统计报表', icon: 'barChart', path: '/admin/reports' },
    { id: 'staffManage', label: '员工/权限管理', icon: 'shield', path: '/admin/staff' },
    { id: 'systemSettings', label: '系统设置', icon: 'settings', path: '/admin/settings' },
  ];

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (accountDropdown && !e.target.closest('.account-dropdown')) {
        setAccountDropdown(false);
      }
    };
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [accountDropdown]);

  const handleLogout = () => {
    navigate('/login');
  };

  const getIcon = (iconName) => {
    const IconComponent = LinearIcons[iconName];
    return IconComponent ? <IconComponent style={{ width: '18px', height: '18px' }} /> : null;
  };

  return (
    <div style={styles.container}>
      <nav style={{
        ...styles.sidebar,
        width: sidebarCollapsed ? '72px' : '256px',
      }}>
        <div style={styles.logoSection}>
          <div style={styles.logo}>🌸</div>
          {!sidebarCollapsed && <span style={styles.logoText}>花间序</span>}
        </div>

        <div style={styles.menuSection}>
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => navigate(item.path)}
              onMouseEnter={() => setHoveredMenu(item.id)}
              onMouseLeave={() => setHoveredMenu(null)}
              style={{
                ...styles.menuItem,
                ...(activeModule === item.id ? styles.activeMenuItem : {}),
                ...(hoveredMenu === item.id && activeModule !== item.id ? styles.hoveredMenuItem : {}),
                justifyContent: sidebarCollapsed ? 'center' : 'flex-start',
              }}
            >
              <span style={styles.menuIcon}>{getIcon(item.icon)}</span>
              {!sidebarCollapsed && (
                <span style={styles.menuLabel}>{item.label}</span>
              )}
            </button>
          ))}
        </div>
      </nav>

      <div style={{
        ...styles.mainWrapper,
        marginLeft: sidebarCollapsed ? '72px' : '256px',
      }}>
        <header style={styles.topHeader}>
          <div style={styles.headerLeft}>
            <button 
              onClick={() => setSidebarCollapsed(!sidebarCollapsed)} 
              style={styles.menuToggle}
            >
              ☰
            </button>
            <div style={styles.breadcrumb}>
              <span style={styles.breadcrumbNormal}>首页</span>
              <span style={styles.breadcrumbSeparator}>/</span>
              <span style={styles.breadcrumbCurrent}>
                {menuItems.find(m => m.id === activeModule)?.label || '管理'}
              </span>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <button
              onClick={toggleTheme}
              style={{
                padding: '8px 14px',
                background: colors.surface,
                border: `1px solid ${colors.border}`,
                borderRadius: '6px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                fontSize: '13px',
                color: colors.text,
                transition: 'all 0.25s',
                fontFamily: '"PingFang SC", "Microsoft YaHei", sans-serif',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = colors.primary;
                e.currentTarget.style.color = colors.primary;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = colors.border;
                e.currentTarget.style.color = colors.text;
              }}
            >
              {isDark ? <LinearIcons.sun style={{ width: '16px', height: '16px' }} /> : <LinearIcons.moon style={{ width: '16px', height: '16px' }} />}
              <span>{isDark ? '浅色' : '深色'}</span>
            </button>
          </div>

          <div className="account-dropdown" style={styles.accountSection}>
            <button 
              style={styles.accountBtn}
              onClick={() => setAccountDropdown(!accountDropdown)}
            >
              <div style={styles.avatar}>👤</div>
              <span style={styles.accountName}>管理员</span>
              <LinearIcons.arrowDown style={{ width: '14px', height: '14px', color: colors.textMuted }} />
            </button>
            {accountDropdown && (
              <div style={styles.dropdownMenu}>
                <button style={styles.dropdownItem}>
                  <LinearIcons.bell style={{ width: '14px', height: '14px', marginRight: '8px' }} /> 系统通知
                </button>
                <button style={styles.dropdownItem}>
                  <LinearIcons.lock style={{ width: '14px', height: '14px', marginRight: '8px' }} /> 修改密码
                </button>
                <div style={styles.dropdownDivider} />
                <button 
                  style={{...styles.dropdownItem, color: colors.error}}
                  onClick={handleLogout}
                >
                  <LinearIcons.logout style={{ width: '14px', height: '14px', marginRight: '8px' }} /> 退出登录
                </button>
              </div>
            )}
          </div>
        </header>

        <main style={styles.mainContent}>
          {children}
        </main>
      </div>
    </div>
  );
}

function getStyles(colors, isDark) {
  return {
  container: {
    display: 'flex',
    minHeight: '100vh',
    background: colors.background,
  },
  sidebar: {
    background: colors.surface,
    display: 'flex',
    flexDirection: 'column',
    position: 'fixed',
    left: 0,
    top: 0,
    bottom: 0,
    zIndex: 100,
    transition: 'all 0.3s ease',
    boxShadow: colors.cardShadow,
    borderRight: `1px solid ${colors.border}`,
  },
  logoSection: {
    height: '64px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '12px',
    background: isDark ? '#252540' : 'linear-gradient(135deg, #fff0f5 0%, #ffe6ec 100%)',
    borderBottom: `1px solid ${colors.border}`,
  },
  logo: {
    fontSize: '28px',
  },
  logoText: {
    color: '#d4626a',
    fontSize: '20px',
    fontWeight: '600',
    fontFamily: '"PingFang SC", "Microsoft YaHei", sans-serif',
  },
  menuSection: {
    flex: 1,
    padding: '16px 0',
    overflowY: 'auto',
  },
  menuItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    width: '100%',
    padding: '12px 24px',
    background: 'transparent',
    border: 'none',
    color: colors.textSecondary,
    fontSize: '14px',
    cursor: 'pointer',
    transition: 'all 0.25s ease',
    textAlign: 'left',
    fontFamily: '"PingFang SC", "Microsoft YaHei", sans-serif',
  },
  activeMenuItem: {
    background: colors.primaryGradient,
    color: colors.textInverse,
    fontWeight: '500',
    borderRight: `3px solid ${colors.primary}`,
  },
  hoveredMenuItem: {
    background: colors.surfaceHover,
    color: colors.primary,
  },
  menuIcon: {
    fontSize: '16px',
    width: '24px',
    textAlign: 'center',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  menuLabel: {
    flex: 1,
  },
  mainWrapper: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    transition: 'margin-left 0.3s ease',
  },
  topHeader: {
    height: '64px',
    background: colors.surface,
    padding: '0 24px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    boxShadow: colors.cardShadow,
    borderBottom: `1px solid ${colors.border}`,
    position: 'sticky',
    top: 0,
    zIndex: 99,
  },
  headerLeft: {
    display: 'flex',
    alignItems: 'center',
    gap: '16px',
  },
  menuToggle: {
    background: 'transparent',
    border: 'none',
    fontSize: '18px',
    cursor: 'pointer',
    color: '#8c8c8c',
    padding: '8px',
    borderRadius: '4px',
    transition: 'all 0.25s',
  },
  breadcrumb: {
    fontSize: '14px',
    fontFamily: '"PingFang SC", "Microsoft YaHei", sans-serif',
  },
  breadcrumbNormal: {
    color: colors.textMuted,
  },
  breadcrumbSeparator: {
    color: colors.borderDark,
    margin: '0 8px',
  },
  breadcrumbCurrent: {
    color: colors.text,
    fontWeight: '500',
  },
  accountSection: {
    position: 'relative',
  },
  accountBtn: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    padding: '6px 12px',
    background: 'transparent',
    border: 'none',
    cursor: 'pointer',
    color: colors.text,
    fontFamily: '"PingFang SC", "Microsoft YaHei", sans-serif',
  },
  avatar: {
    width: '36px',
    height: '36px',
    borderRadius: '50%',
    background: colors.surfaceHover,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '16px',
  },
  accountName: {
    fontSize: '14px',
    fontWeight: '500',
  },
  accountArrow: {
    fontSize: '12px',
    color: colors.textMuted,
  },
  dropdownMenu: {
    position: 'absolute',
    right: 0,
    top: '100%',
    background: colors.surface,
    border: `1px solid ${colors.border}`,
    borderRadius: '8px',
    boxShadow: '0 4px 16px rgba(0, 0, 0, 0.1)',
    marginTop: '8px',
    minWidth: '160px',
    zIndex: 100,
  },
  dropdownItem: {
    display: 'flex',
    alignItems: 'center',
    width: '100%',
    padding: '10px 16px',
    background: 'transparent',
    border: 'none',
    cursor: 'pointer',
    fontSize: '14px',
    color: colors.textSecondary,
    textAlign: 'left',
    transition: 'background 0.25s',
    fontFamily: '"PingFang SC", "Microsoft YaHei", sans-serif',
  },
  dropdownDivider: {
    height: '1px',
    background: colors.border,
    margin: '8px 0',
  },
  mainContent: {
    flex: 1,
    padding: '24px',
  },
  };
}

export default AdminLayout;
