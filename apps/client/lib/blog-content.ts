import { cache } from 'react';
import { getPublishedBlogs, getBlogBySlug as fetchBlog } from '@gratuity/firebase-config/firestore';
import { BlogPost } from '@gratuity/shared/types';

/**
 * Fetch a blog post by its slug.
 * Wrapped in React cache() for request deduplication.
 */
export const getBlogBySlug = cache(async (slug: string): Promise<BlogPost | null> => {
    try {
        const blog = await fetchBlog<BlogPost>(slug);
        if (blog && blog.status === 'published') {
            return blog;
        }
        return null;
    } catch (error) {
        console.error(`Error fetching blog post "${slug}":`, error);
        return null;
    }
});

/**
 * Fetch latest published blogs.
 * Wrapped in React cache().
 */
export const getLatestBlogs = cache(async (limitCount: number = 10): Promise<BlogPost[]> => {
    try {
        const blogs = await getPublishedBlogs<BlogPost>(limitCount);
        return blogs;
    } catch (error) {
        console.error('Error fetching latest blogs:', error);
        return [];
    }
});
