// apps/web/app/layout.tsx
import { i18n } from '@/lib/i18n/config';
import { dir } from 'i18next';

export async function generateStaticParams() {
  return i18n.languages.map((lng) => ({ lng }));
}

export default function RootLayout({
  children,
  params: { lng },
}: {
  children: React.ReactNode;
  params: { lng: string };
}) {
  return (
    <html lang={lng} dir={dir(lng)}>
      <body>{children}</body>
    </html>
  );
}
