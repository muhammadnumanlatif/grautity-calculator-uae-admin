import Link from 'next/link';
import { MenuItem } from '@gratuity/shared/types';
import { UAE_EMIRATES, DUBAI_AREAS, DUBAI_FREE_ZONES, ABU_DHABI_AREAS, ABU_DHABI_FREE_ZONES, SHARJAH_AREAS, SHARJAH_FREE_ZONES } from '@gratuity/shared';

interface MenuItemRendererProps {
    item: MenuItem;
    className?: string;
    isNested?: boolean;
}

export function MenuItemRenderer({ item, className = '', isNested = false }: MenuItemRendererProps) {
    // Handle action-type items (WhatsApp, scroll, etc.)
    if (item.type === 'action') {
        if (item.actionType === 'whatsapp') {
            return (
                <a
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={className}
                >
                    {item.icon && <span dangerouslySetInnerHTML={{ __html: item.icon }} />}
                    {item.label}
                    {item.badge && (
                        <span className={`badge bg-${item.badgeColor || 'primary'} ms-2`}>
                            {item.badge}
                        </span>
                    )}
                </a>
            );
        }

        if (item.actionType === 'scroll_top') {
            return (
                <button
                    onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                    className={className}
                >
                    {item.label}
                </button>
            );
        }
    }

    // Handle button-type items (CTAs)
    if (item.type === 'button') {
        return (
            <Link
                href={item.url || '#'}
                className={`${className} btn btn-primary`}
                target={item.target}
            >
                {item.label}
                {item.badge && (
                    <span className={`badge bg-${item.badgeColor || 'light'} text-dark ms-2`}>
                        {item.badge}
                    </span>
                )}
            </Link>
        );
    }

    // Handle dropdown items with children
    if (item.type === 'dropdown' && item.children && item.children.length > 0) {
        return (
            <div className="dropdown">
                <button className={`${className} dropdown-toggle`} data-bs-toggle="dropdown">
                    {item.label}
                    {item.badge && (
                        <span className={`badge bg-${item.badgeColor || 'primary'} ms-2`}>
                            {item.badge}
                        </span>
                    )}
                </button>
                <ul className="dropdown-menu">
                    {item.children.map((child) => (
                        <li key={child.id}>
                            <MenuItemRenderer item={child} className="dropdown-item" isNested={true} />
                        </li>
                    ))}
                </ul>
            </div>
        );
    }

    // Handle mega menu items
    if (item.type === 'mega_menu') {
        return (
            <div className="dropdown mega-menu-dropdown">
                <button className={`${className} dropdown-toggle`} data-bs-toggle="dropdown">
                    {item.label}
                </button>
                <div className="dropdown-menu mega-menu p-4">
                    <MegaMenuContent context={item.megaMenuContext} />
                </div>
            </div>
        );
    }

    // Handle standard links
    if (item.type === 'link') {
        return (
            <Link
                href={item.url || '#'}
                className={className}
                target={item.target}
            >
                {item.icon && <span dangerouslySetInnerHTML={{ __html: item.icon }} />}
                {item.label}
                {item.badge && (
                    <span className={`badge bg-${item.badgeColor || 'primary'} ms-2`}>
                        {item.badge}
                    </span>
                )}
            </Link>
        );
    }

    return null;
}

// Mega Menu Content Renderer
function MegaMenuContent({ context }: { context?: string }) {
    if (context === 'emirates_grid') {
        return (
            <div className="row g-4">
                {Object.entries(UAE_EMIRATES).map(([key, emirate]) => (
                    <div key={key} className="col-md-4">
                        <h6 className="fw-bold mb-3">
                            <Link href={`/${emirate.slug}`} className="text-decoration-none text-dark">
                                {emirate.name}
                            </Link>
                        </h6>
                        <div className="small">
                            <div className="mb-2 text-muted">Popular Areas</div>
                            {key === 'dubai' && DUBAI_AREAS.slice(0, 3).map((area) => (
                                <div key={area.slug}>
                                    <Link href={`/dubai/${area.slug}`} className="text-muted text-decoration-none d-block py-1">
                                        {area.name}
                                    </Link>
                                </div>
                            ))}
                            {key === 'abu-dhabi' && ABU_DHABI_AREAS.slice(0, 3).map((area) => (
                                <div key={area.slug}>
                                    <Link href={`/abu-dhabi/${area.slug}`} className="text-muted text-decoration-none d-block py-1">
                                        {area.name}
                                    </Link>
                                </div>
                            ))}
                            {key === 'sharjah' && SHARJAH_AREAS.slice(0, 3).map((area) => (
                                <div key={area.slug}>
                                    <Link href={`/sharjah/${area.slug}`} className="text-muted text-decoration-none d-block py-1">
                                        {area.name}
                                    </Link>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        );
    }

    if (context === 'calculators_list') {
        const calculators = [
            { name: 'Gratuity Calculator', url: '/', icon: '🧮' },
            { name: 'MOHRE Calculator', url: '/mohre-calculator', icon: '📊' },
            { name: 'Unlimited Contract', url: '/unlimited-contract', icon: '📝' },
            { name: 'Limited Contract', url: '/limited-contract', icon: '📄' },
            { name: 'DIFC Calculator', url: '/dubai/free-zones/difc', icon: '🏢' },
            { name: 'ADGM Calculator', url: '/abu-dhabi/free-zones/adgm', icon: '🏛️' },
        ];

        return (
            <div className="row g-3">
                {calculators.map((calc) => (
                    <div key={calc.url} className="col-md-6">
                        <Link href={calc.url} className="d-flex align-items-center gap-2 text-decoration-none p-2 rounded hover-bg-light">
                            <span style={{ fontSize: '1.5rem' }}>{calc.icon}</span>
                            <span className="fw-medium">{calc.name}</span>
                        </Link>
                    </div>
                ))}
            </div>
        );
    }

    if (context === 'services_columns') {
        return (
            <div className="row g-4">
                <div className="col-md-3">
                    <h6 className="fw-bold mb-3">Calculators</h6>
                    <Link href="/" className="d-block text-muted text-decoration-none py-1">Gratuity Calculator</Link>
                    <Link href="/mohre-calculator" className="d-block text-muted text-decoration-none py-1">MOHRE Calculator</Link>
                </div>
                <div className="col-md-3">
                    <h6 className="fw-bold mb-3">Resources</h6>
                    <Link href="/blog" className="d-block text-muted text-decoration-none py-1">Blog</Link>
                    <Link href="/faq" className="d-block text-muted text-decoration-none py-1">FAQ</Link>
                </div>
                <div className="col-md-3">
                    <h6 className="fw-bold mb-3">Legal</h6>
                    <Link href="/privacy-policy" className="d-block text-muted text-decoration-none py-1">Privacy Policy</Link>
                    <Link href="/terms-of-use" className="d-block text-muted text-decoration-none py-1">Terms of Use</Link>
                </div>
                <div className="col-md-3">
                    <h6 className="fw-bold mb-3">Support</h6>
                    <Link href="/contact" className="d-block text-muted text-decoration-none py-1">Contact Us</Link>
                </div>
            </div>
        );
    }

    return <div className="text-muted">Mega menu content</div>;
}
