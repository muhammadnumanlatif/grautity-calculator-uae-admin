const { initializeApp, cert } = require('firebase-admin/app');
const { getFirestore } = require('firebase-admin/firestore');
const path = require('path');
const fs = require('fs');

// Load service account
const serviceAccountPath = path.join(process.cwd(), 'service-account-key.json');
if (!fs.existsSync(serviceAccountPath)) {
    console.error('Service account file not found!');
    process.exit(1);
}
const serviceAccount = require(serviceAccountPath);

// Initialize Firebase Admin
initializeApp({
    credential: cert(serviceAccount)
});

const db = getFirestore();

const EMIRATES = [
    {
        name: 'Dubai',
        slug: 'dubai',
        emirate: 'dubai',
        type: 'emirate',
        description: 'Calculate your end of service benefits in Dubai - for mainland and all free zones including DIFC, JAFZA, DMCC, and more.',
        faqs: [
            {
                question: 'How is gratuity calculated in Dubai?',
                answer: 'Gratuity in Dubai is calculated based on UAE Federal Labor Law. You receive 21 days\' basic salary for each of the first 5 years and 30 days\' salary for each year after that. The maximum gratuity cannot exceed 2 years\' total salary.'
            },
            {
                question: 'Are gratuity rules different in Dubai Free Zones?',
                answer: 'Most Dubai free zones follow standard UAE Labor Law. However, DIFC (Dubai International Financial Centre) has its own employment law with different gratuity calculations.'
            }
        ],
        blocks: [
            {
                id: 'hero_1',
                type: 'hero',
                data: {
                    title: 'Gratuity Calculator Dubai',
                    subtitle: 'Accurate end of service calculations for Dubai mainland and free zones.',
                    breadcrumbs: [{ name: 'Home', url: '/' }, { name: 'Dubai', url: '/dubai' }]
                }
            },
            {
                id: 'calc_1',
                type: 'calculator',
                data: {
                    title: 'Dubai Gratuity Calculator',
                    description: 'Use our MOHRE-compliant calculator to get an instant estimate.',
                    defaultContractType: 'unlimited'
                }
            },
            {
                id: 'text_1',
                type: 'rich-text',
                data: {
                    title: 'Dubai Employment Overview',
                    content: '<p>Dubai is the business hub of the UAE. Whether you work in Dubai mainland or one of its many free zones, understanding your gratuity entitlements is important. Gratuity is mandatory for employees completing 1+ year of service.</p>'
                }
            },
            {
                id: 'list_1',
                type: 'location-list',
                data: {
                    title: 'Exploring Dubai Areas',
                    subtitle: 'All Dubai mainland areas follow the same gratuity rules.',
                    emirate: 'dubai',
                    locationType: 'area',
                    columns: 4
                }
            },
            {
                id: 'list_2',
                type: 'location-list',
                data: {
                    title: 'Dubai Free Zones',
                    subtitle: 'Some free zones have special rules (like DIFC).',
                    emirate: 'dubai',
                    locationType: 'free-zone',
                    columns: 4
                }
            },
            {
                id: 'faq_1',
                type: 'faq',
                data: {
                    title: 'Dubai Gratuity FAQ',
                    items: [
                        { question: 'How is gratuity calculated in Dubai?', answer: 'Gratuity in Dubai is calculated based on UAE Federal Labor Law. You receive 21 days\' basic salary for each of the first 5 years and 30 days\' salary for each year after that.' },
                        { question: 'Can I use this calculator for DIFC?', answer: 'While DIFC has its own laws, our calculator provides a general estimate. For specific DIFC calculations, use the specialized DIFC mode.' }
                    ]
                }
            }
        ]
    },
    {
        name: 'Abu Dhabi',
        slug: 'abu-dhabi',
        emirate: 'abu-dhabi',
        type: 'emirate',
        description: 'Calculate end of service benefits for Abu Dhabi mainland and free zones including ADGM.',
        blocks: [
            {
                id: 'hero_ad',
                type: 'hero',
                data: {
                    title: 'Gratuity Calculator Abu Dhabi',
                    subtitle: 'Calculate your end of service benefits in the UAE Capital.',
                    breadcrumbs: [{ name: 'Home', url: '/' }, { name: 'Abu Dhabi', url: '/abu-dhabi' }]
                }
            },
            {
                id: 'calc_ad',
                type: 'calculator',
                data: {
                    title: 'Abu Dhabi Gratuity Calculator',
                    description: 'Includes ADGM and Mainland modes.',
                    defaultContractType: 'unlimited'
                }
            },
            {
                id: 'list_ad_1',
                type: 'location-list',
                data: {
                    title: 'Abu Dhabi Areas',
                    emirate: 'abu-dhabi',
                    locationType: 'area',
                    columns: 3
                }
            }
        ]
    },
    {
        name: 'Sharjah',
        slug: 'sharjah',
        emirate: 'sharjah',
        type: 'emirate',
        description: 'Gratuity calculator for Sharjah mainland and free zones like SAIF Zone.',
        blocks: [
            {
                id: 'hero_sh',
                type: 'hero',
                data: {
                    title: 'Gratuity Calculator Sharjah',
                    subtitle: 'Calculations for Sharjah city and industrial areas.',
                    breadcrumbs: [{ name: 'Home', url: '/' }, { name: 'Sharjah', url: '/sharjah' }]
                }
            },
            {
                id: 'calc_sh',
                type: 'calculator',
                data: {
                    title: 'Sharjah Gratuity Calculator',
                    defaultContractType: 'unlimited'
                }
            }
        ]
    },
    {
        name: 'Ajman',
        slug: 'ajman',
        emirate: 'ajman',
        type: 'emirate',
        description: 'Calculate gratuity for Ajman mainland and Ajman Free Zone (AFZ).',
        blocks: [
            { id: 'hero_aj', type: 'hero', data: { title: 'Gratuity Calculator Ajman', breadcrumbs: [{ name: 'Home', url: '/' }, { name: 'Ajman', url: '/ajman' }] } },
            { id: 'calc_aj', type: 'calculator', data: { title: 'Ajman Calculator' } }
        ]
    },
    {
        name: 'Umm Al Quwain',
        slug: 'umm-al-quwain',
        emirate: 'umm-al-quwain',
        type: 'emirate',
        description: 'Gratuity benefits and calculations for Umm Al Quwain.',
        blocks: [
            { id: 'hero_uaq', type: 'hero', data: { title: 'Gratuity Calculator Umm Al Quwain', breadcrumbs: [{ name: 'Home', url: '/' }, { name: 'Umm Al Quwain', url: '/umm-al-quwain' }] } },
            { id: 'calc_uaq', type: 'calculator', data: { title: 'UAQ Calculator' } }
        ]
    },
    {
        name: 'Ras Al Khaimah',
        slug: 'ras-al-khaimah',
        emirate: 'ras-al-khaimah',
        type: 'emirate',
        description: 'Calculate gratuity for RAK mainland and RAKEZ free zone.',
        blocks: [
            { id: 'hero_rak', type: 'hero', data: { title: 'Gratuity Calculator Ras Al Khaimah', breadcrumbs: [{ name: 'Home', url: '/' }, { name: 'Ras Al Khaimah', url: '/ras-al-khaimah' }] } },
            { id: 'calc_rak', type: 'calculator', data: { title: 'RAK Calculator' } }
        ]
    },
    {
        name: 'Fujairah',
        slug: 'fujairah',
        emirate: 'fujairah',
        type: 'emirate',
        description: 'Gratuity calculations for Fujairah mainland and Fujairah Free Zone.',
        blocks: [
            { id: 'hero_fuj', type: 'hero', data: { title: 'Gratuity Calculator Fujairah', breadcrumbs: [{ name: 'Home', url: '/' }, { name: 'Fujairah', url: '/fujairah' }] } },
            { id: 'calc_fuj', type: 'calculator', data: { title: 'Fujairah Calculator' } }
        ]
    }
];

async function seedEmirates() {
    console.log('Starting Emirates seeding...');

    for (const emirate of EMIRATES) {
        const docId = `${emirate.emirate}_${emirate.slug}`;
        const docRef = db.collection('locations').doc(docId);

        const data = {
            ...emirate,
            status: 'published',
            seo: {
                metaTitle: `Gratuity Calculator ${emirate.name} | End of Service 2026`,
                metaDescription: `Calculate your gratuity in ${emirate.name} with our MOHRE-compliant calculator.`,
                focusKeyword: `${emirate.name} gratuity calculator`,
                robots: { index: true, follow: true },
                seoScore: 90
            },
            createdAt: new Date(),
            updatedAt: new Date()
        };

        await docRef.set(data, { merge: true });
        console.log(`- Seeded ${emirate.name} (${docId})`);
    }

    console.log('Emirates seeding completed!');
    process.exit(0);
}

seedEmirates().catch(err => {
    console.error('Error seeding emirates:', err);
    process.exit(1);
});
