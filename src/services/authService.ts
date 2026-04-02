import {
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  User as FirebaseUser,
} from 'firebase/auth';
import { auth } from '../config/firebase';

/**
 * Sign in admin with email and password
 */
export const adminSignIn = async (email: string, password: string): Promise<FirebaseUser> => {
  const userCredential = await signInWithEmailAndPassword(auth, email, password);
  return userCredential.user;
};

/**
 * Sign out the current user
 */
export const adminSignOut = async (): Promise<void> => {
  await signOut(auth);
};

/**
 * Subscribe to auth state changes
 */
export const onAuthChanged = (callback: (user: FirebaseUser | null) => void) => {
  return onAuthStateChanged(auth, callback);
};

/**
 * Get the currently signed-in user
 */
export const getCurrentUser = (): FirebaseUser | null => {
  return auth.currentUser;
};
