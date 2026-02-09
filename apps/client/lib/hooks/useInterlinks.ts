import { useState, useEffect } from 'react';
import {
    getDocumentsByQuery,
    COLLECTIONS,
    where,
    orderBy,
    limit,
    QueryConstraint
} from '@gratuity/firebase-config/firestore';

interface LinkItem {
    customLabel: string;
    entityType: 'blog' | 'page' | 'location';
    url: string;
    entityId: string;
}

interface UseInterlinksProps {
    mode: 'manual' | 'related' | 'category' | 'latest';
    limit?: number;
    category?: string;
    currentTags?: string[];
    currentId?: string;
}

export function useInterlinks({ mode, limit: limitCount = 3, category, currentTags = [], currentId }: UseInterlinksProps) {
    const [links, setLinks] = useState<LinkItem[]>([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (mode === 'manual') return;

        const fetchLinks = async () => {
            setLoading(true);
            try {
                let fetchedItems: any[] = [];
                const constraints: QueryConstraint[] = [
                    where('status', '==', 'published'),
                    orderBy('createdAt', 'desc'),
                    limit(limitCount + 1) // Fetch one extra to filter out current
                ];

                if (mode === 'latest') {
                    // Fetch latest blogs
                    fetchedItems = await getDocumentsByQuery(COLLECTIONS.BLOGS, constraints);
                } else if (mode === 'category' && category) {
                    // Fetch by category
                    const categoryConstraints = [
                        where('status', '==', 'published'),
                        where('category', '==', category),
                        orderBy('createdAt', 'desc'),
                        limit(limitCount + 1)
                    ];
                    fetchedItems = await getDocumentsByQuery(COLLECTIONS.BLOGS, categoryConstraints);
                } else if (mode === 'related' && currentTags.length > 0) {
                    // Fetch by tags (array-contains-any)
                    // Note: You can only use one array-contains clause per query
                    const relatedConstraints = [
                        where('status', '==', 'published'),
                        where('tags', 'array-contains-any', currentTags.slice(0, 10)), // limit tag count
                        orderBy('createdAt', 'desc'),
                        limit(limitCount + 1)
                    ];
                    fetchedItems = await getDocumentsByQuery(COLLECTIONS.BLOGS, relatedConstraints);
                }

                // Filter out current post if ID matches and transform
                const finalLinks = fetchedItems
                    .filter(item => item.id !== currentId)
                    .slice(0, limitCount)
                    .map(item => ({
                        customLabel: item.title,
                        entityType: 'blog', // Could be dynamic if we query pages too
                        url: `/blog/${item.slug}`,
                        entityId: item.id
                    })) as LinkItem[];

                setLinks(finalLinks);
            } catch (error) {
                console.error("Failed to fetch interlinks:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchLinks();
    }, [mode, limitCount, category, currentTags, currentId]);

    return { links, loading };
}
