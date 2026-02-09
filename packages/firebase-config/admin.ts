import { initializeApp, getApps, getApp, cert, ServiceAccount } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';
import { getAuth } from 'firebase-admin/auth';
import { getStorage } from 'firebase-admin/storage';

const firebaseAdminConfig: ServiceAccount = {
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
    privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
};

export function getFirebaseAdminApp() {
    if (getApps().length === 0) {
        return initializeApp({
            credential: cert(firebaseAdminConfig),
            storageBucket: `${process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID}.appspot.com`
        });
    }
    return getApp();
}

export const adminDb = getFirestore(getFirebaseAdminApp());
export const adminAuth = getAuth(getFirebaseAdminApp());
export const adminStorage = getStorage(getFirebaseAdminApp());
