'use client';

import { useRouter, useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import ContentEditor from '@/components/editors/ContentEditor';
import { getDocument, updateDocument, COLLECTIONS } from '@gratuity/firebase-config/firestore';
import { BlogPost } from '@gratuity/shared/types';
import { toast } from 'react-hot-toast';

export default function EditBlog() {
    const router = useRouter();
    const params = useParams();
    const id = params.id as string;
    const [blog, setBlog] = useState<BlogPost | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchBlog = async () => {
            try {
                const data = await getDocument<BlogPost>(COLLECTIONS.BLOGS, id);
                if (data) setBlog(data);
                else toast.error('Blog post not found');
            } catch (err) {
                toast.error('Failed to fetch blog post');
            } finally {
                setLoading(false);
            }
        };
        fetchBlog();
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
                readingTime: Math.ceil(data.content.split(' ').length / 200),
                updatedAt: new Date(),
            };

            delete updateData.metaTitle;
            delete updateData.metaDescription;
            delete updateData.focusKeyword;

            await updateDocument(COLLECTIONS.BLOGS, id, updateData);
            toast.success('Blog post updated!');
            router.push('/dashboard/blogs');
        } catch (err) {
            toast.error('Failed to update blog.');
        }
    };

    if (loading) return <div className="p-4">Loading active document...</div>;
    if (!blog) return <div className="p-4">Blog post not found.</div>;

    return (
        <div className="h-100">
            <ContentEditor type="blog" initialData={blog} onSave={handleSave} />
        </div>
    );
}
