import React, { useState, useEffect } from 'react';
import LinearIcons from './LinearIcons';

function DetailPanel({ type, onClose, theme }) {
  const c = theme.colors;
  const [loading, setLoading] = useState(true);
  const [slideIn, setSlideIn] = useState(false);

  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => {
      setLoading(false);
      setSlideIn(true);
    }, 300);
    return () => clearTimeout(timer);
  }, [type]);

  const handleClose = () => {
    setSlideIn(false);
    setTimeout(onClose, 300);
  };

  const panelStyle = {
    position: 'fixed',
    top: 0,
    right: 0,
    bottom: 0,
    width: '65%',
    background: c.surface,
    boxShadow: '-4px 0 20px rgba(0,0,0,0.15)',
    zIndex: 200,
    overflow: 'auto',
    transition: 'transform 0.3s ease',
    transform: slideIn ? 'translateX(0)' : 'translateX(100%)',
  };

  const headerStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '20px 24px',
    borderBottom: `1px solid ${c.border}`,
    position: 'sticky',
    top: 0,
    background: c.surface,
    zIndex: 1,
  };

  const closeBtnStyle = {
    background: 'none',
    border: 'none',
    fontSize: '24px',
    cursor: 'pointer',
    color: c.textMuted,
    padding: '4px 8px',
    borderRadius: '4px',
  };

  const contentStyle = {
    padding: '24px',
  };

  const renderContent = () => {
    if (loading) {
      return (
        <div style={contentStyle}>
          <div style={{
            background: c.surfaceHover,
            borderRadius: '8px',
            padding: '20px',
            marginBottom: '16px',
            height: '200px',
          }}>
            <div style={{ color: c.textMuted, textAlign: 'center', paddingTop: '80px' }}>加载中...</div>
          </div>
        </div>
      );
    }

    switch(type) {
      case 'users':
        return renderUsersContent();
      case 'visitors':
        return renderVisitorsContent();
      case 'orders':
        return renderOrdersContent();
      case 'pending':
        return renderPendingContent();
      case 'sales':
        return renderSalesContent();
      default:
        return <div style={{ color: c.textMuted }}>暂无数据</div>;
    }
  };

  const renderUsersContent = () => (
    <div style={contentStyle}>
      <div style={getCardStyle(c)}>
        <h4 style={{...getTitleStyle(c), marginBottom: '16px'}}>用户增长趋势</h4>
        <svg width="100%" height="180" viewBox="0 0 500 180">
          {[0, 45, 90, 135].map((y) => (
            <line key={y} x1="40" y1={y} x2="500" y2={y} stroke={c.border} strokeWidth="1" />
          ))}
          {[
            {x: 60, y: 120}, {x: 120, y: 100}, {x: 180, y: 110},
            {x: 240, y: 80}, {x: 300, y: 60}, {x: 360, y: 40}, {x: 420, y: 30}
          ].map((point, i) => {
            const nextPoint = i < 6 ? [
              {x: 120, y: 100}, {x: 180, y: 110},
              {x: 240, y: 80}, {x: 300, y: 60}, {x: 360, y: 40}, {x: 420, y: 30}, null
            ][i] : null;
            return nextPoint ? (
              <g key={i}>
                <line x1={point.x} y1={point.y} x2={nextPoint.x} y2={nextPoint.y}
                  stroke={c.primary} strokeWidth="2" />
                <circle cx={point.x} cy={point.y} r="4" fill={c.primary} />
              </g>
            ) : <circle key={i} cx={point.x} cy={point.y} r="4" fill={c.primary} />;
          })}
        </svg>
      </div>

      <div style={getCardStyle(c)}>
        <h4 style={{...getTitleStyle(c), marginBottom: '16px'}}>用户地区分布</h4>
        {[
          { region: '北京', count: 320, percent: 26 },
          { region: '上海', count: 280, percent: 23 },
          { region: '广州', count: 210, percent: 17 },
          { region: '深圳', count: 180, percent: 15 },
          { region: '其他', count: 244, percent: 19 },
        ].map((item, i) => (
          <div key={i} style={{ marginBottom: '12px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
              <span style={{ fontSize: '13px', color: c.text }}>{item.region}</span>
              <span style={{ fontSize: '13px', color: c.textMuted }}>{item.count}人 ({item.percent}%)</span>
            </div>
            <div style={{ background: c.surfaceHover, borderRadius: '4px', height: '8px' }}>
              <div style={{
                width: `${item.percent}%`,
                background: c.primaryGradient,
                height: '100%',
                borderRadius: '4px',
                transition: 'width 0.3s',
              }} />
            </div>
          </div>
        ))}
      </div>

      <div style={getCardStyle(c)}>
        <h4 style={{...getTitleStyle(c), marginBottom: '16px'}}>今日新增用户</h4>
        {[
          { name: '张小明', time: '10:23', avatar: '👤' },
          { name: '李婷婷', time: '09:45', avatar: '👤' },
          { name: '王建国', time: '08:30', avatar: '👤' },
        ].map((user, i) => (
          <div key={i} style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            padding: '10px 0',
            borderBottom: i < 2 ? `1px solid ${c.border}` : 'none',
          }}>
            <span style={{ fontSize: '24px' }}>{user.avatar}</span>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: '14px', color: c.text }}>{user.name}</div>
              <div style={{ fontSize: '12px', color: c.textMuted }}>{user.time}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderVisitorsContent = () => (
    <div style={contentStyle}>
      <div style={getCardStyle(c)}>
        <h4 style={{...getTitleStyle(c), marginBottom: '16px'}}>访问时段分布</h4>
        {[
          { time: '00:00-06:00', value: 120 },
          { time: '06:00-12:00', value: 450 },
          { time: '12:00-18:00', value: 680 },
          { time: '18:00-24:00', value: 520 },
        ].map((item, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '10px' }}>
            <span style={{ fontSize: '12px', color: c.textMuted, width: '90px' }}>{item.time}</span>
            <div style={{ flex: 1, background: c.surfaceHover, borderRadius: '4px', height: '20px' }}>
              <div style={{
                width: `${(item.value / 700) * 100}%`,
                background: c.warning,
                height: '100%',
                borderRadius: '4px',
              }} />
            </div>
            <span style={{ fontSize: '12px', color: c.text, width: '50px', textAlign: 'right' }}>{item.value}</span>
          </div>
        ))}
      </div>

      <div style={getCardStyle(c)}>
        <h4 style={{...getTitleStyle(c), marginBottom: '16px'}}>访问来源</h4>
        {[
          { source: '直接访问', value: 35 },
          { source: '搜索引擎', value: 28 },
          { source: '社交媒体', value: 22 },
          { source: '外部链接', value: 15 },
        ].map((item, i) => (
          <div key={i} style={{
            display: 'flex',
            justifyContent: 'space-between',
            padding: '10px 0',
            borderBottom: i < 3 ? `1px solid ${c.border}` : 'none',
          }}>
            <span style={{ fontSize: '13px', color: c.text }}>{item.source}</span>
            <span style={{ fontSize: '13px', color: c.primary }}>{item.value}%</span>
          </div>
        ))}
      </div>

      <div style={getCardStyle(c)}>
        <h4 style={{...getTitleStyle(c), marginBottom: '16px'}}>热门商品访问排行</h4>
        {[
          { rank: 1, name: '红玫瑰', views: 1250 },
          { rank: 2, name: '蓝色妖姬', views: 980 },
          { rank: 3, name: '康乃馨', views: 860 },
          { rank: 4, name: '郁金香', views: 720 },
          { rank: 5, name: '向日葵', views: 650 },
        ].map((item, i) => (
          <div key={i} style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            padding: '10px 0',
            borderBottom: i < 4 ? `1px solid ${c.border}` : 'none',
          }}>
            <span style={{
              width: '20px',
              height: '20px',
              borderRadius: '50%',
              background: i < 3 ? c.primary : c.surfaceHover,
              color: i < 3 ? '#fff' : c.textMuted,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '11px',
              fontWeight: '600',
            }}>{item.rank}</span>
            <span style={{ flex: 1, fontSize: '13px', color: c.text }}>{item.name}</span>
            <span style={{ fontSize: '12px', color: c.textMuted }}>{item.views}次</span>
          </div>
        ))}
      </div>
    </div>
  );

  const renderOrdersContent = () => (
    <div style={contentStyle}>
      <div style={getCardStyle(c)}>
        <h4 style={{...getTitleStyle(c), marginBottom: '16px'}}>今日订单列表</h4>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ borderBottom: `1px solid ${c.border}` }}>
              <th style={{...getThStyle(c), textAlign: 'left'}}>订单号</th>
              <th style={{...getThStyle(c), textAlign: 'left'}}>商品</th>
              <th style={{...getThStyle(c), textAlign: 'right'}}>金额</th>
              <th style={{...getThStyle(c), textAlign: 'center'}}>状态</th>
            </tr>
          </thead>
          <tbody>
            {[
              { id: 'DD20240601001', item: '红玫瑰×11', amount: '¥299', status: '已完成', statusColor: c.success },
              { id: 'DD20240601002', item: '康乃馨×5', amount: '¥159', status: '配送中', statusColor: c.warning },
              { id: 'DD20240601003', item: '向日葵×3', amount: '¥99', status: '待发货', statusColor: c.error },
            ].map((order, i) => (
              <tr key={i} style={{ borderBottom: `1px solid ${c.border}` }}>
                <td style={getTdStyle(c)}>{order.id}</td>
                <td style={getTdStyle(c)}>{order.item}</td>
                <td style={{...getTdStyle(c), textAlign: 'right'}}>{order.amount}</td>
                <td style={{...getTdStyle(c), textAlign: 'center'}}>
                  <span style={{
                    padding: '2px 8px',
                    borderRadius: '10px',
                    fontSize: '11px',
                    background: order.statusColor + '20',
                    color: order.statusColor,
                  }}>{order.status}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div style={getCardStyle(c)}>
        <h4 style={{...getTitleStyle(c), marginBottom: '16px'}}>订单状态分布</h4>
        <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
          {[
            { label: '已完成', count: 156, color: c.success },
            { label: '配送中', count: 42, color: c.warning },
            { label: '待发货', count: 28, color: c.error },
            { label: '已取消', count: 12, color: c.textMuted },
          ].map((item, i) => (
            <div key={i} style={{
              flex: '1 1 40%',
              background: c.surfaceHover,
              borderRadius: '8px',
              padding: '16px',
              textAlign: 'center',
            }}>
              <div style={{ fontSize: '24px', fontWeight: '600', color: item.color }}>{item.count}</div>
              <div style={{ fontSize: '12px', color: c.textMuted, marginTop: '4px' }}>{item.label}</div>
            </div>
          ))}
        </div>
      </div>

      <div style={getCardStyle(c)}>
        <h4 style={{...getTitleStyle(c), marginBottom: '16px'}}>订单金额统计</h4>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
          <div style={{ background: c.primaryGradient, borderRadius: '8px', padding: '20px', color: '#fff' }}>
            <div style={{ fontSize: '12px', opacity: 0.9 }}>今日销售额</div>
            <div style={{ fontSize: '28px', fontWeight: '600', marginTop: '8px' }}>¥12,680</div>
          </div>
          <div style={{ background: c.surfaceHover, borderRadius: '8px', padding: '20px' }}>
            <div style={{ fontSize: '12px', color: c.textMuted }}>今日订单数</div>
            <div style={{ fontSize: '28px', fontWeight: '600', color: c.text, marginTop: '8px' }}>238</div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderPendingContent = () => (
    <div style={contentStyle}>
      <div style={getCardStyle(c)}>
        <h4 style={{...getTitleStyle(c), marginBottom: '16px'}}>待审核内容</h4>
        {[
          { title: '用户晒单：收到的花束很美', type: '晒单', time: '10:30', user: '花友小王' },
          { title: '评论：物流很快，花很新鲜', type: '评论', time: '09:45', user: '花友小红' },
          { title: '帖子：如何养护玫瑰花', type: '帖子', time: '08:20', user: '花友小李' },
          { title: '晒单：生日收到的惊喜', type: '晒单', time: '07:50', user: '花友小张' },
        ].map((item, i) => (
          <div key={i} style={{
            borderBottom: i < 3 ? `1px solid ${c.border}` : 'none',
            padding: '12px 0',
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
              <span style={{ fontSize: '13px', fontWeight: '500', color: c.text }}>{item.title}</span>
              <span style={{
                fontSize: '11px',
                padding: '2px 8px',
                borderRadius: '4px',
                background: c.warningBg,
                color: c.warning,
              }}>{item.type}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ fontSize: '12px', color: c.textMuted }}>{item.user}</span>
              <span style={{ fontSize: '12px', color: c.textMuted }}>{item.time}</span>
            </div>
            <div style={{ display: 'flex', gap: '8px', marginTop: '10px' }}>
              <button style={getActionBtnStyle(c, 'approve')}>通过</button>
              <button style={getActionBtnStyle(c, 'reject')}>驳回</button>
              <button style={getActionBtnStyle(c, 'view')}>查看</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderSalesContent = () => (
    <div style={contentStyle}>
      <div style={getCardStyle(c)}>
        <h4 style={{...getTitleStyle(c), marginBottom: '16px'}}>销售额趋势</h4>
        <svg width="100%" height="180" viewBox="0 0 500 180">
          {[0, 45, 90, 135].map((y) => (
            <line key={y} x1="40" y1={y} x2="500" y2={y} stroke={c.border} strokeWidth="1" />
          ))}
          {[
            {x: 60, y: 130}, {x: 120, y: 110}, {x: 180, y: 95},
            {x: 240, y: 70}, {x: 300, y: 85}, {x: 360, y: 50}, {x: 420, y: 25}
          ].map((point, i) => {
            const nextPoint = i < 6 ? [
              {x: 120, y: 110}, {x: 180, y: 95},
              {x: 240, y: 70}, {x: 300, y: 85}, {x: 360, y: 50}, {x: 420, y: 25}, null
            ][i] : null;
            return nextPoint ? (
              <g key={i}>
                <line x1={point.x} y1={point.y} x2={nextPoint.x} y2={nextPoint.y}
                  stroke={c.success} strokeWidth="2" />
                <circle cx={point.x} cy={point.y} r="4" fill={c.success} />
              </g>
            ) : <circle key={i} cx={point.x} cy={point.y} r="4" fill={c.success} />;
          })}
        </svg>
      </div>

      <div style={getCardStyle(c)}>
        <h4 style={{...getTitleStyle(c), marginBottom: '16px'}}>热销商品TOP5</h4>
        {[
          { rank: 1, name: '红玫瑰', sales: 580, color: '#ff6b6b' },
          { rank: 2, name: '蓝色妖姬', sales: 420, color: '#4ecdc4' },
          { rank: 3, name: '康乃馨', sales: 380, color: '#ffe66d' },
          { rank: 4, name: '郁金香', sales: 290, color: '#95e1d3' },
          { rank: 5, name: '向日葵', sales: 220, color: '#f38181' },
        ].map((item, i) => (
          <div key={i} style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            padding: '10px 0',
            borderBottom: i < 4 ? `1px solid ${c.border}` : 'none',
          }}>
            <span style={{
              width: '22px',
              height: '22px',
              borderRadius: '4px',
              background: item.color,
              color: '#fff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '12px',
              fontWeight: '600',
            }}>{item.rank}</span>
            <span style={{ flex: 1, fontSize: '13px', color: c.text }}>{item.name}</span>
            <span style={{ fontSize: '14px', fontWeight: '600', color: c.success }}>{item.sales}件</span>
          </div>
        ))}
      </div>

      <div style={getCardStyle(c)}>
        <h4 style={{...getTitleStyle(c), marginBottom: '16px'}}>品类销售占比</h4>
        {[
          { category: '玫瑰', percent: 35, color: '#ff6b6b' },
          { category: '康乃馨', percent: 25, color: '#ff9e7d' },
          { category: '百合', percent: 18, color: '#4ecdc4' },
          { category: '郁金香', percent: 12, color: '#ffe66d' },
          { category: '其他', percent: 10, color: '#95a5a6' },
        ].map((item, i) => (
          <div key={i} style={{ marginBottom: '12px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
              <span style={{ fontSize: '13px', color: c.text }}>{item.category}</span>
              <span style={{ fontSize: '13px', color: c.textMuted }}>{item.percent}%</span>
            </div>
            <div style={{ background: c.surfaceHover, borderRadius: '4px', height: '8px' }}>
              <div style={{
                width: `${item.percent}%`,
                background: item.color,
                height: '100%',
                borderRadius: '4px',
              }} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div style={panelStyle}>
      <div style={headerStyle}>
        <h3 style={{ fontSize: '18px', fontWeight: '600', color: c.text, margin: 0 }}>
          {getTitleByType(type)}
        </h3>
        <button
          style={closeBtnStyle}
          onClick={handleClose}
          onMouseEnter={(e) => e.target.style.background = c.surfaceHover}
          onMouseLeave={(e) => e.target.style.background = 'none'}
        >
          ×
        </button>
      </div>
      {renderContent()}
    </div>
  );
}

function getTitleByType(type) {
  switch(type) {
    case 'users': return '用户详情';
    case 'visitors': return '访问详情';
    case 'orders': return '订单详情';
    case 'pending': return '待审核详情';
    case 'sales': return '销售详情';
    default: return '详情';
  }
}

function getCardStyle(c) {
  return {
    background: c.surface,
    border: `1px solid ${c.border}`,
    borderRadius: '12px',
    padding: '20px',
    marginBottom: '16px',
  };
}

function getTitleStyle(c) {
  return {
    fontSize: '15px',
    fontWeight: '600',
    color: c.text,
    margin: 0,
  };
}

function getThStyle(c) {
  return {
    padding: '10px 8px',
    fontSize: '12px',
    fontWeight: '600',
    color: c.textMuted,
  };
}

function getTdStyle(c) {
  return {
    padding: '10px 8px',
    fontSize: '13px',
    color: c.textSecondary,
  };
}

function getActionBtnStyle(c, type) {
  const base = {
    padding: '4px 12px',
    borderRadius: '4px',
    fontSize: '12px',
    cursor: 'pointer',
    marginRight: '8px',
    border: 'none',
  };
  switch(type) {
    case 'approve':
      return { ...base, background: c.success, color: '#fff' };
    case 'reject':
      return { ...base, background: c.error, color: '#fff' };
    case 'view':
      return { ...base, background: c.surfaceHover, color: c.textSecondary, border: `1px solid ${c.border}` };
    default:
      return base;
  }
}

export default DetailPanel;
