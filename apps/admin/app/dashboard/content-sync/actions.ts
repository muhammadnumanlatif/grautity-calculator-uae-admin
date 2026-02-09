'use server';

import { scanClientPages, importPageToFirestore } from '@/lib/content-sync';
import { revalidatePath } from 'next/cache';

export async function discoverPages() {
    const pages = await scanClientPages();
    return pages;
}

export async function syncPage(slug: string) {
    try {
        const success = await importPageToFirestore(slug);
        if (success) {
            revalidatePath('/dashboard/content-sync');
            return { success: true, message: `Successfully synced page: /${slug}` };
        } else {
            return { success: false, message: `Failed to import page data for: /${slug}` };
        }
    } catch (error) {
        return { success: false, message: `Error syncing page: ${String(error)}` };
    }
}
