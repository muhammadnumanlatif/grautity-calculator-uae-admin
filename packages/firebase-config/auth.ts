import {
  getAuth,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  updateProfile,
  User,
  Auth,
  UserCredential,
} from 'firebase/auth';
import { getFirebaseApp } from './firebase';

let auth: Auth;

export function getFirebaseAuth(): Auth {
  if (!auth) {
    auth = getAuth(getFirebaseApp());
  }
  return auth;
}

// Sign in with email and password
export async function signIn(
  email: string,
  password: string
): Promise<UserCredential> {
  const auth = getFirebaseAuth();
  return signInWithEmailAndPassword(auth, email, password);
}

// Sign out
export async function logOut(): Promise<void> {
  const auth = getFirebaseAuth();
  return signOut(auth);
}

// Create new user
export async function createUser(
  email: string,
  password: string
): Promise<UserCredential> {
  const auth = getFirebaseAuth();
  return createUserWithEmailAndPassword(auth, email, password);
}

// Send password reset email
export async function resetPassword(email: string): Promise<void> {
  const auth = getFirebaseAuth();
  return sendPasswordResetEmail(auth, email);
}

// Update user profile
export async function updateUserProfile(
  displayName?: string,
  photoURL?: string
): Promise<void> {
  const auth = getFirebaseAuth();
  const user = auth.currentUser;

  if (user) {
    await updateProfile(user, { displayName, photoURL });
  }
}

// Get current user
export function getCurrentUser(): User | null {
  const auth = getFirebaseAuth();
  return auth.currentUser;
}

// Subscribe to auth state changes
export function subscribeToAuthChanges(
  callback: (user: User | null) => void
): () => void {
  const auth = getFirebaseAuth();
  return onAuthStateChanged(auth, callback);
}

// Check if current user is admin
export async function isAdmin(): Promise<boolean> {
  const auth = getFirebaseAuth();
  const user = auth.currentUser;

  if (!user) return false;

  // Bypass admin check in development mode for easier local testing
  if (process.env.NODE_ENV === 'development') {
    return true;
  }

  // Fallback for authorized emails if custom claims are not yet set
  const ADMIN_EMAILS = [
    'muhammadnumanlatif@gmail.com',
    'info@gratuitycalculator.ae'
  ];

  if (user.email && ADMIN_EMAILS.includes(user.email)) {
    return true;
  }

  const idTokenResult = await user.getIdTokenResult();
  return !!idTokenResult.claims.admin;
}

// Export Firebase Auth types
export { type User, type UserCredential };
