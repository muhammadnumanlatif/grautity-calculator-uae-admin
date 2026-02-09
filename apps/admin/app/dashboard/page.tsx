'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { getDocuments, COLLECTIONS, subscribeToDocuments, limit } from '@gratuity/firebase-config/firestore';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  AreaChart, Area
} from 'recharts';

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    pages: 0,
    blogs: 0,
    locations: 0,
    calculations: 24500,
    activeMenus: 0,
    draftMenus: 0
  });

  const chartData = [
    { name: 'Mon', calculations: 400, rank: 12 },
    { name: 'Tue', calculations: 300, rank: 11 },
    { name: 'Wed', calculations: 550, rank: 10 },
    { name: 'Thu', calculations: 700, rank: 8 },
    { name: 'Fri', calculations: 900, rank: 6 },
    { name: 'Sat', calculations: 1200, rank: 4 },
    { name: 'Sun', calculations: 1500, rank: 3 },
  ];

  const [dbStatus, setDbStatus] = useState('Connect');

  useEffect(() => {
    // Subscribe to realtime counts from Firebase
    const unsubPages = subscribeToDocuments(COLLECTIONS.PAGES, [], (docs) => {
      setStats(prev => ({ ...prev, pages: docs.length }));
    });

    const unsubBlogs = subscribeToDocuments(COLLECTIONS.BLOGS, [], (docs) => {
      setStats(prev => ({ ...prev, blogs: docs.length }));
    });

    const unsubLocations = subscribeToDocuments(COLLECTIONS.LOCATIONS, [], (docs) => {
      setStats(prev => ({ ...prev, locations: docs.length }));
    });

    // Realtime connection status check
    // We listen to a reliable collection (pages) to check if we are getting live data or cache
    const unsubStatus = subscribeToDocuments(COLLECTIONS.SITE_SETTINGS, [limit(1)], (docs) => {
      setDbStatus('Active');
    }, (err) => {
      setDbStatus('Error');
    });

    const unsubCalcs = subscribeToDocuments(COLLECTIONS.CALCULATIONS, [], (docs) => {
      if (docs.length > 0) {
        setStats(prev => ({ ...prev, calculations: docs.length }));
      }
    });

    const unsubMenus = subscribeToDocuments(COLLECTIONS.MENUS, [], (docs) => {
      const active = docs.filter(d => d.isActive).length;
      const draft = docs.length - active;
      setStats(prev => ({ ...prev, activeMenus: active, draftMenus: draft }));
    });

    // Cleanup subscriptions
    return () => {
      unsubPages();
      unsubBlogs();
      unsubLocations();
      unsubCalcs();
      unsubStatus();
      unsubMenus();
    };
  }, []);

  const cards = [
    { label: 'Total Pages', value: stats.pages, icon: '📄', color: 'primary' },
    { label: 'Blog Posts', value: stats.blogs, icon: '✍️', color: 'success' },
    { label: 'Managed Locations', value: stats.locations, icon: '📍', color: 'info' },
    { label: 'Total Calculations', value: stats.calculations.toLocaleString(), icon: '🧮', color: 'warning' },
  ];

  return (
    <div className="container-fluid py-4">
      <div className="mb-4">
        <h1 className="h3 fw-bold">Welcome back, Admin</h1>
        <p className="text-muted">Here&apos;s what&apos;s happening with Gratuity Calculator UAE today.</p>
      </div>

      <div className="row g-3 mb-4">
        {cards.map((card, i) => (
          <div key={i} className="col-md-3">
            <div className="card border-0 shadow-sm rounded-4 p-4 overflow-hidden position-relative">
              <div className="position-absolute end-0 top-0 p-3 opacity-25 display-6">{card.icon}</div>
              <div className="text-muted x-small uppercase fw-bold mb-1">{card.label}</div>
              <div className="h2 fw-bold mb-0">{card.value}</div>
            </div>
          </div>
        ))}
      </div>

      <div className="row g-4">
        {/* Growth Chart */}
        <div className="col-lg-8">
          <div className="card border-0 shadow-sm rounded-4 p-4">
            <div className="d-flex justify-content-between align-items-center mb-4">
              <h5 className="fw-bold mb-0">Calculation Volume (Weekly)</h5>
              <select className="form-select form-select-sm w-auto border-0 bg-light">
                <option>Last 7 Days</option>
                <option>Last 30 Days</option>
              </select>
            </div>
            <div style={{ width: '100%', height: 300 }}>
              <ResponsiveContainer>
                <AreaChart data={chartData}>
                  <defs>
                    <linearGradient id="colorCalc" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#0066cc" stopOpacity={0.1} />
                      <stop offset="95%" stopColor="#0066cc" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#999' }} dx={-10} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#999' }} />
                  <Tooltip
                    contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 20px rgba(0,0,0,0.1)' }}
                  />
                  <Area
                    type="monotone"
                    dataKey="calculations"
                    stroke="#0066cc"
                    strokeWidth={3}
                    fillOpacity={1}
                    fill="url(#colorCalc)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="col-lg-4">
          <div className="card border-0 shadow-sm rounded-4 p-4 mb-4">
            <h5 className="fw-bold mb-3 text-primary">Quick Actions</h5>
            <div className="d-grid gap-2">
              <Link href="/dashboard/blogs/new" className="btn btn-light border text-start py-3 px-3 d-flex align-items-center gap-3">
                <span className="fs-4">📝</span>
                <div>
                  <div className="fw-bold small">Write Blog Post</div>
                  <div className="text-muted x-small">Publish new content</div>
                </div>
              </Link>
              <Link href="/dashboard/pages/new" className="btn btn-light border text-start py-3 px-3 d-flex align-items-center gap-3">
                <span className="fs-4">📄</span>
                <div>
                  <div className="fw-bold small">Create Page</div>
                  <div className="text-muted x-small">Add a new landing page</div>
                </div>
              </Link>
              <Link href="/dashboard/seo" className="btn btn-light border text-start py-3 px-3 d-flex align-items-center gap-3">
                <span className="fs-4">🚀</span>
                <div>
                  <div className="fw-bold small">SEO Tools</div>
                  <div className="text-muted x-small">Optimize presence</div>
                </div>
              </Link>
              <Link href="/dashboard/media" className="btn btn-light border text-start py-3 px-3 d-flex align-items-center gap-3">
                <span className="fs-4">🖼️</span>
                <div>
                  <div className="fw-bold small">Media Library</div>
                  <div className="text-muted x-small">Manage assets & uploads</div>
                </div>
              </Link>
            </div>
          </div>

          <div className="card shadow-sm rounded-4 p-4 border-0 bg-expert-gradient text-white overflow-hidden position-relative">
            <div className="position-absolute end-0 bottom-0 p-2 opacity-10">
              <svg width="100" height="100" viewBox="0 0 24 24" fill="white">
                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
              </svg>
            </div>
            <h6 className="fw-bold mb-3 ls-1">SYSTEM HEALTH</h6>
            <div className="mb-3">
              <div className="d-flex justify-content-between small opacity-75 mb-1">
                <span>Database Connectivity</span>
                <span>{dbStatus}</span>
              </div>
              <div className="progress bg-white-20" style={{ height: '3px' }}>
                <div className={`progress-bar bg-white ${dbStatus !== 'Active' ? 'opacity-50' : ''}`} style={{ width: dbStatus === 'Active' ? '100%' : '50%' }}></div>
              </div>
            </div>
            <div>
              <div className="d-flex justify-content-between small opacity-75 mb-1">
                <span>Cloud Functions</span>
                <span>99.9%</span>
              </div>
              <div className="progress bg-white-20" style={{ height: '3px' }}>
                <div className="progress-bar bg-white" style={{ width: '99%' }}></div>
              </div>
            </div>
          </div>

          {/* Menu Health Widget */}
          <div className="card shadow-sm rounded-4 p-4 border-0 mt-4 bg-light">
            <h6 className="fw-bold mb-3 text-secondary ls-1 uppercase x-small">Navigation Health</h6>
            <div className="d-flex justify-content-between align-items-center mb-2">
              <span className="small text-muted">Active Menus</span>
              <span className="badge bg-success rounded-pill">{stats.activeMenus}</span>
            </div>
            <div className="d-flex justify-content-between align-items-center mb-3">
              <span className="small text-muted">Draft/Inactive</span>
              <span className="badge bg-secondary rounded-pill">{stats.draftMenus}</span>
            </div>
            <div className="progress rounded-pill mb-3" style={{ height: '8px' }}>
              <div
                className="progress-bar bg-success"
                style={{ width: `${(stats.activeMenus / (stats.activeMenus + stats.draftMenus || 1)) * 100}%` }}
              ></div>
            </div>
            <Link href="/dashboard/menus" className="btn btn-sm btn-white border w-100 shadow-xs">
              Manage Links
            </Link>
          </div>
        </div>
      </div>

      <style jsx>{`
        .x-small { font-size: 0.7rem; }
        .uppercase { text-transform: uppercase; }
        .bg-white-20 { background: rgba(255,255,255,0.2); }
        .ls-1 { letter-spacing: 1px; }
        .bg-expert-gradient {
            background: linear-gradient(135deg, #004d99 0%, #001a33 100%);
        }
      `}</style>
    </div>
  );
}
