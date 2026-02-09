'use client';

import { MenuItem } from '@gratuity/shared/types';
import Link from 'next/link';

interface MenuPreviewProps {
    items: MenuItem[];
    location: string;
}

export default function MenuPreview({ items, location }: MenuPreviewProps) {
    const isHeader = location.startsWith('header');
    const isFooter = location.startsWith('footer');
    const isMobile = location.startsWith('mobile');

    return (
        <div className="menu-preview card border-0 shadow-sm rounded-4 p-4">
            <h5 className="fw-bold mb-3">Preview</h5>
            <div className={`preview-container ${location}`}>
                {isHeader && (
                    <div className="preview-header bg-white border-bottom p-3">
                        <nav className="d-flex gap-3">
                            {items.map((item) => (
                                <PreviewItem key={item.id} item={item} />
                            ))}
                        </nav>
                    </div>
                )}

                {isFooter && (
                    <div className="preview-footer bg-dark text-white p-4">
                        <div className="d-flex flex-column gap-2">
                            {items.map((item) => (
                                <PreviewItem key={item.id} item={item} isFooter={true} />
                            ))}
                        </div>
                    </div>
                )}

                {isMobile && location === 'mobile_bottom_nav' && (
                    <div className="preview-mobile-bottom bg-white border-top p-2">
                        <div className="d-flex justify-content-around">
                            {items.map((item) => (
                                <div key={item.id} className="text-center">
                                    <div className="small">{item.label}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {isMobile && location === 'mobile_main' && (
                    <div className="preview-mobile-drawer bg-white p-3">
                        <div className="d-flex flex-column gap-2">
                            {items.map((item) => (
                                <PreviewItem key={item.id} item={item} />
                            ))}
                        </div>
                    </div>
                )}
            </div>

            <style jsx>{`
                .preview-container {
                    border: 1px dashed #dee2e6;
                    border-radius: 8px;
                    overflow: hidden;
                }
                .preview-header {
                    min-height: 60px;
                }
                .preview-footer {
                    min-height: 100px;
                }
                .preview-mobile-bottom {
                    position: relative;
                    bottom: 0;
                    width: 100%;
                }
            `}</style>
        </div>
    );
}

function PreviewItem({ item, isFooter = false }: { item: MenuItem; isFooter?: boolean }) {
    const baseClass = isFooter ? 'text-white-50 text-decoration-none' : 'text-dark text-decoration-none';

    if (item.type === 'button') {
        return (
            <span className="btn btn-primary btn-sm">
                {item.label}
                {item.badge && <span className="badge bg-light text-dark ms-1">{item.badge}</span>}
            </span>
        );
    }

    if (item.type === 'dropdown') {
        return (
            <div>
                <span className={baseClass}>
                    {item.label} ▾
                    {item.badge && <span className="badge bg-primary ms-1">{item.badge}</span>}
                </span>
                {item.children && item.children.length > 0 && (
                    <div className="small text-muted ms-3 mt-1">
                        ({item.children.length} items)
                    </div>
                )}
            </div>
        );
    }

    if (item.type === 'mega_menu') {
        return (
            <span className={baseClass}>
                {item.label} ▾
                <span className="badge bg-info ms-1">Mega</span>
            </span>
        );
    }

    return (
        <span className={baseClass}>
            {item.label}
            {item.badge && <span className={`badge bg-${item.badgeColor || 'primary'} ms-1`}>{item.badge}</span>}
        </span>
    );
}
