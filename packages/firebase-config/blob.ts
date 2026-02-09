import { put, del, list } from '@vercel/blob';

/**
 * Uploads a file to Vercel Blob storage.
 * Requires BLOB_READ_WRITE_TOKEN in environment variables.
 */
export async function uploadBlob(path: string, file: any) {
    const blob = await put(path, file, {
        access: 'public',
    });
    return blob;
}

/**
 * Deletes a file from Vercel Blob storage.
 */
export async function deleteBlob(url: string) {
    await del(url);
}

/**
 * Lists files in Vercel Blob storage.
 */
export async function listBlobs(prefix?: string) {
    const { blobs } = await list({ prefix });
    return blobs;
}
