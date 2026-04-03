import {
  collection,
  doc,
  setDoc,
  getDoc,
  getDocs,
} from 'firebase/firestore';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { db, auth } from '../config/firebase';
import type { UserProfile, AdminProfile } from '../types';

/* ──────────────────────────────────────────
   User Profiles (Firestore "users" collection)
   ────────────────────────────────────────── */

/**
 * Create a user profile document in Firestore
 */
export const createUserProfile = async (
  uid: string,
  name: string,
  email: string,
  phone?: string,
): Promise<void> => {
  const userRef = doc(db, 'users', uid);
  await setDoc(userRef, {
    uid,
    name: name.trim(),
    email: email.trim().toLowerCase(),
    role: 'user',
    status: 'Active',
    ...(phone ? { phone: phone.trim() } : {}),
    createdAt: new Date().toISOString(),
  });
};

/**
 * Get a single user/admin profile from the appropriate collection
 */
export const getUserProfile = async (uid: string): Promise<UserProfile | AdminProfile | null> => {
  // First check admins collection
  const adminRef = doc(db, 'admins', uid);
  const adminSnap = await getDoc(adminRef);
  if (adminSnap.exists()) {
    return adminSnap.data() as AdminProfile;
  }

  // Then check users collection
  const userRef = doc(db, 'users', uid);
  const userSnap = await getDoc(userRef);
  if (userSnap.exists()) {
    return userSnap.data() as UserProfile;
  }

  return null;
};

/**
 * Get all users from Firestore
 */
export const getAllUsers = async (): Promise<UserProfile[]> => {
  const snapshot = await getDocs(collection(db, 'users'));
  return snapshot.docs.map((d) => d.data() as UserProfile);
};

/* ──────────────────────────────────────────
   Admin Profiles (Firestore "admins" collection)
   ────────────────────────────────────────── */

/**
 * Get all admins from Firestore
 */
export const getAllAdmins = async (): Promise<AdminProfile[]> => {
  const snapshot = await getDocs(collection(db, 'admins'));
  return snapshot.docs.map((d) => d.data() as AdminProfile);
};

/**
 * Create a new admin:
 * 1. Creates a Firebase Auth account
 * 2. Stores admin profile in Firestore "admins" collection
 *
 * ⚠ Note: createUserWithEmailAndPassword signs out the current user.
 *    The caller should re-authenticate the current admin afterward.
 */
export const createAdmin = async (
  email: string,
  password: string,
  name: string,
  role: AdminProfile['role'],
): Promise<AdminProfile> => {
  const credential = await createUserWithEmailAndPassword(auth, email, password);
  const uid = credential.user.uid;

  const adminData: AdminProfile = {
    uid,
    name,
    email,
    role,
    status: 'Active',
    createdAt: new Date().toISOString(),
  };

  const adminRef = doc(db, 'admins', uid);
  await setDoc(adminRef, adminData);

  return adminData;
};
