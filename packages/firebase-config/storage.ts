import {
  getStorage,
  ref,
  uploadBytes,
  uploadBytesResumable,
  getDownloadURL,
  deleteObject,
  listAll,
  StorageReference,
  UploadTask,
  UploadTaskSnapshot,
  FirebaseStorage,
} from 'firebase/storage';
import { getFirebaseApp } from './firebase';

let storage: FirebaseStorage;

export function getFirebaseStorage(): FirebaseStorage {
  if (!storage) {
    storage = getStorage(getFirebaseApp());
  }
  return storage;
}

// Storage paths
export const STORAGE_PATHS = {
  IMAGES: 'images',
  BLOG_IMAGES: 'images/blog',
  PAGE_IMAGES: 'images/pages',
  AVATARS: 'images/avatars',
  DOCUMENTS: 'documents',
} as const;

// Upload file
export async function uploadFile(
  path: string,
  file: File
): Promise<string> {
  const storage = getFirebaseStorage();
  const storageRef = ref(storage, path);
  const snapshot = await uploadBytes(storageRef, file);
  return getDownloadURL(snapshot.ref);
}

// Upload file with progress tracking
export function uploadFileWithProgress(
  path: string,
  file: File,
  onProgress?: (progress: number) => void
): UploadTask {
  const storage = getFirebaseStorage();
  const storageRef = ref(storage, path);
  const uploadTask = uploadBytesResumable(storageRef, file);

  if (onProgress) {
    uploadTask.on('state_changed', (snapshot: UploadTaskSnapshot) => {
      const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      onProgress(progress);
    });
  }

  return uploadTask;
}

// Get download URL
export async function getFileUrl(path: string): Promise<string> {
  const storage = getFirebaseStorage();
  const storageRef = ref(storage, path);
  return getDownloadURL(storageRef);
}

// Delete file
export async function deleteFile(path: string): Promise<void> {
  const storage = getFirebaseStorage();
  const storageRef = ref(storage, path);
  return deleteObject(storageRef);
}

// List files in directory
export async function listFiles(path: string): Promise<StorageReference[]> {
  const storage = getFirebaseStorage();
  const storageRef = ref(storage, path);
  const result = await listAll(storageRef);
  return result.items;
}

// Generate unique file name
export function generateFileName(originalName: string): string {
  const timestamp = Date.now();
  const randomString = Math.random().toString(36).substring(2, 8);
  const extension = originalName.split('.').pop();
  return `${timestamp}-${randomString}.${extension}`;
}

// Get full storage path
export function getStoragePath(folder: string, fileName: string): string {
  return `${folder}/${generateFileName(fileName)}`;
}

// Upload image with optimization
export async function uploadImage(
  file: File,
  folder: string = STORAGE_PATHS.IMAGES
): Promise<{ url: string; path: string }> {
  const fileName = generateFileName(file.name);
  const path = `${folder}/${fileName}`;
  const url = await uploadFile(path, file);
  return { url, path };
}

// Export Firebase Storage types
export {
  type StorageReference,
  type UploadTask,
  type UploadTaskSnapshot,
};
