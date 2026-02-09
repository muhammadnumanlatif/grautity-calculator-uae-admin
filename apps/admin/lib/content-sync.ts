import { Page, BlockHero, BlockCalculator, BlockRichText, BlockFAQ, ContentStatus } from '@gratuity/shared';
import { adminDb } from '@gratuity/firebase-config/admin';
import { COLLECTIONS } from '@gratuity/firebase-config/firestore';

// Define the structure of a discovered page
export interface DiscoveredPage {
    slug: string;
    files: string[];
    title: string;
    description: string;
    isImported: boolean;
}

// Function to simulate scanning the file system
// In a real scenario, this would use fs to read the apps/client/app directory
// But since this runs in a server action/environment that might not have access to source code at runtime
// We hardcode the known static paths for now as a starting point.
export async function scanClientPages(): Promise<DiscoveredPage[]> {
    // Check against existing database entries
    const existingPagesSnap = await adminDb.collection(COLLECTIONS.PAGES).get();
    const existingSlugs = new Set(existingPagesSnap.docs.map(doc => doc.data().slug));

    const knownStaticPages: DiscoveredPage[] = [
        {
            slug: 'limited-contract',
            files: ['page.tsx'],
            title: 'How to Calculate Gratuity in UAE for a Limited Contract',
            description: 'Complete guide to calculating gratuity for limited (fixed-term) contracts in UAE.',
            isImported: existingSlugs.has('limited-contract')
        },
        {
            slug: 'unlimited-contract',
            files: ['page.tsx'],
            title: 'Unlimited Contract Gratuity Rules',
            description: 'Calculator and rules for unlimited contracts.',
            isImported: existingSlugs.has('unlimited-contract')
        },
        {
            slug: 'mohre-calculator',
            files: ['page.tsx'],
            title: 'MOHRE Gratuity Calculator',
            description: 'Official calculation methods.',
            isImported: existingSlugs.has('mohre-calculator')
        }
        // Add more discovery logic or entries here
    ];

    return knownStaticPages;
}

// Function to convert a specific static page into a dynamic Firestore document
// Ideally, this would parse the TSX file, but that is complex.
// For Phase 1 of Sync, we will create a "skeleton" page with basic blocks
// that the admin can then fill in.
export async function importPageToFirestore(slug: string): Promise<boolean> {
    try {
        const pageData = getStaticPageData(slug);
        if (!pageData) return false;

        // Create the document
        await adminDb.collection(COLLECTIONS.PAGES).add({
            ...pageData,
            createdAt: new Date(),
            updatedAt: new Date(),
            createdBy: 'system_import',
        });

        return true;
    } catch (error) {
        console.error('Error importing page:', error);
        return false;
    }
}

// Helper to get mock data for known pages
function getStaticPageData(slug: string): Omit<Page, 'id' | 'createdAt' | 'updatedAt' | 'createdBy'> | null {
    const basePage = {
        slug,
        status: 'published' as ContentStatus,
        blocks: [],
        seo: {
            metaTitle: '',
            metaDescription: '',
            focusKeyword: '',
            secondaryKeywords: [],
            robots: { index: true, follow: true }
        }
    };

    if (slug === 'limited-contract') {
        return {
            ...basePage,
            title: 'Limited Contract Gratuity',
            content: '', // No raw HTML, using blocks
            seo: {
                ...basePage.seo,
                metaTitle: 'How to Calculate Gratuity in UAE for a Limited Contract | 2026 Guide',
                metaDescription: 'Complete guide to calculating gratuity for limited (fixed-term) contracts in UAE.',
                focusKeyword: 'limited contract gratuity uae'
            },
            blocks: [
                {
                    type: 'hero',
                    data: {
                        title: 'How to Calculate Gratuity in UAE for a Limited Contract',
                        subtitle: 'Understanding your end of service benefits for fixed-term employment contracts.',
                        breadcrumbs: [
                            { name: 'Home', url: '/' },
                            { name: 'Limited Contract', url: '/limited-contract' }
                        ],
                        lastUpdated: 'February 2026',
                        readingTime: '7 mins'
                    }
                } as BlockHero,
                {
                    type: 'calculator',
                    data: {
                        defaultContractType: 'limited',
                        title: 'Calculate Your Limited Contract Gratuity',
                        description: 'Get an instant estimate based on your salary and service years.'
                    }
                } as BlockCalculator,
                {
                    type: 'rich-text',
                    data: {
                        title: 'Introduction',
                        content: '<p>A limited contract (also known as a fixed-term contract) has a specific start and end date...</p>'
                    }
                } as BlockRichText,
                {
                    type: 'faq',
                    data: {
                        title: 'Frequently Asked Questions',
                        items: [
                            { question: 'What is a limited contract?', answer: 'A fixed-term employment agreement...' },
                            { question: 'Do I get full gratuity?', answer: 'Yes, if the contract ends naturally.' }
                        ]
                    }
                } as BlockFAQ
            ]
        };
    }

    // Fallback for unknown pages is basic skeleton
    return {
        ...basePage,
        title: slug.split('-').map(s => s.charAt(0).toUpperCase() + s.slice(1)).join(' '),
        content: '<p>Content pending migration.</p>',
        seo: {
            ...basePage.seo,
            metaTitle: `${slug} Guide`,
            metaDescription: `Guide about ${slug}`
        }
    };
}
