import { PageBlock } from '@gratuity/shared';

// Initial state for new blocks
export const INITIAL_BLOCKS: Record<PageBlock['type'], PageBlock> = {
    'hero': {
        type: 'hero',
        data: {
            title: 'New Page Title',
            subtitle: 'Optional subtitle goes here',
            breadcrumbs: [{ name: 'Home', url: '/' }, { name: 'New Page', url: '/new-page' }],
        }
    },
    'calculator': {
        type: 'calculator',
        data: {
            defaultContractType: 'unlimited',
            title: 'Calculate Your Gratuity',
            description: 'Enter your details below to get an instant estimate.'
        }
    },
    'rich-text': {
        type: 'rich-text',
        data: {
            content: '<p>Start typing your content here...</p>'
        }
    },
    'faq': {
        type: 'faq',
        data: {
            title: 'Frequently Asked Questions',
            items: [
                { question: 'Question 1', answer: 'Answer 1' },
            ]
        }
    },
    'cta': {
        type: 'cta',
        data: {
            title: 'Call to Action',
            buttons: [{ label: 'Click Me', url: '#', variant: 'primary' }]
        }
    },
    'table': {
        type: 'table',
        data: {
            headers: ['Header 1', 'Header 2'],
            rows: [['Row 1 Col 1', 'Row 1 Col 2']]
        }
    },
    'cards': {
        type: 'cards',
        data: {
            layout: 'grid',
            items: [{ title: 'Card Title', content: 'Card content goes here.' }]
        }
    }
};
