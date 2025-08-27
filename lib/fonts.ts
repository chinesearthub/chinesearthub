export const fontPresets = [
  { 
    id: 'songti', 
    name: '宋体 (Songti)', 
    family: '"Noto Serif SC", serif',
    license: 'SIL OFL'
  },
  { 
    id: 'kaiti', 
    name: '楷体 (Kaiti)', 
    family: '"Noto Sans SC", sans-serif',
    license: 'SIL OFL'
  },
  { 
    id: 'lishu', 
    name: '隶书 (Lishu)', 
    family: 'LXGW WenKai, "Ma Shan Zheng", cursive',
    license: 'SIL OFL'
  },
  { 
    id: 'brush', 
    name: '毛笔 (Brush Calligraphy)', 
    family: 'ZCOOL XiaoWei, "Zhi Mang Xing", cursive',
    license: 'SIL OFL'
  },
];

// 名字生成逻辑 (模拟)
export async function generateNameSuggestions(input: {
  name: string;
  mode: 'translation' | 'meaning';
  desiredMeaning?: string;
}) {
  // 在实际实现中，这里会调用AI或专业翻译服务
  // 这里返回模拟数据
  
  if (input.mode === 'translation') {
    return [
      {
        id: '1',
        chinese: '爱华',
        pinyin: 'Ài Huá',
        meaning: 'Loving China/Chinese',
        style: 'songti'
      },
      {
        id: '2',
        chinese: '明华',
        pinyin: 'Míng Huá',
        meaning: 'Bright China',
        style: 'kaiti'
      },
      {
        id: '3',
        chinese: '和平',
        pinyin: 'Hé Píng',
        meaning: 'Peace',
        style: 'lishu'
      }
    ];
  } else {
    // Meaning-based mode
    const meanings = {
      love: ['爱', '情', '心'],
      peace: ['和', '平', '安'],
      freedom: ['自', '由', '飞'],
      hope: ['希', '望', '明'],
      faith: ['信', '诚', '真']
    };
    
    const base = meanings[input.desiredMeaning || 'love'] || meanings.love;
    
    return [
      {
        id: '1',
        chinese: base[0] + '华',
        pinyin: `${base[0]} Huá`,
        meaning: 'Combining character with meaning of ' + input.desiredMeaning,
        style: 'songti'
      },
      {
        id: '2',
        chinese: base[1] + '华',
        pinyin: `${base[1]} Huá`,
        meaning: 'Alternative character with meaning of ' + input.desiredMeaning,
        style: 'kaiti'
      },
      {
        id: '3',
        chinese: base[2] + '华',
        pinyin: `${base[2]} Huá`,
        meaning: 'Third option with meaning of ' + input.desiredMeaning,
        style: 'lishu'
      }
    ];
  }
}
