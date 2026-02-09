'use client';

import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { signIn } from '@gratuity/firebase-config/auth';
import { useAuth } from '@/context/AuthContext';
import styles from './login.module.css';

export default function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const router = useRouter();
    const searchParams = useSearchParams();
    const { user, isAdmin } = useAuth();

    const redirectPath = searchParams.get('redirect') || '/dashboard';

    // If already logged in AND is admin, redirect
    if (user && isAdmin) {
        router.replace(redirectPath);
        return null;
    }

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            await signIn(email, password);
            // AuthContext will handle state updates and redirecting back will happen via useEffect or if checking claims
            router.push(redirectPath);
        } catch (err: any) {
            console.error(err);
            setError(err.message || 'Failed to sign in. Please check your credentials.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className={styles.loginContainer}>
            <div className={styles.loginCard}>
                <div className={styles.loginHeader}>
                    <h1>Admin Dashboard</h1>
                    <p>Sign in to manage Gratuity Calculator UAE</p>
                </div>

                {error && <div className="alert alert-danger mb-4">{error}</div>}

                <form onSubmit={handleLogin}>
                    <div className="mb-3">
                        <label className="form-label">Email Address</label>
                        <input
                            type="email"
                            className="form-control form-control-lg"
                            placeholder="admin@gratuitycalculator.ae"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="form-label">Password</label>
                        <input
                            type="password"
                            className="form-control form-control-lg"
                            placeholder="••••••••"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className="btn btn-primary btn-lg w-100"
                        disabled={loading}
                    >
                        {loading ? (
                            <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                        ) : null}
                        Sign In
                    </button>
                </form>

                <div className={styles.loginFooter}>
                    <p>&copy; 2026 Astute Softwares. All rights reserved.</p>
                </div>
            </div>
        </div>
    );
}
