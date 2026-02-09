'use client';

import { useState } from 'react';

export default function SEODashboard() {
    const [activeTab, setActiveTab] = useState('overview');

    const stats = [
        { label: 'Avg. SEO Score', value: '88%', trend: '+2%', color: 'success' },
        { label: 'Keywords in Top 10', value: '42', trend: '+5', color: 'primary' },
        { label: 'Total Indexed Pages', value: '184', trend: '+12', color: 'info' },
        { label: 'Avg. Click-Through Rate', value: '3.4%', trend: '-0.1%', color: 'warning' },
    ];

    const topKeywords = [
        { keyword: 'gratuity calculator uae', volume: '15k', difficulty: 45, rank: 2, status: 'stable' },
        { keyword: 'end of service benefits dubai', volume: '8.2k', difficulty: 38, rank: 4, status: 'rising' },
        { keyword: 'unlimited contract resignation gratuity', volume: '4.5k', difficulty: 55, rank: 7, status: 'rising' },
        { keyword: 'mohre gratuity calculator', volume: '12k', difficulty: 50, rank: 1, status: 'stable' },
        { keyword: 'difc gratuity rules', volume: '2.1k', difficulty: 30, rank: 5, status: 'falling' },
    ];

    return (
        <div className="container-fluid py-4">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <div>
                    <h1 className="h3 fw-bold mb-1">SEO Command Center</h1>
                    <p className="text-muted small mb-0">Monitor rankings, optimize content, and dominate SERPs</p>
                </div>
                <div className="d-flex gap-2">
                    <button className="btn btn-outline-primary d-flex align-items-center gap-2">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
                        </svg>
                        Sync Search Console
                    </button>
                </div>
            </div>

            {/* Main Stats */}
            <div className="row g-3 mb-4">
                {stats.map((stat, i) => (
                    <div key={i} className="col-md-3">
                        <div className="card border-0 shadow-sm rounded-4 p-3">
                            <div className="text-muted x-small uppercase fw-bold mb-2">{stat.label}</div>
                            <div className="d-flex align-items-end gap-2">
                                <span className={`h2 mb-0 fw-bold text-${stat.color}`}>{stat.value}</span>
                                <span className={`small pb-1 ${stat.trend.startsWith('+') ? 'text-success' : 'text-danger'}`}>
                                    {stat.trend}
                                </span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <div className="row g-4">
                {/* Top Keywords */}
                <div className="col-lg-8">
                    <div className="card border-0 shadow-sm rounded-4 overflow-hidden">
                        <div className="card-header bg-white py-3 border-0">
                            <h5 className="mb-0 fw-bold">Top Performing Keywords</h5>
                        </div>
                        <div className="table-responsive">
                            <table className="table table-hover align-middle mb-0">
                                <thead className="table-light">
                                    <tr>
                                        <th className="px-4">Keyword</th>
                                        <th>Volume</th>
                                        <th>Difficulty</th>
                                        <th>Rank</th>
                                        <th className="px-4">Trend</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {topKeywords.map((kw, i) => (
                                        <tr key={i}>
                                            <td className="px-4 fw-medium">{kw.keyword}</td>
                                            <td className="small">{kw.volume}</td>
                                            <td>
                                                <div className="progress" style={{ height: '4px', width: '60px' }}>
                                                    <div
                                                        className={`progress-bar ${kw.difficulty > 50 ? 'bg-danger' : 'bg-success'}`}
                                                        style={{ width: `${kw.difficulty}%` }}
                                                    ></div>
                                                </div>
                                            </td>
                                            <td>
                                                <span className={`badge ${kw.rank <= 3 ? 'bg-success' : 'bg-primary'}`}>#{kw.rank}</span>
                                            </td>
                                            <td className="px-4">
                                                <span className={`small ${kw.status === 'rising' ? 'text-success' : kw.status === 'falling' ? 'text-danger' : 'text-muted'}`}>
                                                    {kw.status.toUpperCase()}
                                                </span>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

                {/* SEO Tools */}
                <div className="col-lg-4">
                    <div className="card border-0 shadow-sm rounded-4 p-4 mb-4">
                        <h5 className="fw-bold mb-3">SEO Management</h5>
                        <div className="d-grid gap-2">
                            <a href="/dashboard/seo/keywords" className="btn btn-light border text-start py-3 px-3 d-flex align-items-center gap-3">
                                <span className="fs-4">🎯</span>
                                <div>
                                    <div className="fw-bold small">Keyword Tracker</div>
                                    <div className="text-muted x-small">Manage target search terms</div>
                                </div>
                            </a>
                            <a href="/dashboard/seo/redirects" className="btn btn-light border text-start py-3 px-3 d-flex align-items-center gap-3">
                                <span className="fs-4">🔗</span>
                                <div>
                                    <div className="fw-bold small">Redirect Manager</div>
                                    <div className="text-muted x-small">Maintain link authority</div>
                                </div>
                            </a>
                        </div>
                    </div>

                    <div className="card border-0 shadow-sm rounded-4 p-4 mb-4">
                        <h5 className="fw-bold mb-3 text-primary">AI SEO Copilot</h5>
                        <p className="text-muted small">Generate meta tags and FAQ schemas automatically using AI.</p>
                        <button className="btn btn-primary w-100 py-3 rounded-3 mb-2 fw-bold shadow-sm">Bulk Optimize Pages</button>
                    </div>

                    <div className="card border-0 shadow-sm rounded-4 p-4 bg-dark text-white shadow-lg">
                        <h5 className="fw-bold mb-3 text-info">Technical Health</h5>
                        <div className="d-flex justify-content-between mb-3 border-bottom border-secondary pb-2">
                            <span className="small opacity-75">Sitemap.xml</span>
                            <span className="badge bg-success">Active</span>
                        </div>
                        <div className="d-flex justify-content-between mb-3 border-bottom border-secondary pb-2">
                            <span className="small opacity-75">Robots.txt</span>
                            <span className="badge bg-success">Valid</span>
                        </div>
                        <div className="d-flex justify-content-between">
                            <span className="small opacity-75">Last GSC Sync</span>
                            <span className="small text-info">Just now</span>
                        </div>
                    </div>
                </div>
            </div>

            <style jsx>{`
        .x-small { font-size: 0.7rem; }
        .uppercase { text-transform: uppercase; }
      `}</style>
        </div>
    );
}
