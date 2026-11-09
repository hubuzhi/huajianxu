import React, { useState, useMemo } from 'react';
import AdminLayout from '../components/AdminLayout';
import { useTheme } from '../context/ThemeContext';

function ContentReview() {
  const { theme } = useTheme();
  const colors = theme.colors;
  const [hoveredBtn, setHoveredBtn] = useState(null);
  const [searchKeyword, setSearchKeyword] = useState('');
  const [searchNickname, setSearchNickname] = useState('');
  const [searchProduct, setSearchProduct] = useState('');
  const [filterRating, setFilterRating] = useState('');
  const [filterStatus, setFilterStatus] = useState('');
  const [filterDateFrom, setFilterDateFrom] = useState('');
  const [filterDateTo, setFilterDateTo] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedItems, setSelectedItems] = useState([]);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [showReplyModal, setShowReplyModal] = useState(false);
  const [showTemplateModal, setShowTemplateModal] = useState(false);
  const [showTagModal, setShowTagModal] = useState(false);
  const [replyText, setReplyText] = useState('');
  const [detailData, setDetailData] = useState(null);
  const pageSize = 5;

  const reviewTags = ['晒单好评', '物流快', '包装精美', '花材新鲜', '客服热情', '配送差评', '花材不新鲜', '包装破损', '态度差', '性价比高'];

  const replyTemplates = [
    { id: 1, text: '感谢您的好评，我们会继续保持，期待您的下次光临~' },
    { id: 2, text: '感谢亲的认可，祝您生活愉快，欢迎再次光临本店！' },
    { id: 3, text: '非常抱歉给您带来不好的体验，已联系配送部门核实，会尽快给您一个满意的答复。' },
    { id: 4, text: '亲，花束都是当天现包现送，如果有不满意的地方请联系我们客服，我们一定为您妥善处理。' },
    { id: 5, text: '感谢您的支持与信任，我们会更加努力为您提供更优质的花束和服务！' },
  ];

  const reviewsData = [
    { id: 1, productName: '经典红玫瑰', productImage: 'https://www.aihuaju.com/huahua/uploadfile/2020/1218/20201218055753904.png', nickname: '小仙女', userId: 'U10086', orderId: 'ORD20240315001', spec: '中型/1束', rating: 5, content: '玫瑰很新鲜，包装也很精致，女朋友很喜欢，物流也很快，下次还会回购！', images: ['https://images.unsplash.com/photo-1561181286-d3fee7d55364?w=200', 'https://images.unsplash.com/photo-1487530811176-3780de880c2d?w=200'], createTime: '2024-03-15 14:30', status: 'shown', reply: '感谢您的好评，我们会继续保持，期待您的下次光临~', tags: ['晒单好评', '花材新鲜', '包装精美'], dimensions: { freshness: 5, packaging: 5, delivery: 5, service: 5 }, hasTicket: false },
    { id: 2, productName: '香槟玫瑰求婚束', productImage: 'https://images.unsplash.com/photo-1487530811176-3780de880c2d?w=200', nickname: 'Mr.李', userId: 'U10042', orderId: 'ORD20240314002', spec: '大型/1束', rating: 4, content: '花束整体很美，求婚成功了！就是配送稍微慢了点，建议改进一下。', images: ['https://images.unsplash.com/photo-1487530811176-3780de880c2d?w=200'], createTime: '2024-03-14 18:20', status: 'shown', reply: '感谢亲的认可，祝您生活愉快，欢迎再次光临本店！', tags: ['晒单好评', '物流快'], dimensions: { freshness: 5, packaging: 5, delivery: 3, service: 4 }, hasTicket: false },
    { id: 3, productName: '康乃馨母亲花束', productImage: 'https://images.unsplash.com/photo-1563241527-3004b7be0ffd?w=200', nickname: '岁月静好', userId: 'U10078', orderId: 'ORD20240313003', spec: '中型/1束', rating: 2, content: '送到的花有3朵已经蔫了，包装也有破损，母亲节当天送成这样真的很失望，差评！', images: ['https://images.unsplash.com/photo-1563241527-3004b7be0ffd?w=200', 'https://images.unsplash.com/photo-1561181286-d3fee7d55364?w=200'], createTime: '2024-03-13 11:15', status: 'pending', reply: '', tags: [], dimensions: { freshness: 1, packaging: 2, delivery: 3, service: 3 }, hasTicket: true },
    { id: 4, productName: '向日葵阳光花束', productImage: 'https://i04piccdn.sogoucdn.com/8a49f1a9b18d6a7b', nickname: '阳光女孩', userId: 'U10102', orderId: 'ORD20240312004', spec: '小型/1束', rating: 5, content: '向日葵特别新鲜，客服态度也非常好，强烈推荐！', images: ['https://i04piccdn.sogoucdn.com/8a49f1a9b18d6a7b'], createTime: '2024-03-12 16:42', status: 'shown', reply: '感谢您的支持与信任，我们会更加努力为您提供更优质的花束和服务！', tags: ['晒单好评', '客服热情', '花材新鲜'], dimensions: { freshness: 5, packaging: 5, delivery: 5, service: 5 }, hasTicket: false },
    { id: 5, productName: '毕业季花束', productImage: 'https://nimg.ws.126.net/?url=http%3A%2F%2Fdingyue.ws.126.net%2F2024%2F0921%2F3bf63934j00sk5cye00aad0016o01kwm.jpg&thumbnail=660x2147483647&quality=80&type=jpg', nickname: '毕业生小王', userId: 'U10095', orderId: 'ORD20240311005', spec: '中型/1束', rating: 1, content: '花束很丑，跟图片差太远了，包装也松散，差评！', images: [], createTime: '2024-03-11 09:20', status: 'hidden', reply: '亲，非常抱歉给您带来不好的体验，已联系花艺师核实，会尽快给您一个满意的答复。', tags: ['包装破损'], dimensions: { freshness: 2, packaging: 1, delivery: 2, service: 2 }, hasTicket: true },
    { id: 6, productName: 'ins风混搭花束', productImage: 'https://images.unsplash.com/photo-1525310072745-f49212b5ac6d?w=200', nickname: 'ins博主', userId: 'U10088', orderId: 'ORD20240310006', spec: '中型/1束', rating: 5, content: '拍照超出片！颜色搭配非常ins风，小姐妹们都说好看！', images: ['https://images.unsplash.com/photo-1525310072745-f49212b5ac6d?w=200', 'https://images.unsplash.com/photo-1561181286-d3fee7d55364?w=200', 'https://images.unsplash.com/photo-1487530811176-3780de880c2d?w=200'], createTime: '2024-03-10 21:00', status: 'shown', reply: '', tags: ['晒单好评', '包装精美'], dimensions: { freshness: 5, packaging: 5, delivery: 5, service: 5 }, hasTicket: false },
    { id: 7, productName: '哀悼白菊花束', productImage: 'https://images.unsplash.com/photo-1597306634841-22b3c0d4cded?w=200', nickname: '故人安息', userId: 'U10099', orderId: 'ORD20240309007', spec: '中型/1束', rating: 4, content: '花很新鲜，送达也很准时，谢谢店家在这个特殊时期的帮助。', images: [], createTime: '2024-03-09 10:30', status: 'shown', reply: '感谢您的理解与支持，我们会继续做好服务。', tags: ['物流快'], dimensions: { freshness: 4, packaging: 4, delivery: 5, service: 5 }, hasTicket: false },
    { id: 8, productName: '豪华巨型玫瑰', productImage: 'https://images.unsplash.com/photo-1494972308805-463bc619d34e?w=200', nickname: '土豪小张', userId: 'U10110', orderId: 'ORD20240308008', spec: '大型/1束', rating: 5, content: '99朵玫瑰震撼全场，包装豪华，气场十足，求婚一次成功！', images: ['https://images.unsplash.com/photo-1494972308805-463bc619d34e?w=200'], createTime: '2024-03-08 20:15', status: 'pending', reply: '', tags: ['晒单好评', '包装精美'], dimensions: { freshness: 5, packaging: 5, delivery: 5, service: 5 }, hasTicket: false },
    { id: 9, productName: '康乃馨母亲花束', productImage: 'https://images.unsplash.com/photo-1563241527-3004b7be0ffd?w=200', nickname: '妈妈的小棉袄', userId: 'U10120', orderId: 'ORD20240307009', spec: '中型/1束', rating: 3, content: '花还可以，就是花瓣有点黄了，可能放的时间有点长。', images: [], createTime: '2024-03-07 15:20', status: 'pending', reply: '', tags: [], dimensions: { freshness: 3, packaging: 4, delivery: 4, service: 4 }, hasTicket: false },
    { id: 10, productName: '香槟玫瑰求婚束', productImage: 'https://images.unsplash.com/photo-1487530811176-3780de880c2d?w=200', nickname: '甜蜜蜜', userId: 'U10125', orderId: 'ORD20240306010', spec: '大型/1束', rating: 5, content: '非常满意的一次购物体验，客服很专业，物流也快，包装也很上档次！', images: ['https://images.unsplash.com/photo-1487530811176-3780de880c2d?w=200'], createTime: '2024-03-06 12:30', status: 'shown', reply: '感谢您的好评，我们会继续保持，期待您的下次光临~', tags: ['晒单好评', '客服热情', '物流快'], dimensions: { freshness: 5, packaging: 5, delivery: 5, service: 5 }, hasTicket: false },
  ];

  const filteredReviews = useMemo(() => {
    return reviewsData.filter(review => {
      const matchProduct = !searchProduct || review.productName.includes(searchProduct);
      const matchNickname = !searchNickname || review.nickname.includes(searchNickname);
      const matchRating = !filterRating || review.rating === parseInt(filterRating);
      const matchStatus = !filterStatus || review.status === filterStatus;
      const matchDateFrom = !filterDateFrom || review.createTime >= filterDateFrom;
      const matchDateTo = !filterDateTo || review.createTime <= filterDateTo + ' 23:59:59';
      const matchKeyword = !searchKeyword || review.content.includes(searchKeyword);
      return matchProduct && matchNickname && matchRating && matchStatus && matchDateFrom && matchDateTo && matchKeyword;
    });
  }, [searchKeyword, searchProduct, searchNickname, filterRating, filterStatus, filterDateFrom, filterDateTo, reviewsData]);

  const totalPages = Math.ceil(filteredReviews.length / pageSize);
  const paginatedReviews = filteredReviews.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  const stats = useMemo(() => {
    const pending = reviewsData.filter(r => r.status === 'pending').length;
    const shown = reviewsData.filter(r => r.status === 'shown').length;
    const bad = reviewsData.filter(r => r.rating <= 2).length;
    const total = reviewsData.length;
    const avgRating = total > 0 ? (reviewsData.reduce((sum, r) => sum + r.rating, 0) / total).toFixed(1) : 0;
    const positiveRate = total > 0 ? ((reviewsData.filter(r => r.rating >= 4).length / total) * 100).toFixed(1) : 0;
    const badRate = total > 0 ? ((reviewsData.filter(r => r.rating <= 2).length / total) * 100).toFixed(1) : 0;
    const ratingDist = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
    reviewsData.forEach(r => { ratingDist[r.rating]++; });
    const dimAverages = {
      freshness: (reviewsData.reduce((s, r) => s + r.dimensions.freshness, 0) / total).toFixed(1),
      packaging: (reviewsData.reduce((s, r) => s + r.dimensions.packaging, 0) / total).toFixed(1),
      delivery: (reviewsData.reduce((s, r) => s + r.dimensions.delivery, 0) / total).toFixed(1),
      service: (reviewsData.reduce((s, r) => s + r.dimensions.service, 0) / total).toFixed(1),
    };
    return { pending, shown, bad, total, avgRating, positiveRate, badRate, ratingDist, dimAverages };
  }, [reviewsData]);

  const renderStars = (rating) => (
    <span style={{ color: '#FFB800', fontSize: '14px', whiteSpace: 'nowrap' }}>
      {'★'.repeat(rating)}
      <span style={{ color: colors.border }}>{'★'.repeat(5 - rating)}</span>
    </span>
  );

  const handleViewDetail = (review) => { setDetailData(review); setShowDetailModal(true); };
  const handleReply = (review) => { setDetailData(review); setReplyText(''); setShowReplyModal(true); };
  const submitReply = () => {
    if (replyText.trim()) { alert(`已回复评论：${replyText}`); setShowReplyModal(false); setReplyText(''); }
    else { alert('请输入回复内容'); }
  };
  const applyTemplate = (text) => { setReplyText(text); };
  const handleToggleStatus = (review) => {
    const newStatus = review.status === 'shown' ? 'hidden' : 'shown';
    alert(`评论已${newStatus === 'shown' ? '展示' : '隐藏'}`);
  };
  const handleDelete = (review) => {
    if (window.confirm(`确定要删除该评论吗？`)) { alert('评论已删除'); }
  };
  const handleAddTag = (review) => { setDetailData(review); setShowTagModal(true); };
  const handleCreateTicket = (review) => {
    alert(`已为差评「${review.nickname}」创建售后工单，工单号：TK${Date.now().toString().slice(-8)}`);
  };
  const handleExport = () => { alert('评论数据已导出为Excel文件'); };
  const handleBatchApprove = () => {
    if (selectedItems.length > 0) { alert(`已批量通过 ${selectedItems.length} 条评论`); setSelectedItems([]); }
    else { alert('请选择要操作的评论'); }
  };
  const handleBatchHide = () => {
    if (selectedItems.length > 0) { alert(`已批量隐藏 ${selectedItems.length} 条评论`); setSelectedItems([]); }
    else { alert('请选择要操作的评论'); }
  };
  const handleBatchShow = () => {
    if (selectedItems.length > 0) { alert(`已批量展示 ${selectedItems.length} 条评论`); setSelectedItems([]); }
    else { alert('请选择要操作的评论'); }
  };
  const toggleSelectAll = () => {
    if (selectedItems.length === paginatedReviews.length) { setSelectedItems([]); }
    else { setSelectedItems(paginatedReviews.map(r => r.id)); }
  };
  const resetFilters = () => {
    setSearchKeyword(''); setSearchProduct(''); setSearchNickname('');
    setFilterRating(''); setFilterStatus(''); setFilterDateFrom(''); setFilterDateTo('');
    setCurrentPage(1);
  };

  return (
    <div style={{ padding: '24px' }}>
      <ReviewHeader colors={colors} hoveredBtn={hoveredBtn} setHoveredBtn={setHoveredBtn} handleExport={handleExport} />
      <ReviewStats stats={stats} colors={colors} />
      <ReviewDataSection stats={stats} colors={colors} renderStars={renderStars} />
      <ReviewAdviceSection colors={colors} />
      <ReviewFilterSection
        colors={colors} searchProduct={searchProduct} setSearchProduct={setSearchProduct}
        searchNickname={searchNickname} setSearchNickname={setSearchNickname}
        filterRating={filterRating} setFilterRating={setFilterRating}
        filterStatus={filterStatus} setFilterStatus={setFilterStatus}
        filterDateFrom={filterDateFrom} setFilterDateFrom={setFilterDateFrom}
        filterDateTo={filterDateTo} setFilterDateTo={setFilterDateTo}
        setCurrentPage={setCurrentPage} resetFilters={resetFilters}
        selectedItems={selectedItems} handleBatchApprove={handleBatchApprove}
        handleBatchShow={handleBatchShow} handleBatchHide={handleBatchHide}
      />
      <ReviewTable
        colors={colors} paginatedReviews={paginatedReviews} filteredReviews={filteredReviews}
        totalPages={totalPages} currentPage={currentPage} setCurrentPage={setCurrentPage}
        selectedItems={selectedItems} setSelectedItems={setSelectedItems}
        toggleSelectAll={toggleSelectAll} renderStars={renderStars}
        hoveredBtn={hoveredBtn} setHoveredBtn={setHoveredBtn}
        handleViewDetail={handleViewDetail} handleReply={handleReply}
        handleAddTag={handleAddTag} handleCreateTicket={handleCreateTicket}
        handleToggleStatus={handleToggleStatus} handleDelete={handleDelete}
      />
      <ReviewModals
        colors={colors} showDetailModal={showDetailModal} setShowDetailModal={setShowDetailModal}
        showReplyModal={showReplyModal} setShowReplyModal={setShowReplyModal}
        showTemplateModal={showTemplateModal} setShowTemplateModal={setShowTemplateModal}
        showTagModal={showTagModal} setShowTagModal={setShowTagModal}
        detailData={detailData} setDetailData={setDetailData}
        replyText={replyText} setReplyText={setReplyText}
        replyTemplates={replyTemplates} reviewTags={reviewTags}
        renderStars={renderStars} submitReply={submitReply} useTemplate={applyTemplate}
        handleReply={handleReply}
      />
    </div>
  );
}

