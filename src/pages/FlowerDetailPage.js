import React, { useState } from 'react';
import { useTheme } from '../context/ThemeContext';
import AdminLayout from '../components/AdminLayout';
import LinearIcons from '../components/LinearIcons';

function FlowerDetailPage() {
  const { theme, isDark } = useTheme();
  const colors = theme.colors;
  const [selectedFlower, setSelectedFlower] = useState(flowersData[0]);
  const [searchKeyword, setSearchKeyword] = useState('');
  const [showImageModal, setShowImageModal] = useState(false);

  const filteredFlowers = flowersData.filter(flower =>
    flower.name.toLowerCase().includes(searchKeyword.toLowerCase())
  );

  const styles = getStyles(colors, isDark);

  return (
    <AdminLayout activeModule="flowerDetail">
      <div style={styles.container}>
        {/* 顶部标题和搜索 */}
        <div style={styles.header}>
          <div style={styles.titleSection}>
            <span style={styles.logo}>🌸</span>
            <h1 style={styles.title}>花卉商品详情</h1>
          </div>
          <div style={styles.searchSection}>
            <LinearIcons.search style={styles.searchIcon} />
            <input
              type="text"
              placeholder="搜索花卉..."
              value={searchKeyword}
              onChange={(e) => setSearchKeyword(e.target.value)}
              style={styles.searchInput}
            />
          </div>
        </div>

        <div style={styles.mainContent}>
          {/* 左侧花卉列表 */}
          <aside style={styles.sidebar}>
            <h3 style={styles.sidebarTitle}>花卉列表</h3>
            <div style={styles.flowerList}>
              {filteredFlowers.map((flower) => (
                <button
                  key={flower.id}
                  onClick={() => setSelectedFlower(flower)}
                  style={{
                    ...styles.flowerItem,
                    ...(selectedFlower.id === flower.id ? styles.activeFlowerItem : {}),
                    borderLeftColor: flower.color,
                  }}
                >
                  <span style={{ ...styles.flowerColorDot, backgroundColor: flower.color }} />
                  <span style={styles.flowerName}>{flower.name}</span>
                </button>
              ))}
            </div>
          </aside>

          {/* 右侧花卉详情 */}
          <main style={styles.contentArea}>
            {selectedFlower && (
              <div style={styles.flowerCard}>
                {/* 花卉大图 */}
                <div 
                  style={styles.imageContainer}
                  onClick={() => setShowImageModal(true)}
                >
                  <img
                    src={selectedFlower.image}
                    alt={selectedFlower.name}
                    style={styles.flowerImage}
                    onError={(e) => {
                      e.target.src = `https://via.placeholder.com/800x500/${selectedFlower.color.substring(1)}/FFFFFF?text=${encodeURIComponent(selectedFlower.name)}`;
                    }}
                  />
                  <div style={styles.imageOverlay}>
                    <h2 style={styles.flowerTitle}>{selectedFlower.name}</h2>
                    <div style={styles.flowerTags}>
                      <span style={{ ...styles.tag, backgroundColor: selectedFlower.color }}>
                        {selectedFlower.colorCategory}
                      </span>
                      <span style={styles.tag}>{selectedFlower.season}</span>
                      <span style={{...styles.tag, backgroundColor: selectedFlower.status === 'active' ? colors.successBg : colors.warningBg, color: selectedFlower.status === 'active' ? colors.success : colors.warning}}>
                        {selectedFlower.status === 'active' ? '在售' : '下架'}
                      </span>
                    </div>
                  </div>
                  <div style={styles.imageTip}>点击图片放大预览</div>
                </div>

                {/* 基础信息 */}
                <div style={styles.infoGrid}>
                  <div style={styles.infoCard}>
                    <LinearIcons.flower style={styles.infoIcon} />
                    <div>
                      <span style={styles.infoLabel}>中文名</span>
                      <span style={styles.infoValue}>{selectedFlower.name}</span>
                    </div>
                  </div>
                  <div style={styles.infoCard}>
                    <LinearIcons.file style={styles.infoIcon} />
                    <div>
                      <span style={styles.infoLabel}>学名</span>
                      <span style={styles.infoValue}>{selectedFlower.scientificName || '暂无'}</span>
                    </div>
                  </div>
                  <div style={styles.infoCard}>
                    <LinearIcons.barChart style={styles.infoIcon} />
                    <div>
                      <span style={styles.infoLabel}>分类</span>
                      <span style={styles.infoValue}>{selectedFlower.category || '暂无'}</span>
                    </div>
                  </div>
                  <div style={styles.infoCard}>
                    <LinearIcons.calendar style={styles.infoIcon} />
                    <div>
                      <span style={styles.infoLabel}>花期</span>
                      <span style={styles.infoValue}>{selectedFlower.bloomPeriod}</span>
                    </div>
                  </div>
                  <div style={styles.infoCard}>
                    <LinearIcons.dollar style={styles.infoIcon} />
                    <div>
                      <span style={styles.infoLabel}>单只价格</span>
                      <span style={styles.infoValue}>{selectedFlower.price ? `¥${selectedFlower.price}` : '暂无'}</span>
                    </div>
                  </div>
                </div>

                {/* 花语部分 */}
                <div style={styles.section}>
                  <h3 style={styles.sectionTitle}>💝 花语含义</h3>
                  <div style={styles.meaningCard}>
                    <div style={styles.mainMeaning}>
                      <span style={styles.meaningLabel}>通用花语</span>
                      <p style={styles.meaningValue}>{selectedFlower.meaning}</p>
                    </div>
                    {selectedFlower.colorMeanings && (
                      <div style={styles.colorMeanings}>
                        <span style={styles.meaningLabel}>不同颜色寓意</span>
                        <div style={styles.colorMeaningList}>
                          {selectedFlower.colorMeanings.map((item, index) => (
                            <div key={index} style={styles.colorMeaningItem}>
                              <span style={{ ...styles.colorBadge, backgroundColor: item.color }}></span>
                              <span style={styles.colorName}>{item.colorName}</span>
                              <span style={styles.colorMeaning}>{item.meaning}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* 花的故事 */}
                <div style={styles.section}>
                  <h3 style={styles.sectionTitle}>📖 花卉故事</h3>
                  <div style={styles.storyCard}>
                    {selectedFlower.origin && (
                      <div style={styles.originInfo}>
                        <span style={styles.originLabel}>起源：</span>
                        <span style={styles.originValue}>{selectedFlower.origin}</span>
                      </div>
                    )}
                    <p style={styles.storyText}>{selectedFlower.story || selectedFlower.description}</p>
                  </div>
                </div>

                {/* 养护说明 */}
                {selectedFlower.care && (
                  <div style={styles.section}>
                    <h3 style={styles.sectionTitle}>🌱 养护说明</h3>
                    <div style={styles.careCard}>
                      <div style={styles.careList}>
                        {selectedFlower.care.map((item, index) => (
                          <div key={index} style={styles.careItem}>
                            <LinearIcons.check style={{ ...styles.careIcon, color: colors.success }} />
                            <span style={styles.careText}>{item}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* 用途场景 */}
                {selectedFlower.uses && (
                  <div style={styles.section}>
                    <h3 style={styles.sectionTitle}>🎁 常见用途</h3>
                    <div style={styles.usesCard}>
                      <div style={styles.usesTags}>
                        {selectedFlower.uses.map((use, index) => (
                          <span key={index} style={styles.useTag}>{use}</span>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* 生长习性 */}
                <div style={styles.section}>
                  <h3 style={styles.sectionTitle}>🌿 生长习性</h3>
                  <div style={styles.habitatCard}>
                    <p style={styles.habitatText}>{selectedFlower.habitat}</p>
                  </div>
                </div>
              </div>
            )}
          </main>
        </div>

        {/* 图片放大预览模态框 */}
        {showImageModal && (
          <div style={styles.modalOverlay} onClick={() => setShowImageModal(false)}>
            <div style={styles.modalContent} onClick={(e) => e.stopPropagation()}>
              <button style={styles.closeBtn} onClick={() => setShowImageModal(false)}>
                <LinearIcons.x style={{ width: '20px', height: '20px' }} />
              </button>
              <img
                src={selectedFlower.image}
                alt={selectedFlower.name}
                style={styles.modalImage}
              />
              <div style={styles.modalCaption}>{selectedFlower.name}</div>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
}

const flowersData = [
  {
    id: 1,
    name: '玫瑰',
    scientificName: 'Rosa rugosa',
    category: '蔷薇科',
    season: '四季',
    color: '#e74c3c',
    colorCategory: '红色系',
    bloomPeriod: '四季开花',
    habitat: '喜阳光充足，耐寒耐旱，适宜疏松肥沃的土壤',
    meaning: '爱情、浪漫、美丽',
    price: 8.8,
    origin: '中国是玫瑰的原产地之一，有着悠久的栽培历史',
    story: '玫瑰被誉为"花中皇后"，在古希腊神话中，玫瑰是爱与美的女神阿芙洛狄忒的象征。在中国传统文化中，玫瑰也有着重要的地位，常被用于表达爱情和美好祝愿。红玫瑰更是成为情人节最受欢迎的礼物。',
    image: 'https://bpic.588ku.com/back_list_pic/20/08/04/d3062373fb097200f4515a268ce7ef84.jpg',
    status: 'active',
    colorMeanings: [
      { color: '#e74c3c', colorName: '红色', meaning: '热恋、热情' },
      { color: '#ff6b9d', colorName: '粉色', meaning: '温柔、初恋' },
      { color: '#ffffff', colorName: '白色', meaning: '纯洁、尊敬' },
      { color: '#f1c40f', colorName: '黄色', meaning: '友谊、祝福' },
    ],
    care: [
      '光照：每天至少6小时阳光',
      '浇水：保持土壤微湿，避免积水',
      '施肥：生长期每两周施一次肥',
      '修剪：及时修剪残花和病枝',
    ],
    uses: ['情人节礼物', '婚礼装饰', '香水原料', '花茶制作'],
  },
  {
    id: 2,
    name: '牡丹',
    scientificName: 'Paeonia suffruticosa',
    category: '毛茛科',
    season: '春季',
    color: '#f39c12',
    colorCategory: '黄色系',
    bloomPeriod: '4-5月',
    habitat: '喜温暖凉爽，忌高温高湿，适宜肥沃排水良好的土壤',
    meaning: '富贵、吉祥、繁荣',
    price: 25.0,
    origin: '中国原产，栽培历史超过1500年',
    story: '牡丹被誉为"花中之王"，是中国传统名花。在唐代，牡丹尤为盛行，长安城中牡丹盛开时万人空巷。牡丹象征着富贵荣华，常出现在宫廷绘画和诗词中。洛阳牡丹更是闻名天下。',
    image: 'https://i01piccdn.sogoucdn.com/476d18a0702679e6',
    status: 'active',
    colorMeanings: [
      { color: '#f39c12', colorName: '黄色', meaning: '高贵、典雅' },
      { color: '#ff6b9d', colorName: '粉色', meaning: '柔美、浪漫' },
      { color: '#ffffff', colorName: '白色', meaning: '纯洁、无瑕' },
      { color: '#9b59b6', colorName: '紫色', meaning: '神秘、高贵' },
    ],
    care: [
      '光照：充足阳光，夏季适当遮阴',
      '浇水：忌积水，保持土壤湿润',
      '施肥：春季发芽前和花后施肥',
      '越冬：耐寒，北方可露地越冬',
    ],
    uses: ['庭院观赏', '切花装饰', '药用', '文化象征'],
  },
  {
    id: 3,
    name: '菊花',
    scientificName: 'Chrysanthemum',
    category: '菊科',
    season: '秋季',
    color: '#f1c40f',
    colorCategory: '黄色系',
    bloomPeriod: '9-11月',
    habitat: '喜凉爽气候，耐寒性强，忌积水',
    meaning: '高洁、坚贞、长寿',
    price: 5.5,
    origin: '中国原产，已有3000多年栽培历史',
    story: '菊花在中国文化中有着特殊地位，是花中四君子之一。陶渊明"采菊东篱下，悠然见南山"的诗句让菊花成为隐逸和高洁的象征。菊花也是重阳节的象征花卉。',
    image: 'https://bpic.588ku.com/back_list_pic/20/11/05/3b176f9911dd82ea9058e4f21e8923d8.jpg',
    status: 'active',
    colorMeanings: [
      { color: '#f1c40f', colorName: '黄色', meaning: '高贵、长寿' },
      { color: '#e74c3c', colorName: '红色', meaning: '热情、喜庆' },
      { color: '#ffffff', colorName: '白色', meaning: '纯洁、哀悼' },
      { color: '#3498db', colorName: '蓝色', meaning: '清新、宁静' },
    ],
    care: [
      '光照：充足阳光，每天至少6小时',
      '浇水：见干见湿，忌积水',
      '施肥：生长期薄肥勤施',
      '修剪：及时摘除残花',
    ],
    uses: ['观赏', '泡茶', '药用', '重阳节装饰'],
  },
  {
    id: 4,
    name: '兰花',
    scientificName: 'Orchidaceae',
    category: '兰科',
    season: '四季',
    color: '#9b59b6',
    colorCategory: '紫色系',
    bloomPeriod: '依品种而定',
    habitat: '喜半阴环境，忌强光直射，喜湿润空气',
    meaning: '高雅、典雅、高洁',
    price: 38.0,
    origin: '中国是兰花的重要原产地',
    story: '兰花是花中四君子之一，在中国文化中象征着高洁典雅。孔子曾说"芝兰生于深林，不以无人而不芳"，表达了兰花的君子品格。兰花的香气清幽，被誉为"香祖"。',
    image: 'https://img95.699pic.com/photo/60073/7987.jpg_wh860.jpg',
    status: 'inactive',
    colorMeanings: [
      { color: '#9b59b6', colorName: '紫色', meaning: '高贵、神秘' },
      { color: '#3498db', colorName: '蓝色', meaning: '清新、宁静' },
      { color: '#ffffff', colorName: '白色', meaning: '纯洁、高雅' },
    ],
    care: [
      '光照：散射光，避免阳光直射',
      '浇水：保持湿润，忌积水',
      '施肥：薄肥勤施，忌浓肥',
      '通风：保持良好通风',
    ],
    uses: ['室内观赏', '花艺装饰', '香料', '药用'],
  },
  {
    id: 5,
    name: '梅花',
    scientificName: 'Prunus mume',
    category: '蔷薇科',
    season: '冬季',
    color: '#ff6b9d',
    colorCategory: '粉色系',
    bloomPeriod: '1-3月',
    habitat: '喜阳光充足，耐寒性强，耐旱',
    meaning: '坚韧、不屈、高洁',
    price: 12.0,
    origin: '中国原产，栽培历史悠久',
    story: '梅花是花中四君子之一，以其傲雪凌霜的品格著称。王安石"墙角数枝梅，凌寒独自开"的诗句生动描绘了梅花的坚韧。梅花也是中国传统文化中坚韧不拔精神的象征。',
    image: 'https://imgs.699pic.com/images/600/618/300.jpg!detail.v1',
    status: 'active',
    colorMeanings: [
      { color: '#ff6b9d', colorName: '粉色', meaning: '柔美、坚韧' },
      { color: '#ffffff', colorName: '白色', meaning: '纯洁、高雅' },
      { color: '#e74c3c', colorName: '红色', meaning: '热情、喜庆' },
    ],
    care: [
      '光照：充足阳光',
      '浇水：耐旱，忌积水',
      '施肥：秋季施基肥',
      '修剪：花后修剪',
    ],
    uses: ['庭院观赏', '盆景制作', '切花', '蜜源植物'],
  },
  {
    id: 6,
    name: '荷花',
    scientificName: 'Nelumbo nucifera',
    category: '莲科',
    season: '夏季',
    color: '#ffffff',
    colorCategory: '白色系',
    bloomPeriod: '6-9月',
    habitat: '水生植物，喜温暖湿润，需要充足阳光',
    meaning: '纯洁、正直、高雅',
    price: 15.0,
    origin: '中国原产，有着悠久的栽培历史',
    story: '荷花出淤泥而不染，在中国文化中象征着纯洁和正直。佛教中，荷花是重要的象征物，代表着觉悟和超脱。周敦颐的《爱莲说》更是将荷花的品格推崇到极致。',
    image: 'https://bpic.588ku.com/video_listen/588ku_pic/23/07/01/b636c9069ce6547cfd43e5bd8957ed31.jpg',
    status: 'active',
    colorMeanings: [
      { color: '#ffffff', colorName: '白色', meaning: '纯洁、无瑕' },
      { color: '#ff6b9d', colorName: '粉色', meaning: '柔美、浪漫' },
      { color: '#e74c3c', colorName: '红色', meaning: '热情、吉祥' },
    ],
    care: [
      '光照：充足阳光，每天至少6小时',
      '水质：保持清洁，定期换水',
      '施肥：生长期适当施肥',
      '越冬：北方需保护越冬',
    ],
    uses: ['观赏', '食用（莲子、莲藕）', '药用', '净化水质'],
  },
  {
    id: 7,
    name: '桂花',
    scientificName: 'Osmanthus fragrans',
    category: '木犀科',
    season: '秋季',
    color: '#f1c40f',
    colorCategory: '黄色系',
    bloomPeriod: '9-10月',
    habitat: '喜温暖湿润，喜光，适应性强',
    meaning: '吉祥、美好、团圆',
    price: 18.0,
    origin: '中国原产，栽培历史悠久',
    story: '桂花以其浓郁的香气著称，在中国文化中象征着吉祥和美好。中秋节赏桂是传统习俗，桂花也是制作桂花糕、桂花酒的重要原料。月中的桂树传说更是增添了桂花的神秘色彩。',
    image: 'https://bpic.588ku.com/photo_water_img/24/03/20/338d0b16b3ab9c1b558b409b5189cef3.jpg',
    status: 'active',
    colorMeanings: [
      { color: '#f1c40f', colorName: '金色', meaning: '富贵、吉祥' },
      { color: '#ff6b9d', colorName: '橙色', meaning: '温暖、热情' },
      { color: '#ffffff', colorName: '白色', meaning: '纯洁、高雅' },
    ],
    care: [
      '光照：充足阳光',
      '浇水：保持湿润，忌积水',
      '施肥：春季施氮肥，秋季施磷钾肥',
      '修剪：花后修剪',
    ],
    uses: ['观赏', '桂花糕', '桂花酒', '香料'],
  },
  {
    id: 8,
    name: '郁金香',
    scientificName: 'Tulipa',
    category: '百合科',
    season: '春季',
    color: '#e74c3c',
    colorCategory: '混合色系',
    bloomPeriod: '3-5月',
    habitat: '喜凉爽气候，耐寒性强，需要充足阳光',
    meaning: '完美的爱情、优雅',
    price: 6.5,
    origin: '原产于土耳其，后传入欧洲',
    story: '郁金香最初在土耳其被栽培，后来传入荷兰并成为国花。在17世纪的荷兰，郁金香曾引发疯狂的投机热潮，史称"郁金香泡沫"。如今，郁金香是世界著名的球根花卉，象征着完美的爱情。',
    image: 'https://i03piccdn.sogoucdn.com/a0aa88ef24860d18',
    status: 'inactive',
    colorMeanings: [
      { color: '#e74c3c', colorName: '红色', meaning: '热烈的爱情' },
      { color: '#3498db', colorName: '蓝色', meaning: '永恒的爱情' },
      { color: '#ffffff', colorName: '白色', meaning: '纯洁、神圣' },
      { color: '#f1c40f', colorName: '黄色', meaning: '阳光、开朗' },
    ],
    care: [
      '光照：充足阳光',
      '浇水：生长期保持湿润，花后逐渐减少',
      '施肥：种植前施基肥',
      '休眠：夏季休眠，需凉爽干燥',
    ],
    uses: ['切花', '花园观赏', '春季花坛'],
  },
  {
    id: 9,
    name: '月季',
    scientificName: 'Rosa chinensis',
    category: '蔷薇科',
    season: '四季',
    color: '#ff6b9d',
    colorCategory: '粉色系',
    bloomPeriod: '四季开花',
    habitat: '喜阳光充足，耐寒耐旱，适应性强',
    meaning: '幸福、美好、热情',
    price: 9.9,
    origin: '中国是月季的原产地之一',
    story: '月季被誉为"花中皇后"，是中国十大名花之一。月季花期长，品种繁多，色彩丰富，是世界上品种最多的花卉之一。在中国传统文化中，月季象征着幸福和美好的生活。',
    image: 'https://ts1.tc.mm.bing.net/th/id/R-C.dfdb99098864113b20e2f9249050fd01?rik=J90zIfm3ArCQWw&riu=http%3a%2f%2fn.sinaimg.cn%2fsinacn08%2f213%2fw2048h1365%2f20180809%2f219b-hhnunsp7301738.jpg&ehk=EZxaUMANbAfAiTOLhJv%2f%2bqZubmZvdMPrWr8DC14bbog%3d&risl=&pid=ImgRaw&r=0',
    status: 'active',
    colorMeanings: [
      { color: '#ff6b9d', colorName: '粉色', meaning: '幸福、甜美' },
      { color: '#e74c3c', colorName: '红色', meaning: '热情、炽爱' },
      { color: '#f1c40f', colorName: '黄色', meaning: '青春、活力' },
      { color: '#ffffff', colorName: '白色', meaning: '纯洁、崇敬' },
    ],
    care: [
      '光照：每天至少6小时阳光',
      '浇水：保持土壤湿润，避免积水',
      '施肥：生长期定期施肥',
      '修剪：及时剪除残花',
    ],
    uses: ['庭院观赏', '切花', '花坛装饰', '盆栽'],
  },
  {
    id: 10,
    name: '杜鹃',
    scientificName: 'Rhododendron simsii',
    category: '杜鹃花科',
    season: '春季',
    color: '#e74c3c',
    colorCategory: '红色系',
    bloomPeriod: '4-6月',
    habitat: '喜凉爽湿润、半阴环境',
    meaning: '繁荣、吉祥、思乡',
    price: 22.0,
    origin: '中国原产，品种丰富',
    story: '杜鹃花是中国十大名花之一，被誉为"花中西施"。杜鹃花品种繁多，色彩艳丽，春季盛开时漫山遍野，蔚为壮观。杜鹃花也象征着对远方亲人的思念，典故"杜鹃啼血"流传至今。',
    image: 'https://tgi12.jia.com/114/936/14936926.jpg',
    status: 'active',
    colorMeanings: [
      { color: '#e74c3c', colorName: '红色', meaning: '繁荣、热烈' },
      { color: '#ff6b9d', colorName: '粉色', meaning: '浪漫、温柔' },
      { color: '#9b59b6', colorName: '紫色', meaning: '神秘、高贵' },
      { color: '#ffffff', colorName: '白色', meaning: '纯洁、清雅' },
    ],
    care: [
      '光照：散射光，避免强光直射',
      '浇水：保持湿润，喜酸性土壤',
      '施肥：薄肥勤施，忌浓肥',
      '环境：喜凉爽通风',
    ],
    uses: ['庭院观赏', '盆景', '切花', '绿化'],
  },
  {
    id: 11,
    name: '山茶',
    scientificName: 'Camellia japonica',
    category: '山茶科',
    season: '冬季',
    color: '#e74c3c',
    colorCategory: '红色系',
    bloomPeriod: '1-4月',
    habitat: '喜半阴湿润环境，忌强光',
    meaning: '理想的爱、谦逊、谨慎',
    price: 28.0,
    origin: '中国原产，主要分布在南方',
    story: '山茶花是中国传统名花，也是世界名贵花木之一。山茶花花朵硕大，色彩艳丽，花期长达数月，深受人们喜爱。山茶花象征着理想的爱和谦逊的美德。',
    image: 'https://i03piccdn.sogoucdn.com/ab50f67fcd4dabd7',
    status: 'active',
    colorMeanings: [
      { color: '#e74c3c', colorName: '红色', meaning: '理想的爱' },
      { color: '#ff6b9d', colorName: '粉色', meaning: '谦逊、美德' },
      { color: '#ffffff', colorName: '白色', meaning: '纯真、谨慎' },
    ],
    care: [
      '光照：散射光，夏季遮阴',
      '浇水：保持湿润，喜酸性土壤',
      '施肥：花前花后施肥',
      '环境：通风良好，忌闷热',
    ],
    uses: ['庭院观赏', '盆景', '切花', '绿化'],
  },
  {
    id: 12,
    name: '百合',
    scientificName: 'Lilium brownii',
    category: '百合科',
    season: '夏季',
    color: '#ffffff',
    colorCategory: '白色系',
    bloomPeriod: '6-7月',
    habitat: '喜凉爽湿润、半阴环境',
    meaning: '纯洁、神圣、百年好合',
    price: 10.0,
    origin: '中国原产，品种众多',
    story: '百合花象征着纯洁和神圣，在西方常用于宗教仪式。在中国，百合寓意"百年好合"，是婚礼上的常见花卉。百合花型优雅，香气清新，深受人们喜爱。',
    image: 'https://imgs.699pic.com/images/600/748/962.jpg!detail.v1',
    status: 'active',
    colorMeanings: [
      { color: '#ffffff', colorName: '白色', meaning: '纯洁、神圣' },
      { color: '#ff6b9d', colorName: '粉色', meaning: '甜美、浪漫' },
      { color: '#f1c40f', colorName: '黄色', meaning: '财富、高贵' },
    ],
    care: [
      '光照：充足散射光',
      '浇水：保持湿润，忌积水',
      '施肥：花前施肥',
      '种植：球根秋季种植',
    ],
    uses: ['切花', '婚礼用花', '盆花', '食用药用'],
  },
  {
    id: 13,
    name: '向日葵',
    scientificName: 'Helianthus annuus',
    category: '菊科',
    season: '夏季',
    color: '#f1c40f',
    colorCategory: '黄色系',
    bloomPeriod: '7-9月',
    habitat: '喜阳光充足，耐旱',
    meaning: '忠诚、阳光、信念',
    price: 6.0,
    origin: '北美洲原产，现全球种植',
    story: '向日葵因其花盘始终朝向太阳而得名，象征着忠诚和阳光的信念。向日葵花盘硕大，色彩明亮，给人以积极向上的力量。梵高的著名画作《向日葵》更是让这种花闻名世界。',
    image: 'https://i02piccdn.sogoucdn.com/cc74df8ec89936a0',
    status: 'active',
    colorMeanings: [
      { color: '#f1c40f', colorName: '黄色', meaning: '阳光、活力' },
      { color: '#ff6b3d', colorName: '橙黄', meaning: '热情、温暖' },
    ],
    care: [
      '光照：充足阳光',
      '浇水：耐旱，适量浇水',
      '施肥：生长期适当施肥',
      '支撑：高大品种需要支撑',
    ],
    uses: ['切花', '观赏', '榨油', '食用'],
  },
  {
    id: 14,
    name: '薰衣草',
    scientificName: 'Lavandula angustifolia',
    category: '唇形科',
    season: '夏季',
    color: '#9b59b6',
    colorCategory: '紫色系',
    bloomPeriod: '6-8月',
    habitat: '喜阳光充足，耐旱',
    meaning: '等待爱情、宁静、纯洁',
    price: 7.5,
    origin: '地中海地区原产',
    story: '薰衣草以其独特的芳香闻名于世，被誉为"宁静的香水植物"。在法国普罗旺斯，薰衣草花海是著名的旅游景观。薰衣草象征着浪漫的爱情和宁静的心境。',
    image: 'https://i02piccdn.sogoucdn.com/c7e8e27efd84fbe5',
    status: 'active',
    colorMeanings: [
      { color: '#9b59b6', colorName: '紫色', meaning: '等待爱情' },
      { color: '#3498db', colorName: '蓝色', meaning: '宁静、平和' },
    ],
    care: [
      '光照：充足阳光',
      '浇水：耐旱，少浇水',
      '土壤：疏松排水良好',
      '修剪：花后修剪',
    ],
    uses: ['精油提炼', '香薰', '干花', '观赏'],
  },
  {
    id: 15,
    name: '樱花',
    scientificName: 'Prunus serrulata',
    category: '蔷薇科',
    season: '春季',
    color: '#ff6b9d',
    colorCategory: '粉色系',
    bloomPeriod: '3-4月',
    habitat: '喜阳光充足，耐寒',
    meaning: '浪漫、短暂、纯洁',
    price: 15.0,
    origin: '中国原产，后传至日本',
    story: '樱花花期短暂，绚烂而美丽，象征着生命的珍贵和瞬间的美好。在日本，樱花是国花，每年春季赏樱是重要的文化活动。樱花的美丽和易逝引发了人们对美好时光的珍惜。',
    image: 'https://i04piccdn.sogoucdn.com/c827ae676ba55e3b',
    status: 'active',
    colorMeanings: [
      { color: '#ff6b9d', colorName: '粉色', meaning: '浪漫、甜美' },
      { color: '#ffffff', colorName: '白色', meaning: '纯洁、优雅' },
    ],
    care: [
      '光照：充足阳光',
      '浇水：保持湿润',
      '施肥：春秋季施肥',
      '修剪：花后修剪',
    ],
    uses: ['观赏', '切花', '庭院绿化', '文化象征'],
  },
  {
    id: 16,
    name: '水仙',
    scientificName: 'Narcissus tazetta',
    category: '石蒜科',
    season: '冬季',
    color: '#ffffff',
    colorCategory: '白色系',
    bloomPeriod: '1-3月',
    habitat: '喜凉爽湿润，耐寒',
    meaning: '纯洁、吉祥、自恋',
    price: 4.5,
    origin: '中国原产，栽培历史悠久',
    story: '水仙花在中国有着悠久的栽培历史，是中国传统名花之一。水仙花型优雅，香气清幽，是冬季少花季节的重要观赏花卉。希腊神话中纳西索斯化身为水仙的故事也流传至今。',
    image: 'https://i02piccdn.sogoucdn.com/484eb0b7660a1e85',
    status: 'active',
    colorMeanings: [
      { color: '#ffffff', colorName: '白色', meaning: '纯洁、吉祥' },
      { color: '#f1c40f', colorName: '黄色', meaning: '富贵、温暖' },
    ],
    care: [
      '光照：充足阳光',
      '浇水：水养定期换水',
      '温度：喜凉爽',
      '休眠：夏季休眠',
    ],
    uses: ['水养观赏', '庭院种植', '盆花', '春节装饰'],
  },
  {
    id: 17,
    name: '茉莉',
    scientificName: 'Jasminum sambac',
    category: '木犀科',
    season: '夏季',
    color: '#ffffff',
    colorCategory: '白色系',
    bloomPeriod: '5-10月',
    habitat: '喜温暖湿润、半阴环境',
    meaning: '忠贞、尊敬、纯洁',
    price: 8.0,
    origin: '亚洲南部原产',
    story: '茉莉花香气浓郁，被誉为"花中之王"。茉莉花象征着忠贞不渝的爱情，在菲律宾、印尼等国家是国花。茉莉花茶更是中国茶文化中的重要组成部分。',
    image: 'https://i01piccdn.sogoucdn.com/53b21aa5a976a9fa',
    status: 'active',
    colorMeanings: [
      { color: '#ffffff', colorName: '白色', meaning: '忠贞、纯洁' },
    ],
    care: [
      '光照：充足阳光',
      '浇水：保持湿润',
      '施肥：生长期定期施肥',
      '修剪：花后修剪',
    ],
    uses: ['茉莉花茶', '香水', '观赏', '药用'],
  },
  {
    id: 18,
    name: '康乃馨',
    scientificName: 'Dianthus caryophyllus',
    category: '石竹科',
    season: '四季',
    color: '#ff6b9d',
    colorCategory: '粉色系',
    bloomPeriod: '四季开花',
    habitat: '喜阳光充足，凉爽气候',
    meaning: '母爱、祝福、热情',
    price: 3.5,
    origin: '地中海地区原产',
    story: '康乃馨是母亲节的象征花卉，代表着母爱和感恩。康乃馨花型优美，花期长，是世界著名的切花之一。不同颜色的康乃馨寓意也不同，粉色象征母爱，红色象征爱和感激。',
    image: 'https://i01piccdn.sogoucdn.com/e27a663706c1e0f5',
    status: 'active',
    colorMeanings: [
      { color: '#ff6b9d', colorName: '粉色', meaning: '母爱、祝福' },
      { color: '#e74c3c', colorName: '红色', meaning: '爱、感激' },
      { color: '#ffffff', colorName: '白色', meaning: '纯洁、思念' },
      { color: '#f1c40f', colorName: '黄色', meaning: '友谊、感谢' },
    ],
    care: [
      '光照：充足阳光',
      '浇水：保持湿润',
      '施肥：薄肥勤施',
      '修剪：及时剪除残花',
    ],
    uses: ['母亲节礼物', '切花', '婚礼用花', '盆花'],
  },
  {
    id: 19,
    name: '鸢尾',
    scientificName: 'Iris tectorum',
    category: '鸢尾科',
    season: '春季',
    color: '#3498db',
    colorCategory: '蓝色系',
    bloomPeriod: '4-6月',
    habitat: '喜阳光充足，耐寒',
    meaning: '信仰、希望、智慧',
    price: 11.0,
    origin: '中国原产，栽培历史悠久',
    story: '鸢尾花因花瓣形似鸢鸟的尾巴而得名。在希腊神话中，鸢尾是彩虹女神的象征。鸢尾花型独特，色彩淡雅，是世界著名的观赏花卉。法国国王路易七世将鸢尾作为王室的标志。',
    image: 'https://i02piccdn.sogoucdn.com/7e30b68e927629de',
    status: 'active',
    colorMeanings: [
      { color: '#3498db', colorName: '蓝色', meaning: '信仰、希望' },
      { color: '#9b59b6', colorName: '紫色', meaning: '智慧、高贵' },
      { color: '#ffffff', colorName: '白色', meaning: '纯洁、纯真' },
    ],
    care: [
      '光照：充足阳光',
      '浇水：保持湿润',
      '土壤：疏松排水良好',
      '施肥：春季施肥',
    ],
    uses: ['庭院观赏', '切花', '水边绿化', '药用'],
  },
  {
    id: 20,
    name: '紫罗兰',
    scientificName: 'Matthiola incana',
    category: '十字花科',
    season: '春季',
    color: '#9b59b6',
    colorCategory: '紫色系',
    bloomPeriod: '4-5月',
    habitat: '喜凉爽气候，忌酷热',
    meaning: '永恒的美、质朴、纯真',
    price: 5.0,
    origin: '地中海地区原产',
    story: '紫罗兰花朵密集，色彩淡雅，香气清甜。紫罗兰象征着永恒的美和质朴的爱，是欧洲传统的名花之一。在古希腊神话中，紫罗兰是女神维纳斯的象征花卉。',
    image: 'https://i04piccdn.sogoucdn.com/e9f38571990e7ed2',
    status: 'active',
    colorMeanings: [
      { color: '#9b59b6', colorName: '紫色', meaning: '永恒的美' },
      { color: '#ff6b9d', colorName: '粉色', meaning: '质朴、纯真' },
      { color: '#ffffff', colorName: '白色', meaning: '纯洁、善良' },
    ],
    care: [
      '光照：充足阳光',
      '浇水：保持湿润，忌积水',
      '温度：喜凉爽，忌高温',
      '通风：保持良好通风',
    ],
    uses: ['切花', '盆花', '花坛装饰', '庭院观赏'],
  },
];

function getStyles(colors, isDark) {
  return {
    container: {
      minHeight: '100vh',
      background: colors.background,
      padding: '20px',
      fontFamily: '"PingFang SC", "Microsoft YaHei", sans-serif',
    },
    header: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: '24px',
    },
    titleSection: {
      display: 'flex',
      alignItems: 'center',
      gap: '12px',
    },
    logo: {
      fontSize: '32px',
    },
    title: {
      fontSize: '24px',
      fontWeight: '600',
      color: colors.text,
      margin: 0,
    },
    searchSection: {
      display: 'flex',
      alignItems: 'center',
      background: colors.surface,
      border: `1px solid ${colors.border}`,
      borderRadius: '8px',
      padding: '8px 16px',
      minWidth: '280px',
    },
    searchIcon: {
      width: '16px',
      height: '16px',
      color: colors.textMuted,
      marginRight: '8px',
    },
    searchInput: {
      flex: 1,
      background: 'transparent',
      border: 'none',
      outline: 'none',
      color: colors.text,
      fontSize: '14px',
    },
    mainContent: {
      display: 'flex',
      gap: '24px',
      height: 'calc(100vh - 120px)',
    },
    sidebar: {
      width: '220px',
      background: colors.surface,
      borderRadius: '12px',
      padding: '16px',
      overflow: 'auto',
      border: `1px solid ${colors.border}`,
    },
    sidebarTitle: {
      fontSize: '14px',
      fontWeight: '600',
      color: colors.text,
      margin: '0 0 16px 0',
      paddingBottom: '12px',
      borderBottom: `1px solid ${colors.border}`,
    },
    flowerList: {
      display: 'flex',
      flexDirection: 'column',
      gap: '4px',
    },
    flowerItem: {
      display: 'flex',
      alignItems: 'center',
      gap: '10px',
      padding: '10px 12px',
      borderRadius: '8px',
      cursor: 'pointer',
      transition: 'all 0.2s',
      borderLeft: '3px solid transparent',
      background: 'transparent',
      border: 'none',
      textAlign: 'left',
    },
    activeFlowerItem: {
      background: colors.primaryBg,
    },
    flowerColorDot: {
      width: '8px',
      height: '8px',
      borderRadius: '50%',
    },
    flowerName: {
      fontSize: '14px',
      color: colors.text,
    },
    contentArea: {
      flex: 1,
      overflow: 'auto',
    },
    flowerCard: {
      background: colors.surface,
      borderRadius: '12px',
      overflow: 'hidden',
      border: `1px solid ${colors.border}`,
    },
    imageContainer: {
      position: 'relative',
      height: '350px',
      cursor: 'zoom-in',
    },
    flowerImage: {
      width: '100%',
      height: '100%',
      objectFit: 'cover',
    },
    imageOverlay: {
      position: 'absolute',
      bottom: 0,
      left: 0,
      right: 0,
      background: 'linear-gradient(transparent, rgba(0,0,0,0.7))',
      padding: '30px 24px',
    },
    flowerTitle: {
      fontSize: '28px',
      fontWeight: '700',
      color: '#fff',
      margin: '0 0 12px 0',
    },
    flowerTags: {
      display: 'flex',
      gap: '8px',
    },
    tag: {
      padding: '4px 12px',
      borderRadius: '20px',
      fontSize: '12px',
      color: '#fff',
      fontWeight: '500',
    },
    imageTip: {
      position: 'absolute',
      top: '12px',
      right: '12px',
      background: 'rgba(0,0,0,0.5)',
      color: '#fff',
      padding: '6px 12px',
      borderRadius: '4px',
      fontSize: '12px',
    },
    infoGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(5, 1fr)',
      gap: '16px',
      padding: '20px',
      borderBottom: `1px solid ${colors.border}`,
    },
    infoCard: {
      display: 'flex',
      alignItems: 'center',
      gap: '10px',
      padding: '12px',
      background: colors.background,
      borderRadius: '8px',
    },
    infoIcon: {
      width: '20px',
      height: '20px',
      color: colors.primary,
    },
    infoLabel: {
      display: 'block',
      fontSize: '12px',
      color: colors.textMuted,
      marginBottom: '4px',
    },
    infoValue: {
      fontSize: '14px',
      color: colors.text,
      fontWeight: '500',
    },
    section: {
      padding: '20px',
      borderBottom: `1px solid ${colors.border}`,
    },
    sectionTitle: {
      fontSize: '18px',
      fontWeight: '600',
      color: colors.text,
      margin: '0 0 16px 0',
    },
    meaningCard: {
      background: colors.background,
      borderRadius: '8px',
      padding: '16px',
    },
    mainMeaning: {
      marginBottom: '16px',
    },
    meaningLabel: {
      display: 'block',
      fontSize: '12px',
      color: colors.textMuted,
      marginBottom: '8px',
    },
    meaningValue: {
      fontSize: '16px',
      color: colors.text,
      fontWeight: '500',
      margin: 0,
    },
    colorMeanings: {
      borderTop: `1px solid ${colors.border}`,
      paddingTop: '16px',
    },
    colorMeaningList: {
      display: 'grid',
      gridTemplateColumns: 'repeat(2, 1fr)',
      gap: '12px',
    },
    colorMeaningItem: {
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
    },
    colorBadge: {
      width: '12px',
      height: '12px',
      borderRadius: '50%',
    },
    colorName: {
      fontSize: '14px',
      color: colors.text,
      fontWeight: '500',
    },
    colorMeaning: {
      fontSize: '13px',
      color: colors.textSecondary,
    },
    storyCard: {
      background: colors.background,
      borderRadius: '8px',
      padding: '16px',
    },
    originInfo: {
      display: 'flex',
      marginBottom: '12px',
    },
    originLabel: {
      fontSize: '14px',
      color: colors.textMuted,
      fontWeight: '500',
    },
    originValue: {
      fontSize: '14px',
      color: colors.text,
    },
    storyText: {
      fontSize: '14px',
      color: colors.textSecondary,
      lineHeight: '1.8',
      margin: 0,
    },
    careCard: {
      background: colors.background,
      borderRadius: '8px',
      padding: '16px',
    },
    careList: {
      display: 'grid',
      gridTemplateColumns: 'repeat(2, 1fr)',
      gap: '10px',
    },
    careItem: {
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
    },
    careIcon: {
      width: '14px',
      height: '14px',
    },
    careText: {
      fontSize: '14px',
      color: colors.text,
    },
    usesCard: {
      background: colors.background,
      borderRadius: '8px',
      padding: '16px',
    },
    usesTags: {
      display: 'flex',
      flexWrap: 'wrap',
      gap: '8px',
    },
    useTag: {
      padding: '6px 14px',
      background: colors.primaryBg,
      color: colors.primary,
      borderRadius: '20px',
      fontSize: '13px',
      fontWeight: '500',
    },
    habitatCard: {
      background: colors.background,
      borderRadius: '8px',
      padding: '16px',
    },
    habitatText: {
      fontSize: '14px',
      color: colors.textSecondary,
      lineHeight: '1.8',
      margin: 0,
    },
    modalOverlay: {
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: 'rgba(0,0,0,0.8)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1000,
      cursor: 'zoom-out',
    },
    modalContent: {
      position: 'relative',
      maxWidth: '90vw',
      maxHeight: '90vh',
      cursor: 'default',
    },
    closeBtn: {
      position: 'absolute',
      top: '-40px',
      right: 0,
      background: 'rgba(255,255,255,0.2)',
      border: 'none',
      borderRadius: '50%',
      width: '32px',
      height: '32px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: '#fff',
      cursor: 'pointer',
      transition: 'background 0.2s',
    },
    modalImage: {
      maxWidth: '100%',
      maxHeight: '90vh',
      borderRadius: '8px',
    },
    modalCaption: {
      textAlign: 'center',
      color: '#fff',
      marginTop: '12px',
      fontSize: '16px',
      fontWeight: '500',
    },
    calendar: (props) => (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
        <line x1="16" y1="2" x2="16" y2="6" />
        <line x1="8" y1="2" x2="8" y2="6" />
        <line x1="3" y1="10" x2="21" y2="10" />
      </svg>
    ),
    x: (props) => (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <line x1="18" y1="6" x2="6" y2="18" />
        <line x1="6" y1="6" x2="18" y2="18" />
      </svg>
    ),
  };
}

export default FlowerDetailPage;
