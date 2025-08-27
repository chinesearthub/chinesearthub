'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { NameGenerator } from '@/components/NameGenerator';
// 若路径别名未生效，改用相对路径：
// import { NameGenerator } from '../../components/NameGenerator';
import { useLocale } from '@/lib/i18n'; // 确保路径别名已配置
// 或使用相对路径：
// import { useLocale } from '../../lib/i18n';

export default function HomePage() {
  const router = useRouter();
  const { locale } = useLocale();

  // 自动处理国际化路由
  useEffect(() => {
    if (!['en', 'zh'].includes(locale)) {
      router.replace(`/${locale === 'en' ? 'zh' : 'en'}`);
    }
  }, [locale, router]);

  return (
    <div className="container">
      <h1>
        {locale === 'en' 
          ? 'Chinese Name Generator' 
          : '中文名生成器'}
      </h1>
      <NameGenerator />
    </div>
  );
}
