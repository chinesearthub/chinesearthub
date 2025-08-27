'use client';  // 若父组件需要客户端交互，可添加此行

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { NameGenerator } from '@/components/NameGenerator';
import { useLocale } from '@/lib/i18n';

export default function Page() {
  const router = useRouter();
  const { locale } = useLocale();

  return (
    <main>
      <NameGenerator />
    </main>
  );
}
