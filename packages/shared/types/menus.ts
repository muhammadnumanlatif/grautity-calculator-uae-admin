export interface MenuItem {
    id: string;
    label: string;
    url?: string;
    type: 'link' | 'dropdown' | 'mega_menu' | 'button' | 'action';
    target?: '_blank' | '_self';
    children?: MenuItem[];
    megaMenuContext?: 'emirates_grid' | 'calculators_list' | 'services_columns' | 'custom_html';
    icon?: string;
    actionType?: 'whatsapp' | 'scroll_top' | 'search_overlay' | 'toggle_theme';
    badge?: string;
    badgeColor?: 'primary' | 'success' | 'danger' | 'warning';
}

export interface MenuConfig {
    id: string;
    name: string;
    location: 'header_main' | 'header_top' | 'footer_col_1' | 'footer_col_2' | 'footer_col_3' | 'footer_col_4' | 'mobile_main' | 'mobile_bottom_nav';
    items: MenuItem[];
    isActive: boolean;
    updatedAt: Date;
}

export interface Widget {
    id: string;
    type: 'mini_calculator' | 'newsletter_box' | 'recent_posts' | 'social_proof' | 'custom_html' | 'cta_banner';
    title?: string;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    config: Record<string, any>;
    order: number;
    isActive: boolean;
}

export interface WidgetArea {
    id: string;
    location: 'blog_sidebar' | 'page_sidebar' | 'footer_top' | 'content_bottom';
    widgets: Widget[];
    updatedAt: Date;
}
