'use client';

import { useState } from 'react';
import { discoverPages, syncPage } from './actions';
import { toast } from 'react-hot-toast';

export default function ContentSyncPage() {
    const [pages, setPages] = useState<any[]>([]);
    const [refreshing, setRefreshing] = useState(false);
    const [syncing, setSyncing] = useState<string | null>(null);

    const handleScan = async () => {
        setRefreshing(true);
        try {
            const discovered = await discoverPages();
            setPages(discovered);
        } catch (e) {
            toast.error('Failed to discover pages');
        }
        setRefreshing(false);
    };

    const handleSync = async (slug: string) => {
        setSyncing(slug);
        try {
            const result = await syncPage(slug);
            if (result.success) {
                toast.success(result.message);
                // Refresh status
                handleScan();
            } else {
                toast.error(result.message);
            }
        } catch (e) {
            toast.error('Sync failed');
        }
        setSyncing(null);
    };

    return (
        <div className="container py-4">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <div>
                    <h1 className="h3">Content Sync</h1>
                    <p className="text-muted">Import existing static pages into the dynamic CMS.</p>
                </div>
                <button className="btn btn-primary" onClick={handleScan} disabled={refreshing}>
                    {refreshing ? 'Scanning...' : 'Scan for Pages'}
                </button>
            </div>

            <div className="card shadow-sm border-0">
                <div className="card-body p-0">
                    <div className="table-responsive">
                        <table className="table table-hover align-middle mb-0">
                            <thead className="bg-light">
                                <tr>
                                    <th className="ps-4">Page Slug</th>
                                    <th>Title</th>
                                    <th>Status</th>
                                    <th className="pe-4 text-end">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {pages.length === 0 ? (
                                    <tr>
                                        <td colSpan={4} className="text-center py-5 text-muted">
                                            No pages discovered yet. Click &quot;Scan for Pages&quot; to begin.
                                        </td>
                                    </tr>
                                ) : (
                                    pages.map((page) => (
                                        <tr key={page.slug}>
                                            <td className="ps-4 font-monospace small">/{page.slug}</td>
                                            <td>{page.title}</td>
                                            <td>
                                                {page.isImported ? (
                                                    <span className="badge bg-success-subtle text-success">Synced</span>
                                                ) : (
                                                    <span className="badge bg-secondary-subtle text-secondary">Not Synced</span>
                                                )}
                                            </td>
                                            <td className="pe-4 text-end">
                                                {page.isImported ? (
                                                    <button className="btn btn-sm btn-outline-secondary" disabled>
                                                        Already Synced
                                                    </button>
                                                ) : (
                                                    <button
                                                        className="btn btn-sm btn-primary"
                                                        onClick={() => handleSync(page.slug)}
                                                        disabled={syncing === page.slug}
                                                    >
                                                        {syncing === page.slug ? 'Syncing...' : 'Import to CMS'}
                                                    </button>
                                                )}
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
    );
}
