const { initializeApp, cert } = require('firebase-admin/app');
const { getFirestore } = require('firebase-admin/firestore');
const path = require('path');

// Load service account (adjust path if needed)
const serviceAccountPath = path.join(process.cwd(), 'service-account-key.json');
const serviceAccount = require(serviceAccountPath);

// Initialize Firebase Admin
initializeApp({
    credential: cert(serviceAccount)
});

const db = getFirestore();

async function seedWidgets() {
    console.log('Seeding widgets...');

    const widgets = [
        {
            id: 'sidebar_calculator',
            title: 'Calculate Your Gratuity',
            type: 'mini_calculator',
            isActive: true,
            order: 1,
            config: {
                description: 'Use our free calculator to estimate your end of service benefits.',
                buttonText: 'Calculate Now'
            },
            createdAt: new Date(),
            updatedAt: new Date()
        },
        {
            id: 'sidebar_newsletter',
            title: 'Newsletter',
            type: 'newsletter_box',
            isActive: true,
            order: 2,
            config: {
                description: 'Get the latest UAE labor law updates.'
            },
            createdAt: new Date(),
            updatedAt: new Date()
        },
        {
            id: 'sidebar_social_proof',
            title: 'Why Trust Us?',
            type: 'social_proof',
            isActive: true,
            order: 3,
            config: {},
            createdAt: new Date(),
            updatedAt: new Date()
        }
    ];

    for (const widget of widgets) {
        await db.collection('widgets').doc(widget.id).set(widget);
        console.log(`- Seeded widget: ${widget.title}`);
    }

    console.log('Widgets seeding completed!');
    process.exit(0);
}

seedWidgets().catch(err => {
    console.error('Error seeding widgets:', err);
    process.exit(1);
});
