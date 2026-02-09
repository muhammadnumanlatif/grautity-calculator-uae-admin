const admin = require('firebase-admin');
const serviceAccount = require('../service-account-key.json');

if (!admin.apps.length) {
    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount)
    });
}

const db = admin.firestore();

const menus = [
    {
        name: 'Main Navigation',
        location: 'header_main',
        isActive: true,
        items: [
            { id: 'nav-home', label: 'Home', url: '/', type: 'link' },
            {
                id: 'nav-calculators',
                label: 'Calculators',
                type: 'mega_menu',
                megaMenuContext: 'calculators_list',
                children: [
                    {
                        id: 'group-mohre',
                        label: 'MOHRE Calculators',
                        type: 'action',
                        icon: 'calculator',
                        children: [
                            { id: 'calc-mohre-official', label: 'MOHRE Calculator', url: '/mohre-calculator', type: 'link' },
                            { id: 'calc-mohre-gratuity', label: 'MOHRE Gratuity Calculator', url: '/mohre-gratuity-calculator', type: 'link' }
                        ]
                    },
                    {
                        id: 'group-contracts',
                        label: 'By Contract Type',
                        type: 'action',
                        icon: 'file-text',
                        children: [
                            { id: 'calc-unlimited', label: 'Unlimited Contract', url: '/unlimited-contract', type: 'link' },
                            { id: 'calc-limited', label: 'Limited Contract', url: '/limited-contract', type: 'link' }
                        ]
                    },
                    {
                        id: 'group-services',
                        label: 'MOHRE Services',
                        type: 'action',
                        icon: 'briefcase',
                        children: [
                            { id: 'service-labor-card', label: 'Labor Card Check', url: '/labor-card-check', type: 'link' },
                            { id: 'service-e-signature', label: 'E-Signature Card', url: '/e-signature-card', type: 'link' }
                        ]
                    }
                ]
            },
            {
                id: 'nav-emirates',
                label: 'Emirates',
                type: 'mega_menu',
                megaMenuContext: 'emirates_grid',
                children: [
                    {
                        id: 'emirate-dubai',
                        label: 'Dubai',
                        url: '/dubai',
                        type: 'link',
                        badge: 'Popular',
                        children: [
                            { id: 'dubai-area-1', label: 'Downtown Dubai', url: '/dubai/downtown', type: 'link' },
                            { id: 'dubai-area-2', label: 'Dubai Marina', url: '/dubai/marina', type: 'link' },
                            { id: 'dubai-fz-1', label: 'DIFC', url: '/dubai/free-zones/difc', type: 'link' },
                            { id: 'dubai-fz-2', label: 'JAFZA', url: '/dubai/free-zones/jafza', type: 'link' }
                        ]
                    },
                    {
                        id: 'emirate-abu-dhabi',
                        label: 'Abu Dhabi',
                        url: '/abu-dhabi',
                        type: 'link',
                        children: [
                            { id: 'ad-area-1', label: 'Al Reem Island', url: '/abu-dhabi/reem-island', type: 'link' },
                            { id: 'ad-area-2', label: 'Yas Island', url: '/abu-dhabi/yas-island', type: 'link' },
                            { id: 'ad-fz-1', label: 'ADGM', url: '/abu-dhabi/free-zones/adgm', type: 'link' },
                            { id: 'ad-fz-2', label: 'Masdar City', url: '/abu-dhabi/free-zones/masdar', type: 'link' }
                        ]
                    },
                    {
                        id: 'emirate-sharjah',
                        label: 'Sharjah',
                        url: '/sharjah',
                        type: 'link',
                        children: [
                            { id: 'shj-area-1', label: 'Al Majaz', url: '/sharjah/al-majaz', type: 'link' },
                            { id: 'shj-area-2', label: 'Al Nahda', url: '/sharjah/al-nahda', type: 'link' },
                            { id: 'shj-fz-1', label: 'SAIF Zone', url: '/sharjah/free-zones/saif', type: 'link' },
                            { id: 'shj-fz-2', label: 'SHAMS', url: '/sharjah/free-zones/shams', type: 'link' }
                        ]
                    }
                ]
            },
            { id: 'nav-blog', label: 'Blog', url: '/blog', type: 'link' },
            { id: 'nav-cta', label: 'Calculate Now', url: '/#calculator', type: 'button' }
        ],
        updatedAt: admin.firestore.Timestamp.now()
    },
    {
        name: 'Footer Column 1 (Calculators)',
        location: 'footer_col_1',
        isActive: true,
        items: [
            { id: 'f1-1', label: 'Gratuity Calculator', url: '/', type: 'link' },
            { id: 'f1-2', label: 'MOHRE Calculator', url: '/mohre-calculator', type: 'link' },
            { id: 'f1-3', label: 'MOHRE Gratuity', url: '/mohre-gratuity-calculator', type: 'link' },
            { id: 'f1-4', label: 'Unlimited Contract', url: '/unlimited-contract', type: 'link' },
            { id: 'f1-5', label: 'Limited Contract', url: '/limited-contract', type: 'link' }
        ],
        updatedAt: admin.firestore.Timestamp.now()
    },
    {
        name: 'Footer Column 2 (Emirates)',
        location: 'footer_col_2',
        isActive: true,
        items: [
            { id: 'f2-1', label: 'Dubai', url: '/dubai', type: 'link' },
            { id: 'f2-2', label: 'Abu Dhabi', url: '/abu-dhabi', type: 'link' },
            { id: 'f2-3', label: 'Sharjah', url: '/sharjah', type: 'link' },
            { id: 'f2-4', label: 'Ajman', url: '/ajman', type: 'link' },
            { id: 'f2-5', label: 'Ras Al Khaimah', url: '/ras-al-khaimah', type: 'link' }
        ],
        updatedAt: admin.firestore.Timestamp.now()
    },
    {
        name: 'Footer Column 3 (Free Zones)',
        location: 'footer_col_3',
        isActive: true,
        items: [
            { id: 'f3-1', label: 'DIFC', url: '/dubai/free-zones/difc', type: 'link' },
            { id: 'f3-2', label: 'ADGM', url: '/abu-dhabi/free-zones/adgm', type: 'link' },
            { id: 'f3-3', label: 'JAFZA', url: '/dubai/free-zones/jafza', type: 'link' },
            { id: 'f3-4', label: 'DMCC', url: '/dubai/free-zones/dmcc', type: 'link' },
            { id: 'f3-5', label: 'All Free Zones', url: '/free-zones', type: 'link', badge: 'View All' }
        ],
        updatedAt: admin.firestore.Timestamp.now()
    },
    {
        name: 'Footer Column 4 (Support)',
        location: 'footer_col_4',
        isActive: true,
        items: [
            { id: 'f4-1', label: 'Blog', url: '/blog', type: 'link' },
            { id: 'f4-2', label: 'FAQ', url: '/faq', type: 'link' },
            { id: 'f4-3', label: 'Contact Us', url: '/contact', type: 'link' },
            { id: 'f4-4', label: 'Privacy Policy', url: '/privacy-policy', type: 'link' },
            { id: 'f4-5', label: 'Terms of Use', url: '/terms-of-use', type: 'link' }
        ],
        updatedAt: admin.firestore.Timestamp.now()
    }
];

async function seed() {
    console.log('Starting menu seeding...');
    const collectionRef = db.collection('menus');

    for (const menu of menus) {
        const querySnapshot = await collectionRef.where('location', '==', menu.location).get();

        if (querySnapshot.empty) {
            const docRef = await collectionRef.add(menu);
            console.log(`Added menu for location: ${menu.location} (ID: ${docRef.id})`);
        } else {
            const docId = querySnapshot.docs[0].id;
            await collectionRef.doc(docId).update(menu);
            console.log(`Updated existing menu for location: ${menu.location} (ID: ${docId})`);
        }
    }
    console.log('Seeding complete!');
    process.exit(0);
}

seed().catch(err => {
    console.error('Seeding failed:', err);
    process.exit(1);
});
