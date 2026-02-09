'use client';

import Link from 'next/link';
import { logOut } from '@gratuity/firebase-config/auth';

export default function NotAuthorizedPage() {
    return (
        <div className="container vh-100 d-flex align-items-center justify-content-center text-center">
            <div className="card shadow-lg p-5 rounded-4" style={{ maxWidth: '500px' }}>
                <div className="display-1 text-danger mb-4">🚫</div>
                <h1 className="fw-bold mb-3">Access Denied</h1>
                <p className="text-muted mb-4">
                    You are authenticated, but you do not have permission to access the admin dashboard.
                    If you believe this is an error, please contact the system administrator.
                </p>
                <div className="d-grid gap-2">
                    <button
                        className="btn btn-outline-danger"
                        onClick={() => logOut()}
                    >
                        Sign Out & Try Again
                    </button>
                    <Link href="/" className="btn btn-primary">
                        Back to Public Website
                    </Link>
                </div>
            </div>
        </div>
    );
}
