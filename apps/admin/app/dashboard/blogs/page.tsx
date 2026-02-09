'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { getDocuments, COLLECTIONS } from '@gratuity/firebase-config/firestore';
import { BlogPost } from '@gratuity/shared/types';

export default function BlogsManager() {
    const [blogs, setBlogs] = useState<BlogPost[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        const fetchBlogs = async () => {
            try {
                const data = await getDocuments<BlogPost>(COLLECTIONS.BLOGS);
                setBlogs(data);
            } catch (err) {
                console.error('Failed to fetch blogs:', err);
            } finally {
                setLoading(false);
            }
        };
        fetchBlogs();
    }, []);

    const filteredBlogs = blogs.filter(blog =>
        blog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        blog.slug.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="container-fluid py-4">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <div>
                    <h1 className="h3 fw-bold mb-1">Blog Posts</h1>
                    <p className="text-muted small mb-0">Educate your audience with high-quality content</p>
                </div>
                <Link href="/dashboard/blogs/new" className="btn btn-primary d-flex align-items-center gap-2">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <line x1="12" y1="5" x2="12" y2="19" />
                        <line x1="5" y1="12" x2="19" y2="12" />
                    </svg>
                    New Post
                </Link>
            </div>

            <div className="card border-0 shadow-sm rounded-4 overflow-hidden">
                <div className="card-header bg-white py-3">
                    <div className="row align-items-center">
                        <div className="col-md-6">
                            <div className="input-group">
                                <input
                                    type="text"
                                    className="form-control bg-light border-0"
                                    placeholder="Search articles..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="table-responsive">
                    <table className="table table-hover align-middle mb-0">
                        <thead className="table-light">
                            <tr>
                                <th className="px-4">Article</th>
                                <th>Category</th>
                                <th>Status</th>
                                <th>SEO</th>
                                <th>Published</th>
                                <th className="px-4 text-end">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {loading ? (
                                <tr><td colSpan={6} className="text-center py-5">Loading blogs...</td></tr>
                            ) : filteredBlogs.length === 0 ? (
                                <tr><td colSpan={6} className="text-center py-5 text-muted">No blog posts found.</td></tr>
                            ) : (
                                filteredBlogs.map((blog) => (
                                    <tr key={blog.id}>
                                        <td className="px-4">
                                            <div className="fw-bold">{blog.title}</div>
                                            <div className="text-muted small">/{blog.slug}</div>
                                        </td>
                                        <td><span className="badge bg-light text-dark border">{blog.category}</span></td>
                                        <td>
                                            <span className={`badge ${blog.status === 'published' ? 'bg-success' : 'bg-warning'}`}>
                                                {blog.status}
                                            </span>
                                        </td>
                                        <td>{blog.seo?.seoScore || 0}%</td>
                                        <td className="small text-muted">{blog.publishedAt ? new Date(blog.publishedAt).toLocaleDateString() : 'Draft'}</td>
                                        <td className="px-4 text-end">
                                            <Link href={`/dashboard/blogs/edit/${blog.id}`} className="btn btn-sm btn-outline-primary shadow-sm">
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
        </div>
    );
}
