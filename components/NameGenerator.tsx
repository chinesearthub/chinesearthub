'use client';  // 声明为客户端组件

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useParams } from 'next/navigation';  // Next.js 内置
import { useSession } from 'next-auth/react';
import { fontPresets, generateNameSuggestions } from '@lib/fonts';
import { useTranslations } from '@/lib/i18n';
import { SomeComponent } from 'next-auth/react';
import { SomeFont } from '@lib/fonts'; 

export function NameGenerator() {
  const t = useTranslations();
  const [name, setName] = useState('');
  const [mode, setMode] = useState<'translation' | 'meaning'>('translation');
  const [desiredMeaning, setDesiredMeaning] = useState('love');
  const [suggestions, setSuggestions] = useState([]);
  const [selectedStyle, setSelectedStyle] = useState(fontPresets[0].id);
  const [loading, setLoading] = useState(false);

  const { data: session } = useSession();
  const router = useRouter();

  const generateName = async () => {
    if (!name) return; // 防止空输入
    
    setLoading(true);
    try {
      const mockData = await generateNameSuggestions({
        name,
        mode,
        desiredMeaning: mode === 'meaning' ? desiredMeaning : undefined
      });
      setSuggestions(mockData);
    } catch (error) {
      console.error(t('nameGenerator.error'), error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">
        {t('nameGenerator.title')}
      </h1>
      
      <div className="mb-4">
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder={t('nameGenerator.placeholder')}
          className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-red-500"
        />
      </div>

      {/* 模式选择器 */}
      <div className="mb-4 flex gap-4">
        <button
          onClick={() => setMode('translation')}
          className={`px-4 py-2 rounded ${mode === 'translation' ? 'bg-red-500 text-white' : 'bg-gray-100'}`}
        >
          {t('nameGenerator.mode.translation')}
        </button>
        <button
          onClick={() => setMode('meaning')}
          className={`px-4 py-2 rounded ${mode === 'meaning' ? 'bg-red-500 text-white' : 'bg-gray-100'}`}
        >
          {t('nameGenerator.mode.meaning')}
        </button>
      </div>

      {/* 仅在寓意模式下显示输入 */}
      {mode === 'meaning' && (
        <div className="mb-4">
          <input
            type="text"
            value={desiredMeaning}
            onChange={(e) => setDesiredMeaning(e.target.value)}
            placeholder={t('nameGenerator.desiredMeaning')}
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-red-500"
          />
        </div>
      )}

      <button
        onClick={generateName}
        disabled={loading || !name}
        className="w-full bg-red-500 text-white py-3 px-6 rounded-lg hover:bg-red-600 disabled:opacity-50"
      >
        {loading ? t('nameGenerator.loading') : t('nameGenerator.generate')}
      </button>

      {/* 建议列表 */}
      {suggestions.length > 0 && (
        <div className="mt-6">
          <h2 className="text-xl font-semibold mb-3">
            {t('nameGenerator.suggestions')}
          </h2>
          <div className="space-y-2">
            {suggestions.map((s, i) => (
              <div key={i} className="p-3 bg-gray-50 rounded">
                {s}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
