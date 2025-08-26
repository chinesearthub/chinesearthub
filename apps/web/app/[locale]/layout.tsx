// apps/web/app/[locale]/layout.tsx
import { useTranslations } from '@/lib/i18n';

export default function LocaleLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const t = useTranslations();
  return <div className="locale-container">{children}</div>;
}
