import { getDocuments, COLLECTIONS, where } from '@gratuity/firebase-config/firestore';
import { MenuConfig } from '@gratuity/shared/types';

/**
 * Fetch a menu by its location
 */
export async function getMenuByLocation(location: MenuConfig['location']): Promise<MenuConfig | null> {
    try {
        const menus = await getDocuments<MenuConfig>(
            COLLECTIONS.MENUS,
            [
                where('location', '==', location),
                where('isActive', '==', true)
            ]
        );

        return menus[0] || null;
    } catch (error) {
        console.error(`Failed to fetch menu for location: ${location}`, error);
        return null;
    }
}

/**
 * Fetch all active menus
 */
export async function getAllActiveMenus(): Promise<MenuConfig[]> {
    try {
        const menus = await getDocuments<MenuConfig>(
            COLLECTIONS.MENUS,
            [where('isActive', '==', true)]
        );

        return menus;
    } catch (error) {
        console.error('Failed to fetch active menus', error);
        return [];
    }
}
