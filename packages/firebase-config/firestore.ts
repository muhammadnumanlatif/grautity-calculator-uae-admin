import {
  getFirestore,
  collection,
  doc,
  getDoc,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  query,
  where,
  orderBy,
  limit,
  startAfter,
  Timestamp,
  DocumentData,
  QueryConstraint,
  DocumentReference,
  CollectionReference,
  Firestore,
} from 'firebase/firestore';
import { getFirebaseApp } from './firebase';

let db: Firestore;

export function getFirestoreDb(): Firestore {
  if (!db) {
    db = getFirestore(getFirebaseApp());
  }
  return db;
}

// Collection names
export const COLLECTIONS = {
  PAGES: 'pages',
  BLOGS: 'blogs',
  LOCATIONS: 'locations',
  CALCULATIONS: 'calculations',
  USERS: 'users',
  AUTHORS: 'authors',
  KEYWORDS: 'keywords',
  REDIRECTS: 'redirects',
  SEO_SETTINGS: 'seoSettings',
  SITE_SETTINGS: 'siteSettings',
} as const;

// Generic CRUD operations
export async function getDocument<T extends DocumentData>(
  collectionName: string,
  documentId: string
): Promise<T | null> {
  const db = getFirestoreDb();
  const docRef = doc(db, collectionName, documentId);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    return { id: docSnap.id, ...docSnap.data() } as unknown as T;
  }
  return null;
}

export async function getDocuments<T extends DocumentData>(
  collectionName: string,
  constraints: QueryConstraint[] = []
): Promise<T[]> {
  const db = getFirestoreDb();
  const collectionRef = collection(db, collectionName);
  const q = query(collectionRef, ...constraints);
  const querySnapshot = await getDocs(q);

  return querySnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  })) as unknown as T[];
}

export async function addDocument<T extends DocumentData>(
  collectionName: string,
  data: Omit<T, 'id'>
): Promise<string> {
  const db = getFirestoreDb();
  const collectionRef = collection(db, collectionName);
  const docRef = await addDoc(collectionRef, {
    ...data,
    createdAt: Timestamp.now(),
    updatedAt: Timestamp.now(),
  });
  return docRef.id;
}

export async function updateDocument<T extends DocumentData>(
  collectionName: string,
  documentId: string,
  data: Partial<T>
): Promise<void> {
  const db = getFirestoreDb();
  const docRef = doc(db, collectionName, documentId);
  await updateDoc(docRef, {
    ...data,
    updatedAt: Timestamp.now(),
  });
}

export async function setDocument<T extends DocumentData>(
  collectionName: string,
  documentId: string,
  data: T
): Promise<void> {
  const db = getFirestoreDb();
  const { setDoc } = await import('firebase/firestore');
  const docRef = doc(db, collectionName, documentId);
  await setDoc(docRef, {
    ...data,
    updatedAt: Timestamp.now(),
  }, { merge: true });
}

export async function deleteDocument(
  collectionName: string,
  documentId: string
): Promise<void> {
  const db = getFirestoreDb();
  const docRef = doc(db, collectionName, documentId);
  await deleteDoc(docRef);
}

// Specific query helpers
export async function getPublishedPages<T extends DocumentData>(): Promise<T[]> {
  return getDocuments<T>(COLLECTIONS.PAGES, [
    where('status', '==', 'published'),
    orderBy('createdAt', 'desc'),
  ]);
}

export async function getPublishedBlogs<T extends DocumentData>(
  pageSize: number = 10,
  lastDoc?: DocumentData
): Promise<T[]> {
  const constraints: QueryConstraint[] = [
    where('status', '==', 'published'),
    orderBy('publishedAt', 'desc'),
    limit(pageSize),
  ];

  if (lastDoc) {
    constraints.push(startAfter(lastDoc));
  }

  return getDocuments<T>(COLLECTIONS.BLOGS, constraints);
}

export async function getPageBySlug<T extends DocumentData>(
  slug: string
): Promise<T | null> {
  const pages = await getDocuments<T>(COLLECTIONS.PAGES, [
    where('slug', '==', slug),
    limit(1),
  ]);
  return pages[0] || null;
}

export async function getBlogBySlug<T extends DocumentData>(
  slug: string
): Promise<T | null> {
  const blogs = await getDocuments<T>(COLLECTIONS.BLOGS, [
    where('slug', '==', slug),
    limit(1),
  ]);
  return blogs[0] || null;
}

export async function getLocationBySlug<T extends DocumentData>(
  slug: string,
  emirate?: string
): Promise<T | null> {
  const constraints: QueryConstraint[] = [
    where('slug', '==', slug),
  ];

  if (emirate) {
    constraints.push(where('emirate', '==', emirate));
  }

  constraints.push(limit(1));

  const locations = await getDocuments<T>(COLLECTIONS.LOCATIONS, constraints);
  return locations[0] || null;
}

export async function getLocationsByEmirate<T extends DocumentData>(
  emirate: string,
  type?: string
): Promise<T[]> {
  const constraints: QueryConstraint[] = [
    where('emirate', '==', emirate),
    where('status', '==', 'published'),
  ];

  if (type) {
    constraints.push(where('type', '==', type));
  }

  return getDocuments<T>(COLLECTIONS.LOCATIONS, constraints);
}

// Timestamp helpers
export function timestampToDate(timestamp: Timestamp): Date {
  return timestamp.toDate();
}

export function dateToTimestamp(date: Date): Timestamp {
  return Timestamp.fromDate(date);
}

// Export Firebase Firestore types
export {
  collection,
  doc,
  query,
  where,
  orderBy,
  limit,
  startAfter,
  Timestamp,
  type DocumentData,
  type QueryConstraint,
  type DocumentReference,
  type CollectionReference,
};
