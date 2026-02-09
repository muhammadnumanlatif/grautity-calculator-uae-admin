'use client';

import { useRouter } from 'next/navigation';
import ContentEditor from '@/components/editors/ContentEditor';
import { addDocument, COLLECTIONS } from '@gratuity/firebase-config/firestore';
import { useAuth } from '@/context/AuthContext';
import { toast } from 'react-hot-toast';

export default function NewPage() {
    const router = useRouter();
    const { user } = useAuth();

    const handleSave = async (data: any) => {
        try {
            const pageData = {
                ...data,
                seo: {
                    metaTitle: data.metaTitle,
                    metaDescription: data.metaDescription,
                    focusKeyword: data.focusKeyword,
                    robots: { index: true, follow: true },
                    seoScore: 0,
                },
                createdBy: user?.uid || 'admin',
                type: 'page',
            };

            // Clean up the flat form data before saving to Firestore
            delete pageData.metaTitle;
            delete pageData.metaDescription;
            delete pageData.focusKeyword;

            await addDocument(COLLECTIONS.PAGES, pageData);
            toast.success('Page created successfully!');
            router.push('/dashboard/pages');
        } catch (err) {
            console.error(err);
            toast.error('Failed to create page.');
        }
    };

    return (
        <div className="h-100">
            <ContentEditor type="page" onSave={handleSave} />
        </div>
    );
}
