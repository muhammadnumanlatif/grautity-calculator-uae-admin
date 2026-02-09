const { initializeApp, cert } = require('firebase-admin/app');
const { getFirestore } = require('firebase-admin/firestore');
const path = require('path');
const fs = require('fs');

// Load service account
const serviceAccountPath = path.join(process.cwd(), 'service-account-key.json');
const serviceAccount = require(serviceAccountPath);

// Initialize Firebase Admin
initializeApp({
    credential: cert(serviceAccount)
});

const db = getFirestore();

// We can't import from @gratuity/shared easily in a raw node script without ts-node or similar
// So I'll just define the data here or copy it from the constants file
const DUBAI_AREAS = [
    { name: 'Downtown Dubai', slug: 'downtown' },
    { name: 'Dubai Marina', slug: 'marina' },
    { name: 'Business Bay', slug: 'business-bay' },
    { name: 'Jumeirah', slug: 'jumeirah' },
];

const DUBAI_FREE_ZONES = [
    { name: 'DIFC', slug: 'difc' },
    { name: 'JAFZA', slug: 'jafza' },
    { name: 'DMCC', slug: 'dmcc' },
];

const ABU_DHABI_AREAS = [
    { name: 'Yas Island', slug: 'yas-island' },
    { name: 'Saadiyat Island', slug: 'saadiyat-island' },
];

async function seedSubLocations() {
    console.log('Starting sub-locations seeding...');

    const subLocations = [
        ...DUBAI_AREAS.map(a => ({ ...a, emirate: 'dubai', type: 'area' })),
        ...DUBAI_FREE_ZONES.map(f => ({ ...f, emirate: 'dubai', type: 'free-zone' })),
        ...ABU_DHABI_AREAS.map(a => ({ ...a, emirate: 'abu-dhabi', type: 'area' })),
    ];

    for (const loc of subLocations) {
        const docId = `${loc.emirate}_${loc.slug}`;
        const docRef = db.collection('locations').doc(docId);

        const data = {
            name: loc.name,
            slug: loc.slug,
            emirate: loc.emirate,
            type: loc.type,
            status: 'published',
            seo: {
                metaTitle: `Gratuity Calculator ${loc.name}, ${loc.emirate} | End of Service`,
                metaDescription: `Essential gratuity calculation guide for employees in ${loc.name}, ${loc.emirate}.`,
                focusKeyword: `${loc.name} gratuity`,
                robots: { index: true, follow: true },
                seoScore: 85
            },
            blocks: [
                {
                    id: 'hero_sub',
                    type: 'hero',
                    data: {
                        title: `Gratuity in ${loc.name}`,
                        subtitle: `${loc.name} is a key district in ${loc.emirate}.`,
                        breadcrumbs: [
                            { name: 'Home', url: '/' },
                            { name: loc.emirate.charAt(0).toUpperCase() + loc.emirate.slice(1), url: `/${loc.emirate}` },
                            { name: loc.name, url: `/${loc.emirate}/${loc.slug}` }
                        ]
                    }
                },
                {
                    id: 'calc_sub',
                    type: 'calculator',
                    data: {
                        title: `${loc.name} Calculator`,
                        defaultContractType: 'unlimited'
                    }
                },
                {
                    id: 'text_sub',
                    type: 'rich-text',
                    data: {
                        content: `<p>Employees working in ${loc.name} are subject to the UAE Labor Law. Gratuity is calculated based on your basic salary and length of service.</p>`
                    }
                }
            ],
            createdAt: new Date(),
            updatedAt: new Date()
        };

        await docRef.set(data, { merge: true });
        console.log(`- Seeded ${loc.name} (${docId})`);
    }

    console.log('Sub-locations seeding completed!');
    process.exit(0);
}

seedSubLocations().catch(err => {
    console.error('Error seeding sub-locations:', err);
    process.exit(1);
});
