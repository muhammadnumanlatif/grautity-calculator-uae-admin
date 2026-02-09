'use client';

import { useState, useEffect } from 'react';
import { getDocuments, addDocument, deleteDocument, COLLECTIONS } from '@gratuity/firebase-config/firestore';
import { Keyword } from '@gratuity/shared/types';
import { toast } from 'react-hot-toast';

export default function KeywordsPage() {
    const [keywords, setKeywords] = useState<Keyword[]>([]);
    const [loading, setLoading] = useState(true);
    const [isAdding, setIsAdding] = useState(false);
    const [newKeyword, setNewKeyword] = useState('');

    useEffect(() => {
        const fetchKeywords = async () => {
            try {
                const data = await getDocuments<Keyword>(COLLECTIONS.KEYWORDS);
                setKeywords(data);
            } catch (err) {
                console.error(err);
                toast.error('Failed to load keywords');
            } finally {
                setLoading(false);
            }
        };
        fetchKeywords();
    }, []);

    const handleAddKeyword = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!newKeyword.trim()) return;

        setIsAdding(true);
        try {
            const keywordData: Omit<Keyword, 'id'> = {
                keyword: newKeyword.trim(),
                volume: Math.floor(Math.random() * 5000) + 500, // Simulated initial data
                difficulty: Math.floor(Math.random() * 60) + 20,
                rankings: [
                    { date: new Date(), position: Math.floor(Math.random() * 50) + 1 }
                ]
            };

            const id = await addDocument(COLLECTIONS.KEYWORDS, keywordData);
            setKeywords([{ id, ...keywordData }, ...keywords]);
            setNewKeyword('');
            toast.success('Keyword added for tracking');
        } catch (err) {
            toast.error('Failed to add keyword');
        } finally {
            setIsAdding(false);
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm('Stop tracking this keyword?')) return;
        try {
            await deleteDocument(COLLECTIONS.KEYWORDS, id);
            setKeywords(keywords.filter(k => k.id !== id));
            toast.success('Keyword removed');
        } catch (err) {
            toast.error('Failed to delete');
        }
    };

    if (loading) return <div className="p-5 text-center"><div className="spinner-border text-primary" role="status"></div></div>;

    return (
        <div className="container-fluid py-4">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <div>
                    <h1 className="h3 fw-bold mb-1">Keyword Tracking</h1>
                    <p className="text-muted small mb-0">Monitor your search engine visibility for target terms.</p>
                </div>
                <form onSubmit={handleAddKeyword} className="d-flex gap-2">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Enter new keyword..."
                        value={newKeyword}
                        onChange={(e) => setNewKeyword(e.target.value)}
                        style={{ width: '250px' }}
                    />
                    <button type="submit" className="btn btn-primary px-4 fw-bold shadow-sm" disabled={isAdding}>
                        {isAdding ? 'Adding...' : 'Track Keyword'}
                    </button>
                </form>
            </div>

            <div className="row g-4">
                <div className="col-12">
                    <div className="card border-0 shadow-sm rounded-4 overflow-hidden">
                        <div className="table-responsive">
                            <table className="table table-hover align-middle mb-0">
                                <thead className="table-light">
                                    <tr>
                                        <th className="px-4 py-3 text-muted x-small uppercase fw-bold ls-1">Keyword Phrase</th>
                                        <th className="py-3 text-muted x-small uppercase fw-bold ls-1 text-center">Current Rank</th>
                                        <th className="py-3 text-muted x-small uppercase fw-bold ls-1">Volume</th>
                                        <th className="py-3 text-muted x-small uppercase fw-bold ls-1">KD %</th>
                                        <th className="py-3 text-muted x-small uppercase fw-bold ls-1">Trend</th>
                                        <th className="px-4 py-3 text-end text-muted x-small uppercase fw-bold ls-1">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {keywords.length === 0 ? (
                                        <tr><td colSpan={6} className="text-center py-5 text-muted">No keywords tracked yet.</td></tr>
                                    ) : (
                                        keywords.map((kw) => {
                                            const currentRank = kw.rankings?.[kw.rankings.length - 1]?.position || '-';
                                            const prevRank = kw.rankings?.[kw.rankings.length - 2]?.position;
                                            const rankDiff = prevRank ? prevRank - (currentRank as number) : 0;

                                            return (
                                                <tr key={kw.id}>
                                                    <td className="px-4 fw-bold text-dark">{kw.keyword}</td>
                                                    <td className="text-center">
                                                        <span className={`badge rounded-pill fs-6 py-2 px-3 ${(currentRank as number) <= 3 ? 'bg-success' :
                                                                (currentRank as number) <= 10 ? 'bg-primary' : 'bg-secondary'
                                                            }`}>
                                                            #{currentRank}
                                                        </span>
                                                    </td>
                                                    <td>{(kw.volume || 0).toLocaleString()}</td>
                                                    <td>
                                                        <div className="d-flex align-items-center gap-2">
                                                            <div className="progress flex-grow-1" style={{ height: 4, width: 60 }}>
                                                                <div
                                                                    className={`progress-bar ${kw.difficulty! > 50 ? 'bg-danger' : 'bg-success'}`}
                                                                    style={{ width: `${kw.difficulty}%` }}
                                                                ></div>
                                                            </div>
                                                            <span className="small">{kw.difficulty}%</span>
                                                        </div>
                                                    </td>
                                                    <td>
                                                        {rankDiff > 0 ? (
                                                            <span className="text-success small fw-bold">↑ {rankDiff}</span>
                                                        ) : rankDiff < 0 ? (
                                                            <span className="text-danger small fw-bold">↓ {Math.abs(rankDiff)}</span>
                                                        ) : (
                                                            <span className="text-muted small">Stable</span>
                                                        )}
                                                    </td>
                                                    <td className="px-4 text-end">
                                                        <button
                                                            className="btn btn-sm btn-link text-danger text-decoration-none"
                                                            onClick={() => handleDelete(kw.id)}
                                                        >
                                                            Remove
                                                        </button>
                                                    </td>
                                                </tr>
                                            );
                                        })
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>

            <style jsx>{`
                .ls-1 { letter-spacing: 0.05rem; }
                .x-small { font-size: 0.7rem; }
                .uppercase { text-transform: uppercase; }
            `}</style>
        </div>
    );
}
