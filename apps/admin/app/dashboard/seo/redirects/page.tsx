'use client';

import { useState, useEffect } from 'react';
import { getDocuments, addDocument, deleteDocument, COLLECTIONS } from '@gratuity/firebase-config/firestore';
import { Redirect } from '@gratuity/shared/types';
import { toast } from 'react-hot-toast';

export default function RedirectsPage() {
    const [redirects, setRedirects] = useState<Redirect[]>([]);
    const [loading, setLoading] = useState(true);
    const [isSaving, setIsSaving] = useState(false);

    const [formData, setFormData] = useState({
        from: '',
        to: '',
        type: 301 as 301 | 302
    });

    useEffect(() => {
        const fetchRedirects = async () => {
            try {
                const data = await getDocuments<Redirect>(COLLECTIONS.REDIRECTS);
                setRedirects(data);
            } catch (err) {
                console.error(err);
                toast.error('Failed to load redirects');
            } finally {
                setLoading(false);
            }
        };
        fetchRedirects();
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!formData.from || !formData.to) return;

        setIsSaving(true);
        try {
            const redirectData: Omit<Redirect, 'id'> = {
                from: formData.from.startsWith('/') ? formData.from : `/${formData.from}`,
                to: formData.to.startsWith('/') ? formData.to : (formData.to.startsWith('http') ? formData.to : `/${formData.to}`),
                type: formData.type,
                createdAt: new Date()
            };

            const id = await addDocument(COLLECTIONS.REDIRECTS, redirectData);
            setRedirects([{ id, ...redirectData }, ...redirects]);
            setFormData({ from: '', to: '', type: 301 });
            toast.success('Redirect rule created');
        } catch (err) {
            toast.error('Failed to save redirect');
        } finally {
            setIsSaving(false);
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm('Permanently delete this redirect rule?')) return;
        try {
            await deleteDocument(COLLECTIONS.REDIRECTS, id);
            setRedirects(redirects.filter(r => r.id !== id));
            toast.success('Redirect deleted');
        } catch (err) {
            toast.error('Deletion failed');
        }
    };

    if (loading) return <div className="p-5 text-center"><div className="spinner-border text-primary" role="status"></div></div>;

    return (
        <div className="container-fluid py-4">
            <div className="mb-4">
                <h1 className="h3 fw-bold mb-1">Redirect Manager</h1>
                <p className="text-muted small">Manage 301 and 302 URL forwarding rules to maintain SEO link juice.</p>
            </div>

            <div className="row g-4">
                <div className="col-lg-4">
                    <div className="card border-0 shadow-sm rounded-4 p-4 sticky-top" style={{ top: '2rem' }}>
                        <h5 className="fw-bold mb-3">Create New Rule</h5>
                        <form onSubmit={handleSubmit}>
                            <div className="mb-3">
                                <label className="form-label small fw-bold text-muted uppercase">From (Source Path)</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="/old-slug"
                                    value={formData.from}
                                    onChange={(e) => setFormData({ ...formData, from: e.target.value })}
                                    required
                                />
                                <div className="form-text x-small">The path users will be coming from.</div>
                            </div>
                            <div className="mb-3">
                                <label className="form-label small fw-bold text-muted uppercase">To (Destination)</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="/new-slug-or-url"
                                    value={formData.to}
                                    onChange={(e) => setFormData({ ...formData, to: e.target.value })}
                                    required
                                />
                                <div className="form-text x-small">Internal path or full external URL.</div>
                            </div>
                            <div className="mb-4">
                                <label className="form-label small fw-bold text-muted uppercase">Redirect Type</label>
                                <select
                                    className="form-select"
                                    value={formData.type}
                                    onChange={(e) => setFormData({ ...formData, type: parseInt(e.target.value) as 301 | 302 })}
                                >
                                    <option value={301}>301 (Permanent)</option>
                                    <option value={302}>302 (Temporary)</option>
                                </select>
                            </div>
                            <button type="submit" className="btn btn-primary w-100 py-3 fw-bold shadow-sm" disabled={isSaving}>
                                {isSaving ? 'Saving...' : 'Create Redirect'}
                            </button>
                        </form>
                    </div>
                </div>

                <div className="col-lg-8">
                    <div className="card border-0 shadow-sm rounded-4 overflow-hidden">
                        <div className="table-responsive">
                            <table className="table table-hover align-middle mb-0">
                                <thead className="table-light">
                                    <tr>
                                        <th className="px-4 py-3 text-muted x-small uppercase fw-bold">Source Path</th>
                                        <th className="py-3 text-muted x-small uppercase fw-bold">Destination</th>
                                        <th className="py-3 text-muted x-small uppercase fw-bold">Type</th>
                                        <th className="px-4 py-3 text-end text-muted x-small uppercase fw-bold">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {redirects.length === 0 ? (
                                        <tr><td colSpan={4} className="text-center py-5 text-muted">No redirects configured.</td></tr>
                                    ) : (
                                        redirects.map((rule) => (
                                            <tr key={rule.id}>
                                                <td className="px-4 fw-medium text-danger">{rule.from}</td>
                                                <td><span className="text-success">{rule.to}</span></td>
                                                <td><span className={`badge ${rule.type === 301 ? 'bg-primary-subtle text-primary' : 'bg-warning-subtle text-warning'}`}>{rule.type}</span></td>
                                                <td className="px-4 text-end">
                                                    <button
                                                        className="btn btn-sm btn-link text-muted text-decoration-none"
                                                        onClick={() => handleDelete(rule.id)}
                                                    >
                                                        Delete
                                                    </button>
                                                </td>
                                            </tr>
                                        ))
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>

            <style jsx>{`
                .x-small { font-size: 0.70rem; }
                .uppercase { text-transform: uppercase; letter-spacing: 0.5px; }
            `}</style>
        </div>
    );
}
