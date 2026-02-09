import { PageBlock } from '@gratuity/shared';

// Initial state for new blocks
export const INITIAL_BLOCKS: Record<PageBlock['type'], PageBlock> = {
    'hero': {
        id: '',
        type: 'hero',
        data: {
            title: 'New Page Title',
            subtitle: 'Optional subtitle goes here',
            breadcrumbs: [{ name: 'Home', url: '/' }, { name: 'New Page', url: '/new-page' }],
        }
    },
    'calculator': {
        id: '',
        type: 'calculator',
        data: {
            defaultContractType: 'unlimited',
            title: 'Calculate Your Gratuity',
            description: 'Enter your details below to get an instant estimate.'
        }
    },
    'rich-text': {
        id: '',
        type: 'rich-text',
        data: {
            content: '<p>Start typing your content here...</p>'
        }
    },
    'faq': {
        id: '',
        type: 'faq',
        data: {
            title: 'Frequently Asked Questions',
            items: [
                { question: 'Question 1', answer: 'Answer 1' },
            ]
        }
    },
    'cta': {
        id: '',
        type: 'cta',
        data: {
            title: 'Call to Action',
            buttons: [{ label: 'Click Me', url: '#', variant: 'primary' }]
        }
    },
    'table': {
        id: '',
        type: 'table',
        data: {
            headers: ['Header 1', 'Header 2'],
            rows: [['Row 1 Col 1', 'Row 1 Col 2']]
        }
    },
    'cards': {
        id: '',
        type: 'cards',
        data: {
            layout: 'grid',
            items: [{ title: 'Card Title', content: 'Card content goes here.' }]
        }
    },
    'image': {
        id: '',
        type: 'image',
        data: {
            url: 'https://placehold.co/600x400',
            alt: 'Image description',
            width: 600,
            height: 400
        }
    },
    'heading': {
        id: '',
        type: 'heading',
        data: {
            text: 'New Heading',
            level: 'h2'
        }
    },
    'paragraph': {
        id: '',
        type: 'paragraph',
        data: {
            content: 'Start writing your paragraph here...'
        }
    },
    'video': {
        id: '',
        type: 'video',
        data: {
            provider: 'youtube',
            url: 'https://youtube.com/watch?v=example',
            aspectRatio: '16:9'
        }
    },
    'link': {
        id: '',
        type: 'link',
        data: {
            label: 'Click Here',
            url: '#'
        }
    },
    'shortcode': {
        id: '',
        type: 'shortcode',
        data: {
            code: 'example-shortcode',
            params: {}
        }
    },
    'html': {
        id: '',
        type: 'html',
        data: {
            content: '<div>Custom HTML</div>'
        }
    },
    'separator': {
        id: '',
        type: 'separator',
        data: {
            style: 'solid'
        }
    },
    'table-of-contents': {
        id: '',
        type: 'table-of-contents',
        data: {
            title: 'Table of Contents',
            includedHeadings: ['h2', 'h3']
        }
    },
    'interlink': {
        id: '',
        type: 'interlink',
        data: {
            mode: 'manual',
            style: 'list',
            links: []
        }
    }
};
