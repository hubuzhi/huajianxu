import React from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';

function FlowerStory() {
  const navigate = useNavigate();
  const { flowerId } = useParams();
  const location = useLocation();
  const flower = location.state;

  const stories = [
    {
      id: 1,
      flower: '玫瑰',
      title: '爱与美的传说',
      content: '在古希腊神话中，玫瑰是爱与美的女神阿芙罗狄蒂的圣花。传说玫瑰原本是白色的，当阿芙罗狄蒂的爱人阿多尼斯在狩猎中受伤时，女神匆忙赶去救助，途中被玫瑰刺伤了脚，鲜血染红了白玫瑰，从此红玫瑰便成为爱情的象征。在罗马神话中，玫瑰也是爱神维纳斯的最爱。人们相信，玫瑰的花瓣能够带来爱情和幸福。',
      image: '🌹',
      origin: '古希腊神话',
      era: '公元前8世纪',
    },
    {
      id: 2,
      flower: '牡丹',
      title: '花中之王的传说',
      content: '相传武则天在冬日醉酒后，下令百花开放，唯有牡丹抗旨不开。武则天大怒，将牡丹贬至洛阳。牡丹到洛阳后反而开得更加艳丽，从此洛阳牡丹名扬天下。牡丹因此被誉为"花中之王"，象征着不畏权势、坚持自我的高贵品格。在中国传统文化中，牡丹代表着富贵吉祥、繁荣昌盛。',
      image: '🌺',
      origin: '中国民间传说',
      era: '唐代',
    },
    {
      id: 3,
      flower: '兰花',
      title: '空谷幽兰的故事',
      content: '孔子周游列国时，在幽谷中发现了一株兰花，虽无人欣赏却依然芬芳。孔子感叹道："兰生幽谷，不以无人而不芳。"从此兰花成为君子之花，象征着高洁、典雅、不求闻达的品格。屈原在《离骚》中也多次提到兰花，将其作为高尚品格的象征。兰花与梅、竹、菊并称"四君子"，是中国文人最喜爱的花卉之一。',
      image: '🌸',
      origin: '中国儒家文化',
      era: '春秋战国',
    },
    {
      id: 4,
      flower: '荷花',
      title: '出淤泥而不染',
      content: '北宋哲学家周敦颐在《爱莲说》中写道："予独爱莲之出淤泥而不染，濯清涟而不妖。"荷花生长在淤泥中，却能开出洁白的花朵，象征着纯洁、高雅、正直的品格。在佛教中，荷花是神圣的象征，代表着清净无染的佛性。佛祖释迦牟尼出生时，步步生莲，荷花因此成为佛教的圣花。',
      image: '🪷',
      origin: '中国文人文化',
      era: '北宋',
    },
    {
      id: 5,
      flower: '梅花',
      title: '岁寒三友之首',
      content: '梅花在寒冬腊月绽放，傲雪凌霜，象征着坚韧不拔的精神。相传宋代诗人林逋隐居杭州孤山，终生不娶，以梅为妻，以鹤为子，人称"梅妻鹤子"。他的诗句"疏影横斜水清浅，暗香浮动月黄昏"成为咏梅的经典。梅花与松、竹并称"岁寒三友"，代表着在逆境中坚守品格的精神。',
      image: '❄️',
      origin: '中国文人文化',
      era: '宋代',
    },
    {
      id: 6,
      flower: '菊花',
      title: '隐士之花',
      content: '东晋诗人陶渊明以爱菊闻名，他的诗句"采菊东篱下，悠然见南山"成为千古名句。陶渊明辞官归隐，以菊花为伴，菊花因此成为隐逸之花，象征着高洁、淡泊名利的品格。菊花在秋季开放，不畏霜寒，代表着坚贞不屈的精神。在中国传统文化中，菊花是长寿的象征，常用于重阳节的庆祝。',
      image: '🌼',
      origin: '中国文人文化',
      era: '东晋',
    },
  ];

  const currentStory = flower 
    ? stories.find(s => s.flower === flower.name) || stories[0]
    : stories[0];

  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <button onClick={() => navigate(-1)} style={styles.backBtn}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M19 12H5M12 19l-7-7 7-7" />
          </svg>
        </button>
        <h1 style={styles.headerTitle}>花语故事</h1>
        <div style={styles.placeholder} />
      </header>

      <div style={styles.storyCard}>
        <div style={styles.storyHeader}>
          <div style={styles.flowerIcon}>{currentStory.image}</div>
          <div style={styles.storyMeta}>
            <h2 style={styles.storyTitle}>{currentStory.flower} · {currentStory.title}</h2>
            <div style={styles.storyInfo}>
              <span style={styles.infoTag}>📖 {currentStory.origin}</span>
              <span style={styles.infoTag}>📅 {currentStory.era}</span>
            </div>
          </div>
        </div>

        <div style={styles.storyContent}>
          <p style={styles.storyText}>{currentStory.content}</p>
        </div>

        <div style={styles.storyFooter}>
          <div style={styles.meaningCard}>
            <span style={styles.meaningIcon}>💝</span>
            <div style={styles.meaningInfo}>
              <span style={styles.meaningLabel}>花语寓意</span>
              <span style={styles.meaningValue}>{flower?.meaning || '高洁典雅'}</span>
            </div>
          </div>
        </div>
      </div>

      <div style={styles.otherStories}>
        <h3 style={styles.sectionTitle}>其他花语故事</h3>
        <div style={styles.storyList}>
          {stories.filter(s => s.id !== currentStory.id).map((story) => (
            <div
              key={story.id}
              style={styles.storyItem}
              onClick={() => navigate(`/flower/story/${story.id}`, { state: { name: story.flower, meaning: '美好' } })}
            >
              <div style={styles.storyItemImage}>{story.image}</div>
              <div style={styles.storyItemInfo}>
                <h4 style={styles.storyItemTitle}>{story.flower}</h4>
                <p style={styles.storyItemSubtitle}>{story.title}</p>
              </div>
              <span style={styles.arrow}>→</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: {
    minHeight: '100vh',
    background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)',
    color: '#fff',
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '16px 20px',
    background: 'rgba(255,255,255,0.05)',
    backdropFilter: 'blur(10px)',
    borderBottom: '1px solid rgba(255,255,255,0.1)',
  },
  backBtn: {
    background: 'rgba(255,255,255,0.1)',
    border: 'none',
    borderRadius: '12px',
    padding: '10px',
    cursor: 'pointer',
    color: '#fff',
    transition: 'all 0.3s ease',
  },
  headerTitle: {
    fontSize: '20px',
    fontWeight: '600',
    margin: 0,
  },
  placeholder: {
    width: '40px',
  },
  storyCard: {
    margin: '20px',
    padding: '24px',
    background: 'linear-gradient(135deg, rgba(255,105,180,0.1) 0%, rgba(0,206,209,0.1) 100%)',
    borderRadius: '20px',
    border: '1px solid rgba(255,255,255,0.1)',
  },
  storyHeader: {
    display: 'flex',
    alignItems: 'center',
    gap: '16px',
    marginBottom: '20px',
  },
  flowerIcon: {
    width: '60px',
    height: '60px',
    borderRadius: '16px',
    background: 'linear-gradient(135deg, rgba(255,105,180,0.2) 0%, rgba(0,206,209,0.2) 100%)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '32px',
  },
  storyMeta: {
    flex: 1,
  },
  storyTitle: {
    fontSize: '18px',
    fontWeight: '600',
    margin: '0 0 8px 0',
    color: '#fff',
  },
  storyInfo: {
    display: 'flex',
    gap: '12px',
  },
  infoTag: {
    fontSize: '13px',
    color: 'rgba(255,255,255,0.6)',
    background: 'rgba(255,255,255,0.05)',
    padding: '4px 12px',
    borderRadius: '10px',
  },
  storyContent: {
    marginBottom: '20px',
  },
  storyText: {
    fontSize: '15px',
    lineHeight: '1.8',
    color: 'rgba(255,255,255,0.85)',
    margin: 0,
    textAlign: 'justify',
  },
  storyFooter: {
    paddingTop: '16px',
    borderTop: '1px solid rgba(255,255,255,0.1)',
  },
  meaningCard: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    padding: '16px',
    background: 'rgba(255,255,255,0.05)',
    borderRadius: '12px',
  },
  meaningIcon: {
    fontSize: '24px',
  },
  meaningInfo: {
    display: 'flex',
    flexDirection: 'column',
    gap: '4px',
  },
  meaningLabel: {
    fontSize: '12px',
    color: 'rgba(255,255,255,0.5)',
  },
  meaningValue: {
    fontSize: '16px',
    fontWeight: '600',
    color: '#ff69b4',
  },
  otherStories: {
    padding: '20px',
  },
  sectionTitle: {
    fontSize: '16px',
    fontWeight: '600',
    margin: '0 0 16px 0',
    color: '#fff',
  },
  storyList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
  },
  storyItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    padding: '16px',
    background: 'rgba(255,255,255,0.05)',
    borderRadius: '16px',
    border: '1px solid rgba(255,255,255,0.08)',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
  },
  storyItemImage: {
    width: '40px',
    height: '40px',
    borderRadius: '10px',
    background: 'linear-gradient(135deg, rgba(255,105,180,0.2) 0%, rgba(0,206,209,0.2) 100%)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '20px',
  },
  storyItemInfo: {
    flex: 1,
  },
  storyItemTitle: {
    fontSize: '15px',
    fontWeight: '600',
    margin: '0 0 4px 0',
    color: '#fff',
  },
  storyItemSubtitle: {
    fontSize: '13px',
    color: 'rgba(255,255,255,0.5)',
    margin: 0,
  },
  arrow: {
    fontSize: '18px',
    color: 'rgba(255,255,255,0.3)',
  },
};

export default FlowerStory;