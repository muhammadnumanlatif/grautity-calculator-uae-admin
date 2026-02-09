'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { MenuConfig, MenuItem } from '@gratuity/shared/types';
import { MenuItemRenderer } from './MenuItemRenderer';

interface DynamicMenuProps {
    menuLocation: MenuConfig['location'];
    className?: string;
    itemClassName?: string;
}

export function DynamicMenu({ menuLocation, className = '', itemClassName = '' }: DynamicMenuProps) {
    const [menu, setMenu] = useState<MenuConfig | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadMenu();
    }, [menuLocation]);

    const loadMenu = async () => {
        try {
            const response = await fetch(`/api/menus?location=${menuLocation}`);
            if (response.ok) {
                const data = await response.json();
                setMenu(data);
            }
        } catch (error) {
            console.error('Failed to load menu:', error);
        } finally {
            setLoading(false);
        }
    };

    if (loading || !menu) {
        return null;
    }

    return (
        <nav className={className}>
            {menu.items.map((item) => (
                <MenuItemRenderer
                    key={item.id}
                    item={item}
                    className={itemClassName}
                />
            ))}
        </nav>
    );
}
