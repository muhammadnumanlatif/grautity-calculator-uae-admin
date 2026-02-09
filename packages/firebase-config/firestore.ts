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
  onSnapshot,
} from 'firebase/firestore';

export {
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
  type DocumentData,
  type QueryConstraint,
  type DocumentReference,
  type CollectionReference,
  type Firestore,
  onSnapshot,
};
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
  MENUS: 'menus',
  WIDGETS: 'widgets',
} as const;

// Generic CRUD operations
export async function getDocument<T extends DocumentData>(
  collectionName: string,
  documentId: string
): Promise<T | null> {
  // Use Admin SDK on server if available to bypass permission issues during build
  if (typeof window === 'undefined') {
    try {
      const { adminDb } = await import('./admin');
      const docSnap = await adminDb.collection(collectionName).doc(documentId).get();
      if (docSnap.exists) {
        return { id: docSnap.id, ...docSnap.data() } as unknown as T;
      }
      return null;
    } catch (e) {
      console.warn('Admin SDK fetch failed, falling back to client SDK:', e);
    }
  }

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
  // Use Admin SDK on server if available to bypass permission issues during build
  if (typeof window === 'undefined') {
    try {
      const { adminDb } = await import('./admin');
      let queryRef: any = adminDb.collection(collectionName);

      // Note: We can only support basic constraints without a full mapper
      // But for generateStaticParams, getDocuments is often called without constraints
      if (constraints.length === 0) {
        const snapshot = await queryRef.get();
        return snapshot.docs.map((doc: any) => ({
          id: doc.id,
          ...doc.data(),
        })) as unknown as T[];
      }
    } catch (e) {
      console.warn('Admin SDK fetch failed, falling back to client SDK:', e);
    }
  }

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

// Alias for backward compatibility
export const createDocument = addDocument;

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

export async function getPageBySlug<T extends DocumentData>(
  slug: string
): Promise<T | null> {
  // Use Admin SDK on server
  if (typeof window === 'undefined') {
    try {
      const { adminDb } = await import('./admin');
      const snapshot = await adminDb
        .collection(COLLECTIONS.PAGES)
        .where('slug', '==', slug)
        .limit(1)
        .get();

      if (!snapshot.empty) {
        const doc = snapshot.docs[0];
        return { id: doc.id, ...doc.data() } as unknown as T;
      }
      return null;
    } catch (e) {
      console.warn('Admin SDK fetch failed for getPageBySlug:', e);
    }
  }

  const pages = await getDocuments<T>(COLLECTIONS.PAGES, [
    where('slug', '==', slug),
    limit(1),
  ]);
  return pages[0] || null;
}

export async function getBlogBySlug<T extends DocumentData>(
  slug: string
): Promise<T | null> {
  // Use Admin SDK on server
  if (typeof window === 'undefined') {
    try {
      const { adminDb } = await import('./admin');
      const snapshot = await adminDb
        .collection(COLLECTIONS.BLOGS)
        .where('slug', '==', slug)
        .limit(1)
        .get();

      if (!snapshot.empty) {
        const doc = snapshot.docs[0];
        return { id: doc.id, ...doc.data() } as unknown as T;
      }
      return null;
    } catch (e) {
      console.warn('Admin SDK fetch failed for getBlogBySlug:', e);
    }
  }

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
  // Use Admin SDK on server
  if (typeof window === 'undefined') {
    try {
      const { adminDb } = await import('./admin');
      let queryRef: any = adminDb.collection(COLLECTIONS.LOCATIONS).where('slug', '==', slug);

      if (emirate) {
        queryRef = queryRef.where('emirate', '==', emirate);
      }

      const snapshot = await queryRef.limit(1).get();
      if (!snapshot.empty) {
        const doc = snapshot.docs[0];
        return { id: doc.id, ...doc.data() } as unknown as T;
      }
      return null;
    } catch (e) {
      console.warn('Admin SDK fetch failed for getLocationBySlug:', e);
    }
  }

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
  // Use Admin SDK on server
  if (typeof window === 'undefined') {
    try {
      const { adminDb } = await import('./admin');
      let queryRef: any = adminDb
        .collection(COLLECTIONS.LOCATIONS)
        .where('emirate', '==', emirate)
        .where('status', '==', 'published');

      if (type) {
        queryRef = queryRef.where('type', '==', type);
      }

      const snapshot = await queryRef.get();
      return snapshot.docs.map((doc: any) => ({
        id: doc.id,
        ...doc.data(),
      })) as unknown as T[];
    } catch (e) {
      console.warn('Admin SDK fetch failed for getLocationsByEmirate:', e);
    }
  }

  const constraints: QueryConstraint[] = [
    where('emirate', '==', emirate),
    where('status', '==', 'published'),
  ];

  if (type) {
    constraints.push(where('type', '==', type));
  }

  return getDocuments<T>(COLLECTIONS.LOCATIONS, constraints);
}

export async function getDocumentsByQuery<T extends DocumentData>(
  collectionName: string,
  constraints: QueryConstraint[]
): Promise<T[]> {
  return getDocuments<T>(collectionName, constraints);
}

/**
 * Realtime subscription to documents
 * @returns unsubscribe function
 */
export function subscribeToDocuments<T extends DocumentData>(
  collectionName: string,
  constraints: QueryConstraint[],
  onUpdate: (data: T[]) => void,
  onError?: (error: any) => void
) {
  const db = getFirestoreDb();
  const collectionRef = collection(db, collectionName);
  const q = query(collectionRef, ...constraints);

  return onSnapshot(
    q,
    (snapshot) => {
      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as unknown as T[];
      onUpdate(data);
    },
    (error) => {
      console.error(`Error in subscription to ${collectionName}:`, error);
      if (onError) onError(error);
    }
  );
}

// Timestamp helpers
export function timestampToDate(timestamp: Timestamp): Date {
  return timestamp.toDate();
}

export function dateToTimestamp(date: Date): Timestamp {
  return Timestamp.fromDate(date);
}



// ============================================
// PAGINATION & QUERY OPTIMIZATION HELPERS
// ============================================

export interface PaginationOptions {
  pageSize?: number;
  orderByField?: string;
  orderDirection?: 'asc' | 'desc';
}

export interface PaginatedResult<T> {
  data: T[];
  hasMore: boolean;
  lastDoc: any;
}

/**
 * Get paginated documents with automatic limit
 * Prevents fetching all documents at once
 */
export async function getPaginatedDocuments<T extends DocumentData>(
  collectionName: string,
  options: PaginationOptions = {},
  additionalConstraints: QueryConstraint[] = []
): Promise<PaginatedResult<T>> {
  const {
    pageSize = 10, // Default limit
    orderByField = 'createdAt',
    orderDirection = 'desc',
  } = options;

  const db = getFirestoreDb();
  const collectionRef = collection(db, collectionName);

  const constraints: QueryConstraint[] = [
    orderBy(orderByField, orderDirection),
    limit(pageSize + 1), // Fetch one extra to check if there are more
    ...additionalConstraints,
  ];

  const q = query(collectionRef, ...constraints);
  const querySnapshot = await getDocs(q);

  const docs = querySnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  })) as unknown as T[];

  const hasMore = docs.length > pageSize;
  const data = hasMore ? docs.slice(0, pageSize) : docs;
  const lastDoc = querySnapshot.docs[querySnapshot.docs.length - 2]; // Second to last (before the extra)

  return {
    data,
    hasMore,
    lastDoc,
  };
}

