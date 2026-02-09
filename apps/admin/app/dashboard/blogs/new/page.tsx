'use client';

import { useRouter } from 'next/navigation';
import ContentEditor from '@/components/editors/ContentEditor';
import { addDocument, COLLECTIONS } from '@gratuity/firebase-config/firestore';
import { useAuth } from '@/context/AuthContext';
import { toast } from 'react-hot-toast';

export default function NewBlog() {
    const router = useRouter();
    const { user } = useAuth();

    const handleSave = async (data: any) => {
        try {
            const blogData = {
                ...data,
                seo: {
                    metaTitle: data.metaTitle,
                    metaDescription: data.metaDescription,
                    focusKeyword: data.focusKeyword,
                    robots: { index: true, follow: true },
                    seoScore: 0,
                },
                authorId: user?.uid || 'admin',
                readingTime: Math.ceil(data.content.split(' ').length / 200), // Basic reading time calc
                publishedAt: data.status === 'published' ? new Date() : null,
            };

            // Clean up flat form data
            delete blogData.metaTitle;
            delete blogData.metaDescription;
            delete blogData.focusKeyword;

            await addDocument(COLLECTIONS.BLOGS, blogData);
            toast.success('Blog post created!');
            router.push('/dashboard/blogs');
        } catch (err) {
            console.error(err);
            toast.error('Failed to create blog post.');
        }
    };

    return (
        <div className="h-100">
            <ContentEditor type="blog" onSave={handleSave} />
        </div>
    );
}
