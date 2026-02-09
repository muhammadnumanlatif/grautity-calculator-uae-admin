'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { getDocuments, COLLECTIONS } from '@gratuity/firebase-config/firestore';
import { Widget } from '@gratuity/shared/types';
import { toast } from 'react-hot-toast';

export default function WidgetsPage() {
    const [widgets, setWidgets] = useState<Widget[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchWidgets = async () => {
            try {
                const data = await getDocuments<Widget>(COLLECTIONS.WIDGETS);
                setWidgets(data);
            } catch (err) {
                console.error('Failed to fetch widgets:', err);
                toast.error('Failed to load widgets');
            } finally {
                setLoading(false);
            }
        };
        fetchWidgets();
    }, []);

    const getTypeBadge = (type: string) => {
        const colors: Record<string, string> = {
            'mini_calculator': 'bg-primary-subtle text-primary',
            'newsletter_box': 'bg-success-subtle text-success',
            'recent_posts': 'bg-info-subtle text-info',
            'social_proof': 'bg-warning-subtle text-warning',
            'custom_html': 'bg-secondary-subtle text-secondary',
            'cta_banner': 'bg-danger-subtle text-danger'
        };
        return colors[type] || 'bg-light text-muted';
    };

    return (
        <div className="container-fluid py-4">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <div>
                    <h1 className="h3 fw-bold mb-1">Widgets</h1>
                    <p className="text-muted small mb-0">Manage reusable UI components and modules</p>
                </div>
                <Link href="/dashboard/widgets/new" className="btn btn-primary d-flex align-items-center gap-2">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <line x1="12" y1="5" x2="12" y2="19" />
                        <line x1="5" y1="12" x2="19" y2="12" />
                    </svg>
                    Add Widget
                </Link>
            </div>

            <div className="card border-0 shadow-sm rounded-4 overflow-hidden">
                <div className="table-responsive">
                    <table className="table table-hover align-middle mb-0">
                        <thead className="table-light">
                            <tr>
                                <th className="px-4 py-3 text-muted x-small uppercase fw-bold ls-1">Widget Title</th>
                                <th className="py-3 text-muted x-small uppercase fw-bold ls-1">Type</th>
                                <th className="py-3 text-muted x-small uppercase fw-bold ls-1">Status</th>
                                <th className="py-3 text-muted x-small uppercase fw-bold ls-1">Order</th>
                                <th className="px-4 py-3 text-end text-muted x-small uppercase fw-bold ls-1">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {loading ? (
                                <tr>
                                    <td colSpan={5} className="text-center py-5">
                                        <div className="spinner-border text-primary spinner-border-sm me-2" role="status"></div>
                                        <span className="text-muted small">Loading widgets...</span>
                                    </td>
                                </tr>
                            ) : widgets.length === 0 ? (
                                <tr>
                                    <td colSpan={5} className="text-center py-5">
                                        <div className="mb-3 display-6 opacity-25">🧩</div>
                                        <p className="text-muted small mb-0">No widgets found. Create your first widget to get started.</p>
                                    </td>
                                </tr>
                            ) : (
                                widgets.sort((a, b) => a.order - b.order).map((widget) => (
                                    <tr key={widget.id}>
                                        <td className="px-4">
                                            <div className="fw-bold text-dark">{widget.title || 'Untitled Widget'}</div>
                                            <div className="text-muted x-small">ID: {widget.id.substring(0, 8)}...</div>
                                        </td>
                                        <td>
                                            <span className={`badge rounded-pill ${getTypeBadge(widget.type)}`}>
                                                {widget.type.split('_').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')}
                                            </span>
                                        </td>
                                        <td>
                                            <span className={`badge rounded-pill ${widget.isActive ? 'bg-success-subtle text-success' : 'bg-secondary-subtle text-secondary'}`}>
                                                {widget.isActive ? 'Active' : 'Inactive'}
                                            </span>
                                        </td>
                                        <td>{widget.order}</td>
                                        <td className="px-4 text-end">
                                            <Link href={`/dashboard/widgets/${widget.id}`} className="btn btn-sm btn-white border shadow-sm">
                                                Edit
                                            </Link>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            <style jsx>{`
                .ls-1 { letter-spacing: 0.05rem; }
                .x-small { font-size: 0.7rem; }
                .uppercase { text-transform: uppercase; }
                .btn-white { background: white; color: #212529; }
                .btn-white:hover { background: #f8f9fa; }
            `}</style>
        </div>
    );
}
