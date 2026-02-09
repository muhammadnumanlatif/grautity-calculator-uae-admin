'use client';

import { useState, useEffect, useRef } from 'react';
import { fetchMedia, removeMedia, uploadMedia } from './actions';
import { toast } from 'react-hot-toast';

interface BlobAsset {
    url: string;
    pathname: string;
    size: number;
    uploadedAt: Date;
}

export default function MediaLibraryPage() {
    const [view, setView] = useState<'grid' | 'list'>('grid');
    const [loading, setLoading] = useState(true);
    const [assets, setAssets] = useState<any[]>([]);
    const [uploading, setUploading] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const loadAssets = async () => {
        setLoading(true);
        const result = await fetchMedia();
        if (result.success) {
            setAssets(result.data || []);
        } else {
            toast.error(result.error || 'Failed to load assets');
        }
        setLoading(false);
    };

    useEffect(() => {
        loadAssets();
    }, []);

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        setUploading(true);
        const formData = new FormData();
        formData.append('file', file);

        const result = await uploadMedia(formData);
        if (result.success) {
            toast.success('Asset uploaded successfully');
            loadAssets();
        } else {
            toast.error(result.error || 'Upload failed');
        }
        setUploading(false);
        if (fileInputRef.current) fileInputRef.current.value = '';
    };

    const handleDelete = async (url: string) => {
        if (!confirm('Are you sure you want to delete this asset?')) return;

        const result = await removeMedia(url);
        if (result.success) {
            toast.success('Asset deleted');
            setAssets(assets.filter(a => a.url !== url));
        } else {
            toast.error(result.error || 'Delete failed');
        }
    };

    const formatBytes = (bytes: number) => {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    };

    return (
        <div className="container-fluid py-4">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <div>
                    <h1 className="h3 fw-bold mb-1">Asset Studio</h1>
                    <p className="text-muted small mb-0">Manage and optimize your media assets using Vercel Blob Storage</p>
                </div>
                <div className="d-flex gap-2">
                    <input
                        type="file"
                        ref={fileInputRef}
                        onChange={handleFileChange}
                        style={{ display: 'none' }}
                        accept="image/*,video/*,application/pdf"
                    />
                    <button className="btn btn-outline-secondary btn-sm" onClick={() => setView(view === 'grid' ? 'list' : 'grid')}>
                        {view === 'grid' ? (
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="7" height="7" /><rect x="14" y="3" width="7" height="7" /><rect x="14" y="14" width="7" height="7" /><rect x="3" y="14" width="7" height="7" /></svg>
                        ) : (
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="8" y1="6" x2="21" y2="6" /><line x1="8" y1="12" x2="21" y2="12" /><line x1="8" y1="18" x2="21" y2="18" /><line x1="3" y1="6" x2="3.01" y2="6" /><line x1="3" y1="12" x2="3.01" y2="12" /><line x1="3" y1="18" x2="3.01" y2="18" /></svg>
                        )}
                    </button>
                    <button className="btn btn-primary d-flex align-items-center gap-2 px-3 shadow-sm" onClick={() => fileInputRef.current?.click()} disabled={uploading}>
                        {uploading ? (
                            <span className="spinner-border spinner-border-sm" role="status"></span>
                        ) : (
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="17 8 12 3 7 8" /><line x1="12" y1="3" x2="12" y2="15" /></svg>
                        )}
                        {uploading ? 'Uploading...' : 'Upload Asset'}
                    </button>
                </div>
            </div>

            <div className="card border-0 shadow-sm rounded-4 p-4 mb-4">
                {loading ? (
                    <div className="text-center py-5">
                        <div className="spinner-border text-primary" role="status"></div>
                        <p className="mt-2 text-muted">Loading your assets...</p>
                    </div>
                ) : assets.length === 0 ? (
                    <div className="text-center py-5">
                        <div className="mb-3">
                            <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="#dee2e6" strokeWidth="1"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="17 8 12 3 7 8" /><line x1="12" y1="3" x2="12" y2="15" /></svg>
                        </div>
                        <h5 className="text-muted">No assets found</h5>
                        <p className="text-muted small">Upload your first image or document to see it here.</p>
                    </div>
                ) : (
                    <>
                        <div className="d-flex gap-3 mb-4">
                            <input type="text" className="form-control bg-light border-0" placeholder="Search assets..." />
                        </div>

                        {view === 'grid' ? (
                            <div className="row g-4">
                                {assets.map((asset) => (
                                    <div key={asset.url} className="col-md-3 col-sm-6">
                                        <div className="asset-card card border-0 h-100 overflow-hidden shadow-sm">
                                            <div className="asset-preview position-relative" style={{ aspectRatio: '1/1', background: '#f8f9fa' }}>
                                                {asset.pathname.match(/\.(jpg|jpeg|png|webp|svg|gif)$/i) ? (
                                                    /* eslint-disable-next-line @next/next/no-img-element */
                                                    <img src={asset.url} alt={asset.pathname} className="w-100 h-100 object-fit-cover rounded-3" />
                                                ) : (
                                                    <div className="w-100 h-100 d-flex align-items-center justify-content-center bg-light text-muted">
                                                        <span className="small">{asset.pathname.split('.').pop()?.toUpperCase()}</span>
                                                    </div>
                                                )}
                                                <div className="asset-overlay position-absolute top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center opacity-0 transition-all">
                                                    <div className="d-flex gap-2">
                                                        <a href={asset.url} target="_blank" rel="noopener noreferrer" className="btn btn-white btn-sm shadow-sm rounded-pill">View</a>
                                                        <button className="btn btn-danger btn-sm shadow-sm rounded-pill" onClick={() => handleDelete(asset.url)}>Delete</button>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="p-3">
                                                <div className="fw-bold small text-truncate" title={asset.pathname}>{asset.pathname}</div>
                                                <div className="text-muted d-flex justify-content-between mt-1" style={{ fontSize: '0.7rem' }}>
                                                    <span>{formatBytes(asset.size)}</span>
                                                    <span>{new Date(asset.uploadedAt).toLocaleDateString()}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="table-responsive">
                                <table className="table table-hover align-middle">
                                    <thead className="table-light">
                                        <tr>
                                            <th>Asset</th>
                                            <th>Size</th>
                                            <th>Uploaded At</th>
                                            <th className="text-end">Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {assets.map((asset) => (
                                            <tr key={asset.url}>
                                                <td>
                                                    <div className="d-flex align-items-center gap-3">
                                                        {asset.pathname.match(/\.(jpg|jpeg|png|webp|svg|gif)$/i) ? (
                                                            /* eslint-disable-next-line @next/next/no-img-element */
                                                            <img src={asset.url} alt={asset.pathname} width="40" height="40" className="rounded object-fit-cover shadow-sm" />
                                                        ) : (
                                                            <div className="bg-light rounded d-flex align-items-center justify-content-center" style={{ width: 40, height: 40 }}>
                                                                <span className="x-small fw-bold">{asset.pathname.split('.').pop()?.toUpperCase()}</span>
                                                            </div>
                                                        )}
                                                        <span className="fw-bold small">{asset.pathname}</span>
                                                    </div>
                                                </td>
                                                <td className="small text-muted">{formatBytes(asset.size)}</td>
                                                <td className="small text-muted">{new Date(asset.uploadedAt).toLocaleString()}</td>
                                                <td className="text-end">
                                                    <div className="d-flex justify-content-end gap-2">
                                                        <a href={asset.url} target="_blank" rel="noopener noreferrer" className="btn btn-sm btn-outline-secondary">View</a>
                                                        <button className="btn btn-sm btn-outline-danger" onClick={() => handleDelete(asset.url)}>Delete</button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </>
                )}
            </div>

            <style jsx>{`
                .transition-all { transition: all 0.2s ease; }
                .asset-card:hover .asset-preview img {
                    transform: scale(1.05);
                }
                .asset-card:hover .asset-overlay {
                    opacity: 1 !important;
                    background: rgba(0,0,0,0.3);
                }
                .btn-white { background: white; border: none; }
                .x-small { font-size: 0.6rem; }
            `}</style>
        </div>
    );
}
