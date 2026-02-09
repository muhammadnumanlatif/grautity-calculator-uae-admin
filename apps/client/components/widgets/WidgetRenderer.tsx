

import React from 'react';
import Link from 'next/link';
import { Widget } from '@gratuity/shared/types';
import NewsletterForm from '@/components/forms/NewsletterForm';

interface WidgetRendererProps {
    widgets: Widget[];
}

export default function WidgetRenderer({ widgets }: WidgetRendererProps) {
    if (!widgets || widgets.length === 0) return null;

    return (
        <div className="d-flex flex-column gap-4">
            {widgets.map((widget) => (
                <WidgetCard key={widget.id} widget={widget} />
            ))}
        </div>
    );
}

async function WidgetCard({ widget }: { widget: Widget }) {
    if (!widget.isActive) return null;

    const { type, title, config } = widget;

    switch (type) {
        case 'mini_calculator':
            return (
                <div className="card border-0 shadow-sm rounded-4 p-4">
                    <h5 className="fw-bold mb-3">{title || 'Calculate Gratuity'}</h5>
                    <p className="text-muted small mb-3">
                        {config?.description || 'Get a quick estimate of your end of service gratuity.'}
                    </p>
                    <Link href="/#calculator" className="btn btn-primary w-100">
                        {config?.buttonText || 'Calculate Now'}
                    </Link>
                </div>
            );

        case 'newsletter_box':
            return (
                <div className="card border-0 shadow-sm rounded-4 p-4 bg-light">
                    <h5 className="fw-bold mb-3">{title || 'Stay Updated'}</h5>
                    <p className="text-muted small mb-3">
                        {config?.description || 'Get the latest UAE labor law updates directly to your inbox.'}
                    </p>
                    <NewsletterForm variant="sidebar" />
                </div>
            );

        case 'cta_banner':
            return (
                <div className="card border-0 shadow-sm rounded-4 p-4 bg-primary text-white">
                    <h5 className="fw-bold mb-2">{title}</h5>
                    {config?.description && <p className="small opacity-75 mb-3">{config.description}</p>}
                    <Link href={config?.buttonLink || '#'} className="btn btn-light btn-sm w-100 fw-bold text-primary">
                        {config?.buttonText || 'Learn More'}
                    </Link>
                </div>
            );

        case 'custom_html':
            if (!config?.html) return null;
            return (
                <div className="card border-0 shadow-sm rounded-4 p-4">
                    {title && <h5 className="fw-bold mb-3">{title}</h5>}
                    <div dangerouslySetInnerHTML={{ __html: config.html }} />
                </div>
            );

        case 'social_proof':
            return (
                <div className="card border-0 shadow-sm rounded-4 p-4">
                    <h5 className="fw-bold mb-3">{title || 'Trusted By'}</h5>
                    <div className="d-flex flex-column gap-2">
                        <div className="d-flex align-items-center gap-2 text-muted small">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" className="text-warning">
                                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                            </svg>
                            <span>100,000+ Calculations</span>
                        </div>
                        <div className="d-flex align-items-center gap-2 text-muted small">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" className="text-warning">
                                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                            </svg>
                            <span>MOHRE Compliant Logic</span>
                        </div>
                    </div>
                </div>
            );

        case 'recent_posts':
            try {
                const { getPublishedBlogs } = await import('@gratuity/firebase-config/firestore');
                const limitCount = config?.count ? parseInt(config.count) : 5;
                const posts = await getPublishedBlogs(limitCount);

                if (!posts || posts.length === 0) return null;

                return (
                    <div className="card border-0 shadow-sm rounded-4 p-4">
                        <h5 className="fw-bold mb-3">{title || 'Recent Posts'}</h5>
                        <div className="d-flex flex-column gap-3">
                            {posts.map((post: any) => {
                                const date = post.publishedAt?.toDate ? post.publishedAt.toDate() : new Date(post.publishedAt);
                                return (
                                    <Link key={post.slug} href={`/blog/${post.slug}`} className="text-decoration-none">
                                        <h6 className="text-dark fw-semibold mb-1" style={{ fontSize: '0.95rem', lineHeight: '1.4' }}>{post.title}</h6>
                                        <small className="text-muted" style={{ fontSize: '0.8rem' }}>
                                            {date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                                        </small>
                                    </Link>
                                );
                            })}
                        </div>
                    </div>
                );
            } catch (error) {
                console.error('Failed to load recent posts widget:', error);
                return null;
            }

        default:
            return null;
    }
}
