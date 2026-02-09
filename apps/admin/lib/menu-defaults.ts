import { MenuItem, MenuConfig } from '@gratuity/shared/types';

export const DEFAULT_MENUS: Record<string, Partial<MenuConfig>> = {
    header_main: {
        name: 'Main Navigation',
        location: 'header_main' as any,
        isActive: true,
        items: [
            { id: 'nav-home', label: 'Home', url: '/', type: 'link' },
            {
                id: 'nav-calculators',
                label: 'Calculators',
                type: 'mega_menu',
                megaMenuContext: 'calculators_list' as any,
                children: [
                    {
                        id: 'group-mohre',
                        label: 'MOHRE Calculators',
                        type: 'action',
                        icon: 'calculator',
                        children: [
                            { id: 'calc-mohre-official', label: 'MOHRE Calculator', url: '/mohre-calculator', type: 'link' },
                            { id: 'calc-mohre-gratuity', label: 'MOHRE Gratuity Calculator', url: '/mohre-gratuity-calculator', type: 'link' }
                        ]
                    },
                    {
                        id: 'group-contracts',
                        label: 'By Contract Type',
                        type: 'action',
                        icon: 'file-text',
                        children: [
                            { id: 'calc-unlimited', label: 'Unlimited Contract', url: '/unlimited-contract', type: 'link' },
                            { id: 'calc-limited', label: 'Limited Contract', url: '/limited-contract', type: 'link' }
                        ]
                    },
                    {
                        id: 'group-services',
                        label: 'MOHRE Services',
                        type: 'action',
                        icon: 'briefcase',
                        children: [
                            { id: 'service-labor-card', label: 'Labor Card Check', url: '/labor-card-check', type: 'link' },
                            { id: 'service-e-signature', label: 'E-Signature Card', url: '/e-signature-card', type: 'link' }
                        ]
                    }
                ]
            },
            {
                id: 'nav-emirates',
                label: 'Emirates',
                type: 'mega_menu',
                megaMenuContext: 'emirates_grid' as any,
                children: [
                    {
                        id: 'emirate-dubai',
                        label: 'Dubai',
                        url: '/dubai',
                        type: 'link',
                        badge: 'Popular',
                        children: [
                            { id: 'dubai-area-1', label: 'Downtown Dubai', url: '/dubai/downtown', type: 'link' },
                            { id: 'dubai-area-2', label: 'Dubai Marina', url: '/dubai/marina', type: 'link' },
                            { id: 'dubai-fz-1', label: 'DIFC', url: '/dubai/free-zones/difc', type: 'link' },
                            { id: 'dubai-fz-2', label: 'JAFZA', url: '/dubai/free-zones/jafza', type: 'link' }
                        ]
                    }
                ]
            },
            { id: 'nav-blog', label: 'Blog', url: '/blog', type: 'link' },
            { id: 'nav-cta', label: 'Calculate Now', url: '/#calculator', type: 'button' }
        ]
    },
    footer_col_1: {
        name: 'Footer Col 1',
        location: 'footer_col_1' as any,
        isActive: true,
        items: [
            { id: 'f1-1', label: 'Gratuity Calculator', url: '/', type: 'link' },
            { id: 'f1-2', label: 'MOHRE Calculator', url: '/mohre-calculator', type: 'link' },
            { id: 'f1-3', label: 'MOHRE Gratuity', url: '/mohre-gratuity-calculator', type: 'link' },
            { id: 'f1-4', label: 'Unlimited Contract', url: '/unlimited-contract', type: 'link' },
            { id: 'f1-5', label: 'Limited Contract', url: '/limited-contract', type: 'link' }
        ]
    },
    footer_col_2: {
        name: 'Footer Col 2',
        location: 'footer_col_2' as any,
        isActive: true,
        items: [
            { id: 'f2-1', label: 'Dubai', url: '/dubai', type: 'link' },
            { id: 'f2-2', label: 'Abu Dhabi', url: '/abu-dhabi', type: 'link' },
            { id: 'f2-3', label: 'Sharjah', url: '/sharjah', type: 'link' }
        ]
    }
};
