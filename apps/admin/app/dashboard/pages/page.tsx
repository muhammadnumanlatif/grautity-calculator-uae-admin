'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { getDocuments, COLLECTIONS } from '@gratuity/firebase-config/firestore';
import { Page } from '@gratuity/shared/types';
import styles from './pages.module.css';

// Helper to safely format date
const formatPageDate = (date: any): string => {
  if (!date) return 'N/A';

  try {
    // Handle Firestore Timestamp object (has toDate method)
    if (typeof date.toDate === 'function') {
      return date.toDate().toLocaleDateString();
    }

    // Handle serialized Timestamp (e.g. { seconds: 123, nanoseconds: 456 })
    if (typeof date.seconds === 'number') {
      return new Date(date.seconds * 1000).toLocaleDateString();
    }

    // Handle string or Date object
    const d = new Date(date);
    if (isNaN(d.getTime())) return 'Invalid Date';
    return d.toLocaleDateString();
  } catch (e) {
    return 'Invalid Date';
  }
};

// Helper to format slug into title case
const formatSlug = (slug: string): string => {
  return slug
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
};

export default function PagesManager() {
  const [pages, setPages] = useState<Page[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  useEffect(() => {
    const fetchPages = async () => {
      try {
        const data = await getDocuments<Page>(COLLECTIONS.PAGES);
        setPages(data);
      } catch (err) {
        console.error('Failed to fetch pages:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchPages();
  }, []);

  const filteredPages = pages.filter(page => {
    const matchesSearch = (page.title || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
      (page.slug || '').toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || (page.status || 'draft') === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className={`container-fluid py-4 ${styles.pagesContainer}`}>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h1 className="h3 fw-bold mb-1">Pages</h1>
          <p className="text-muted small mb-0">Manage your website&apos;s static landing pages</p>
        </div>
        <Link href="/dashboard/pages/new" className="btn btn-primary d-flex align-items-center gap-2">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="12" y1="5" x2="12" y2="19" />
            <line x1="5" y1="12" x2="19" y2="12" />
          </svg>
          Create New Page
        </Link>
      </div>

      <div className="card border-0 shadow-sm rounded-4 overflow-hidden">
        <div className="card-header bg-white py-3 border-bottom border-light">
          <div className="row align-items-center g-3">
            <div className="col-md-5">
              <div className="input-group input-group-sm">
                <span className="input-group-text bg-light border-0 px-3">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="11" cy="11" r="8" />
                    <line x1="21" y1="21" x2="16.65" y2="16.65" />
                  </svg>
                </span>
                <input
                  type="text"
                  className="form-control bg-light border-0"
                  placeholder="Search by title or slug..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
            <div className="col-md-3">
              <select
                className="form-select form-select-sm bg-light border-0"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                <option value="all">All Statuses</option>
                <option value="published">Published</option>
                <option value="draft">Draft</option>
                <option value="scheduled">Scheduled</option>
              </select>
            </div>
            <div className="col-md-4 text-md-end">
              <span className="text-muted x-small uppercase fw-bold ls-1">{filteredPages.length} active documents</span>
            </div>
          </div>
        </div>
        <div className="table-responsive">
          <table className="table table-hover align-middle mb-0">
            <thead className="table-light">
              <tr>
                <th className="px-4 py-3 text-muted x-small uppercase fw-bold ls-1">Page Title</th>
                <th className="py-3 text-muted x-small uppercase fw-bold ls-1">Route</th>
                <th className="py-3 text-muted x-small uppercase fw-bold ls-1">Status</th>
                <th className="py-3 text-muted x-small uppercase fw-bold ls-1">SEO Score</th>
                <th className="py-3 text-muted x-small uppercase fw-bold ls-1">Last Update</th>
                <th className="px-4 py-3 text-end text-muted x-small uppercase fw-bold ls-1">Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={6} className="text-center py-5">
                    <div className="spinner-border text-primary spinner-border-sm me-2" role="status"></div>
                    <span className="text-muted small">Loading documents from Firebase...</span>
                  </td>
                </tr>
              ) : filteredPages.length === 0 ? (
                <tr>
                  <td colSpan={6} className="text-center py-5">
                    <div className="mb-3 display-6 opacity-25">📄</div>
                    <p className="text-muted small mb-0">No pages found matching your search.</p>
                  </td>
                </tr>
              ) : (
                filteredPages.map((page) => (
                  <tr key={page.id} className={styles.tableRow}>
                    <td className="px-4">
                      <div className="fw-bold text-dark">{page.title || (page.slug ? formatSlug(page.slug) : 'Untitled Page')}</div>
                      <div className="text-muted x-small">ID: {page.id.substring(0, 8)}...</div>
                    </td>
                    <td><code className="bg-light px-2 py-1 rounded text-primary" style={{ fontSize: '0.8rem' }}>/{page.slug || ''}</code></td>
                    <td>
                      <span className={`badge rounded-pill ${(page.status || 'draft') === 'published' ? 'bg-success-subtle text-success' :
                        (page.status || 'draft') === 'draft' ? 'bg-warning-subtle text-warning' : 'bg-secondary-subtle text-secondary'
                        }`}>
                        {(page.status || 'draft').charAt(0).toUpperCase() + (page.status || 'draft').slice(1)}
                      </span>
                    </td>
                    <td>
                      <div className="d-flex align-items-center gap-2">
                        <div className="progress flex-grow-1" style={{ height: '4px', width: '60px' }}>
                          <div
                            className={`progress-bar ${(page.seo?.seoScore || 0) > 80 ? 'bg-success' :
                              (page.seo?.seoScore || 0) > 50 ? 'bg-warning' : 'bg-danger'
                              }`}
                            style={{ width: `${page.seo?.seoScore || 0}%` }}
                          ></div>
                        </div>
                        <span className={`small fw-bold ${(page.seo?.seoScore || 0) > 80 ? 'text-success' :
                          (page.seo?.seoScore || 0) > 50 ? 'text-warning' : 'text-danger'
                          }`}>
                          {page.seo?.seoScore || 0}
                        </span>
                      </div>
                    </td>
                    <td className="text-muted small">
                      {formatPageDate(page.updatedAt || page.createdAt)}
                    </td>
                    <td className="px-4 text-end">
                      <div className="btn-group btn-group-sm rounded shadow-sm">
                        <Link href={`/dashboard/pages/edit/${page.id}`} className="btn btn-white border">
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="me-1">
                            <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                            <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                          </svg>
                          Edit
                        </Link>
                        <a href={`/preview/${page.slug}`} target="_blank" className="btn btn-white border">
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                            <circle cx="12" cy="12" r="3" />
                          </svg>
                        </a>
                      </div>
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
