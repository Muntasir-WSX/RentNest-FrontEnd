import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function middleware(request: NextRequest) {
    const pathname = request.nextUrl.pathname;

    const AUTH_ROUTES = ['/login', '/register'];
    const PUBLIC_ROUTES = ['/', '/home', '/properties', '/about'];

    const accessToken = request.cookies.get('accessToken')?.value;
    const refreshToken = request.cookies.get('refreshToken')?.value;
    if (AUTH_ROUTES.includes(pathname)) {
        if (accessToken) {
            
            try {
                const base64Payload = accessToken.split('.')[1];
                const payload = JSON.parse(Buffer.from(base64Payload, 'base64').toString());
                const role = payload?.role;

                if (role === 'TENANT') return NextResponse.redirect(new URL('/tenantdashboard', request.url));
                if (role === 'ADMIN') return NextResponse.redirect(new URL('/admin-dashboard', request.url));
                if (role === 'LANDLORD') return NextResponse.redirect(new URL('/Landlord-Dashboard', request.url));
            } catch (e) {
            }
        }
        return NextResponse.next();
    }
    const isPublicRoute = PUBLIC_ROUTES.some((route) => pathname === route || pathname.startsWith(route + '/'));
    const isPropertyDetailsRoute = pathname.startsWith('/properties/') && pathname !== '/properties';

    if (isPublicRoute || isPropertyDetailsRoute) {
        return NextResponse.next();
    }

    if (!accessToken && !refreshToken) {
        return NextResponse.redirect(new URL('/login', request.url));
    }
    if (accessToken) {
        try {
            const base64Payload = accessToken.split('.')[1];
            const payload = JSON.parse(Buffer.from(base64Payload, 'base64').toString());
            const userRole = payload?.role;

            if (pathname.startsWith("/admin-dashboard") && userRole !== "ADMIN") {
                return NextResponse.redirect(new URL('/not-found', request.url));
            }
            if (pathname.startsWith("/Landlord-Dashboard") && userRole !== "LANDLORD") {
                return NextResponse.redirect(new URL('/not-found', request.url));
            }
            if (pathname.startsWith("/tenantdashboard") && userRole !== "TENANT") {
                return NextResponse.redirect(new URL('/not-found', request.url));
            }
        } catch (error) {
            return NextResponse.redirect(new URL('/login', request.url));
        }
    }

    return NextResponse.next();
}

export const config = {
    matcher: [
        '/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)',
    ],
};