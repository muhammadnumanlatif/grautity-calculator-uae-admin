'use client';

import React from 'react';
import Link from 'next/link';
import { PageBlock } from '@gratuity/shared';
import Image from 'next/image';
import GratuityCalculator from '@/components/calculator/GratuityCalculator';
import FAQSection from '@/components/sections/FAQSection';
import { useInterlinks } from '@/lib/hooks/useInterlinks';

interface BlockRendererProps {
    blocks: PageBlock[];
}

export default function BlockRenderer({ blocks }: BlockRendererProps) {
    if (!blocks || blocks.length === 0) return null;

    return (
        <>
            {blocks.map((block, index) => {
                switch (block.type) {
                    case 'hero':
                        return <HeroBlock key={index} data={block.data} />;
                    case 'calculator':
                        return <CalculatorBlock key={index} data={block.data} />;
                    case 'rich-text':
                        return <RichTextBlock key={index} data={block.data} />;
                    case 'table':
                        return <TableBlock key={index} data={block.data} />;
                    case 'faq':
                        return <FAQBlock key={index} data={block.data} />;
                    case 'cta':
                        return <CTABlock key={index} data={block.data} />;
                    case 'cards':
                        return <CardsBlock key={index} data={block.data} />;
                    case 'image':
                        return <ImageBlock key={index} data={block.data} />;
                    case 'heading':
                        return <HeadingBlock key={index} data={block.data} />;
                    case 'paragraph':
                        return <ParagraphBlock key={index} data={block.data} />;
                    case 'video':
                        return <VideoBlock key={index} data={block.data} />;
                    case 'link':
                        return <LinkBlock key={index} data={block.data} />;
                    case 'shortcode':
                        return <ShortcodeBlock key={index} data={block.data} />;
                    case 'html':
                        return <HTMLBlock key={index} data={block.data} />;
                    case 'separator':
                        return <SeparatorBlock key={index} data={block.data} />;
                    case 'table-of-contents':
                        return <TableOfContentsBlock key={index} data={block.data} />;
                    case 'interlink':
                        return <InterlinkBlock key={index} data={block.data} />;
                    case 'location-list':
                        return <LocationListBlock key={index} data={block.data} />;
                    default:
                        return null;
                }
            })}
        </>
    );
}

// Sub-components for each block type

function HeroBlock({ data }: { data: any }) {
    return (
        <section className="hero-section py-5 bg-light">
            <div className="container">
                {data.breadcrumbs && (
                    <nav aria-label="breadcrumb" className="mb-4">
                        <ol className="breadcrumb">
                            {data.breadcrumbs.map((crumb: any, idx: number) => (
                                <li key={idx} className={`breadcrumb-item ${idx === data.breadcrumbs.length - 1 ? 'active' : ''}`}>
                                    {idx === data.breadcrumbs.length - 1 ? (
                                        crumb.name
                                    ) : (
                                        <Link href={crumb.url}>{crumb.name}</Link>
                                    )}
                                </li>
                            ))}
                        </ol>
                    </nav>
                )}
                <h1>{data.title}</h1>
                {data.subtitle && <p className="lead">{data.subtitle}</p>}
                {data.lead && <div className="mt-3" dangerouslySetInnerHTML={{ __html: data.lead }} />}

                {(data.lastUpdated || data.readingTime) && (
                    <div className="d-flex gap-3 text-muted mt-4 small">
                        {data.lastUpdated && <span>Last Updated: {data.lastUpdated}</span>}
                        {data.readingTime && <span>• Reading Time: {data.readingTime}</span>}
                    </div>
                )}
            </div>
        </section>
    );
}

function CalculatorBlock({ data }: { data: any }) {
    return (
        <section className="section py-5">
            <div className="container">
                <div className="row">
                    <div className="col-lg-8 mx-auto">
                        {data.title && <h2 className="text-center mb-4">{data.title}</h2>}
                        {data.description && <p className="text-center mb-5">{data.description}</p>}
                        <GratuityCalculator defaultContractType={data.defaultContractType || 'unlimited'} />
                    </div>
                </div>
            </div>
        </section>
    );
}

