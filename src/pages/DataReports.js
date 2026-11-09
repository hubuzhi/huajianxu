import React, { useState, useEffect, useMemo } from 'react';
import { useTheme } from '../context/ThemeContext';
import { useNavigate } from 'react-router-dom';
import AdminLayout from '../components/AdminLayout';

function DataReportsContent() {
  const { theme } = useTheme();
  const navigate = useNavigate();
  const colors = theme.colors;
  const styles = getStyles(colors);

  const [activeTab, setActiveTab] = useState('dashboard');
  const [timeRange, setTimeRange] = useState('7days');
  const [customDateRange, setCustomDateRange] = useState({ start: '', end: '' });
  const [isLoading, setIsLoading] = useState(true);
  const [hoveredPieItem, setHoveredPieItem] = useState(null);
  const [hoveredBarItem, setHoveredBarItem] = useState(null);

  const generateMockOrders = useMemo(() => {
    const sources = ['APP', '小程序', 'PC网页', '第三方平台'];
    const orders = [];
    const today = new Date();
    
    let daysToGenerate = timeRange === '7days' ? 7 : 30;
    if (timeRange === 'custom' && customDateRange.start && customDateRange.end) {
      const start = new Date(customDateRange.start);
      const end = new Date(customDateRange.end);
      daysToGenerate = Math.ceil((end - start) / (1000 * 60 * 60 * 24)) + 1;
    }

    for (let i = daysToGenerate - 1; i >= 0; i--) {
      const date = new Date(today);
      date.setDate(date.getDate() - i);
      const dateStr = date.toISOString().split('T')[0];
      
      const dayOrders = Math.floor(Math.random() * 80) + 40;
      
      for (let j = 0; j < dayOrders; j++) {
        orders.push({
          id: `${dateStr}-${j}`,
          source: sources[Math.floor(Math.random() * sources.length)],
          date: dateStr,
          amount: Math.floor(Math.random() * 500) + 50,
        });
      }
    }
    
    return orders;
  }, [timeRange, customDateRange]);

  const sourceData = useMemo(() => {
    const sourceCounts = {};
    generateMockOrders.forEach(order => {
      sourceCounts[order.source] = (sourceCounts[order.source] || 0) + 1;
    });
    
    return Object.entries(sourceCounts).map(([name, value]) => ({ name, value }));
  }, [generateMockOrders]);

  const dailyData = useMemo(() => {
    const dayCounts = {};
    generateMockOrders.forEach(order => {
      dayCounts[order.date] = (dayCounts[order.date] || 0) + 1;
    });
    
    const dayNames = ['周日', '周一', '周二', '周三', '周四', '周五', '周六'];
    
    return Object.entries(dayCounts).map(([date, value]) => {
      const dateObj = new Date(date);
      return {
        date,
        day: dayNames[dateObj.getDay()],
        value,
      };
    }).sort((a, b) => new Date(a.date) - new Date(b.date));
  }, [generateMockOrders]);

  const totalOrders = useMemo(() => generateMockOrders.length, [generateMockOrders]);
  const totalSource = useMemo(() => sourceData.reduce((sum, item) => sum + item.value, 0), [sourceData]);

  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500);
    return () => clearTimeout(timer);
  }, [timeRange, customDateRange]);

  const generatePiePath = (data) => {
    let currentAngle = 0;
    const paths = [];
    const centerX = 100;
    const centerY = 100;
    const radius = 80;
    const pieColors = [colors.primary, colors.success, colors.warning, colors.info];

    data.forEach((item, idx) => {
      const angle = totalSource > 0 ? (item.value / totalSource) * 360 : 0;
      const startAngle = (currentAngle - 90) * (Math.PI / 180);
      const endAngle = (currentAngle + angle - 90) * (Math.PI / 180);
      const x1 = centerX + radius * Math.cos(startAngle);
      const y1 = centerY + radius * Math.sin(startAngle);
      const x2 = centerX + radius * Math.cos(endAngle);
      const y2 = centerY + radius * Math.sin(endAngle);
      const largeArcFlag = angle > 180 ? 1 : 0;

      paths.push({
        path: `M ${centerX} ${centerY} L ${x1} ${y1} A ${radius} ${radius} 0 ${largeArcFlag} 1 ${x2} ${y2} Z`,
        color: pieColors[idx % pieColors.length],
        name: item.name,
        value: item.value,
        percentage: totalSource > 0 ? ((item.value / totalSource) * 100).toFixed(1) : '0',
      });
      currentAngle += angle;
    });

    return paths;
  };

  const piePaths = generatePiePath(sourceData);
  const maxBarValue = dailyData.length > 0 ? Math.max(...dailyData.map(d => d.value)) : 1;

  const handleBarClick = (item) => {
    navigate(`/orders?date=${item.date}`);
  };

  const handleCustomRange = () => {
    if (customDateRange.start && customDateRange.end) {
      setTimeRange('custom');
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <div style={styles.headerLeft}>
          <h2 style={styles.title}>数据统计报表</h2>
        </div>
        <div style={styles.headerRight}>
          <div style={styles.timeFilter}>
            <span style={styles.filterLabel}>时间范围：</span>
            <div style={styles.filterBtns}>
              <button
                style={{...styles.filterBtn, ...(timeRange === '7days' ? styles.activeFilterBtn : {})}}
                onClick={() => setTimeRange('7days')}
              >近7天</button>
              <button
                style={{...styles.filterBtn, ...(timeRange === '30days' ? styles.activeFilterBtn : {})}}
                onClick={() => setTimeRange('30days')}
              >近30天</button>
              <button
                style={{...styles.filterBtn, ...(timeRange === 'custom' ? styles.activeFilterBtn : {})}}
                onClick={() => setTimeRange('custom')}
              >自定义</button>
            </div>
            {timeRange === 'custom' && (
              <div style={styles.customDateInput}>
                <input
                  type="date"
                  value={customDateRange.start}
                  onChange={(e) => setCustomDateRange(prev => ({...prev, start: e.target.value}))}
                  style={styles.dateInput}
                />
                <span style={styles.dateSeparator}>至</span>
                <input
                  type="date"
                  value={customDateRange.end}
                  onChange={(e) => setCustomDateRange(prev => ({...prev, end: e.target.value}))}
                  style={styles.dateInput}
                />
                <button style={styles.confirmBtn} onClick={handleCustomRange}>确定</button>
              </div>
            )}
          </div>
        </div>
      </div>

      <div style={styles.tabBar}>
        <button
          style={{...styles.tabBtn, ...(activeTab === 'dashboard' ? styles.activeTab : {})}}
          onClick={() => setActiveTab('dashboard')}
        >核心数据看板</button>
        <button
          style={{...styles.tabBtn, ...(activeTab === 'orders' ? styles.activeTab : {})}}
          onClick={() => setActiveTab('orders')}
        >订单报表</button>
        <button
          style={{...styles.tabBtn, ...(activeTab === 'users' ? styles.activeTab : {})}}
          onClick={() => setActiveTab('users')}
        >用户报表</button>
      </div>

      {activeTab === 'dashboard' && (
        <>
          <div style={styles.statsGrid}>
            <div style={{...styles.statCard, borderLeftColor: colors.primary}}>
              <div style={styles.statTop}>
                <div style={styles.statValue}>{totalOrders}</div>
              </div>
              <div style={styles.statLabel}>订单总数</div>
            </div>
            <div style={{...styles.statCard, borderLeftColor: colors.success}}>
              <div style={styles.statTop}>
                <div style={styles.statValue}>{sourceData.length}</div>
              </div>
              <div style={styles.statLabel}>渠道数量</div>
            </div>
            <div style={{...styles.statCard, borderLeftColor: colors.warning}}>
              <div style={styles.statTop}>
                <div style={styles.statValue}>{dailyData.length}</div>
              </div>
              <div style={styles.statLabel}>统计天数</div>
            </div>
            <div style={{...styles.statCard, borderLeftColor: colors.info}}>
              <div style={styles.statTop}>
                <div style={styles.statValue}>{totalOrders > 0 ? (totalOrders / dailyData.length).toFixed(1) : '0'}</div>
              </div>
              <div style={styles.statLabel}>日均订单</div>
            </div>
          </div>

          <div style={styles.chartRow}>
            <div style={styles.chartCard}>
              <div style={styles.chartHeader}>
                <h3>订单来源渠道</h3>
              </div>
              
              {isLoading ? (
                <div style={styles.loadingContainer}>
                  <div style={styles.loadingSpinner}></div>
                  <span style={styles.loadingText}>加载中...</span>
                </div>
              ) : sourceData.length === 0 ? (
                <div style={styles.emptyState}>
                  <span style={styles.emptyIcon}>📊</span>
                  <p style={styles.emptyText}>暂无订单数据</p>
                </div>
              ) : (
                <div style={styles.pieContainer}>
                  <div style={styles.pieWrapper}>
                    <svg width="200" height="200" viewBox="0 0 200 200">
                      {piePaths.map((p, idx) => (
                        <path
                          key={idx}
                          d={p.path}
                          fill={p.color}
                          style={{
                            cursor: 'pointer',
                            transition: 'opacity 0.3s',
                            opacity: hoveredPieItem === idx ? 0.8 : 1,
                          }}
                          onMouseEnter={() => setHoveredPieItem(idx)}
                          onMouseLeave={() => setHoveredPieItem(null)}
                        />
                      ))}
                      <circle cx="100" cy="100" r="50" fill={colors.surface} />
                    </svg>
                    {hoveredPieItem !== null && piePaths[hoveredPieItem] && (
                      <div style={{...styles.pieTooltip, left: '50%', top: '50%'}}>
                        <div style={styles.tooltipTitle}>{piePaths[hoveredPieItem].name}</div>
                        <div style={styles.tooltipValue}>订单数: {piePaths[hoveredPieItem].value}</div>
                        <div style={styles.tooltipPercent}>占比: {piePaths[hoveredPieItem].percentage}%</div>
                      </div>
                    )}
                  </div>
                  <div style={styles.pieLegend}>
                    {sourceData.map((item, idx) => (
                      <div
                        key={idx}
                        style={{...styles.legendItem, ...(hoveredPieItem === idx ? styles.legendItemHover : {})}}
                        onMouseEnter={() => setHoveredPieItem(idx)}
                        onMouseLeave={() => setHoveredPieItem(null)}
                      >
                        <span style={{...styles.legendDot, backgroundColor: [colors.primary, colors.success, colors.warning, colors.info][idx % 4]}}></span>
                        <span style={styles.legendText}>{item.name}</span>
                        <span style={styles.legendValue}>{item.value} ({((item.value / totalSource) * 100).toFixed(1)}%)</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div style={{...styles.chartCard, flex: 1}}>
              <div style={styles.chartHeader}>
                <h3>每日订单量</h3>
                <div style={styles.chartTabs}>
                  <button
                    style={{...styles.chartTabBtn, ...(timeRange === '7days' ? styles.activeChartTab : {})}}
                    onClick={() => setTimeRange('7days')}
                  >近7天</button>
                  <button
                    style={{...styles.chartTabBtn, ...(timeRange === '30days' ? styles.activeChartTab : {})}}
                    onClick={() => setTimeRange('30days')}
                  >近30天</button>
                </div>
              </div>
              
              {isLoading ? (
                <div style={styles.loadingContainer}>
                  <div style={styles.loadingSpinner}></div>
                  <span style={styles.loadingText}>加载中...</span>
                </div>
              ) : dailyData.length === 0 ? (
                <div style={styles.emptyState}>
                  <span style={styles.emptyIcon}>📈</span>
                  <p style={styles.emptyText}>暂无订单数据</p>
                </div>
              ) : (
                <div style={styles.barChartContainer}>
                  <svg viewBox={`0 0 ${Math.max(dailyData.length * 50 + 80, 400)} 220`} style={{width: '100%', height: '200px'}}>
                    {[0, 25, 50, 75, 100].map((val, idx) => (
                      <text key={idx} x="40" y={200 - (val / 100) * 160} fill={colors.textMuted} fontSize="10" textAnchor="end">
                        {Math.round((val / 100) * maxBarValue)}
                      </text>
                    ))}
                    {dailyData.map((item, idx) => {
                      const x = 60 + idx * 50;
                      const height = maxBarValue > 0 ? (item.value / maxBarValue) * 160 : 0;
                      const y = 200 - height;
                      const barColors = [colors.primary, colors.success, colors.warning, colors.info, colors.primary, colors.success, colors.warning];
                      
                      return (
                        <g key={idx}>
                          <rect
                            x={x}
                            y={y}
                            width="35"
                            height={height}
                            fill={barColors[idx % barColors.length]}
                            rx="6"
                            style={{
                              cursor: 'pointer',
                              transition: 'all 0.3s',
                              opacity: hoveredBarItem === idx ? 0.8 : 1,
                              transform: hoveredBarItem === idx ? 'scale(1.05)' : 'scale(1)',
                              transformOrigin: `${x + 17.5}px ${y + height}px`,
                            }}
                            onMouseEnter={() => setHoveredBarItem(idx)}
                            onMouseLeave={() => setHoveredBarItem(null)}
                            onClick={() => handleBarClick(item)}
                          />
                          <text x={x + 17.5} y={215} fill={colors.textMuted} fontSize="11" textAnchor="middle">
                            {item.day}
                          </text>
                          <text x={x + 17.5} y={y - 8} fill={colors.textSecondary} fontSize="12" textAnchor="middle" fontWeight="500">
                            {item.value}
                          </text>
                        </g>
                      );
                    })}
                  </svg>
                  {hoveredBarItem !== null && dailyData[hoveredBarItem] && (
                    <div style={{...styles.barTooltip, display: 'none'}} id="bar-tooltip">
                      <div style={styles.tooltipTitle}>{dailyData[hoveredBarItem].date}</div>
                      <div style={styles.tooltipValue}>订单数: {dailyData[hoveredBarItem].value}</div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </>
      )}

      {activeTab === 'orders' && (
        <div style={styles.reportContainer}>
          <div style={styles.reportHeader}>
            <h3>订单统计报表</h3>
          </div>
          <div style={styles.reportTable}>
            <table style={styles.table}>
              <thead>
                <tr>
                  <th style={styles.th}>日期</th>
                  <th style={styles.th}>订单数</th>
                  <th style={styles.th}>APP渠道</th>
                  <th style={styles.th}>小程序</th>
                  <th style={styles.th}>PC网页</th>
                  <th style={styles.th}>第三方平台</th>
                  <th style={styles.th}>操作</th>
                </tr>
              </thead>
              <tbody>
                {dailyData.map((item, idx) => {
                  const dayOrders = generateMockOrders.filter(o => o.date === item.date);
                  const appCount = dayOrders.filter(o => o.source === 'APP').length;
                  const miniCount = dayOrders.filter(o => o.source === '小程序').length;
                  const pcCount = dayOrders.filter(o => o.source === 'PC网页').length;
                  const thirdCount = dayOrders.filter(o => o.source === '第三方平台').length;
                  
                  return (
                    <tr key={idx} style={styles.tr}>
                      <td style={styles.td}>{item.date}</td>
                      <td style={styles.td}><strong>{item.value}</strong></td>
                      <td style={styles.td}>{appCount}</td>
                      <td style={styles.td}>{miniCount}</td>
                      <td style={styles.td}>{pcCount}</td>
                      <td style={styles.td}>{thirdCount}</td>
                      <td style={styles.td}>
                        <button style={styles.actionBtn} onClick={() => navigate(`/orders?date=${item.date}`)}>查看详情</button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {activeTab === 'users' && (
        <div style={styles.reportContainer}>
          <div style={styles.reportHeader}>
            <h3>用户统计报表</h3>
          </div>
          <div style={styles.reportTable}>
            <table style={styles.table}>
              <thead>
                <tr>
                  <th style={styles.th}>日期</th>
                  <th style={styles.th}>注册用户</th>
                  <th style={styles.th}>活跃用户</th>
                  <th style={styles.th}>新增用户</th>
                  <th style={styles.th}>留存率</th>
                  <th style={styles.th}>平均时长(分钟)</th>
                </tr>
              </thead>
              <tbody>
                {dailyData.map((item, idx) => (
                  <tr key={idx} style={styles.tr}>
                    <td style={styles.td}>{item.date}</td>
                    <td style={styles.td}>{1100 + idx * 25}</td>
                    <td style={styles.td}>{850 + idx * 20}</td>
                    <td style={styles.td}>{25 + Math.floor(Math.random() * 15)}</td>
                    <td style={styles.td}>{65 + idx}%</td>
                    <td style={styles.td}>{15 + Math.floor(Math.random() * 10)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
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
      alignItems: 'flex-start',
      marginBottom: '24px',
      flexWrap: 'wrap',
      gap: '16px',
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
    timeFilter: {
      display: 'flex',
      alignItems: 'center',
      gap: '12px',
      flexWrap: 'wrap',
    },
    filterLabel: {
      fontSize: '14px',
      color: colors.textSecondary,
    },
    filterBtns: {
      display: 'flex',
      gap: '8px',
    },
    filterBtn: {
      padding: '8px 16px',
      background: colors.surface,
      border: `1px solid ${colors.border}`,
      borderRadius: '6px',
      fontSize: '13px',
      cursor: 'pointer',
      color: colors.textSecondary,
      transition: 'all 0.3s ease',
    },
    activeFilterBtn: {
      background: colors.primaryGradient,
      color: colors.textInverse,
      border: 'none',
    },
    customDateInput: {
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
    },
    dateInput: {
      padding: '6px 12px',
      border: `1px solid ${colors.border}`,
      borderRadius: '6px',
      fontSize: '13px',
      background: colors.surface,
      color: colors.text,
    },
    dateSeparator: {
      color: colors.textMuted,
    },
    confirmBtn: {
      padding: '6px 14px',
      background: colors.primary,
      border: 'none',
      borderRadius: '6px',
      fontSize: '13px',
      cursor: 'pointer',
      color: '#fff',
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
    statsGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(4, 1fr)',
      gap: '16px',
      marginBottom: '24px',
    },
    statCard: {
      background: colors.surface,
      borderRadius: '12px',
      padding: '20px 24px',
      borderLeft: '4px solid',
      boxShadow: colors.cardShadow,
      border: `1px solid ${colors.border}`,
    },
    statTop: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'flex-start',
    },
    statValue: {
      fontSize: '28px',
      fontWeight: '600',
      color: colors.text,
    },
    statLabel: {
      fontSize: '13px',
      color: colors.textMuted,
      marginTop: '4px',
    },
    chartRow: {
      display: 'flex',
      gap: '24px',
      marginBottom: '24px',
      flexWrap: 'wrap',
    },
    chartCard: {
      flex: 1,
      minWidth: '400px',
      background: colors.surface,
      borderRadius: '12px',
      padding: '20px 24px',
      boxShadow: colors.cardShadow,
      border: `1px solid ${colors.border}`,
    },
    chartHeader: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: '20px',
    },
    chartTabs: {
      display: 'flex',
      gap: '8px',
    },
    chartTabBtn: {
      padding: '6px 16px',
      background: colors.surfaceHover,
      border: `1px solid ${colors.border}`,
      borderRadius: '6px',
      fontSize: '12px',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      color: colors.textSecondary,
    },
    activeChartTab: {
      background: colors.primaryGradient,
      color: colors.textInverse,
      border: 'none',
    },
    pieContainer: {
      display: 'flex',
      alignItems: 'center',
      gap: '30px',
      flexWrap: 'wrap',
      justifyContent: 'center',
    },
    pieWrapper: {
      position: 'relative',
    },
    pieLegend: {
      flex: 1,
      minWidth: '150px',
    },
    legendItem: {
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
      marginBottom: '12px',
      cursor: 'pointer',
      padding: '4px',
      borderRadius: '4px',
      transition: 'background 0.3s',
    },
    legendItemHover: {
      background: colors.surfaceHover,
    },
    legendDot: {
      width: '12px',
      height: '12px',
      borderRadius: '50%',
    },
    legendText: {
      flex: 1,
      fontSize: '13px',
      color: colors.textSecondary,
    },
    legendValue: {
      fontSize: '13px',
      color: colors.textMuted,
    },
    pieTooltip: {
      position: 'absolute',
      transform: 'translate(-50%, -50%)',
      background: 'rgba(0, 0, 0, 0.8)',
      color: '#fff',
      padding: '10px 14px',
      borderRadius: '8px',
      fontSize: '12px',
      zIndex: 10,
      pointerEvents: 'none',
    },
    barChartContainer: {
      position: 'relative',
    },
    barTooltip: {
      position: 'absolute',
      background: 'rgba(0, 0, 0, 0.8)',
      color: '#fff',
      padding: '10px 14px',
      borderRadius: '8px',
      fontSize: '12px',
      zIndex: 10,
      pointerEvents: 'none',
    },
    tooltipTitle: {
      fontWeight: '600',
      marginBottom: '4px',
    },
    tooltipValue: {
      marginBottom: '4px',
    },
    tooltipPercent: {
      opacity: 0.8,
    },
    loadingContainer: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '40px',
    },
    loadingSpinner: {
      width: '40px',
      height: '40px',
      border: `3px solid ${colors.border}`,
      borderTopColor: colors.primary,
      borderRadius: '50%',
      animation: 'spin 1s linear infinite',
    },
    loadingText: {
      marginTop: '12px',
      color: colors.textMuted,
      fontSize: '14px',
    },
    emptyState: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '40px',
    },
    emptyIcon: {
      fontSize: '48px',
      marginBottom: '12px',
    },
    emptyText: {
      color: colors.textMuted,
      fontSize: '14px',
    },
    reportContainer: {
      background: colors.surface,
      borderRadius: '12px',
      boxShadow: colors.cardShadow,
      border: `1px solid ${colors.border}`,
      overflow: 'hidden',
    },
    reportHeader: {
      padding: '20px 24px',
      borderBottom: `1px solid ${colors.border}`,
    },
    reportTable: {
      overflowX: 'auto',
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
    },
    td: {
      padding: '14px 16px',
      fontSize: '14px',
      color: colors.textSecondary,
    },
    actionBtn: {
      padding: '6px 14px',
      background: colors.primary,
      color: '#fff',
      border: 'none',
      borderRadius: '6px',
      fontSize: '12px',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
    },
  };
}

function DataReports() {
  return (
    <AdminLayout activeModule="dataReports">
      <DataReportsContent />
    </AdminLayout>
  );
}

export default DataReports;
