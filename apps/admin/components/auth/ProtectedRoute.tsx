'use client';

import { useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';

export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
    const { user, isAdmin, loading } = useAuth();
    const router = useRouter();
    const pathname = usePathname();

    useEffect(() => {
        if (!loading) {
            if (!user) {
                // Redirect to login if not authenticated
                router.replace(`/login?redirect=${encodeURIComponent(pathname)}`);
            } else if (!isAdmin && pathname !== '/dashboard/not-authorized') {
                // Redirect if authenticated but not an admin
                router.replace('/dashboard/not-authorized');
            }
        }
    }, [user, isAdmin, loading, router, pathname]);

    if (loading) {
        return (
            <div className="d-flex align-items-center justify-content-center vh-100">
                <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            </div>
        );
    }

    // Only render children if authenticated and admin
    if (!user || !isAdmin) {
        return null;
    }

    return <>{children}</>;
}
