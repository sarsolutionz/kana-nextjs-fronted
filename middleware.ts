import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;

    if (['/sign-in', '/sign-up', '/unauthorized', '/_next', '/static', '/favicon.ico'].some(
        route => pathname.startsWith(route)
    )) {
        return NextResponse.next();
    }

    return NextResponse.next();
}