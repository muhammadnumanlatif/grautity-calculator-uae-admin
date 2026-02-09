const admin = require('firebase-admin');
const serviceAccount = require('../service-account-key.json');

if (!admin.apps.length) {
    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount)
    });
}

const db = admin.firestore();

const pages = [
    {
        name: 'Limited Contract Gratuity Guide',
        slug: 'limited-contract',
        status: 'published',
        seo: {
            metaTitle: 'How to Calculate Gratuity in UAE for a Limited Contract | 2026 Guide',
            metaDescription: 'Complete guide to calculating gratuity for limited (fixed-term) contracts in UAE. Learn eligibility, calculation formula, early termination rules & full entitlements.',
            secondaryKeywords: ['limited contract gratuity uae', 'fixed term contract gratuity', 'uae labor law'],
            robots: { index: true, follow: true }
        },
        blocks: [
            {
                type: 'hero',
                data: {
                    title: 'How to Calculate Gratuity in UAE for a Limited Contract',
                    subtitle: 'Understanding your end of service benefits for fixed-term employment contracts in UAE.',
                    breadcrumbs: [
                        { name: 'Home', url: '/' },
                        { name: 'Limited Contract', url: '/limited-contract' }
                    ],
                    lastUpdated: 'February 2026',
                    readingTime: '7 mins'
                }
            },
            {
                type: 'calculator',
                data: {
                    defaultContractType: 'limited',
                    title: 'Calculate Your Limited Contract Gratuity',
                    description: 'Use our official calculator to get an instant estimate of your entitlements.'
                }
            },
            {
                type: 'rich-text',
                data: {
                    title: 'Introduction',
                    content: `
                        <p>A limited contract (also known as a fixed-term contract) has a specific start and end date. This type of contract provides certainty for both employers and employees about the duration of employment.</p>
                        <p>When your limited contract reaches its natural end date, you are entitled to full gratuity without any deductions—unlike unlimited contracts where resignation may reduce your entitlement.</p>
                        <p>This guide explains everything you need to know about gratuity calculations for limited contracts under the new UAE Labor Law.</p>
                    `
                }
            },
            {
                type: 'heading',
                data: { text: 'What is a Limited Contract?', level: 'h2' }
            },
            {
                type: 'cards',
                data: {
                    layout: 'grid',
                    items: [
                        {
                            title: 'Key Characteristics',
                            content: [
                                'Fixed duration (typically 1-3 years)',
                                'Specific start and end dates',
                                'Automatically ends on the specified date',
                                'Can be renewed by mutual agreement',
                                'Early termination may require compensation'
                            ]
                        },
                        {
                            title: 'Gratuity Benefits',
                            content: [
                                'Full gratuity at contract end',
                                'No reduction for natural contract completion',
                                'Same calculation formula as unlimited',
                                'Entitled after completing 1 year',
                                'Maximum 2 years\' salary cap applies'
                            ]
                        }
                    ]
                }
            },
            {
                type: 'table',
                data: {
                    title: 'Limited vs Unlimited Comparison',
                    headers: ['Feature', 'Limited Contract', 'Unlimited Contract'],
                    rows: [
                        { cells: ['Duration', 'Fixed (1-3 years)', 'No fixed end date'] },
                        { cells: ['Termination', 'Ends automatically', 'Requires notice'] },
                        { cells: ['Gratuity at End', 'Full (100%)', 'Full (100%)'] },
                        { cells: ['Gratuity on Resignation', 'Based on service', 'Reduced based on service'] },
                        { cells: ['Early Termination', 'Compensation may apply', 'Notice period only'] }
                    ]
                }
            },
            {
                type: 'faq',
                data: {
                    title: 'Frequently Asked Questions',
                    items: [
                        {
                            question: 'What is a limited contract in UAE?',
                            answer: 'A limited contract in UAE is a fixed-term employment agreement with a specific start and end date. The maximum duration is typically 2-3 years.'
                        },
                        {
                            question: 'Do I get full gratuity at the end of a limited contract?',
                            answer: 'Yes, when your limited contract ends naturally (on the specified date), you are entitled to full gratuity based on your years of service.'
                        }
                    ]
                }
            }
        ],
        updatedAt: admin.firestore.Timestamp.now()
    },
    {
        name: 'Unlimited Contract Gratuity Guide',
        slug: 'unlimited-contract',
        status: 'published',
        seo: {
            metaTitle: 'How to Calculate Gratuity in the UAE for an Unlimited Contract | 2026 Guide',
            metaDescription: 'Complete guide to calculating gratuity for unlimited contracts in UAE. Learn eligibility rules, calculation formula, and resignation entitlements.',
            secondaryKeywords: ['unlimited contract gratuity uae', 'resignation gratuity uae', 'uae labor law'],
            robots: { index: true, follow: true }
        },
        blocks: [
            {
                type: 'hero',
                data: {
                    title: 'How to Calculate Gratuity in UAE for an Unlimited Contract',
                    subtitle: 'Complete guide to understanding and calculating your end of service benefits for unlimited employment contracts in UAE.',
                    breadcrumbs: [
                        { name: 'Home', url: '/' },
                        { name: 'Unlimited Contract', url: '/unlimited-contract' }
                    ],
                    lastUpdated: 'February 2026',
                    readingTime: '8 mins'
                }
            },
            {
                type: 'calculator',
                data: {
                    defaultContractType: 'unlimited',
                    title: 'Calculate Your Unlimited Contract Gratuity',
                    description: 'Get an instant estimate of your end of service benefits.'
                }
            },
            {
                type: 'rich-text',
                data: {
                    title: 'Introduction',
                    content: `
                        <p>Gratuity is the end of service benefit for employees in the UAE. Knowing your gratuity amount helps you to plan your resignation or contract termination wisely.</p>
                        <p>An unlimited contract in UAE is an employment agreement with no fixed end date. Either party can terminate it at any time with proper notice (typically 1-3 months).</p>
                    `
                }
            },
            {
                type: 'heading',
                data: { text: 'Gratuity Entitlement for Resignation', level: 'h2' }
            },
            {
                type: 'table',
                data: {
                    headers: ['Scenario', 'Gratuity Entitlement'],
                    rows: [
                        { cells: ['Terminated (1+ year)', '100% Full Gratuity'] },
                        { cells: ['Resign < 1 year', '0% No Gratuity'] },
                        { cells: ['Resign 1-3 years', '33.33% (1/3 of gratuity)'] },
                        { cells: ['Resign 3-5 years', '66.67% (2/3 of gratuity)'] },
                        { cells: ['Resign 5+ years', '100% Full Gratuity'] }
                    ]
                }
            }
        ],
        updatedAt: admin.firestore.Timestamp.now()
    },
    {
        name: 'Privacy Policy',
        slug: 'privacy-policy',
        status: 'published',
        seo: {
            metaTitle: 'Privacy Policy | UAE Gratuity Calculator',
            metaDescription: 'Learn how we collect, use, and protect your personal information when using our UAE gratuity calculator.',
            secondaryKeywords: ['privacy policy', 'data protection', 'gratuity calculator privacy']
        },
        blocks: [
            {
                type: 'hero',
                data: {
                    title: 'Privacy Policy',
                    subtitle: 'Your privacy is important to us. This policy explains how we handle your information.',
                    breadcrumbs: [
                        { name: 'Home', url: '/' },
                        { name: 'Privacy Policy', url: '/privacy-policy' }
                    ]
                }
            },
            {
                type: 'rich-text',
                data: {
                    content: `
                        <p>Last Updated: January 1, 2026</p>
                        <h2>1. Introduction</h2>
                        <p>Welcome to UAE Gratuity Calculator ("we," "our," or "us"). We are committed to protecting your personal information and your right to privacy.</p>
                        <h2>2. Information We Collect</h2>
                        <p>We may collect information that you voluntarily provide when using our services, such as contact information when using our contact form.</p>
                        <h2>3. Calculator Data Privacy</h2>
                        <p><strong>Important:</strong> All calculations performed using our gratuity calculator are processed entirely in your browser. We do not collect, store, or transmit your salary information.</p>
                    `
                }
            }
        ],
        updatedAt: admin.firestore.Timestamp.now()
    },
    {
        name: 'Terms of Use',
        slug: 'terms-of-use',
        status: 'published',
        seo: {
            metaTitle: 'Terms of Use | UAE Gratuity Calculator',
            metaDescription: 'Read the terms and conditions for using our UAE gratuity calculator website and services.',
            secondaryKeywords: ['terms of use', 'terms and conditions', 'gratuity calculator terms']
        },
        blocks: [
            {
                type: 'hero',
                data: {
                    title: 'Terms of Use',
                    subtitle: 'Please read these terms carefully before using our website.',
                    breadcrumbs: [
                        { name: 'Home', url: '/' },
                        { name: 'Terms of Use', url: '/terms-of-use' }
                    ]
                }
            },
            {
                type: 'rich-text',
                data: {
                    content: `
                        <p>Last Updated: January 1, 2026</p>
                        <h2>1. Acceptance of Terms</h2>
                        <p>By accessing and using UAE Gratuity Calculator ("Website"), you accept and agree to be bound by these Terms of Use.</p>
                        <h2>2. Description of Service</h2>
                        <p>UAE Gratuity Calculator provides a free online tool to help users estimate their end of service gratuity benefits based on UAE Labor Law.</p>
                        <h2>3. Disclaimer</h2>
                        <p><strong>This Website is for informational and educational purposes only.</strong> The gratuity calculations provided are estimates and may not reflect your exact entitlements.</p>
                    `
                }
            }
        ],
        updatedAt: admin.firestore.Timestamp.now()
    }
];

async function seed() {
    console.log('Starting pages seeding...');
    const collectionRef = db.collection('pages');

    for (const page of pages) {
        const querySnapshot = await collectionRef.where('slug', '==', page.slug).get();

        if (querySnapshot.empty) {
            const docRef = await collectionRef.add(page);
            console.log(`Added page: ${page.slug} (ID: ${docRef.id})`);
        } else {
            const docId = querySnapshot.docs[0].id;
            await collectionRef.doc(docId).update(page);
            console.log(`Updated page: ${page.slug} (ID: ${docId})`);
        }
    }
    console.log('Seeding complete!');
    process.exit(0);
}

seed().catch(err => {
    console.error('Seeding failed:', err);
    process.exit(1);
});