function ReviewHeader({ colors, hoveredBtn, setHoveredBtn, handleExport }) {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
      <h2 style={{ fontSize: '22px', fontWeight: '600', color: colors.text, margin: 0 }}>店铺评论管理</h2>
      <button
        style={{
          padding: '8px 16px', border: `1px solid ${colors.border}`, borderRadius: '6px', fontSize: '13px',
          cursor: 'pointer', transition: 'all 0.3s',
          backgroundColor: hoveredBtn === 'export' ? colors.primary : colors.surface,
          color: hoveredBtn === 'export' ? colors.textInverse : colors.text,
        }}
        onMouseEnter={() => setHoveredBtn('export')}
        onMouseLeave={() => setHoveredBtn(null)}
        onClick={handleExport}
      >📊 导出评论数据</button>
    </div>
  );
}

function ReviewStats({ stats, colors }) {
  const cards = [
    { value: stats.pending, label: '待处理评论', desc: '需要审核或回复', color: colors.warning },
    { value: stats.shown, label: '已展示评论', desc: '客户可见的优质评论', color: colors.success },
    { value: stats.bad, label: '差评/投诉评论', desc: '需要重点关注', color: colors.error },
    { value: stats.avgRating, label: '店铺综合评分', desc: `基于 ${stats.total} 条评论`, color: '#FFB800', isRating: true },
  ];
  return (
    <div style={{ display: 'flex', gap: '16px', marginBottom: '24px' }}>
      {cards.map((c, i) => (
        <div key={i} style={{ flex: 1, background: colors.surface, borderRadius: '8px', padding: '20px', borderLeft: `4px solid ${c.color}`, boxShadow: colors.cardShadow }}>
          <div style={{ fontSize: '28px', fontWeight: '600', color: colors.text, marginBottom: '4px' }}>
            {c.value}{c.isRating && <span style={{ fontSize: '16px', color: '#FFB800' }}> ★</span>}
          </div>
          <div style={{ fontSize: '13px', color: colors.textMuted }}>{c.label}</div>
          <div style={{ fontSize: '12px', color: colors.textMuted, marginTop: '4px' }}>{c.desc}</div>
        </div>
      ))}
    </div>
  );
}

