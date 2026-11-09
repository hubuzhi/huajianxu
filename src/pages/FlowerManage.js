import React, { useState } from 'react';
import { useTheme } from '../context/ThemeContext';
import LinearIcons from '../components/LinearIcons';
import AdminLayout from '../components/AdminLayout';

function FlowerManageContent() {
  const { theme } = useTheme();
  const colors = theme.colors;

  const [searchKeyword, setSearchKeyword] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('');
  const [selectedScene, setSelectedScene] = useState('');
  const [priceRange, setPriceRange] = useState({ min: '', max: '' });
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedItems, setSelectedItems] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [confirmData, setConfirmData] = useState(null);
  const [showLogModal, setShowLogModal] = useState(false);
  const [sortField, setSortField] = useState('');
  const [sortOrder, setSortOrder] = useState('asc');
  const [hoveredRow, setHoveredRow] = useState(null);
  const [hoveredBtn, setHoveredBtn] = useState(null);

  const [formData, setFormData] = useState({
    name: '',
    category: '',
    flowers: '',
    spec: '',
    price: '',
    cost: '',
    stock: '',
    scenes: [],
    packaging: '',
    status: 'active',
    image: '',
    description: '',
  });

  const [formErrors, setFormErrors] = useState({});
  const [detailData, setDetailData] = useState(null);

  const [operationLogs, setOperationLogs] = useState([]);

  const [bouquetsData, setBouquetsData] = useState([
    { id: 1, name: '经典红玫瑰', category: '生日', flowers: '红玫瑰11朵+满天星5枝', spec: '中型', price: 199, cost: 85, sold: 328, stock: 45, scenes: ['生日', '情人节', '纪念日'], packaging: '简约', status: 'active', createTime: '2024-01-15', image: 'https://www.aihuaju.com/huahua/uploadfile/2020/1218/20201218055753904.png', description: '精选卡罗拉红玫瑰，搭配清新满天星，经典永不过时', deleted: false },
    { id: 2, name: '香槟玫瑰求婚束', category: '求婚', flowers: '香槟玫瑰19朵+尤加利叶', spec: '大型', price: 399, cost: 160, sold: 156, stock: 28, scenes: ['求婚', '婚礼', '纪念日'], packaging: '浪漫', status: 'active', createTime: '2024-01-18', image: 'https://images.unsplash.com/photo-1487530811176-3780de880c2d?w=400', description: '浪漫香槟玫瑰求婚专用花束，见证美好爱情', deleted: false },
    { id: 3, name: '康乃馨母亲花束', category: '节日', flowers: '粉色康乃馨12朵+百合2朵', spec: '中型', price: 168, cost: 72, sold: 412, stock: 62, scenes: ['母亲节', '生日'], packaging: '温馨', status: 'active', createTime: '2024-02-20', image: 'https://images.unsplash.com/photo-1563241527-3004b7be0ffd?w=400', description: '感恩母亲专属花束，粉色康乃馨搭配纯洁百合', deleted: false },
    { id: 4, name: '向日葵阳光花束', category: '日常', flowers: '向日葵5朵+洋桔梗3枝', spec: '小型', price: 128, cost: 55, sold: 234, stock: 38, scenes: ['日常', '探病', '生日'], packaging: 'ins', status: 'active', createTime: '2024-03-10', image: 'https://i04piccdn.sogoucdn.com/8a49f1a9b18d6a7b', description: '阳光向上的向日葵花束，带来满满正能量', deleted: false },
    { id: 5, name: '毕业季花束', category: '节日', flowers: '向日葵3朵+洋甘菊5枝+尤加利叶', spec: '中型', price: 158, cost: 68, sold: 567, stock: 89, scenes: ['毕业', '生日', '日常'], packaging: '简约', status: 'active', createTime: '2024-05-15', image: 'https://nimg.ws.126.net/?url=http%3a%2f%2fdingyue.ws.126.net%2f2024%2f0921%2f3bf63934j00sk5cye00aad0016o01kwm.jpg&thumbnail=660x2147483647&quality=80&type=jpg', description: '毕业季专属花束，祝福前程似锦', deleted: false },
    { id: 6, name: 'ins风混搭花束', category: '日常', flowers: '折射玫瑰5朵+洋牡丹3枝+小雏菊5枝', spec: '中型', price: 228, cost: 95, sold: 189, stock: 42, scenes: ['日常', '生日', '探病'], packaging: 'ins', status: 'active', createTime: '2024-03-25', image: 'https://images.unsplash.com/photo-1525310072745-f49212b5ac6d?w=400', description: '网红ins风混搭花束，拍照超出片', deleted: false },
    { id: 7, name: '哀悼白菊花束', category: '哀悼', flowers: '白菊和黄菊', spec: '中型', price: 188, cost: 80, sold: 98, stock: 35, scenes: ['哀悼'], packaging: '简约', status: 'active', createTime: '2024-04-02', image: 'https://img1.sixflower.com/20264510322594639.jpg', description: '寄托哀思的白菊花束，庄重典雅', deleted: false },
    { id: 8, name: '豪华巨型玫瑰', category: '求婚', flowers: '红玫瑰99朵+满天星适量', spec: '大型', price: 899, cost: 380, sold: 45, stock: 12, scenes: ['求婚', '婚礼', '纪念日'], packaging: '豪华', status: 'active', createTime: '2024-02-14', image: 'https://images.unsplash.com/photo-1494972308805-463bc619d34e?w=400', description: '震撼人心的99朵巨型玫瑰，求婚必备', deleted: false },
  ]);

  const bouquetCategories = ['生日', '求婚', '节日', '日常', '探病', '商务', '哀悼'];
  const bouquetSpecs = ['小型', '中型', '大型'];
  const bouquetPackaging = ['简约', 'ins', '复古', '浪漫', '豪华', '温馨'];
  const bouquetScenes = ['情人节', '母亲节', '生日', '毕业', '求婚', '婚礼', '探病', '商务', '哀悼', '纪念日', '日常'];

  const addLog = (type, message) => {
    const now = new Date();
    const timeStr = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')} ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
    setOperationLogs(prev => [...prev, { id: Date.now(), type, message, time: timeStr }]);
  };

  const filteredBouquets = bouquetsData.filter(bouquet => {
    if (bouquet.deleted) return false;
    const matchKeyword = bouquet.name.includes(searchKeyword) || bouquet.category.includes(searchKeyword);
    const matchCategory = !selectedCategory || bouquet.category === selectedCategory;
    const matchStatus = !selectedStatus || bouquet.status === selectedStatus;
    const matchScene = !selectedScene || bouquet.scenes.includes(selectedScene);
    const matchPrice = (!priceRange.min || bouquet.price >= parseInt(priceRange.min)) &&
                      (!priceRange.max || bouquet.price <= parseInt(priceRange.max));
    return matchKeyword && matchCategory && matchStatus && matchScene && matchPrice;
  });

  const sortedBouquets = [...filteredBouquets].sort((a, b) => {
    if (!sortField) return 0;
    const aVal = a[sortField];
    const bVal = b[sortField];
    if (sortOrder === 'asc') {
      return aVal > bVal ? 1 : -1;
    } else {
      return aVal < bVal ? 1 : -1;
    }
  });

  const totalPages = Math.ceil(sortedBouquets.length / 5);
  const paginatedBouquets = sortedBouquets.slice((currentPage - 1) * 5, currentPage * 5);

  const handleSort = (field) => {
    if (sortField === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortOrder('asc');
    }
  };

  const validateForm = () => {
    const errors = {};
    if (!formData.name.trim()) errors.name = '请输入花束名称';
    if (!formData.category) errors.category = '请选择花束种类';
    if (!formData.flowers.trim()) errors.flowers = '请输入所用花材及数量';
    if (!formData.spec) errors.spec = '请选择花束规格';
    if (!formData.price || formData.price <= 0) errors.price = '请输入有效售价';
    if (!formData.cost || formData.cost <= 0) errors.cost = '请输入有效成本价';
    if (formData.price && formData.cost && parseFloat(formData.price) < parseFloat(formData.cost)) {
      errors.price = '售价不能低于成本价';
    }
    if (formData.stock === '' || formData.stock === null || formData.stock < 0) errors.stock = '库存不能为负数';
    if (!formData.packaging) errors.packaging = '请选择包装风格';
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = () => {
    if (!validateForm()) return;
    
    if (isEdit) {
      setBouquetsData(prev => prev.map(b => {
        if (b.id === formData.id) {
          return { ...formData, price: parseFloat(formData.price), cost: parseFloat(formData.cost), stock: parseInt(formData.stock) };
        }
        return b;
      }));
      addLog('edit', `编辑了花束「${formData.name}」`);
    } else {
      const newBouquet = {
        ...formData,
        id: Date.now(),
        price: parseFloat(formData.price),
        cost: parseFloat(formData.cost),
        stock: parseInt(formData.stock),
        sold: 0,
        createTime: new Date().toISOString().slice(0, 10),
        deleted: false,
      };
      setBouquetsData(prev => [...prev, newBouquet]);
      addLog('add', `新增了花束「${formData.name}」`);
    }
    
    setShowModal(false);
    setFormData({ name: '', category: '', flowers: '', spec: '', price: '', cost: '', stock: '', scenes: [], packaging: '', status: 'active', image: '', description: '' });
    setIsEdit(false);
  };

  const handleEdit = (bouquet) => {
    setFormData({ ...bouquet });
    setIsEdit(true);
    setShowModal(true);
  };

  const handleViewDetail = (bouquet) => {
    setDetailData(bouquet);
    setShowDetailModal(true);
  };

  const handleToggleStatus = (bouquet) => {
    if (bouquet.status === 'inactive' && bouquet.stock <= 0) {
      alert('库存为0，无法上架');
      return;
    }
    
    const newStatus = bouquet.status === 'active' ? 'inactive' : 'active';
    setBouquetsData(prev => prev.map(b => {
      if (b.id === bouquet.id) {
        return { ...b, status: newStatus };
      }
      return b;
    }));
    addLog('status', `${newStatus === 'active' ? '上架' : '下架'}了花束「${bouquet.name}」`);
  };

  const handleDelete = (bouquet) => {
    setConfirmData({ type: 'delete', item: bouquet });
    setShowConfirmModal(true);
  };

  const confirmDelete = () => {
    if (!confirmData) return;
    
    setBouquetsData(prev => prev.map(b => {
      if (b.id === confirmData.item.id) {
        return { ...b, deleted: true };
      }
      return b;
    }));
    addLog('delete', `删除了花束「${confirmData.item.name}」`);
    
    setShowConfirmModal(false);
    setConfirmData(null);
  };

  const handleBatchDelete = () => {
    if (selectedItems.length > 0) {
      setConfirmData({ type: 'batchDelete', ids: [...selectedItems] });
      setShowConfirmModal(true);
    } else {
      alert('请选择要删除的记录');
    }
  };

  const confirmBatchDelete = () => {
    if (!confirmData) return;
    
    setBouquetsData(prev => prev.map(b => {
      if (confirmData.ids.includes(b.id)) {
        return { ...b, deleted: true };
      }
      return b;
    }));
    addLog('delete', `批量删除了 ${confirmData.ids.length} 个花束`);
    
    setSelectedItems([]);
    setShowConfirmModal(false);
    setConfirmData(null);
  };

  const handleBatchStatus = (status) => {
    if (selectedItems.length > 0) {
      const items = bouquetsData.filter(b => selectedItems.includes(b.id));
      
      if (status === 'active') {
        const hasZeroStock = items.some(b => b.stock <= 0);
        if (hasZeroStock) {
          alert('选中的商品中有库存为0的，无法批量上架');
          return;
        }
      }
      
      setBouquetsData(prev => prev.map(b => {
        if (selectedItems.includes(b.id)) {
          return { ...b, status };
        }
        return b;
      }));
      
      addLog('status', `批量${status === 'active' ? '上架' : '下架'}了 ${selectedItems.length} 个花束`);
      setSelectedItems([]);
    } else {
      alert('请选择要操作的记录');
    }
  };

  const handleSceneChange = (scene, checked) => {
    if (checked) {
      setFormData({ ...formData, scenes: [...formData.scenes, scene] });
    } else {
      setFormData({ ...formData, scenes: formData.scenes.filter(s => s !== scene) });
    }
  };

  const toggleSelectAll = () => {
    if (selectedItems.length === paginatedBouquets.length) {
      setSelectedItems([]);
    } else {
      setSelectedItems(paginatedBouquets.map(b => b.id));
    }
  };

  const SortIcon = ({ field }) => {
    if (sortField !== field) return <span style={{ opacity: 0.3 }}>↕</span>;
    return sortOrder === 'asc' ? <span>↑</span> : <span>↓</span>;
  };

  const styles = getStyles(colors);

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <div style={styles.headerLeft}>
          <h2 style={styles.title}>花束商品管理</h2>
        </div>
        <div style={styles.headerRight}>
          <button
            style={styles.logBtn}
            onClick={() => setShowLogModal(true)}
          >
            <LinearIcons.clock style={{ width: '14px', height: '14px', marginRight: '8px' }} />
            操作日志
          </button>
          <button
            style={styles.addBtn}
            onClick={() => { setIsEdit(false); setFormData({ name: '', category: '', flowers: '', spec: '', price: '', cost: '', stock: '', scenes: [], packaging: '', status: 'active', image: '', description: '' }); setShowModal(true); }}
          >
            <LinearIcons.plus style={{ width: '14px', height: '14px', marginRight: '8px' }} />
            新增花束
          </button>
        </div>
      </div>

      <div style={styles.filterSection}>
        <div style={styles.filterRow}>
          <input
            type="text"
            placeholder="搜索花束名称或种类..."
            value={searchKeyword}
            onChange={(e) => { setSearchKeyword(e.target.value); setCurrentPage(1); }}
            style={styles.searchInput}
          />
          <select
            value={selectedCategory}
            onChange={(e) => { setSelectedCategory(e.target.value); setCurrentPage(1); }}
            style={styles.selectInput}
          >
            <option value="">全部种类</option>
            {bouquetCategories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
          </select>
          <select
            value={selectedScene}
            onChange={(e) => { setSelectedScene(e.target.value); setCurrentPage(1); }}
            style={styles.selectInput}
          >
            <option value="">全部场景</option>
            {bouquetScenes.map(s => <option key={s} value={s}>{s}</option>)}
          </select>
          <select
            value={selectedStatus}
            onChange={(e) => { setSelectedStatus(e.target.value); setCurrentPage(1); }}
            style={styles.selectInput}
          >
            <option value="">全部状态</option>
            <option value="active">上架</option>
            <option value="inactive">下架</option>
          </select>
        </div>
        <div style={styles.filterRow}>
          <span style={styles.filterLabel}>价格区间：</span>
          <input
            type="number"
            placeholder="最低价"
            value={priceRange.min}
            onChange={(e) => { setPriceRange({ ...priceRange, min: e.target.value }); setCurrentPage(1); }}
            style={{ ...styles.searchInput, width: '100px' }}
          />
          <span style={styles.filterLabel}>-</span>
          <input
            type="number"
            placeholder="最高价"
            value={priceRange.max}
            onChange={(e) => { setPriceRange({ ...priceRange, max: e.target.value }); setCurrentPage(1); }}
            style={{ ...styles.searchInput, width: '100px' }}
          />
          <button
            style={styles.exportBtn}
            onClick={() => {
              addLog('export', '导出了花束数据');
              alert('导出成功');
            }}
          >
            <LinearIcons.download style={{ width: '14px', height: '14px', marginRight: '8px' }} />
            导出
          </button>
        </div>

        {selectedItems.length > 0 && (
          <div style={styles.batchBar}>
            <span>已选择 {selectedItems.length} 条记录</span>
            <button style={{ ...styles.batchBtn, backgroundColor: colors.success }} onClick={() => handleBatchStatus('active')}>
              批量上架
            </button>
            <button style={{ ...styles.batchBtn, backgroundColor: colors.warning }} onClick={() => handleBatchStatus('inactive')}>
              批量下架
            </button>
            <button style={{ ...styles.batchBtn, backgroundColor: colors.error }} onClick={handleBatchDelete}>
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
                  checked={selectedItems.length === paginatedBouquets.length && paginatedBouquets.length > 0}
                  onChange={toggleSelectAll}
                />
              </th>
              <th style={styles.th}>花束图片</th>
              <th style={styles.th}>花束名称</th>
              <th style={{ ...styles.th, cursor: 'pointer' }} onClick={() => handleSort('category')}>
                花束种类 <SortIcon field="category" />
              </th>
              <th style={styles.th}>所用花材</th>
              <th style={{ ...styles.th, cursor: 'pointer' }} onClick={() => handleSort('spec')}>
                规格 <SortIcon field="spec" />
              </th>
              <th style={{ ...styles.th, cursor: 'pointer' }} onClick={() => handleSort('price')}>
                售价(¥) <SortIcon field="price" />
              </th>
              <th style={{ ...styles.th, cursor: 'pointer' }} onClick={() => handleSort('cost')}>
                成本价(¥) <SortIcon field="cost" />
              </th>
              <th style={{ ...styles.th, cursor: 'pointer' }} onClick={() => handleSort('sold')}>
                已售 <SortIcon field="sold" />
              </th>
              <th style={{ ...styles.th, cursor: 'pointer' }} onClick={() => handleSort('stock')}>
                库存 <SortIcon field="stock" />
              </th>
              <th style={styles.th}>包装风格</th>
              <th style={styles.th}>状态</th>
              <th style={styles.th}>创建时间</th>
              <th style={styles.th}>操作</th>
            </tr>
          </thead>
          <tbody>
            {paginatedBouquets.map(bouquet => (
              <tr
                key={bouquet.id}
                style={{
                  ...styles.tr,
                  ...(hoveredRow === bouquet.id ? styles.trHover : {}),
                }}
                onMouseEnter={() => setHoveredRow(bouquet.id)}
                onMouseLeave={() => setHoveredRow(null)}
              >
                <td style={styles.td}>
                  <input
                    type="checkbox"
                    checked={selectedItems.includes(bouquet.id)}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setSelectedItems([...selectedItems, bouquet.id]);
                      } else {
                        setSelectedItems(selectedItems.filter(id => id !== bouquet.id));
                      }
                    }}
                  />
                </td>
                <td style={styles.td}>
                  <img
                    src={bouquet.image}
                    alt={bouquet.name}
                    style={{ width: '50px', height: '50px', objectFit: 'cover', borderRadius: '6px' }}
                    onError={(e) => { e.target.style.display = 'none'; }}
                  />
                </td>
                <td style={{ ...styles.td, fontWeight: '500', color: colors.text }}>{bouquet.name}</td>
                <td style={styles.td}>
                  <span style={styles.categoryTag}>{bouquet.category}</span>
                </td>
                <td style={{ ...styles.td, maxWidth: '180px' }}>
                  <span style={styles.flowersText} title={bouquet.flowers}>{bouquet.flowers}</span>
                </td>
                <td style={{ ...styles.td, whiteSpace: 'nowrap' }}>
                  <span style={styles.specTag}>{bouquet.spec}</span>
                </td>
                <td style={{ ...styles.td, textAlign: 'right', fontWeight: '600', color: colors.primary }}>¥{bouquet.price}</td>
                <td style={{ ...styles.td, textAlign: 'right', color: colors.textMuted }}>¥{bouquet.cost}</td>
                <td style={{ ...styles.td, textAlign: 'right', color: colors.success }}>{bouquet.sold}</td>
                <td style={{ ...styles.td, textAlign: 'right' }}>
                  <span style={{ 
                    color: bouquet.stock < 10 ? colors.error : bouquet.stock < 30 ? colors.warning : colors.text,
                    fontWeight: bouquet.stock < 30 ? '600' : 'normal',
                  }}>
                    {bouquet.stock}
                    {bouquet.stock < 10 && ' ⚠️'}
                    {bouquet.stock >= 10 && bouquet.stock < 30 && ' 🔸'}
                  </span>
                </td>
                <td style={styles.td}>{bouquet.packaging}</td>
                <td style={styles.td}>
                  <span style={{
                    ...styles.statusBadge,
                    backgroundColor: bouquet.status === 'active' ? colors.successBg : colors.warningBg,
                    color: bouquet.status === 'active' ? colors.success : colors.warning,
                  }}>
                    {bouquet.status === 'active' ? '上架' : '下架'}
                  </span>
                </td>
                <td style={styles.td}>{bouquet.createTime}</td>
                <td style={styles.td}>
                  <button
                    style={styles.actionBtn}
                    onClick={() => handleViewDetail(bouquet)}
                  >查看</button>
                  <button
                    style={{
                      ...styles.actionBtn,
                      backgroundColor: hoveredBtn === `edit-${bouquet.id}` ? colors.info : colors.surfaceHover,
                      color: hoveredBtn === `edit-${bouquet.id}` ? colors.textInverse : colors.textSecondary,
                      borderColor: hoveredBtn === `edit-${bouquet.id}` ? colors.info : colors.border,
                    }}
                    onMouseEnter={() => setHoveredBtn(`edit-${bouquet.id}`)}
                    onMouseLeave={() => setHoveredBtn(null)}
                    onClick={() => handleEdit(bouquet)}
                  >编辑</button>
                  <button
                    style={{
                      ...styles.actionBtn,
                      backgroundColor: hoveredBtn === `status-${bouquet.id}` ? colors.success : colors.surfaceHover,
                      color: hoveredBtn === `status-${bouquet.id}` ? colors.textInverse : colors.textSecondary,
                      borderColor: hoveredBtn === `status-${bouquet.id}` ? colors.success : colors.border,
                      opacity: bouquet.status === 'inactive' && bouquet.stock <= 0 ? 0.5 : 1,
                    }}
                    onMouseEnter={() => setHoveredBtn(`status-${bouquet.id}`)}
                    onMouseLeave={() => setHoveredBtn(null)}
                    onClick={() => handleToggleStatus(bouquet)}
                    disabled={bouquet.status === 'inactive' && bouquet.stock <= 0}
                  >
                    {bouquet.status === 'active' ? '下架' : '上架'}
                  </button>
                  <button
                    style={{
                      ...styles.actionBtn,
                      backgroundColor: hoveredBtn === `delete-${bouquet.id}` ? colors.error : colors.surfaceHover,
                      color: hoveredBtn === `delete-${bouquet.id}` ? colors.textInverse : colors.textSecondary,
                      borderColor: hoveredBtn === `delete-${bouquet.id}` ? colors.error : colors.border,
                    }}
                    onMouseEnter={() => setHoveredBtn(`delete-${bouquet.id}`)}
                    onMouseLeave={() => setHoveredBtn(null)}
                    onClick={() => handleDelete(bouquet)}
                  >删除</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div style={styles.pagination}>
          <span style={styles.pageInfo}>共 {filteredBouquets.length} 条记录</span>
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
              <h3>{isEdit ? '编辑花束' : '新增花束'}</h3>
              <button style={styles.closeBtn} onClick={() => setShowModal(false)}>✕</button>
            </div>
            <div style={styles.modalBody}>
              <div style={styles.formRow}>
                <label style={styles.formLabel}>花束名称 *</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  style={{ ...styles.formInput, ...(formErrors.name ? styles.errorInput : {}) }}
                  placeholder="请输入花束名称"
                />
                {formErrors.name && <span style={styles.errorText}>{formErrors.name}</span>}
              </div>
              <div style={styles.formRow}>
                <label style={styles.formLabel}>花束种类 *</label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  style={{ ...styles.formInput, ...(formErrors.category ? styles.errorInput : {}) }}
                >
                  <option value="">请选择花束种类</option>
                  {bouquetCategories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                </select>
                {formErrors.category && <span style={styles.errorText}>{formErrors.category}</span>}
              </div>
              <div style={styles.formRow}>
                <label style={styles.formLabel}>所用花材及数量 *</label>
                <input
                  type="text"
                  value={formData.flowers}
                  onChange={(e) => setFormData({ ...formData, flowers: e.target.value })}
                  style={{ ...styles.formInput, ...(formErrors.flowers ? styles.errorInput : {}) }}
                  placeholder="如：红玫瑰11朵+满天星5枝+尤加利叶3枝"
                />
                {formErrors.flowers && <span style={styles.errorText}>{formErrors.flowers}</span>}
              </div>
              <div style={styles.formGrid}>
                <div style={styles.formRow}>
                  <label style={styles.formLabel}>花束规格 *</label>
                  <select
                    value={formData.spec}
                    onChange={(e) => setFormData({ ...formData, spec: e.target.value })}
                    style={{ ...styles.formInput, ...(formErrors.spec ? styles.errorInput : {}) }}
                  >
                    <option value="">请选择规格</option>
                    {bouquetSpecs.map(s => <option key={s} value={s}>{s}</option>)}
                  </select>
                  {formErrors.spec && <span style={styles.errorText}>{formErrors.spec}</span>}
                </div>
                <div style={styles.formRow}>
                  <label style={styles.formLabel}>包装风格 *</label>
                  <select
                    value={formData.packaging}
                    onChange={(e) => setFormData({ ...formData, packaging: e.target.value })}
                    style={{ ...styles.formInput, ...(formErrors.packaging ? styles.errorInput : {}) }}
                  >
                    <option value="">请选择包装风格</option>
                    {bouquetPackaging.map(p => <option key={p} value={p}>{p}</option>)}
                  </select>
                  {formErrors.packaging && <span style={styles.errorText}>{formErrors.packaging}</span>}
                </div>
              </div>
              <div style={styles.formGrid}>
                <div style={styles.formRow}>
                  <label style={styles.formLabel}>花束售价(¥) *</label>
                  <input
                    type="number"
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                    style={{ ...styles.formInput, ...(formErrors.price ? styles.errorInput : {}) }}
                    placeholder="请输入售价"
                  />
                  {formErrors.price && <span style={styles.errorText}>{formErrors.price}</span>}
                </div>
                <div style={styles.formRow}>
                  <label style={styles.formLabel}>成本价(¥) *</label>
                  <input
                    type="number"
                    value={formData.cost}
                    onChange={(e) => setFormData({ ...formData, cost: e.target.value })}
                    style={{ ...styles.formInput, ...(formErrors.cost ? styles.errorInput : {}) }}
                    placeholder="花材+包装+人工"
                  />
                  {formErrors.cost && <span style={styles.errorText}>{formErrors.cost}</span>}
                </div>
              </div>
              <div style={styles.formGrid}>
                <div style={styles.formRow}>
                  <label style={styles.formLabel}>库存数量 *</label>
                  <input
                    type="number"
                    value={formData.stock}
                    onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
                    style={{ ...styles.formInput, ...(formErrors.stock ? styles.errorInput : {}) }}
                    placeholder="可售数量"
                  />
                  {formErrors.stock && <span style={styles.errorText}>{formErrors.stock}</span>}
                </div>
                <div style={styles.formRow}>
                  <label style={styles.formLabel}>状态</label>
                  <select
                    value={formData.status}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                    style={styles.formInput}
                  >
                    <option value="active">上架</option>
                    <option value="inactive">下架</option>
                  </select>
                </div>
              </div>
              <div style={styles.formRow}>
                <label style={styles.formLabel}>适用场景（可多选）</label>
                <div style={styles.checkboxGroup}>
                  {bouquetScenes.map(scene => (
                    <label key={scene} style={styles.checkboxLabel}>
                      <input
                        type="checkbox"
                        checked={formData.scenes.includes(scene)}
                        onChange={(e) => handleSceneChange(scene, e.target.checked)}
                      />
                      {scene}
                    </label>
                  ))}
                </div>
              </div>
              <div style={styles.formRow}>
                <label style={styles.formLabel}>花束描述</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  style={styles.formTextarea}
                  placeholder="请输入花束描述"
                  rows={3}
                />
              </div>
              <div style={styles.formRow}>
                <label style={styles.formLabel}>花束主图</label>
                <div style={styles.uploadArea}>
                  <input type="file" accept="image/*" style={styles.uploadInput} />
                  <span style={styles.uploadText}>点击上传花束图片</span>
                </div>
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
              <h3>{detailData.name} - 详情</h3>
              <button style={styles.closeBtn} onClick={() => setShowDetailModal(false)}>✕</button>
            </div>
            <div style={styles.detailBody}>
              <div style={styles.detailImage}>
                <img src={detailData.image} alt={detailData.name} style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '8px' }} />
              </div>
              <div style={styles.detailInfo}>
                <div style={styles.detailRow}>
                  <span style={styles.detailLabel}>花束名称：</span>
                  <span style={{ ...styles.detailValue, fontWeight: '600', fontSize: '16px' }}>{detailData.name}</span>
                </div>
                <div style={styles.detailRow}>
                  <span style={styles.detailLabel}>花束种类：</span>
                  <span style={styles.categoryTag}>{detailData.category}</span>
                </div>
                <div style={styles.detailRow}>
                  <span style={styles.detailLabel}>花束规格：</span>
                  <span style={styles.specTag}>{detailData.spec}</span>
                </div>
                <div style={styles.detailRow}>
                  <span style={styles.detailLabel}>所用花材：</span>
                  <span style={styles.detailValue}>{detailData.flowers}</span>
                </div>
                <div style={styles.detailRow}>
                  <span style={styles.detailLabel}>包装风格：</span>
                  <span style={styles.detailValue}>{detailData.packaging}</span>
                </div>
                <div style={styles.detailRow}>
                  <span style={styles.detailLabel}>花束售价：</span>
                  <span style={{ ...styles.detailValue, color: colors.primary, fontWeight: '600' }}>¥{detailData.price}</span>
                </div>
                <div style={styles.detailRow}>
                  <span style={styles.detailLabel}>成本价：</span>
                  <span style={styles.detailValue}>¥{detailData.cost}</span>
                </div>
                <div style={styles.detailRow}>
                  <span style={styles.detailLabel}>已售数量：</span>
                  <span style={{ ...styles.detailValue, color: colors.success }}>{detailData.sold}</span>
                </div>
                <div style={styles.detailRow}>
                  <span style={styles.detailLabel}>库存数量：</span>
                  <span style={{ ...styles.detailValue, color: detailData.stock < 30 ? colors.warning : colors.text }}>{detailData.stock}</span>
                </div>
                <div style={styles.detailRow}>
                  <span style={styles.detailLabel}>适用场景：</span>
                  <div style={styles.sceneTags}>
                    {detailData.scenes.map(scene => (
                      <span key={scene} style={styles.sceneTag}>{scene}</span>
                    ))}
                  </div>
                </div>
                <div style={styles.detailRow}>
                  <span style={styles.detailLabel}>状态：</span>
                  <span style={{
                    ...styles.statusBadge,
                    backgroundColor: detailData.status === 'active' ? colors.successBg : colors.warningBg,
                    color: detailData.status === 'active' ? colors.success : colors.warning,
                  }}>
                    {detailData.status === 'active' ? '上架' : '下架'}
                  </span>
                </div>
                <div style={styles.detailRow}>
                  <span style={styles.detailLabel}>创建时间：</span>
                  <span style={styles.detailValue}>{detailData.createTime}</span>
                </div>
                <div style={styles.detailRow}>
                  <span style={styles.detailLabel}>花束描述：</span>
                  <span style={styles.detailValue}>{detailData.description}</span>
                </div>
              </div>
            </div>
            <div style={styles.modalFooter}>
              <button style={styles.cancelBtn} onClick={() => setShowDetailModal(false)}>关闭</button>
              <button style={styles.submitBtn} onClick={() => { setShowDetailModal(false); handleEdit(detailData); }}>编辑</button>
            </div>
          </div>
        </div>
      )}

      {showConfirmModal && confirmData && (
        <div style={styles.modalOverlay} onClick={() => setShowConfirmModal(false)}>
          <div style={styles.confirmModal} onClick={(e) => e.stopPropagation()}>
            <div style={styles.modalHeader}>
              <h3>确认操作</h3>
              <button style={styles.closeBtn} onClick={() => setShowConfirmModal(false)}>✕</button>
            </div>
            <div style={styles.modalBody}>
              <div style={styles.confirmIcon}>⚠️</div>
              <p style={styles.confirmText}>
                {confirmData.type === 'delete' 
                  ? `确定要删除花束「${confirmData.item.name}」吗？此操作仅标记删除，数据保留。`
                  : `确定要批量删除选中的 ${confirmData.ids.length} 个花束吗？此操作仅标记删除，数据保留。`}
              </p>
            </div>
            <div style={styles.modalFooter}>
              <button style={styles.cancelBtn} onClick={() => setShowConfirmModal(false)}>取消</button>
              <button 
                style={{ ...styles.submitBtn, backgroundColor: colors.error }} 
                onClick={confirmData.type === 'delete' ? confirmDelete : confirmBatchDelete}
              >
                确认删除
              </button>
            </div>
          </div>
        </div>
      )}

      {showLogModal && (
        <div style={styles.modalOverlay} onClick={() => setShowLogModal(false)}>
          <div style={styles.logModal} onClick={(e) => e.stopPropagation()}>
            <div style={styles.modalHeader}>
              <h3>操作日志</h3>
              <button style={styles.closeBtn} onClick={() => setShowLogModal(false)}>✕</button>
            </div>
            <div style={styles.logBody}>
              {operationLogs.length === 0 ? (
                <div style={styles.emptyLog}>暂无操作记录</div>
              ) : (
                <div style={styles.logList}>
                  {[...operationLogs].reverse().map(log => (
                    <div key={log.id} style={styles.logItem}>
                      <span style={styles.logType}>
                        {log.type === 'add' && '➕'}
                        {log.type === 'edit' && '✏️'}
                        {log.type === 'delete' && '🗑️'}
                        {log.type === 'status' && '🔄'}
                        {log.type === 'export' && '📥'}
                      </span>
                      <span style={styles.logText}>{log.message}</span>
                      <span style={styles.logTime}>{log.time}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
            <div style={styles.modalFooter}>
              <button style={styles.cancelBtn} onClick={() => setShowLogModal(false)}>关闭</button>
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
    logBtn: {
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
      marginBottom: '12px',
    },
    filterLabel: {
      fontSize: '14px',
      color: colors.textMuted,
    },
    searchInput: {
      padding: '10px 16px',
      border: `1px solid ${colors.border}`,
      borderRadius: '8px',
      fontSize: '14px',
      width: '200px',
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
      minWidth: '140px',
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
      padding: '14px 12px',
      background: colors.background,
      color: colors.textSecondary,
      fontSize: '13px',
      fontWeight: '600',
      textAlign: 'left',
      borderBottom: `1px solid ${colors.border}`,
      whiteSpace: 'nowrap',
    },
    td: {
      padding: '14px 12px',
      borderBottom: `1px solid ${colors.border}`,
      fontSize: '14px',
      color: colors.text,
    },
    tr: {
      transition: 'background-color 0.2s',
    },
    trHover: {
      background: colors.background,
    },
    categoryTag: {
      padding: '4px 12px',
      background: colors.primaryBg,
      color: colors.primary,
      borderRadius: '4px',
      fontSize: '12px',
      fontWeight: '500',
    },
    specTag: {
      padding: '4px 10px',
      background: colors.infoBg,
      color: colors.info,
      borderRadius: '4px',
      fontSize: '12px',
      fontWeight: '500',
    },
    statusBadge: {
      padding: '4px 10px',
      borderRadius: '12px',
      fontSize: '12px',
      fontWeight: '500',
      whiteSpace: 'nowrap',
    },
    flowersText: {
      fontSize: '13px',
      color: colors.textSecondary,
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      display: 'block',
    },
    actionBtn: {
      padding: '6px 12px',
      marginRight: '6px',
      background: colors.surfaceHover,
      color: colors.textSecondary,
      border: `1px solid ${colors.border}`,
      borderRadius: '6px',
      fontSize: '12px',
      cursor: 'pointer',
      transition: 'all 0.2s ease',
    },
    pagination: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '16px 20px',
      borderTop: `1px solid ${colors.border}`,
    },
    pageInfo: {
      fontSize: '13px',
      color: colors.textMuted,
    },
    pageBtn: {
      padding: '8px 14px',
      marginLeft: '8px',
      background: colors.surface,
      color: colors.textSecondary,
      border: `1px solid ${colors.border}`,
      borderRadius: '6px',
      fontSize: '13px',
      cursor: 'pointer',
      transition: 'all 0.2s',
    },
    activePageBtn: {
      background: colors.primary,
      color: '#fff',
      borderColor: colors.primary,
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
    },
    modal: {
      background: colors.surface,
      borderRadius: '12px',
      width: '100%',
      maxWidth: '600px',
      maxHeight: '90vh',
      overflow: 'hidden',
      boxShadow: '0 20px 40px rgba(0, 0, 0, 0.3)',
    },
    confirmModal: {
      background: colors.surface,
      borderRadius: '12px',
      width: '100%',
      maxWidth: '450px',
      overflow: 'hidden',
      boxShadow: '0 20px 40px rgba(0, 0, 0, 0.3)',
    },
    logModal: {
      background: colors.surface,
      borderRadius: '12px',
      width: '100%',
      maxWidth: '550px',
      maxHeight: '70vh',
      overflow: 'hidden',
      boxShadow: '0 20px 40px rgba(0, 0, 0, 0.3)',
    },
    detailModal: {
      background: colors.surface,
      borderRadius: '12px',
      width: '100%',
      maxWidth: '750px',
      overflow: 'hidden',
      boxShadow: '0 20px 40px rgba(0, 0, 0, 0.3)',
    },
    modalHeader: {
      padding: '18px 24px',
      borderBottom: `1px solid ${colors.border}`,
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    modalBody: {
      padding: '24px',
      maxHeight: '60vh',
      overflowY: 'auto',
    },
    logBody: {
      padding: '16px',
      maxHeight: '50vh',
      overflowY: 'auto',
    },
    modalFooter: {
      padding: '18px 24px',
      borderTop: `1px solid ${colors.border}`,
      display: 'flex',
      justifyContent: 'flex-end',
      gap: '12px',
    },
    closeBtn: {
      background: 'none',
      border: 'none',
      fontSize: '24px',
      color: colors.textMuted,
      cursor: 'pointer',
    },
    formRow: {
      marginBottom: '20px',
    },
    formGrid: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: '16px',
      marginBottom: '12px',
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
      boxSizing: 'border-box',
      transition: 'border-color 0.2s',
    },
    errorInput: {
      borderColor: colors.error,
    },
    errorText: {
      display: 'block',
      marginTop: '6px',
      fontSize: '12px',
      color: colors.error,
    },
    formTextarea: {
      width: '100%',
      padding: '10px 14px',
      border: `1px solid ${colors.border}`,
      borderRadius: '8px',
      fontSize: '14px',
      outline: 'none',
      background: colors.surface,
      color: colors.text,
      resize: 'vertical',
      fontFamily: 'inherit',
      boxSizing: 'border-box',
    },
    checkboxGroup: {
      display: 'flex',
      flexWrap: 'wrap',
      gap: '12px',
    },
    checkboxLabel: {
      display: 'flex',
      alignItems: 'center',
      gap: '6px',
      fontSize: '13px',
      color: colors.text,
      cursor: 'pointer',
    },
    uploadArea: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      padding: '24px',
      border: `2px dashed ${colors.border}`,
      borderRadius: '8px',
      cursor: 'pointer',
      transition: 'all 0.2s',
    },
    uploadInput: {
      width: '100%',
      cursor: 'pointer',
    },
    uploadText: {
      fontSize: '13px',
      color: colors.textMuted,
    },
    cancelBtn: {
      padding: '10px 24px',
      background: colors.surface,
      color: colors.textSecondary,
      border: `1px solid ${colors.border}`,
      borderRadius: '8px',
      fontSize: '14px',
      cursor: 'pointer',
      transition: 'all 0.2s',
    },
    submitBtn: {
      padding: '10px 24px',
      background: colors.primary,
      color: '#fff',
      border: 'none',
      borderRadius: '8px',
      fontSize: '14px',
      fontWeight: '500',
      cursor: 'pointer',
      transition: 'all 0.2s',
    },
    detailBody: {
      display: 'grid',
      gridTemplateColumns: '1fr 1.3fr',
      gap: '24px',
      padding: '24px',
    },
    detailImage: {
      width: '100%',
      height: '280px',
      borderRadius: '10px',
      overflow: 'hidden',
    },
    detailInfo: {
      display: 'flex',
      flexDirection: 'column',
      gap: '14px',
    },
    detailRow: {
      display: 'flex',
      alignItems: 'flex-start',
      gap: '10px',
    },
    detailLabel: {
      fontSize: '13px',
      color: colors.textMuted,
      minWidth: '90px',
    },
    detailValue: {
      fontSize: '14px',
      color: colors.text,
      flex: 1,
    },
    sceneTags: {
      display: 'flex',
      flexWrap: 'wrap',
      gap: '8px',
    },
    sceneTag: {
      padding: '4px 10px',
      background: colors.background,
      borderRadius: '6px',
      fontSize: '12px',
      color: colors.textSecondary,
    },
    confirmIcon: {
      fontSize: '48px',
      textAlign: 'center',
      marginBottom: '12px',
    },
    confirmText: {
      textAlign: 'center',
      fontSize: '15px',
      color: colors.text,
      lineHeight: '1.6',
    },
    logList: {
      display: 'flex',
      flexDirection: 'column',
      gap: '8px',
    },
    logItem: {
      display: 'flex',
      alignItems: 'center',
      gap: '12px',
      padding: '12px 16px',
      background: colors.background,
      borderRadius: '8px',
      border: `1px solid ${colors.border}`,
    },
    logType: {
      fontSize: '18px',
    },
    logText: {
      flex: 1,
      fontSize: '14px',
      color: colors.text,
    },
    logTime: {
      fontSize: '12px',
      color: colors.textMuted,
      whiteSpace: 'nowrap',
    },
    emptyLog: {
      textAlign: 'center',
      padding: '40px 20px',
      color: colors.textMuted,
      fontSize: '14px',
    },
  };
}

export default function FlowerManage() {
  return <AdminLayout><FlowerManageContent /></AdminLayout>;
}
