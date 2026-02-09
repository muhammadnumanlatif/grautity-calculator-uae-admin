'use client';

import { useRouter, useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import ContentEditor from '@/components/editors/ContentEditor';
import { getDocument, updateDocument, COLLECTIONS } from '@gratuity/firebase-config/firestore';
import { Location } from '@gratuity/shared/types';
import { toast } from 'react-hot-toast';

export default function EditLocationPage() {
    const router = useRouter();
    const params = useParams();
    const id = params.id as string;
    const [location, setLocation] = useState<Location | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchLocation = async () => {
            try {
                const data = await getDocument<Location>(COLLECTIONS.LOCATIONS, id);
                if (data) setLocation(data);
                else toast.error('Location not found');
            } catch (err) {
                toast.error('Failed to fetch location');
            } finally {
                setLoading(false);
            }
        };
        fetchLocation();
    }, [id]);

    const handleSave = async (data: any) => {
        try {
            const updateData = {
                ...data,
                // Location uses 'name' instead of 'title' in the DB but ContentEditor uses 'title' for its form
                name: data.title,
                seo: {
                    metaTitle: data.metaTitle,
                    metaDescription: data.metaDescription,
                    focusKeyword: data.focusKeyword,
                    robots: { index: true, follow: true },
                    seoScore: 0,
                    secondaryKeywords: data.secondaryKeywords || [],
                },
                type: data.locationType,
                emirate: data.emirate,
                updatedAt: new Date(),
            };

            delete updateData.title;
            delete updateData.metaTitle;
            delete updateData.metaDescription;
            delete updateData.focusKeyword;
            delete updateData.locationType;
            delete updateData.emirate;

            await updateDocument(COLLECTIONS.LOCATIONS, id, updateData);
            toast.success('Location updated successfully!');
            router.push('/dashboard/locations');
        } catch (err) {
            console.error(err);
            toast.error('Failed to update location.');
        }
    };

    if (loading) return <div className="p-4 text-center py-5">
        <div className="spinner-border text-primary" role="status"></div>
        <p className="mt-2 text-muted">Retrieving location content...</p>
    </div>;
    if (!location) return <div className="p-4 text-center">Location not found.</div>;

    // Map Location to what ContentEditor expects (title instead of name)
    const editorData = {
        ...location,
        title: location.name,
    };

    return (
        <div className="h-100">
            <ContentEditor type="location" initialData={editorData as any} onSave={handleSave} />
        </div>
    );
}
