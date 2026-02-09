import Link from 'next/link';
import { MenuItem } from '@gratuity/shared/types';
import { MegaMenu } from './MegaMenu';

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
                <ul className="dropdown-menu shadow-sm border-0 rounded-3 mt-2">
                    {item.children.map((child) => (
                        <li key={child.id}>
                            <MenuItemRenderer item={child} className="dropdown-item py-2 px-3" isNested={true} />
                        </li>
                    ))}
                </ul>
            </div>
        );
    }

    // Handle mega menu items
    if (item.type === 'mega_menu') {
        return (
            <div className="dropdown mega-menu-dropdown position-static">
                <button className={`${className} dropdown-toggle`} data-bs-toggle="dropdown" aria-expanded="false">
                    {item.label}
                    <span className="badge bg-primary text-white ms-1 rounded-pill" style={{ fontSize: '0.6rem', padding: '0.2rem 0.5rem', verticalAlign: 'text-top' }}>NEW</span>
                </button>
                <div className="dropdown-menu mega-menu w-100 shadow-lg border-0 mt-0 py-0 rounded-0 rounded-bottom" style={{ left: 0 }}>
                    <MegaMenu context={item.megaMenuContext} />
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
                {item.icon && <span dangerouslySetInnerHTML={{ __html: item.icon }} className="me-1" />}
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
