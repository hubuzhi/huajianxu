import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import LinearIcons from '../components/LinearIcons';
import AdminLayout from '../components/AdminLayout';
import DetailPanel from '../components/DetailPanel';

function HomeContent() {
  const nav = useNavigate();
  const { theme } = useTheme();
  const c = theme.colors;
  
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showDetail, setShowDetail] = useState(false);
  const [detailType, setDetailType] = useState(null);
  const [hoveredCard, setHoveredCard] = useState(null);

  const style = getStyle(c);

  useEffect(() => {
    const closeMenu = (e) => {
      if (showUserMenu && !e.target.closest('.account-dropdown')) {
        setShowUserMenu(false);
      }
    };
    document.addEventListener('click', closeMenu);
    return () => document.removeEventListener('click', closeMenu);
  }, [showUserMenu]);

  const logout = () => {
    nav('/login');
  };

  const Icon = (name) => {
    const Comp = LinearIcons[name];
    return Comp ? <Comp style={{ width: '18px', height: '18px' }} /> : null;
  };

  const cards = [
    { id: 'users', title: '注册用户数', num: '1,234', icon: 'users', color: c.success, bg: c.successBg, change: 12.5, trend: [80, 95, 88, 102, 110, 125, 120] },
    { id: 'visitors', title: '今日访问量', num: '892', icon: 'activity', color: c.warning, bg: c.warningBg, change: 8.3, trend: [60, 72, 68, 80, 85, 90, 88] },
    { id: 'orders', title: '今日订单数', num: '238', icon: 'shoppingCart', color: c.primary, bg: c.errorBg, change: -3.2, trend: [45, 42, 48, 50, 45, 52, 48], badge: null },
    { id: 'pendingPay', title: '待付款订单', num: '28', icon: 'wallet', color: c.error, bg: c.errorBg, change: -15.8, trend: [8, 12, 15, 18, 22, 25, 28], badge: 'red' },
    { id: 'pending', title: '待审核内容', num: '12', icon: 'content', color: c.error, bg: c.errorBg, change: 5.0, trend: [5, 8, 6, 10, 9, 11, 12], badge: 'red' },
    { id: 'sales', title: '销售额', num: '¥12,680', icon: 'dollar', color: '#eb2f96', bg: c.infoBg, change: 18.6, trend: [65, 72, 78, 85, 92, 95, 100] },
  ];

  const pieData = [
    { name: 'APP下单', value: 45, color: c.primary },
    { name: '小程序', value: 30, color: c.success },
    { name: 'PC网页', value: 15, color: c.warning },
    { name: '第三方平台', value: 10, color: '#eb2f96' },
  ];

  const barData = [
    { day: '周一', value: 180 },
    { day: '周二', value: 220 },
    { day: '周三', value: 198 },
    { day: '周四', value: 260 },
    { day: '周五', value: 290 },
    { day: '周六', value: 320 },
    { day: '周日', value: 285 },
  ];

  const lineData = [
    { date: '3-1', orders: 180, amount: 12500 },
    { date: '3-5', orders: 220, amount: 15800 },
    { date: '3-10', orders: 198, amount: 14200 },
    { date: '3-15', orders: 260, amount: 18500 },
    { date: '3-20', orders: 290, amount: 21000 },
    { date: '3-25', orders: 320, amount: 23800 },
    { date: '3-30', orders: 285, amount: 21200 },
  ];

  const logsData = [
    { time: '10:30', action: '新增花卉「薰衣草」', user: '管理员', type: 'add' },
    { time: '09:45', action: '审核通过用户内容', user: '管理员', type: 'review' },
    { time: '09:20', action: '编辑花卉「牡丹」信息', user: '管理员', type: 'edit' },
    { time: '08:55', action: '删除违规评论', user: '管理员', type: 'delete' },
    { time: '08:30', action: '新增用户注册审核', user: '管理员', type: 'review' },
  ];

  const getLogBg = (type) => {
    switch(type) {
      case 'add': return c.successBg;
      case 'edit': return c.infoBg;
      case 'delete': return c.errorBg;
      case 'review': return c.warningBg;
      default: return c.tableStripe;
    }
  };

  const getLogIcon = (type) => {
    switch(type) {
      case 'add': return <LinearIcons.plus style={{ width: '12px', height: '12px' }} />;
      case 'edit': return <LinearIcons.edit style={{ width: '12px', height: '12px' }} />;
      case 'delete': return <LinearIcons.delete style={{ width: '12px', height: '12px' }} />;
      case 'review': return <LinearIcons.check style={{ width: '12px', height: '12px' }} />;
      default: return <LinearIcons.file style={{ width: '12px', height: '12px' }} />;
    }
  };

  const getLogBorder = (type) => {
    switch(type) {
      case 'add': return c.success;
      case 'edit': return c.info;
      case 'delete': return c.error;
      case 'review': return c.warning;
      default: return c.border;
    }
  };

  const handleCardClick = (card) => {
    setDetailType(card.id);
    setShowDetail(true);
  };

  const renderMiniTrend = (trend, color) => {
    const max = Math.max(...trend);
    const min = Math.min(...trend);
    const range = max - min || 1;
    const points = trend.map((v, i) => {
      const x = (i / (trend.length - 1)) * 60;
      const y = 20 - ((v - min) / range) * 16;
      return `${x},${y}`;
    }).join(' ');
    
    return (
      <svg width="60" height="24" viewBox="0 0 60 24" style={{ marginTop: '6px' }}>
        <polyline
          points={points}
          fill="none"
          stroke={color}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );
  };

  return (
    <main style={style.mainContent}>
      {showDetail && <DetailPanel type={detailType} onClose={() => setShowDetail(false)} theme={theme} />}
      
      <div style={{ ...style.dashboardContent, width: showDetail ? '35%' : '100%', transition: 'width 0.3s ease' }}>
        <div style={style.pageHeader}>
          <h1 style={style.pageTitle}>数据总览</h1>
          <p style={style.pageSubtitle}>欢迎使用花间序线上花店后台管理系统</p>
        </div>

        <div style={style.statsGrid}>
          {cards.map((item) => (
            <div 
              key={item.id}
              style={{
                ...style.statCard,
                cursor: 'pointer',
                transform: hoveredCard === item.id ? 'scale(1.02)' : 'scale(1)',
                boxShadow: hoveredCard === item.id ? '0 4px 16px rgba(0,0,0,0.15)' : c.cardShadow,
                position: 'relative',
              }}
              onClick={() => handleCardClick(item)}
              onMouseEnter={() => setHoveredCard(item.id)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              {item.badge && (
                <div style={{
                  position: 'absolute',
                  top: '8px',
                  right: '8px',
                  width: '8px',
                  height: '8px',
                  borderRadius: '50%',
                  background: c.error,
                }} />
              )}
              <div style={{
                ...style.statIconBox,
                backgroundColor: item.bg,
                color: item.color,
              }}>
                {Icon(item.icon)}
              </div>
              <div style={style.statInfo}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span style={style.statValue}>{item.num}</span>
                  {hoveredCard === item.id && renderMiniTrend(item.trend, item.color)}
                </div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <span style={style.statLabel}>{item.title}</span>
                  <span style={{
                    fontSize: '11px',
                    color: item.change >= 0 ? c.success : c.error,
                    fontWeight: '500',
                  }}>
                    {item.change >= 0 ? '↑' : '↓'} {Math.abs(item.change)}%
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div style={style.chartsRow}>
          <div className="chart-card" style={style.chartCard}>
            <h3 style={style.chartTitle}>订单来源渠道</h3>
            <div style={style.pieChart}>
              <div style={style.pieContainer}>
                {pieData.map((item, index) => {
                  const startAngle = pieData.slice(0, index).reduce((sum, d) => sum + (d.value / 100) * 360, 0);
                  const angle = (item.value / 100) * 360;
                  return (
                    <div
                      key={item.name}
                      style={{
                        ...style.pieSlice,
                        background: `conic-gradient(${item.color} 0deg ${angle}deg, ${c.tableStripe} ${angle}deg 360deg)`,
                        transform: `rotate(${startAngle}deg)`,
                      }}
                    />
                  );
                })}
              </div>
              <div style={style.pieLegend}>
                {pieData.map((item) => (
                  <div key={item.name} style={style.legendItem}>
                    <span style={{...style.legendDot, backgroundColor: item.color}} />
                    <span style={style.legendText}>{item.name}: {item.value}%</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="chart-card" style={style.chartCard}>
            <h3 style={style.chartTitle}>每日订单量</h3>
            <div style={style.barChart}>
              <div style={style.barContainer}>
                {barData.map((item) => (
                  <div key={item.day} style={style.barItem}>
                    <div style={{
                      ...style.bar,
                      height: `${(item.value / 350) * 100}%`,
                      background: c.primaryGradient,
                    }} />
                    <span style={style.barLabel}>{item.day}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="chart-card" style={style.lineChartCard}>
            <h3 style={style.chartTitle}>订单与销售额趋势</h3>
            <div style={style.lineChartContainer}>
              <svg width="100%" height="220" viewBox="0 0 800 220">
                {[0, 50, 100, 150, 200].map((y) => (
                  <line
                    key={y}
                    x1="40"
                    y1={y}
                    x2="800"
                    y2={y}
                    stroke={c.border}
                    strokeWidth="1"
                  />
                ))}
                {lineData.map((item, index) => {
                  const x1 = 40 + (index * (760 / (lineData.length - 1)));
                  const y1 = 200 - (item.orders / 400) * 180;
                  if (index < lineData.length - 1) {
                    const x2 = 40 + ((index + 1) * (760 / (lineData.length - 1)));
                    const y2 = 200 - (lineData[index + 1].orders / 400) * 180;
                    return (
                      <g key={item.date}>
                        <line
                          x1={x1}
                          y1={y1}
                          x2={x2}
                          y2={y2}
                          stroke={c.primary}
                          strokeWidth="2"
                          fill="none"
                        />
                        <circle cx={x1} cy={y1} r="4" fill={c.primary} />
                      </g>
                    );
                  }
                  return (
                    <circle key={item.date} cx={x1} cy={y1} r="4" fill={c.primary} />
                  );
                })}
                {lineData.map((item, index) => {
                  const x1 = 40 + (index * (760 / (lineData.length - 1)));
                  const y1 = 200 - (item.amount / 30000) * 180;
                  if (index < lineData.length - 1) {
                    const x2 = 40 + ((index + 1) * (760 / (lineData.length - 1)));
                    const y2 = 200 - (lineData[index + 1].amount / 30000) * 180;
                    return (
                      <g key={`amount-${item.date}`}>
                        <line
                          x1={x1}
                          y1={y1}
                          x2={x2}
                          y2={y2}
                          stroke={c.success}
                          strokeWidth="2"
                          strokeDasharray="5,5"
                          fill="none"
                        />
                        <circle cx={x1} cy={y1} r="4" fill={c.success} />
                      </g>
                    );
                  }
                  return (
                    <circle key={`amount-${item.date}`} cx={x1} cy={y1} r="4" fill={c.success} />
                  );
                })}
                {lineData.map((item, index) => (
                  <text
                    key={`label-${item.date}`}
                    x={40 + (index * (760 / (lineData.length - 1)))}
                    y="215"
                    textAnchor="middle"
                    style={{ fontSize: '11px', fill: c.textMuted }}
                  >
                    {item.date}
                  </text>
                ))}
              </svg>
              <div style={style.lineLegend}>
                <div style={style.legendItem}>
                  <span style={{...style.legendDot, backgroundColor: c.primary}} />
                  <span style={style.legendText}>订单数</span>
                </div>
                <div style={style.legendItem}>
                  <span style={{...style.legendDot, backgroundColor: c.success}} />
                  <span style={style.legendText}>销售额</span>
                </div>
              </div>
            </div>
          </div>

          <div className="chart-card" style={style.logsCard}>
            <div style={style.logsHeader}>
              <h3 style={style.chartTitle}>操作日志</h3>
              <button style={style.viewAllBtn}>
                <LinearIcons.eye style={{ width: '12px', height: '12px', marginRight: '4px' }} />
                查看全部
              </button>
            </div>
            <div style={style.logsList}>
              {logsData.map((log, index) => (
                <div 
                  key={index} 
                  style={{
                    ...style.logItem,
                    borderLeft: `3px solid ${getLogBorder(log.type)}`,
                  }}
                >
                  <span style={{...style.logIcon, backgroundColor: getLogBg(log.type)}}>
                    {getLogIcon(log.type)}
                  </span>
                  <div style={style.logContent}>
                    <span style={style.logAction}>{log.action}</span>
                    <span style={style.logUser}>{log.user}</span>
                  </div>
                  <span style={style.logTime}>{log.time}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

function getStyle(c) {
  return {
    mainContent: {
      flex: 1,
      padding: '24px',
      display: 'flex',
    },
    dashboardContent: {
      width: '100%',
    },
    pageHeader: {
      marginBottom: '24px',
    },
    pageTitle: {
      fontSize: '28px',
      fontWeight: '600',
      color: c.text,
      margin: '0 0 8px 0',
    },
    pageSubtitle: {
      fontSize: '14px',
      color: c.textMuted,
      margin: 0,
    },
    statsGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(3, 1fr)',
      gap: '16px',
      marginBottom: '24px',
    },
    statCard: {
      background: c.surface,
      borderRadius: '12px',
      padding: '20px',
      display: 'flex',
      alignItems: 'center',
      gap: '16px',
      boxShadow: c.cardShadow,
      border: `1px solid ${c.border}`,
      transition: 'all 0.3s ease',
    },
    statIconBox: {
      width: '48px',
      height: '48px',
      borderRadius: '10px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: '22px',
    },
    statInfo: {
      flex: 1,
    },
    statValue: {
      fontSize: '24px',
      fontWeight: '600',
      color: c.text,
      marginBottom: '4px',
    },
    statLabel: {
      fontSize: '13px',
      color: c.textMuted,
    },
    chartsRow: {
      display: 'grid',
      gridTemplateColumns: 'repeat(2, 1fr)',
      gap: '20px',
    },
    chartCard: {
      background: c.surface,
      borderRadius: '12px',
      padding: '20px',
      boxShadow: c.cardShadow,
      border: `1px solid ${c.border}`,
    },
    lineChartCard: {
      background: c.surface,
      borderRadius: '12px',
      padding: '20px',
      boxShadow: c.cardShadow,
      border: `1px solid ${c.border}`,
      gridColumn: 'span 2',
    },
    logsCard: {
      background: c.surface,
      borderRadius: '12px',
      padding: '20px',
      boxShadow: c.cardShadow,
      border: `1px solid ${c.border}`,
      gridColumn: 'span 2',
    },
    chartTitle: {
      fontSize: '15px',
      fontWeight: '600',
      color: c.text,
      margin: '0 0 16px 0',
    },
    pieChart: {
      display: 'flex',
      alignItems: 'center',
      gap: '24px',
    },
    pieContainer: {
      width: '120px',
      height: '120px',
      borderRadius: '50%',
      position: 'relative',
      overflow: 'hidden',
    },
    pieSlice: {
      position: 'absolute',
      width: '100%',
      height: '100%',
      borderRadius: '50%',
    },
    pieLegend: {
      flex: 1,
    },
    legendItem: {
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
      marginBottom: '8px',
    },
    legendDot: {
      width: '10px',
      height: '10px',
      borderRadius: '50%',
    },
    legendText: {
      fontSize: '13px',
      color: c.textSecondary,
    },
    barChart: {
      height: '150px',
    },
    barContainer: {
      display: 'flex',
      alignItems: 'flex-end',
      height: '120px',
      gap: '12px',
      paddingTop: '10px',
    },
    barItem: {
      flex: 1,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: '8px',
    },
    bar: {
      width: '100%',
      borderRadius: '6px 6px 0 0',
      minHeight: '8px',
      transition: 'height 0.3s ease',
    },
    barLabel: {
      fontSize: '12px',
      color: c.textMuted,
    },
    lineChartContainer: {
      height: '220px',
    },
    lineLegend: {
      display: 'flex',
      gap: '24px',
      justifyContent: 'flex-end',
      marginTop: '8px',
    },
    logsHeader: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: '16px',
    },
    viewAllBtn: {
      padding: '6px 12px',
      background: c.surfaceHover,
      border: `1px solid ${c.border}`,
      borderRadius: '6px',
      fontSize: '12px',
      cursor: 'pointer',
      color: c.textSecondary,
      display: 'flex',
      alignItems: 'center',
      transition: 'all 0.25s',
    },
    logsList: {
      display: 'flex',
      flexDirection: 'column',
      gap: '12px',
    },
    logItem: {
      display: 'flex',
      alignItems: 'center',
      gap: '12px',
      padding: '12px 16px',
      background: c.surfaceHover,
      borderRadius: '8px',
    },
    logIcon: {
      width: '28px',
      height: '28px',
      borderRadius: '8px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexShrink: 0,
    },
    logContent: {
      flex: 1,
      display: 'flex',
      flexDirection: 'column',
      gap: '4px',
    },
    logAction: {
      fontSize: '13px',
      color: c.text,
    },
    logUser: {
      fontSize: '12px',
      color: c.textMuted,
    },
    logTime: {
      fontSize: '12px',
      color: c.textMuted,
      flexShrink: 0,
    },
  };
}

function Home() {
  return (
    <AdminLayout activeModule="dashboard">
      <HomeContent />
    </AdminLayout>
  );
}

export default Home;
