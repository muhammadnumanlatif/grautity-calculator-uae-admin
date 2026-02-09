import { cache } from 'react';
import { getDocuments, COLLECTIONS, where, orderBy } from '@gratuity/firebase-config/firestore';
import { Widget } from '@gratuity/shared/types';

/**
 * Fetch active widgets, sorted by order.
 * Cached for performance.
 */
export const getActiveWidgets = cache(async (): Promise<Widget[]> => {
    try {
        const widgets = await getDocuments<Widget>(
            COLLECTIONS.WIDGETS,
            [
                where('isActive', '==', true),
                orderBy('order', 'asc')
            ]
        );
        return widgets;
    } catch (error) {
        console.error('Failed to fetch active widgets:', error);
        return [];
    }
});
