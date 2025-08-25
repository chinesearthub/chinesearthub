'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { fontPresets, generateNameSuggestions } from '@/lib/fonts';

export default function NameGenerator() {
  const [name, setName] = useState('');
  const [mode, setMode] = useState<'translation' | 'meaning'>('translation');
  const [desiredMeaning, setDesiredMeaning] = useState('love');
  const [suggestions, setSuggestions] = useState([]);
  const [selectedStyle, setSelectedStyle] = useState(fontPresets[0].id);
  const [loading, setLoading] = useState(false);
  
  const { data: session } = useSession();
  const router = useRouter();
  
  const generateName = async () => {
    setLoading(true);
    try {
      // 模拟API调用，实际实现会调用后端
      const mockData = await generateNameSuggestions({
        name,
        mode,
        desiredMeaning: mode === 'meaning' ? desiredMeaning : undefined
      });
      
      setSuggestions(mockData);
    } catch (error) {
      console.error('Error generating name:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Chinese Name Generator</h1>
      
      <div className="mb-4">
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter your name"
          className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-red-500"
        />
      </div>
      
      <div className="mb-6">
        <div className="flex gap-2 mb-2">
          <button
            onClick={() => setMode('translation')}
            className={`px-4 py-2 rounded-lg flex-1 ${
              mode === 'translation' 
                ? 'bg-red-600 text-white' 
                : 'bg-gray-100 hover:bg-gray-200'
            }`}
          >
            Professional Translation
          </button>
          <button
            onClick={() => setMode('meaning')}
            className={`px-4 py-2 rounded-lg flex-1 ${
              mode === 'meaning' 
                ? 'bg-red-600 text-white' 
                : 'bg-gray-100 hover:bg-gray-200'
            }`}
          >
            Meaning-based
          </button>
        </div>
        
        {mode === 'meaning' && (
          <div className="mt-2">
            <select
              value={desiredMeaning}
              onChange={(e) => setDesiredMeaning(e.target.value)}
              className="w-full p-3 border rounded-lg"
            >
              <option value="love">Love / 爱情</option>
              <option value="peace">Peace / 和平</option>
              <option value="freedom">Freedom / 自由</option>
              <option value="hope">Hope / 希望</option>
              <option value="faith">Faith / 信念</option>
            </select>
          </div>
        )}
      </div>

      <button
        onClick={generateName}
        disabled={loading || !name}
        className="w-full px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:opacity-50"
      >
        {loading ? 'Generating...' : 'Generate Names'}
      </button>

      {suggestions.length > 0 && (
        <div className="mt-8">
          <h2 className="text-xl font-semibold mb-4">Name Suggestions:</h2>
          
          {suggestions.map((suggestion) => (
            <div key={suggestion.id} className="mb-6 p-4 border rounded-lg">
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-2xl" style={{ fontFamily: fontPresets.find(f => f.id === suggestion.style)?.family }}>
                  {suggestion.chinese} <span className="text-gray-500 text-lg">({suggestion.pinyin})</span>
                </h3>
                
                <select
                  value={selectedStyle}
                  onChange={(e) => setSelectedStyle(e.target.value)}
                  className="ml-4 p-2 border rounded"
                >
                  {fontPresets.map((font) => (
                    <option key={font.id} value={font.id} style={{ fontFamily: font.family }}>
                      {font.name}
                    </option>
                  ))}
                </select>
              </div>
              
              <p className="text-gray-600">{suggestion.meaning}</p>
              
              <div className="mt-4 flex gap-2">
                <button
                  onClick={() => router.push(`/checkout?artwork=${suggestion.id}`)}
                  className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                  Purchase (€5-€8)
                </button>
                <button
                  onClick={() => window.open(`/api/generate-preview?id=${suggestion.id}`, '_blank')}
                  className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
                >
                  Free Preview
                </button>
              </div>
            </div>
          ))}
          
          <p className="text-sm text-gray-500 mt-4">
            Unlimited free previews with watermark. Purchase to get high-resolution artwork.
          </p>
        </div>
      )}
    </div>
  );
}