/**
 * Get published blogs with pagination
 * Optimized query with automatic limits
 */
export async function getPublishedBlogs<T extends DocumentData>(
  pageSize: number = 10
): Promise<T[]> {
  const result = await getPaginatedDocuments<T>(
    COLLECTIONS.BLOGS,
    { pageSize, orderByField: 'publishedAt', orderDirection: 'desc' },
    [where('status', '==', 'published')]
  );
  return result.data;
}

/**
 * Get published pages with limit
 */
export async function getPublishedPages<T extends DocumentData>(
  maxResults: number = 50
): Promise<T[]> {
  return getDocuments<T>(COLLECTIONS.PAGES, [
    where('status', '==', 'published'),
    orderBy('updatedAt', 'desc'),
    limit(maxResults),
  ]);
}

/**
 * Query builder for common patterns
 */
export class FirestoreQueryBuilder<T extends DocumentData> {
  private constraints: QueryConstraint[] = [];

  constructor(private collectionName: string) { }

  whereEqual(field: string, value: any): this {
    this.constraints.push(where(field, '==', value));
    return this;
  }

  whereIn(field: string, values: any[]): this {
    this.constraints.push(where(field, 'in', values));
    return this;
  }

  orderByField(field: string, direction: 'asc' | 'desc' = 'asc'): this {
    this.constraints.push(orderBy(field, direction));
    return this;
  }

  limitTo(count: number): this {
    this.constraints.push(limit(count));
    return this;
  }

  async execute(): Promise<T[]> {
    return getDocuments<T>(this.collectionName, this.constraints);
  }
}

/**
 * Example usage:
 * 
 * const blogs = await new FirestoreQueryBuilder<BlogPost>(COLLECTIONS.BLOGS)
 *   .whereEqual('status', 'published')
 *   .orderByField('publishedAt', 'desc')
 *   .limitTo(10)
 *   .execute();
 */
