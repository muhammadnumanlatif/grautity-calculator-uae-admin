'use client';

import React from 'react';
import Link from 'next/link';
import { PageBlock } from '@gratuity/shared';
import GratuityCalculator from '@/components/calculator/GratuityCalculator';
import FAQSection from '@/components/sections/FAQSection';

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
                            {data.rows.map((row: string[], idx: number) => (
                                <tr key={idx}>
                                    {row.map((cell: string, cellIdx: number) => (
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
