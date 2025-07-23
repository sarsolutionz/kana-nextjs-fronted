'use client';

import { useEffect, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';

import { useMenuAccess } from '@/hooks/useMenuAccess';

import LoadingPage from '@/app/loading';

export function RouteGuard({ children }: { children: React.ReactNode }) {
    const router = useRouter();
    const pathname = usePathname();
    const { isRouteAllowed } = useMenuAccess();
    const [isChecking, setIsChecking] = useState(true);

    useEffect(() => {
        if (['/', '/sign-in', '/sign-up', '/unauthorized'].includes(pathname)
            || pathname.startsWith('/members/')) {
            setIsChecking(false);
            return;
        }

        const checkAccess = async () => {
            const allowed = await isRouteAllowed(pathname);
            if (!allowed) {
                router.replace('/unauthorized');
            } else {
                setIsChecking(false);
            }
        };

        checkAccess();
    }, [pathname, isRouteAllowed, router]);

    if (isChecking) {
        return <LoadingPage />
    }

    return <>{children}</>;
}