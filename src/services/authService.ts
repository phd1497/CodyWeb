import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  User as FirebaseUser,
} from 'firebase/auth';
import { auth } from '../config/firebase';
import { createUserProfile } from './firestoreService';

/**
 * Sign up a new user with email and password
 */
export const userSignUp = async (email: string, password: string): Promise<FirebaseUser> => {
  const credential = await createUserWithEmailAndPassword(auth, email, password);
  return credential.user;
};

/**
 * Create a new auth user and save profile data to Firestore.
 */
export const registerUser = async (
  name: string,
  email: string,
  password: string,
  phone?: string,
): Promise<FirebaseUser> => {
  const credential = await createUserWithEmailAndPassword(auth, email, password);
  const user = credential.user;

  try {
    await createUserProfile(user.uid, name, email, phone);
    return user;
  } catch (registrationError) {
    await user.delete().catch(() => {
      // If rollback fails, leave the original authentication user in place.
    });
    throw registrationError;
  }
};

/**
 * Sign in user with email and password
 */
export const userSignIn = async (email: string, password: string): Promise<FirebaseUser> => {
  const credential = await signInWithEmailAndPassword(auth, email, password);
  return credential.user;
};

/**
 * Sign in admin with email and password
 */
export const adminSignIn = async (email: string, password: string): Promise<FirebaseUser> => {
  const credential = await signInWithEmailAndPassword(auth, email, password);
  return credential.user;
};

/**
 * Sign out the current user
 */
export const logOut = async (): Promise<void> => {
  await signOut(auth);
};

/**
 * Subscribe to auth state changes
 */
export const onAuthChanged = (callback: (user: FirebaseUser | null) => void) => {
  return onAuthStateChanged(auth, callback);
};
