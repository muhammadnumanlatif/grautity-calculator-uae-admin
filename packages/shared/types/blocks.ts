export type BlockType =
    | 'hero'
    | 'calculator'
    | 'rich-text'
    | 'table'
    | 'faq'
    | 'cta'
    | 'cards'
    | 'image'
    | 'heading'
    | 'paragraph'
    | 'video'
    | 'link'
    | 'shortcode'
    | 'html'
    | 'separator'
    | 'table-of-contents'
    | 'interlink';

export interface BlockHero {
    id: string;
    type: 'hero';
    data: {
        title: string;
        subtitle?: string;
        lead?: string;
        breadcrumbs: Array<{ name: string; url: string }>;
        lastUpdated?: string;
        readingTime?: string;
    };
}

export interface BlockCalculator {
    id: string;
    type: 'calculator';
    data: {
        defaultContractType?: 'limited' | 'unlimited';
        title?: string;
        description?: string;
    };
}

export interface BlockRichText {
    id: string;
    type: 'rich-text';
    data: {
        content: string;
        title?: string;
    };
}

export interface BlockTable {
    id: string;
    type: 'table';
    data: {
        title?: string;
        headers: string[];
        rows: string[][];
    };
}

export interface BlockFAQ {
    id: string;
    type: 'faq';
    data: {
        title?: string;
        subtitle?: string;
        items: Array<{ question: string; answer: string }>;
    };
}

export interface BlockCTA {
    id: string;
    type: 'cta';
    data: {
        title: string;
        description?: string;
        buttons: Array<{ label: string; url: string; variant?: 'primary' | 'secondary' | 'dark' }>;
    };
}

export interface BlockCards {
    id: string;
    type: 'cards';
    data: {
        title?: string;
        layout: 'grid' | 'formula' | 'termination';
        items: Array<{
            title: string;
            content?: string | string[];
            footer?: string;
            badge?: { text: string; variant: string };
        }>;
    };
}

export interface BlockImage {
    id: string;
    type: 'image';
    data: {
        url: string;
        alt: string;
        caption?: string;
        width?: number;
        height?: number;
        link?: string;
        alignment?: 'left' | 'center' | 'right' | 'full-width';
    };
}

export interface BlockHeading {
    id: string;
    type: 'heading';
    data: {
        text: string;
        level: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
        alignment?: 'left' | 'center' | 'right';
        id?: string;
    };
}

export interface BlockParagraph {
    id: string;
    type: 'paragraph';
    data: {
        content: string;
        alignment?: 'left' | 'center' | 'right' | 'justify';
        textSize?: 'small' | 'base' | 'large' | 'lead';
    };
}

export interface BlockLink {
    id: string;
    type: 'link';
    data: {
        label: string;
        url: string;
        target?: '_self' | '_blank';
        style?: 'button-primary' | 'button-secondary' | 'link-text';
        icon?: string;
    };
}

export interface BlockVideo {
    id: string;
    type: 'video';
    data: {
        provider: 'youtube' | 'vimeo' | 'custom';
        url: string;
        autoplay?: boolean;
        loop?: boolean;
        controls?: boolean;
        poster?: string;
        aspectRatio?: '16:9' | '4:3' | '1:1';
    };
}

export interface BlockShortcode {
    id: string;
    type: 'shortcode';
    data: {
        code: string;
        params?: Record<string, string | number | boolean>;
    };
}

export interface BlockHTML {
    id: string;
    type: 'html';
    data: {
        content: string;
        isSandboxed?: boolean;
    };
}

export interface BlockSeparator {
    id: string;
    type: 'separator';
    data: {
        style: 'solid' | 'dashed' | 'dotted' | 'transparent';
        margin?: 'small' | 'medium' | 'large';
    };
}

export interface BlockTableOfContents {
    id: string;
    type: 'table-of-contents';
    data: {
        title?: string;
        includedHeadings: ('h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6')[];
    };
}

export interface BlockInterlink {
    id: string;
    type: 'interlink';
    data: {
        title?: string;
        mode: 'manual' | 'related' | 'category' | 'latest';
        style: 'list' | 'grid' | 'buttons' | 'inline-text';
        limit?: number;
        category?: string;
        links?: Array<{
            entityType: 'page' | 'blog' | 'location';
            entityId: string;
            customLabel?: string;
        }>;
    };
}

export type PageBlock =
    | BlockHero
    | BlockCalculator
    | BlockRichText
    | BlockTable
    | BlockFAQ
    | BlockCTA
    | BlockCards
    | BlockImage
    | BlockHeading
    | BlockParagraph
    | BlockVideo
    | BlockLink
    | BlockShortcode
    | BlockHTML
    | BlockSeparator
    | BlockTableOfContents
    | BlockInterlink;
