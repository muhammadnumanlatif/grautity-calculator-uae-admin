export type BlockType =
    | 'hero'
    | 'calculator'
    | 'rich-text'
    | 'table'
    | 'faq'
    | 'cta'
    | 'cards';

export interface BlockHero {
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
    type: 'calculator';
    data: {
        defaultContractType?: 'limited' | 'unlimited';
        title?: string;
        description?: string;
    };
}

export interface BlockRichText {
    type: 'rich-text';
    data: {
        content: string;
        title?: string;
    };
}

export interface BlockTable {
    type: 'table';
    data: {
        title?: string;
        headers: string[];
        rows: string[][];
    };
}

export interface BlockFAQ {
    type: 'faq';
    data: {
        title?: string;
        subtitle?: string;
        items: Array<{ question: string; answer: string }>;
    };
}

export interface BlockCTA {
    type: 'cta';
    data: {
        title: string;
        description?: string;
        buttons: Array<{ label: string; url: string; variant?: 'primary' | 'secondary' | 'dark' }>;
    };
}

export interface BlockCards {
    type: 'cards';
    data: {
        title?: string;
        layout: 'grid' | 'formula' | 'termination';
        items: Array<{
            title: string;
            content?: string[];
            footer?: string;
            badge?: { text: string; variant: string };
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
    | BlockCards;
