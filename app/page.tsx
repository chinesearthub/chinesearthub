'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { NameGenerator } from '@/components/NameGenerator';
import { useLocale } from '@/lib/i18n';

// 添加 SessionProvider 包裹（如果需要认证功能）
export default function Page() {
  const router = useRouter();
  const { locale } = useLocale();

  return (
    <main>
      <NameGenerator />
    </main>
  );
}
