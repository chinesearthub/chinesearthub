import { withAuth } from 'next-auth/middleware';
import { i18n } from '@/lib/i18n/config';
import { NextResponse } from 'next/server';

export default withAuth(
  function middleware(req) {
    const { pathname } = req.nextUrl;
    const lng = pathname.split('/')[1];
    
    if (!i18n.languages.includes(lng)) {
      return NextResponse.redirect(new URL(`/${i18n.defaultLocale}${pathname}`, req.url));
    }
  },
  { callbacks: { authorized: () => true } }
);

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