function RichTextBlock({ data }: { data: any }) {
    return (
        <section className="section py-5">
            <div className="container">
                {data.title && <h2 className="mb-4">{data.title}</h2>}
                <div className="content" dangerouslySetInnerHTML={{ __html: data.content }} />
            </div>
        </section>
    );
}

function TableBlock({ data }: { data: any }) {
    return (
        <section className="section py-5 bg-light">
            <div className="container">
                {data.title && <h3 className="mb-4">{data.title}</h3>}
                <div className="table-responsive">
                    <table className="table table-bordered table-striped bg-white">
                        <thead>
                            <tr>
                                {data.headers.map((header: string, idx: number) => (
                                    <th key={idx}>{header}</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {data.rows.map((row: { cells: string[] }, idx: number) => (
                                <tr key={idx}>
                                    {row.cells.map((cell: string, cellIdx: number) => (
                                        <td key={cellIdx} dangerouslySetInnerHTML={{ __html: cell }} />
                                    ))}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </section>
    );
}

function FAQBlock({ data }: { data: any }) {
    return (
        <FAQSection
            faqs={data.items}
            title={data.title || "Frequently Asked Questions"}
            subtitle={data.subtitle}
        />
    );
}

function CTABlock({ data }: { data: any }) {
    return (
        <section className="section py-5 bg-dark text-white text-center">
            <div className="container">
                <h2 className="mb-4">{data.title}</h2>
                {data.description && <p className="lead mb-4">{data.description}</p>}
                <div className="d-flex justify-content-center gap-3">
                    {data.buttons.map((btn: any, idx: number) => (
                        <Link
                            key={idx}
                            href={btn.url}
                            className={`btn btn-lg ${btn.variant === 'primary' ? 'btn-primary' : 'btn-outline-light'}`}
                        >
                            {btn.label}
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
}

function CardsBlock({ data }: { data: any }) {
    return (
        <section className="section py-5">
            <div className="container">
                {data.title && <h2 className="mb-4">{data.title}</h2>}
                <div className="row g-4">
                    {data.items.map((item: any, idx: number) => (
                        <div key={idx} className="col-md-6 col-lg-4">
                            <div className="card h-100 shadow-sm">
                                <div className="card-body">
                                    <h5 className="card-title">{item.title}</h5>
                                    {item.badge && (
                                        <span className={`badge bg-${item.badge.variant} mb-2`}>
                                            {item.badge.text}
                                        </span>
                                    )}
                                    {item.content && (
                                        <div className="card-text">
                                            {Array.isArray(item.content) ? (
                                                <ul className="pl-3 mb-0">
                                                    {item.content.map((li: string, i: number) => (
                                                        <li key={i}>{li}</li>
                                                    ))}
                                                </ul>
                                            ) : (
                                                <p>{item.content}</p>
                                            )}
                                        </div>
                                    )}
                                </div>
                                {item.footer && (
                                    <div className="card-footer bg-transparent border-top-0">
                                        <small className="text-muted">{item.footer}</small>
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

function ImageBlock({ data }: { data: any }) {
    const alignmentClass = {
        'left': 'text-start',
        'center': 'text-center',
        'right': 'text-end',
        'full-width': 'w-100'
    }[data.alignment as string] || 'text-center';

    const img = (
        /* eslint-disable-next-line @next/next/no-img-element */
        <img
            src={data.url}
            alt={data.alt || 'Page Content Image'}
            width={data.width}
            height={data.height}
            className={`img-fluid ${data.alignment === 'full-width' ? 'w-100' : ''} rounded shadow-sm`}
        />
    );

    return (
        <section className={`section py-4 ${alignmentClass}`}>
            <div className="container">
                {data.link ? (
                    <Link href={data.link} target="_blank">{img}</Link>
                ) : img}
                {data.caption && <div className="text-muted small mt-2 text-center">{data.caption}</div>}
            </div>
        </section>
    );
}

function HeadingBlock({ data }: { data: any }) {
    const Tag = data.level || 'h2';
    const alignmentClass = {
        'left': 'text-start',
        'center': 'text-center',
        'right': 'text-end'
    }[data.alignment as string] || 'text-start';

    return (
        <section className="section py-3">
            <div className="container">
                <Tag
                    id={data.id}
                    className={`${alignmentClass} mb-3 font-weight-bold`}
                >
                    {data.text}
                </Tag>
            </div>
        </section>
    );
}

function ParagraphBlock({ data }: { data: any }) {
    const alignmentClass = {
        'left': 'text-start',
        'center': 'text-center',
        'right': 'text-end',
        'justify': 'text-justify'
    }[data.alignment as string] || 'text-start';

    const sizeClass = {
        'small': 'small',
        'base': '',
        'large': 'lead',
        'lead': 'lead fs-4'
    }[data.textSize as string] || '';

    return (
        <section className="section py-2">
            <div className="container">
                <p className={`${alignmentClass} ${sizeClass}`}>{data.content}</p>
            </div>
        </section>
    );
}

function VideoBlock({ data }: { data: any }) {
    let videoContent;

    if (data.provider === 'youtube') {
        // Extract video ID if full URL is provided, otherwise assume it's the ID
        const videoId = data.url.includes('v=') ? data.url.split('v=')[1].split('&')[0] : data.url.split('/').pop();
        videoContent = (
            <div className="ratio ratio-16x9">
                <iframe
                    src={`https://www.youtube.com/embed/${videoId}?rel=0${data.autoplay ? '&autoplay=1' : ''}${data.controls === false ? '&controls=0' : ''}`}
                    title="YouTube video"
                    allowFullScreen
                    className="rounded shadow"
                ></iframe>
            </div>
        );
    } else if (data.provider === 'vimeo') {
        const videoId = data.url.split('/').pop();
        videoContent = (
            <div className="ratio ratio-16x9">
                <iframe
                    src={`https://player.vimeo.com/video/${videoId}`}
                    title="Vimeo video"
                    allowFullScreen
                    className="rounded shadow"
                ></iframe>
            </div>
        );
    } else {
        // Custom video
        videoContent = (
            <video
                src={data.url}
                className="w-100 rounded shadow"
                controls={data.controls !== false}
                autoPlay={data.autoplay}
                loop={data.loop}
                poster={data.poster}
            />
        );
    }

    return (
        <section className="section py-5">
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-lg-10">
                        {videoContent}
                    </div>
                </div>
            </div>
        </section>
    );
}

function LinkBlock({ data }: { data: any }) {
    const styleClass = {
        'button-primary': 'btn btn-primary',
        'button-secondary': 'btn btn-secondary',
        'link-text': 'text-decoration-underline'
    }[data.style as string] || 'text-primary';

    return (
        <section className="section py-3">
            <div className="container text-center">
                <Link
                    href={data.url}
                    target={data.target || '_self'}
                    className={`${styleClass} d-inline-flex align-items-center gap-2`}
                >
                    {data.icon && <i className={data.icon}></i>}
                    {data.label}
                </Link>
            </div>
        </section>
    );
}

function ShortcodeBlock({ data }: { data: any }) {
    // Placeholder for shortcode renderer
    // In a real app, you would have a map of shortcode keys to components
    // For now, we handle specific cases or return nothing
    if (data.code === 'newsletter') {
        return (
            <section className="py-5 bg-light">
                <div className="container text-center">
                    <h3>Subscribe to our Updates</h3>
                    <p className="mb-4">Get the latest news directly in your inbox.</p>
                    <form className="row justify-content-center g-3">
                        <div className="col-auto">
                            <input type="email" className="form-control" placeholder="Email address" />
                        </div>
                        <div className="col-auto">
                            <button type="submit" className="btn btn-primary">Subscribe</button>
                        </div>
                    </form>
                </div>
            </section>
        );
    }
    return null;
}

function HTMLBlock({ data }: { data: any }) {
    return (
        <section className="section py-3">
            <div className="container">
                <div dangerouslySetInnerHTML={{ __html: data.content }} />
            </div>
        </section>
    );
}

function SeparatorBlock({ data }: { data: any }) {
    const styleMap = {
        'solid': '1px solid #dee2e6',
        'dashed': '1px dashed #dee2e6',
        'dotted': '1px dotted #dee2e6',
        'transparent': 'none'
    };

    const marginMap = {
        'small': '1rem',
        'medium': '3rem',
        'large': '5rem'
    };

    return (
        <div className="container" style={{
            borderTop: styleMap[data.style as keyof typeof styleMap] || styleMap.solid,
            marginTop: marginMap[data.margin as keyof typeof marginMap] || marginMap.medium,
            marginBottom: marginMap[data.margin as keyof typeof marginMap] || marginMap.medium,
            height: 1
        }} />
    );
}

function TableOfContentsBlock({ data }: { data: any }) {
    // Determine which headings to include
    const includedTags = data.includedHeadings || ['h2', 'h3'];

    // In a real generic implementation, we would need to parse the *other* blocks to find headings.
    // However, since we are rendering blocks sequentially, we can't easily "look forward" in a pure component way
    // without passing the full blocks list or using a context.
    // BUT! Since this is a Client Component, we can use useEffect to scan the DOM for headings *after* render.
    // This is the most reliable way to generate a TOC for dynamic dynamic content.

    const [headings, setHeadings] = React.useState<Array<{ id: string, text: string, level: string }>>([]);

    React.useEffect(() => {
        // Wait for DOM to stabilize
        const timer = setTimeout(() => {
            const selector = includedTags.join(',');
            const elements = document.querySelectorAll(selector);
            const items: Array<{ id: string, text: string, level: string }> = [];

            elements.forEach((el, index) => {
                if (!el.id) {
                    el.id = `heading-${index}`; // Ensure ID exists
                }
                items.push({
                    id: el.id,
                    text: el.textContent || '',
                    level: el.tagName.toLowerCase()
                });
            });
            setHeadings(items);
        }, 500); // Small delay to ensuring other blocks render

        return () => clearTimeout(timer);
    }, [includedTags.join(',')]);

    if (headings.length === 0) return null;

    return (
        <section className="section py-4 bg-light">
            <div className="container">
                <div className="card shadow-sm border-0">
                    <div className="card-body">
                        {data.title && <h5 className="card-title mb-3">{data.title}</h5>}
                        <ul className="list-unstyled mb-0">
                            {headings.map((heading) => (
                                <li key={heading.id} className={`mb-2 ${heading.level === 'h3' ? 'ms-3' : ''} ${heading.level === 'h4' ? 'ms-4' : ''}`}>
                                    <a href={`#${heading.id}`} className="text-decoration-none text-dark hover-primary">
                                        {heading.text}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </section>
    );
}

function InterlinkBlock({ data }: { data: any }) {
    // Determine context (this would ideally come from a parent provider or props)
    // For now we pass empty defaults, meaning 'related' mode might be limited without tag context
    const { links: dynamicLinks, loading } = useInterlinks({
        mode: data.mode,
        limit: data.limit || 3,
        category: data.category
    });

    const links = data.mode === 'manual' ? (data.links || []) : dynamicLinks;

    if (loading && data.mode !== 'manual') return <div className="py-3 text-center text-muted small">Loading related content...</div>;
    if (!links || links.length === 0) return null;

    const renderContent = () => {
        switch (data.style) {
            case 'grid':
                return (
                    <div className="row g-3">
                        {links.map((link: any, idx: number) => (
                            <div key={idx} className="col-md-6">
                                <Link href={link.url || '#'} className="card h-100 text-decoration-none shadow-sm hover-shadow transition">
                                    <div className="card-body d-flex align-items-center">
                                        <div className="flex-grow-1">
                                            <h6 className="mb-0 text-dark">{link.customLabel || `Linked Content ${idx + 1}`}</h6>
                                            <small className="text-muted text-capitalize">{link.entityType}</small>
                                        </div>
                                        <i className="bi bi-arrow-right text-primary"></i>
                                    </div>
                                </Link>
                            </div>
                        ))}
                    </div>
                );
            case 'buttons':
                return (
                    <div className="d-flex flex-wrap gap-2">
                        {links.map((link: any, idx: number) => (
                            <Link key={idx} href={link.url || '#'} className="btn btn-outline-primary btn-sm rounded-pill">
                                {link.customLabel || `Link ${idx + 1}`}
                            </Link>
                        ))}
                    </div>
                );
            case 'inline-text':
                return (
                    <p className="lead">
                        <span className="fw-bold me-2">{data.title || "Read more:"}</span>
                        {links.map((link: any, idx: number) => (
                            <React.Fragment key={idx}>
                                <Link href={link.url || '#'} className="text-primary text-decoration-underline">
                                    {link.customLabel || `Link ${idx + 1}`}
                                </Link>
                                {idx < links.length - 1 ? ', ' : ''}
                            </React.Fragment>
                        ))}
                    </p>
                );
            case 'list':
            default:
                return (
                    <div className="list-group list-group-flush">
                        {links.map((link: any, idx: number) => (
                            <Link key={idx} href={link.url || '#'} className="list-group-item list-group-item-action d-flex justify-content-between align-items-center bg-transparent px-0 border-bottom">
                                <span className="text-primary">{link.customLabel || `Link ${idx + 1}`}</span>
                                <i className="bi bi-chevron-right small text-muted"></i>
                            </Link>
                        ))}
                    </div>
                );
        }
    };

    if (data.style === 'inline-text') {
        return (
            <section className="section py-3">
                <div className="container">
                    {renderContent()}
                </div>
            </section>
        );
    }

    return (
        <section className="section py-4 bg-light bg-opacity-25 rounded-3 my-4">
            <div className="container">
                {data.title && <h5 className="mb-3 text-secondary text-uppercase small fw-bold">{data.title}</h5>}
                {renderContent()}
            </div>
        </section>
    );
}

function LocationListBlock({ data }: { data: any }) {
    const [locations, setLocations] = React.useState<any[]>([]);
    const [loading, setLoading] = React.useState(true);

    React.useEffect(() => {
        const fetchLocations = async () => {
            try {
                const { getLocationsByEmirate } = await import('@gratuity/firebase-config/firestore');
                const type = data.locationType === 'all' ? undefined : data.locationType;
                const result = await getLocationsByEmirate(data.emirate, type);
                setLocations(result);
            } catch (err) {
                console.error('Failed to fetch locations for block:', err);
            } finally {
                setLoading(false);
            }
        };
        fetchLocations();
    }, [data.emirate, data.locationType]);

    if (loading) return <div className="py-5 text-center text-muted small">Loading locations...</div>;
    if (locations.length === 0) return null;

    const colClass = data.columns === 2 ? 'col-md-6' : data.columns === 4 ? 'col-lg-3 col-md-4 col-6' : 'col-lg-2 col-md-3 col-4';

    return (
        <section className="section py-5">
            <div className="container">
                {data.title && <h2 className="text-center mb-4">{data.title}</h2>}
                {data.subtitle && <p className="text-center text-muted mb-4">{data.subtitle}</p>}

                <div className="row g-3 justify-content-center">
                    {locations.map((loc: any) => (
                        <div key={loc.id} className={colClass}>
                            <Link href={`/${loc.emirate}/${loc.slug}`} className="d-flex align-items-center justify-content-between p-3 border rounded text-decoration-none text-dark hover-light transition">
                                <span className="text-truncate">{loc.name}</span>
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <polyline points="9,18 15,12 9,6" />
                                </svg>
                            </Link>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
