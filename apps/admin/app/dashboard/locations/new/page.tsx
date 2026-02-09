'use client';

import { useRouter } from 'next/navigation';
import ContentEditor from '@/components/editors/ContentEditor';
import { addDocument, COLLECTIONS } from '@gratuity/firebase-config/firestore';
import { useAuth } from '@/context/AuthContext';
import { toast } from 'react-hot-toast';

export default function NewLocationPage() {
    const router = useRouter();
    const { user } = useAuth();

    const handleSave = async (data: any) => {
        try {
            const locationData = {
                ...data,
                name: data.title,
                seo: {
                    metaTitle: data.metaTitle,
                    metaDescription: data.metaDescription,
                    focusKeyword: data.focusKeyword,
                    robots: { index: true, follow: true },
                    seoScore: 0,
                    secondaryKeywords: data.secondaryKeywords || [],
                },
                createdBy: user?.uid || 'admin',
                type: data.locationType,
                emirate: data.emirate,
                createdAt: new Date(),
                updatedAt: new Date(),
            };

            // Clean up the flat form data before saving to Firestore
            delete locationData.title;
            delete locationData.metaTitle;
            delete locationData.metaDescription;
            delete locationData.focusKeyword;
            delete locationData.locationType;
            delete locationData.emirate;

            await addDocument(COLLECTIONS.LOCATIONS, locationData);
            toast.success('Location created successfully!');
            router.push('/dashboard/locations');
        } catch (err) {
            console.error(err);
            toast.error('Failed to create location.');
        }
    };

    return (
        <div className="h-100">
            <ContentEditor type="location" onSave={handleSave} />
        </div>
    );
}
