import { cache } from 'react';
import { getPageBySlug as fetchPage, getLocationBySlug as fetchLocation } from '@gratuity/firebase-config/firestore';
import { Page, Location } from '@gratuity/shared/types';

export type DynamicContent = (Page | Location) & { contentType: 'page' | 'location' };

/**
 * Fetches dynamic content by slug from either the 'pages' or 'locations' collection.
 * This is used by the catch-all [...slug] route to render content dynamically.
 * Wrapped in React cache() to deduplicate requests during rendering.
 */
export const getDynamicContentBySlug = cache(async (slug: string | string[]): Promise<DynamicContent | null> => {
    try {
        const slugStr = Array.isArray(slug) ? slug[slug.length - 1] : slug;
        const fullSlugPath = Array.isArray(slug) ? slug.join('/') : slug;

        // 1. Try to find in Pages collection (Pages usually have flat slugs)
        const page = await fetchPage<Page>(fullSlugPath);
        if (page && page.status === 'published') {
            return { ...page, contentType: 'page' };
        }

        // 2. Try to find in Locations collection
        // If it's a nested slug, the first part is likely the emirate
        if (Array.isArray(slug) && slug.length > 1) {
            const emirate = slug[0];
            const leafSlug = slug[slug.length - 1];

            // Try with emirate context first
            const location = await fetchLocation<Location>(leafSlug, emirate);

            if (location && location.status === 'published') {
                return { ...location, contentType: 'location' };
            }
        } else {
            // Top level slug
            const location = await fetchLocation<Location>(slugStr as string);
            if (location && location.status === 'published') {
                return { ...location, contentType: 'location' };
            }
        }

        return null;
    } catch (error) {
        console.error(`Error fetching dynamic content for slug "${slug}":`, error);
        return null;
    }
});