function ReviewDataSection({ stats, colors, renderStars }) {
  return (
    <div style={{ background: colors.surface, padding: '20px', borderRadius: '8px', marginBottom: '24px', boxShadow: colors.cardShadow }}>
      <h3 style={{ fontSize: '16px', fontWeight: '600', color: colors.text, margin: '0 0 16px 0' }}>📈 店铺评论数据分析</h3>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px' }}>
        <div style={{ background: colors.background, padding: '16px', borderRadius: '6px', border: `1px solid ${colors.border}` }}>
          <h4 style={{ fontSize: '14px', fontWeight: '500', color: colors.text, margin: '0 0 12px 0' }}>评分分布</h4>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {[5, 4, 3, 2, 1].map(r => {
              const count = stats.ratingDist[r];
              const pct = stats.total > 0 ? (count / stats.total) * 100 : 0;
              return (
                <div key={r} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span style={{ fontSize: '12px', color: colors.textSecondary, width: '30px' }}>{r}星</span>
                  <div style={{ flex: 1, height: '8px', background: colors.border, borderRadius: '4px', overflow: 'hidden' }}>
                    <div style={{ height: '100%', width: `${pct}%`, backgroundColor: r >= 4 ? colors.success : r === 3 ? colors.warning : colors.error, transition: 'width 0.3s' }} />
                  </div>
                  <span style={{ fontSize: '11px', color: colors.textMuted, minWidth: '70px', textAlign: 'right' }}>{count}条 ({pct.toFixed(0)}%)</span>
                </div>
              );
            })}
          </div>
        </div>

        <div style={{ background: colors.background, padding: '16px', borderRadius: '6px', border: `1px solid ${colors.border}` }}>
          <h4 style={{ fontSize: '14px', fontWeight: '500', color: colors.text, margin: '0 0 12px 0' }}>评分维度拆解</h4>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '8px' }}>
            {[
              { key: 'freshness', label: '花材新鲜度', icon: '🌸' },
              { key: 'packaging', label: '包装', icon: '🎁' },
              { key: 'delivery', label: '配送', icon: '🚚' },
              { key: 'service', label: '客服', icon: '💬' },
            ].map(dim => (
              <div key={dim.key} style={{ padding: '10px', background: colors.surface, borderRadius: '6px', textAlign: 'center' }}>
                <div style={{ fontSize: '20px' }}>{dim.icon}</div>
                <div style={{ fontSize: '11px', color: colors.textMuted, margin: '4px 0' }}>{dim.label}</div>
                <div style={{ fontSize: '18px', fontWeight: '600', color: colors.text }}>{stats.dimAverages[dim.key]}</div>
                <div style={{ fontSize: '10px' }}>{renderStars(Math.round(parseFloat(stats.dimAverages[dim.key])))}</div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ background: colors.background, padding: '16px', borderRadius: '6px', border: `1px solid ${colors.border}` }}>
          <h4 style={{ fontSize: '14px', fontWeight: '500', color: colors.text, margin: '0 0 12px 0' }}>好评率 / 差评率</h4>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-around' }}>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '28px', fontWeight: '600', color: colors.success }}>{stats.positiveRate}%</div>
              <div style={{ fontSize: '12px', color: colors.textMuted, marginTop: '4px' }}>好评率</div>
            </div>
            <div style={{ width: '1px', height: '40px', background: colors.border }}></div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '28px', fontWeight: '600', color: colors.error }}>{stats.badRate}%</div>
              <div style={{ fontSize: '12px', color: colors.textMuted, marginTop: '4px' }}>差评率</div>
            </div>
          </div>
          <div style={{ marginTop: '8px' }}>
            <div style={{ fontSize: '12px', color: colors.textMuted, marginTop: '12px' }}>近7天趋势：</div>
            <div style={{ display: 'flex', gap: '6px', alignItems: 'flex-end', height: '60px', marginTop: '6px' }}>
              {[92, 95, 93, 96, 94, 97, 95].map((v, i) => (
                <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  <div style={{ width: '100%', height: `${v * 0.4}px`, backgroundColor: v >= 95 ? colors.success : colors.warning, borderRadius: '2px 2px 0 0', transition: 'height 0.3s' }}></div>
                  <div style={{ fontSize: '10px', color: colors.textMuted, marginTop: '2px' }}>{['一','二','三','四','五','六','日'][i]}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div style={{ background: colors.background, padding: '16px', borderRadius: '6px', border: `1px solid ${colors.border}` }}>
          <h4 style={{ fontSize: '14px', fontWeight: '500', color: colors.text, margin: '0 0 12px 0' }}>同类店铺排名</h4>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px', padding: '10px', background: colors.surface, borderRadius: '6px' }}>
            <div style={{ fontSize: '32px', fontWeight: '700', color: colors.primary }}>#3</div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: '13px', color: colors.text, fontWeight: '500' }}>平台综合排名</div>
              <div style={{ fontSize: '11px', color: colors.textMuted, marginTop: '2px' }}>较上周上升 <span style={{ color: colors.success, fontWeight: '600' }}>+2</span> 位</div>
            </div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
            <RankItem colors={colors} index={1} name="花语轩官方旗舰店" score="4.9" />
            <RankItem colors={colors} index={2} name="鲜花物语" score="4.8" />
            <RankItem colors={colors} index={3} name="花间序（本店）" score={stats.avgRating} highlight />
            <RankItem colors={colors} index={4} name="浪漫花坊" score="4.6" />
            <RankItem colors={colors} index={5} name="爱花居" score="4.5" />
          </div>
        </div>

        <div style={{ background: colors.background, padding: '16px', borderRadius: '6px', border: `1px solid ${colors.border}`, gridColumn: 'span 2' }}>
          <h4 style={{ fontSize: '14px', fontWeight: '500', color: colors.text, margin: '0 0 12px 0' }}>差评高频词云</h4>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', alignItems: 'center', justifyContent: 'center', minHeight: '120px', padding: '8px' }}>
            {[
              { word: '包装破损', size: 28, color: colors.error },
              { word: '配送慢', size: 24, color: colors.error },
              { word: '花材不新鲜', size: 26, color: colors.error },
              { word: '花蔫了', size: 20, color: colors.warning },
              { word: '与图片不符', size: 18, color: colors.warning },
              { word: '客服态度差', size: 16, color: colors.textMuted },
              { word: '花量少', size: 16, color: colors.warning },
              { word: '叶子发黄', size: 14, color: colors.textMuted },
              { word: '味道不对', size: 14, color: colors.textMuted },
              { word: '尺寸偏小', size: 12, color: colors.textMuted },
              { word: '送货延迟', size: 14, color: colors.warning },
              { word: '包装松散', size: 16, color: colors.warning },
              { word: '颜色不正', size: 12, color: colors.textMuted },
              { word: '服务差', size: 14, color: colors.textMuted },
            ].map((w, i) => (
              <span key={i} style={{ fontSize: `${w.size}px`, color: w.color, padding: '4px 12px', fontWeight: w.size >= 24 ? '600' : '400', cursor: 'pointer' }}>{w.word}</span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function RankItem({ colors, index, name, score, highlight }) {
  return (
    <div style={{
      display: 'flex', alignItems: 'center', gap: '8px', padding: '6px 8px', borderRadius: '4px', fontSize: '12px',
      ...(highlight ? { background: colors.primaryBg, border: `1px solid ${colors.primary}` } : {}),
    }}>
      <span style={{
        width: '18px', height: '18px', borderRadius: '50%',
        background: highlight ? colors.primary : colors.border,
        color: highlight ? colors.textInverse : colors.textSecondary,
        display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '10px', fontWeight: '600',
      }}>{index}</span>
      <span style={{ flex: 1, color: highlight ? colors.primary : colors.textSecondary, fontWeight: highlight ? '600' : 'normal' }}>{name}</span>
      <span style={{ fontWeight: '600', color: highlight ? colors.primary : colors.text }}>{score}</span>
    </div>
  );
}

function ReviewAdviceSection({ colors }) {
  const advices = [
    { icon: '⚠️', title: '改进建议：配送时效', text: '差评中「配送慢」「送货延迟」占比超过35%，建议重新评估现有配送商，优先选择评分4.5分以上的物流合作方。', color: colors.error },
    { icon: '⚠️', title: '改进建议：花材质量', text: '花材新鲜度评分较低(2.8)，建议加强花材入库验收标准，淘汰品质不达标批次，确保配送到客户手中的花材品质。', color: colors.error },
    { icon: '✨', title: '营销亮点：包装设计', text: '好评中「包装精美」出现频次最高(48次)，建议在商品详情页和首页重点突出包装设计卖点，可作为店铺核心差异化优势。', color: colors.success },
    { icon: '✨', title: '营销亮点：客服服务', text: '客服服务评分高达4.8，客户普遍认可客服专业度，建议将客服好评话术整理成宣传素材，提升新客户信任感。', color: colors.success },
  ];
  return (
    <div style={{ background: colors.surface, padding: '20px', borderRadius: '8px', marginBottom: '24px', boxShadow: colors.cardShadow }}>
      <h3 style={{ fontSize: '16px', fontWeight: '600', color: colors.text, margin: '0 0 16px 0' }}>💡 经营建议</h3>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '12px' }}>
        {advices.map((a, i) => (
          <div key={i} style={{ padding: '14px', background: colors.background, borderRadius: '6px', borderLeft: `4px solid ${a.color}` }}>
            <div style={{ fontSize: '20px', marginBottom: '4px' }}>{a.icon}</div>
            <div style={{ fontSize: '14px', fontWeight: '500', color: colors.text, marginBottom: '6px' }}>{a.title}</div>
            <div style={{ fontSize: '12px', color: colors.textSecondary, lineHeight: '1.6' }}>{a.text}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function ReviewFilterSection({
  colors, searchProduct, setSearchProduct, searchNickname, setSearchNickname,
  filterRating, setFilterRating, filterStatus, setFilterStatus,
  filterDateFrom, setFilterDateFrom, filterDateTo, setFilterDateTo,
  setCurrentPage, resetFilters, selectedItems,
  handleBatchApprove, handleBatchShow, handleBatchHide,
}) {
  const inputStyle = { padding: '8px 12px', border: `1px solid ${colors.border}`, borderRadius: '4px', fontSize: '13px', background: colors.surface, color: colors.text, outline: 'none' };
  return (
    <div style={{ background: colors.surface, padding: '20px', borderRadius: '8px', marginBottom: '24px', boxShadow: colors.cardShadow }}>
      <h3 style={{ fontSize: '16px', fontWeight: '600', color: colors.text, margin: '0 0 16px 0' }}>🔍 评论筛选</h3>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '12px' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
          <label style={{ fontSize: '12px', color: colors.textMuted }}>商品名称</label>
          <input type="text" placeholder="搜索花束名称..." value={searchProduct} onChange={(e) => { setSearchProduct(e.target.value); setCurrentPage(1); }} style={inputStyle} />
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
          <label style={{ fontSize: '12px', color: colors.textMuted }}>客户昵称</label>
          <input type="text" placeholder="搜索客户昵称..." value={searchNickname} onChange={(e) => { setSearchNickname(e.target.value); setCurrentPage(1); }} style={inputStyle} />
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
          <label style={{ fontSize: '12px', color: colors.textMuted }}>评分星级</label>
          <select value={filterRating} onChange={(e) => { setFilterRating(e.target.value); setCurrentPage(1); }} style={inputStyle}>
            <option value="">全部评分</option>
            <option value="5">⭐⭐⭐⭐⭐ 5星</option>
            <option value="4">⭐⭐⭐⭐ 4星</option>
            <option value="3">⭐⭐⭐ 3星</option>
            <option value="2">⭐⭐ 2星</option>
            <option value="1">⭐ 1星</option>
          </select>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
          <label style={{ fontSize: '12px', color: colors.textMuted }}>评论状态</label>
          <select value={filterStatus} onChange={(e) => { setFilterStatus(e.target.value); setCurrentPage(1); }} style={inputStyle}>
            <option value="">全部状态</option>
            <option value="pending">待审核</option>
            <option value="shown">已展示</option>
            <option value="hidden">已隐藏</option>
          </select>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
          <label style={{ fontSize: '12px', color: colors.textMuted }}>开始日期</label>
          <input type="date" value={filterDateFrom} onChange={(e) => { setFilterDateFrom(e.target.value); setCurrentPage(1); }} style={inputStyle} />
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
          <label style={{ fontSize: '12px', color: colors.textMuted }}>结束日期</label>
          <input type="date" value={filterDateTo} onChange={(e) => { setFilterDateTo(e.target.value); setCurrentPage(1); }} style={inputStyle} />
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', justifyContent: 'flex-end' }}>
          <button
            style={{ padding: '8px 16px', background: colors.surface, border: `1px solid ${colors.border}`, borderRadius: '4px', fontSize: '13px', cursor: 'pointer', color: colors.textSecondary }}
            onClick={resetFilters}
          >重置筛选</button>
        </div>
      </div>

      {selectedItems.length > 0 && (
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginTop: '16px', padding: '12px 16px', borderTop: `1px solid ${colors.border}`, background: colors.background, borderRadius: '4px' }}>
          <span style={{ fontSize: '14px', color: colors.text }}>已选择 {selectedItems.length} 条评论</span>
          <button style={{ padding: '6px 12px', color: colors.textInverse, border: 'none', borderRadius: '4px', fontSize: '12px', cursor: 'pointer', backgroundColor: colors.success }} onClick={handleBatchApprove}>批量审核通过</button>
          <button style={{ padding: '6px 12px', color: colors.textInverse, border: 'none', borderRadius: '4px', fontSize: '12px', cursor: 'pointer', backgroundColor: colors.info }} onClick={handleBatchShow}>批量展示</button>
          <button style={{ padding: '6px 12px', color: colors.textInverse, border: 'none', borderRadius: '4px', fontSize: '12px', cursor: 'pointer', backgroundColor: colors.warning }} onClick={handleBatchHide}>批量隐藏</button>
        </div>
      )}
    </div>
  );
}

function ReviewTable({
  colors, paginatedReviews, filteredReviews, totalPages, currentPage, setCurrentPage,
  selectedItems, setSelectedItems, toggleSelectAll, renderStars,
  hoveredBtn, setHoveredBtn, handleViewDetail, handleReply,
  handleAddTag, handleCreateTicket, handleToggleStatus, handleDelete,
}) {
  const thStyle = { padding: '12px', textAlign: 'left', background: colors.tableHeader, borderBottom: `1px solid ${colors.border}`, fontSize: '13px', fontWeight: '600', color: colors.text, whiteSpace: 'nowrap' };
  const tdStyle = { padding: '12px', fontSize: '13px', color: colors.textSecondary, verticalAlign: 'top' };

  const getActionBtn = (key, id, defaultText, hoverColor, onClick) => (
    <button
      style={{
        padding: '4px 10px', background: hoveredBtn === `${key}-${id}` ? hoverColor : colors.surface,
        color: hoveredBtn === `${key}-${id}` ? colors.textInverse : colors.textSecondary,
        border: `1px solid ${hoveredBtn === `${key}-${id}` ? hoverColor : colors.border}`,
        borderRadius: '3px', fontSize: '11px', cursor: 'pointer', transition: 'all 0.2s', whiteSpace: 'nowrap',
      }}
      onMouseEnter={() => setHoveredBtn(`${key}-${id}`)}
      onMouseLeave={() => setHoveredBtn(null)}
      onClick={onClick}
    >{defaultText}</button>
  );

  return (
    <div style={{ background: colors.surface, borderRadius: '8px', boxShadow: colors.cardShadow, overflow: 'hidden' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px 20px', borderBottom: `1px solid ${colors.border}` }}>
        <h3 style={{ fontSize: '16px', fontWeight: '600', color: colors.text, margin: 0 }}>📝 评论列表</h3>
        <span style={{ fontSize: '13px', color: colors.textMuted }}>共 {filteredReviews.length} 条评论</span>
      </div>
      <div style={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: '1500px' }}>
          <thead>
            <tr>
              <th style={thStyle}><input type="checkbox" checked={selectedItems.length === paginatedReviews.length && paginatedReviews.length > 0} onChange={toggleSelectAll} /></th>
              <th style={thStyle}>商品名称</th>
              <th style={thStyle}>客户昵称/ID</th>
              <th style={thStyle}>订单编号</th>
              <th style={thStyle}>购买规格</th>
              <th style={thStyle}>评分</th>
              <th style={thStyle}>评论内容</th>
              <th style={thStyle}>晒单图片</th>
              <th style={thStyle}>评论时间</th>
              <th style={thStyle}>状态</th>
              <th style={thStyle}>商家回复</th>
              <th style={thStyle}>操作</th>
            </tr>
          </thead>
          <tbody>
            {paginatedReviews.map(review => (
              <tr key={review.id} style={{ borderBottom: `1px solid ${colors.border}`, transition: 'background 0.3s' }}>
                <td style={tdStyle}><input type="checkbox" checked={selectedItems.includes(review.id)} onChange={(e) => e.target.checked ? setSelectedItems([...selectedItems, review.id]) : setSelectedItems(selectedItems.filter(id => id !== review.id))} /></td>
                <td style={tdStyle}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <img src={review.productImage} alt={review.productName} style={{ width: '36px', height: '36px', borderRadius: '4px', objectFit: 'cover' }} onError={(e) => { e.target.style.display = 'none'; }} />
                    <span style={{ color: colors.text, fontSize: '13px' }}>{review.productName}</span>
                  </div>
                </td>
                <td style={tdStyle}>
                  <div style={{ fontSize: '13px', color: colors.text }}>{review.nickname}</div>
                  <div style={{ fontSize: '11px', color: colors.textMuted }}>{review.userId}</div>
                </td>
                <td style={{ ...tdStyle, fontFamily: 'monospace', fontSize: '12px', color: colors.textMuted }}>{review.orderId}</td>
                <td style={{ ...tdStyle, whiteSpace: 'nowrap', fontSize: '12px' }}>{review.spec}</td>
                <td style={tdStyle}>{renderStars(review.rating)}</td>
                <td style={{ ...tdStyle, maxWidth: '200px' }}>
                  <div style={{ fontSize: '13px', color: colors.text, overflow: 'hidden', textOverflow: 'ellipsis', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', lineHeight: '1.4' }} title={review.content}>{review.content}</div>
                  {review.tags.length > 0 && (
                    <div style={{ marginTop: '4px', display: 'flex', flexWrap: 'wrap', gap: '4px' }}>
                      {review.tags.slice(0, 2).map(tag => <span key={tag} style={{ padding: '2px 8px', background: colors.primaryBg, color: colors.primary, borderRadius: '10px', fontSize: '11px', display: 'inline-block' }}>{tag}</span>)}
                    </div>
                  )}
                </td>
                <td style={tdStyle}>
                  <div style={{ display: 'flex', gap: '4px' }}>
                    {review.images.slice(0, 3).map((img, idx) => <img key={idx} src={img} alt="" style={{ width: '32px', height: '32px', borderRadius: '4px', objectFit: 'cover' }} onError={(e) => { e.target.style.display = 'none'; }} />)}
                    {review.images.length > 3 && <span style={{ fontSize: '12px', color: colors.textMuted, alignSelf: 'center' }}>+{review.images.length - 3}</span>}
                    {review.images.length === 0 && <span style={{ fontSize: '12px', color: colors.textMuted }}>无图</span>}
                  </div>
                </td>
                <td style={{ ...tdStyle, fontSize: '12px', color: colors.textMuted, whiteSpace: 'nowrap' }}>{review.createTime}</td>
                <td style={tdStyle}>
                  {review.status === 'pending' && <span style={{ padding: '3px 10px', borderRadius: '12px', fontSize: '11px', fontWeight: '500', whiteSpace: 'nowrap', backgroundColor: colors.warningBg, color: colors.warning }}>待审核</span>}
                  {review.status === 'shown' && <span style={{ padding: '3px 10px', borderRadius: '12px', fontSize: '11px', fontWeight: '500', whiteSpace: 'nowrap', backgroundColor: colors.successBg, color: colors.success }}>已展示</span>}
                  {review.status === 'hidden' && <span style={{ padding: '3px 10px', borderRadius: '12px', fontSize: '11px', fontWeight: '500', whiteSpace: 'nowrap', backgroundColor: colors.errorBg, color: colors.error }}>已隐藏</span>}
                </td>
                <td style={{ ...tdStyle, maxWidth: '160px' }}>
                  {review.reply ? (
                    <div style={{ fontSize: '12px', color: colors.textSecondary, overflow: 'hidden', textOverflow: 'ellipsis', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical' }} title={review.reply}>{review.reply}</div>
                  ) : <span style={{ fontSize: '12px', color: colors.textMuted, fontStyle: 'italic' }}>待回复</span>}
                </td>
                <td style={tdStyle}>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                    <button style={{ padding: '4px 10px', background: colors.surface, color: colors.textSecondary, border: `1px solid ${colors.border}`, borderRadius: '3px', fontSize: '11px', cursor: 'pointer', transition: 'all 0.2s', whiteSpace: 'nowrap' }} onClick={() => handleViewDetail(review)}>查看</button>
                    {getActionBtn('reply', review.id, '回复', colors.info, () => handleReply(review))}
                    {getActionBtn('tag', review.id, '打标签', colors.primary, () => handleAddTag(review))}
                    {review.rating <= 2 && !review.hasTicket && getActionBtn('ticket', review.id, '建工单', colors.error, () => handleCreateTicket(review))}
                    {getActionBtn('toggle', review.id, review.status === 'shown' ? '隐藏' : '展示', review.status === 'shown' ? colors.warning : colors.success, () => handleToggleStatus(review))}
                    {getActionBtn('delete', review.id, '删除', colors.error, () => handleDelete(review))}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', gap: '8px', padding: '16px 20px', borderTop: `1px solid ${colors.border}` }}>
        <span style={{ fontSize: '13px', color: colors.textMuted, marginRight: 'auto' }}>共 {filteredReviews.length} 条记录</span>
        <button style={{ padding: '6px 12px', background: colors.surface, border: `1px solid ${colors.border}`, borderRadius: '4px', fontSize: '13px', cursor: 'pointer', color: colors.textSecondary }} disabled={currentPage === 1} onClick={() => setCurrentPage(p => Math.max(1, p - 1))}>上一页</button>
        {Array.from({ length: totalPages }, (_, i) => (
          <button key={i + 1} style={{ padding: '6px 12px', background: currentPage === i + 1 ? colors.primary : colors.surface, color: currentPage === i + 1 ? colors.textInverse : colors.textSecondary, border: `1px solid ${currentPage === i + 1 ? colors.primary : colors.border}`, borderRadius: '4px', fontSize: '13px', cursor: 'pointer' }} onClick={() => setCurrentPage(i + 1)}>{i + 1}</button>
        ))}
        <button style={{ padding: '6px 12px', background: colors.surface, border: `1px solid ${colors.border}`, borderRadius: '4px', fontSize: '13px', cursor: 'pointer', color: colors.textSecondary }} disabled={currentPage === totalPages} onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}>下一页</button>
      </div>
    </div>
  );
}

function ReviewModals({
  colors, showDetailModal, setShowDetailModal, showReplyModal, setShowReplyModal,
  showTemplateModal, setShowTemplateModal, showTagModal, setShowTagModal,
  detailData, setDetailData, replyText, setReplyText, replyTemplates, reviewTags,
  renderStars, submitReply, applyTemplate, handleReply,
}) {
  const overlayStyle = { position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: colors.modalOverlay, display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 };
  const modalBase = { background: colors.surface, borderRadius: '8px', maxHeight: '90vh', overflowY: 'auto' };
  const headerStyle = { display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px 20px', borderBottom: `1px solid ${colors.border}` };
  const closeBtnStyle = { background: 'none', border: 'none', fontSize: '18px', cursor: 'pointer', color: colors.textMuted };
  const bodyStyle = { padding: '20px' };
  const footerStyle = { display: 'flex', justifyContent: 'flex-end', gap: '12px', padding: '16px 20px', borderTop: `1px solid ${colors.border}` };
  const cancelBtnStyle = { padding: '8px 20px', background: colors.surface, border: `1px solid ${colors.border}`, borderRadius: '4px', fontSize: '13px', cursor: 'pointer', color: colors.text };
  const submitBtnStyle = { padding: '8px 20px', background: colors.primary, color: colors.textInverse, border: 'none', borderRadius: '4px', fontSize: '13px', cursor: 'pointer' };

  return (
    <>
      {showDetailModal && detailData && (
        <div style={overlayStyle} onClick={() => setShowDetailModal(false)}>
          <div style={{ ...modalBase, width: '680px' }} onClick={(e) => e.stopPropagation()}>
            <div style={headerStyle}>
              <h3 style={{ margin: 0, fontSize: '16px', color: colors.text }}>评论详情</h3>
              <button style={closeBtnStyle} onClick={() => setShowDetailModal(false)}>✕</button>
            </div>
            <div style={bodyStyle}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px', padding: '10px', background: colors.background, borderRadius: '6px' }}>
                <img src={detailData.productImage} alt={detailData.productName} style={{ width: '60px', height: '60px', borderRadius: '6px', objectFit: 'cover' }} onError={(e) => { e.target.style.display = 'none'; }} />
                <div>
                  <div style={{ fontSize: '15px', color: colors.text, fontWeight: '500' }}>{detailData.productName}</div>
                  <div style={{ fontSize: '12px', color: colors.textMuted, marginTop: '4px' }}>规格：{detailData.spec}</div>
                </div>
              </div>
              <DetailRow colors={colors} label="客户：" value={`${detailData.nickname} (${detailData.userId})`} />
              <DetailRow colors={colors} label="订单：" value={detailData.orderId} mono />
              <DetailRow colors={colors} label="评分：" value={renderStars(detailData.rating)} inline />
              <DetailRow colors={colors} label="时间：" value={detailData.createTime} />
              {detailData.images.length > 0 && (
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', marginBottom: '12px' }}>
                  <span style={{ fontSize: '13px', color: colors.textMuted, minWidth: '70px' }}>晒单：</span>
                  <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                    {detailData.images.map((img, idx) => <img key={idx} src={img} alt="" style={{ width: '80px', height: '80px', borderRadius: '6px', objectFit: 'cover' }} onError={(e) => { e.target.style.display = 'none'; }} />)}
                  </div>
                </div>
              )}
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', marginBottom: '12px' }}>
                <span style={{ fontSize: '13px', color: colors.textMuted, minWidth: '70px' }}>评论：</span>
                <div style={{ flex: 1, lineHeight: '1.6', color: colors.text, fontSize: '13px' }}>{detailData.content}</div>
              </div>
              {detailData.tags.length > 0 && (
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', marginBottom: '12px' }}>
                  <span style={{ fontSize: '13px', color: colors.textMuted, minWidth: '70px' }}>标签：</span>
                  <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                    {detailData.tags.map(tag => <span key={tag} style={{ padding: '2px 8px', background: colors.primaryBg, color: colors.primary, borderRadius: '10px', fontSize: '11px' }}>{tag}</span>)}
                  </div>
                </div>
              )}
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', marginBottom: '12px' }}>
                <span style={{ fontSize: '13px', color: colors.textMuted, minWidth: '70px' }}>维度评分：</span>
                <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                  <span style={{ padding: '2px 8px', background: colors.background, borderRadius: '4px', fontSize: '12px', color: colors.text }}>花材 {detailData.dimensions.freshness}分</span>
                  <span style={{ padding: '2px 8px', background: colors.background, borderRadius: '4px', fontSize: '12px', color: colors.text }}>包装 {detailData.dimensions.packaging}分</span>
                  <span style={{ padding: '2px 8px', background: colors.background, borderRadius: '4px', fontSize: '12px', color: colors.text }}>配送 {detailData.dimensions.delivery}分</span>
                  <span style={{ padding: '2px 8px', background: colors.background, borderRadius: '4px', fontSize: '12px', color: colors.text }}>客服 {detailData.dimensions.service}分</span>
                </div>
              </div>
              {detailData.reply && (
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
                  <span style={{ fontSize: '13px', color: colors.textMuted, minWidth: '70px' }}>商家回复：</span>
                  <div style={{ flex: 1, padding: '10px', background: colors.background, borderRadius: '6px', fontSize: '13px', color: colors.text }}>{detailData.reply}</div>
                </div>
              )}
            </div>
            <div style={footerStyle}>
              <button style={cancelBtnStyle} onClick={() => setShowDetailModal(false)}>关闭</button>
              <button style={{ ...submitBtnStyle, background: colors.info }} onClick={() => { setShowDetailModal(false); handleReply(detailData); }}>回复评论</button>
            </div>
          </div>
        </div>
      )}

      {showReplyModal && detailData && (
        <div style={overlayStyle} onClick={() => setShowReplyModal(false)}>
          <div style={{ ...modalBase, width: '550px' }} onClick={(e) => e.stopPropagation()}>
            <div style={headerStyle}>
              <h3 style={{ margin: 0, fontSize: '16px', color: colors.text }}>回复评论 - {detailData.nickname}</h3>
              <button style={closeBtnStyle} onClick={() => setShowReplyModal(false)}>✕</button>
            </div>
            <div style={bodyStyle}>
              <div style={{ padding: '10px', background: colors.background, borderRadius: '6px', marginBottom: '16px' }}>
                <div style={{ fontSize: '12px', color: colors.textMuted, marginBottom: '4px' }}>客户原文：</div>
                <div style={{ fontSize: '13px', color: colors.text }}>{detailData.content}</div>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                <span style={{ fontSize: '13px', color: colors.textSecondary, fontWeight: '500' }}>快捷回复模板：</span>
                <button style={{ background: 'none', border: 'none', color: colors.primary, fontSize: '12px', cursor: 'pointer' }} onClick={() => setShowTemplateModal(true)}>管理模板</button>
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '12px' }}>
                {replyTemplates.map(tpl => (
                  <button
                    key={tpl.id}
                    style={{ padding: '4px 10px', background: colors.surface, color: colors.textSecondary, border: `1px solid ${colors.border}`, borderRadius: '12px', fontSize: '11px', cursor: 'pointer' }}
                    onClick={() => applyTemplate(tpl.text)}
                  >{tpl.text.slice(0, 14)}...</button>
                ))}
              </div>
              <textarea
                value={replyText}
                onChange={(e) => setReplyText(e.target.value)}
                style={{ width: '100%', padding: '10px 12px', border: `1px solid ${colors.border}`, borderRadius: '4px', fontSize: '13px', boxSizing: 'border-box', resize: 'vertical', background: colors.surface, color: colors.text, outline: 'none' }}
                placeholder="请输入回复内容..."
                rows={4}
              />
            </div>
            <div style={footerStyle}>
              <button style={cancelBtnStyle} onClick={() => setShowReplyModal(false)}>取消</button>
              <button style={submitBtnStyle} onClick={submitReply}>提交回复</button>
            </div>
          </div>
        </div>
      )}

      {showTagModal && detailData && (
        <div style={overlayStyle} onClick={() => setShowTagModal(false)}>
          <div style={{ ...modalBase, width: '450px' }} onClick={(e) => e.stopPropagation()}>
            <div style={headerStyle}>
              <h3 style={{ margin: 0, fontSize: '16px', color: colors.text }}>为评论打标签</h3>
              <button style={closeBtnStyle} onClick={() => setShowTagModal(false)}>✕</button>
            </div>
            <div style={bodyStyle}>
              <p style={{ fontSize: '13px', color: colors.textSecondary, marginBottom: '12px' }}>选择合适的标签（可多选）：</p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                {reviewTags.map(tag => (
                  <button
                    key={tag}
                    style={{
                      padding: '6px 12px',
                      backgroundColor: detailData.tags.includes(tag) ? colors.primary : colors.surface,
                      color: detailData.tags.includes(tag) ? colors.textInverse : colors.text,
                      border: `1px solid ${detailData.tags.includes(tag) ? colors.primary : colors.border}`,
                      borderRadius: '16px', fontSize: '12px', cursor: 'pointer',
                    }}
                  >{tag}</button>
                ))}
              </div>
            </div>
            <div style={footerStyle}>
              <button style={cancelBtnStyle} onClick={() => setShowTagModal(false)}>取消</button>
              <button style={submitBtnStyle} onClick={() => { setShowTagModal(false); alert('标签已更新'); }}>确认</button>
            </div>
          </div>
        </div>
      )}

      {showTemplateModal && (
        <div style={overlayStyle} onClick={() => setShowTemplateModal(false)}>
          <div style={{ ...modalBase, width: '500px' }} onClick={(e) => e.stopPropagation()}>
            <div style={headerStyle}>
              <h3 style={{ margin: 0, fontSize: '16px', color: colors.text }}>快捷回复模板管理</h3>
              <button style={closeBtnStyle} onClick={() => setShowTemplateModal(false)}>✕</button>
            </div>
            <div style={bodyStyle}>
              {replyTemplates.map(tpl => (
                <div key={tpl.id} style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '10px 0', borderBottom: `1px solid ${colors.border}` }}>
                  <span style={{ fontSize: '13px', color: colors.text, flex: 1 }}>{tpl.text}</span>
                  <button style={{ background: 'none', border: 'none', color: colors.error, fontSize: '12px', cursor: 'pointer' }}>删除</button>
                </div>
              ))}
            </div>
            <div style={footerStyle}>
              <button style={cancelBtnStyle} onClick={() => setShowTemplateModal(false)}>关闭</button>
              <button style={submitBtnStyle} onClick={() => alert('新模板已添加')}>+ 新增模板</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

function DetailRow({ colors, label, value, mono, inline }) {
  return (
    <div style={{ display: 'flex', alignItems: inline ? 'center' : 'flex-start', gap: '8px', marginBottom: '12px' }}>
      <span style={{ fontSize: '13px', color: colors.textMuted, minWidth: '70px' }}>{label}</span>
      <span style={{ flex: 1, fontSize: '13px', color: colors.text, fontFamily: mono ? 'monospace' : 'inherit' }}>{value}</span>
    </div>
  );
}

function ContentReviewWithLayout() {
  return (
    <AdminLayout activeModule="contentReview">
      <ContentReview />
    </AdminLayout>
  );
}

export default ContentReviewWithLayout;
