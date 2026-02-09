'use server';

import { listBlobs, deleteBlob, uploadBlob } from '@gratuity/firebase-config/blob';
import { revalidatePath } from 'next/cache';

export async function fetchMedia() {
    try {
        const blobs = await listBlobs();
        return { success: true, data: blobs };
    } catch (error) {
        console.error('Failed to fetch media:', error);
        return { success: false, error: 'Failed to fetch media assets' };
    }
}

export async function removeMedia(url: string) {
    try {
        await deleteBlob(url);
        revalidatePath('/dashboard/media');
        return { success: true };
    } catch (error) {
        console.error('Failed to delete media:', error);
        return { success: false, error: 'Failed to delete asset' };
    }
}

export async function uploadMedia(formData: FormData) {
    try {
        const file = formData.get('file') as File;
        if (!file) {
            return { success: false, error: 'No file provided' };
        }

        const filename = `${Date.now()}-${file.name}`;
        const blob = await uploadBlob(filename, file);

        revalidatePath('/dashboard/media');
        return { success: true, data: blob };
    } catch (error) {
        console.error('Upload error:', error);
        return { success: false, error: 'Failed to upload asset' };
    }
}
