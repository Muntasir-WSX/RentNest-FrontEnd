import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import jwt, { JwtPayload } from 'jsonwebtoken';

const ACCESS_SECRET = process.env.JWT_ACCESS_SECRET || "rentnest_access_test_secret";
const BACKEND_API_URL = process.env.NEXT_PUBLIC_BACKEND_API_URL || "http://localhost:5000";

export async function middleware(request: NextRequest) {
    const pathname = request.nextUrl.pathname;

    const AUTH_ROUTES = ['/login', '/register'];
    const PUBLIC_ROUTES = ['/', '/home', '/properties', '/about'];

    let accessToken = request.cookies.get('accessToken')?.value;
    const refreshToken = request.cookies.get('refreshToken')?.value;

    let userRole = null;
    let isValidToken = false;

    if (accessToken) {
        try {
            const decoded = jwt.verify(accessToken, ACCESS_SECRET) as JwtPayload;
            if (decoded && decoded.role) {
                userRole = decoded.role;
                isValidToken = true;
            }
        } catch (error) {
            isValidToken = false;
        }
    }

   
    let newAccessTokenGenerated = false;
    let response = NextResponse.next();

    if (!isValidToken && refreshToken) {
        try {
           
            const refreshResponse = await fetch(`${BACKEND_API_URL}/api/auth/refresh`, {
                method: "GET",
                headers: {
                    Cookie: `refreshToken=${refreshToken}`,
                },
            });

            const result = await refreshResponse.json();

            if (result.success && result.data?.accessToken) {
                const newAccessToken = result.data.accessToken;
                const decodedNewToken = jwt.verify(newAccessToken, ACCESS_SECRET) as JwtPayload;
                
                userRole = decodedNewToken.role;
                isValidToken = true;
                newAccessTokenGenerated = true;


                response = NextResponse.next();
                response.cookies.set({
                    name: 'accessToken',
                    value: newAccessToken,
                    httpOnly: true,
                    path: '/',
                    maxAge: 60 * 60 * 24 * 7, 
                    sameSite: 'lax',
                });
            }
        } catch (err) {
            console.error("Middleware Token Refresh Failed:", err);
            isValidToken = false;
        }
    }

    const isExactPublicRoute = PUBLIC_ROUTES.includes(pathname);
    const isPropertyDetailsRoute = pathname.startsWith('/properties/') && pathname !== '/properties';

if (!isValidToken && (isPropertyDetailsRoute || !isExactPublicRoute)) {

    return NextResponse.redirect(new URL('/login', request.url));
}


    if (isValidToken && AUTH_ROUTES.includes(pathname)) {
        if (userRole === 'TENANT') {
            return NextResponse.redirect(new URL('/tenantdashboard', request.url));
        } else if (userRole === 'ADMIN') {
            return NextResponse.redirect(new URL('/admin-dashboard', request.url));
        } else if (userRole === 'LANDLORD') {
            return NextResponse.redirect(new URL('/Landlord-Dashboard', request.url));
        }
    }

    const isPublicRoute = PUBLIC_ROUTES.some((route) => pathname === route || pathname.startsWith(route + '/'));
    if (!isValidToken && !isPublicRoute) {
        return NextResponse.redirect(new URL('/login', request.url));
    }

    if (pathname.startsWith("/admin-dashboard") && userRole !== "ADMIN") {
        return NextResponse.redirect(new URL('/not-found', request.url));
    }

    if (pathname.startsWith("/Landlord-Dashboard") && userRole !== "LANDLORD") {
        return NextResponse.redirect(new URL('/not-found', request.url));
    }

    if (pathname.startsWith("/tenantdashboard") && userRole !== "TENANT") {
        return NextResponse.redirect(new URL('/not-found', request.url));
    }

    return response;
}

export const config = {
    matcher: [
        '/((?!api|_next/static|_next/image|.*\\.png$).*)',
    ],
};