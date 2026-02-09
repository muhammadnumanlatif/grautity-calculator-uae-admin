'use client';

import { useRouter, useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import ContentEditor from '@/components/editors/ContentEditor';
import { getDocument, updateDocument, COLLECTIONS } from '@gratuity/firebase-config/firestore';
import { Page } from '@gratuity/shared/types';
import { toast } from 'react-hot-toast';

export default function EditPage() {
    const router = useRouter();
    const params = useParams();
    const id = params.id as string;
    const [page, setPage] = useState<Page | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPage = async () => {
            try {
                const data = await getDocument<Page>(COLLECTIONS.PAGES, id);
                if (data) setPage(data);
                else toast.error('Page not found');
            } catch (err) {
                toast.error('Failed to fetch page');
            } finally {
                setLoading(false);
            }
        };
        fetchPage();
    }, [id]);

    const handleSave = async (data: any) => {
        try {
            const updateData = {
                ...data,
                seo: {
                    metaTitle: data.metaTitle,
                    metaDescription: data.metaDescription,
                    focusKeyword: data.focusKeyword,
                    robots: { index: true, follow: true },
                    seoScore: 0,
                },
                updatedAt: new Date(),
            };

            delete updateData.metaTitle;
            delete updateData.metaDescription;
            delete updateData.focusKeyword;

            await updateDocument(COLLECTIONS.PAGES, id, updateData);
            toast.success('Page updated successfully!');
            router.push('/dashboard/pages');
        } catch (err) {
            toast.error('Failed to update page.');
        }
    };

    if (loading) return <div className="p-4 text-center py-5">
        <div className="spinner-border text-primary" role="status"></div>
        <p className="mt-2 text-muted">Retrieving page content...</p>
    </div>;
    if (!page) return <div className="p-4 text-center">Page not found.</div>;

    return (
        <div className="h-100">
            <ContentEditor type="page" initialData={page} onSave={handleSave} />
        </div>
    );
}
