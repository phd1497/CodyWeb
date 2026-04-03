/* ── Firestore User Profile ── */
export interface UserProfile {
  uid: string;
  name: string;
  email: string;
  role: 'user';
  status: 'Active' | 'Inactive';
  createdAt: string;
}

/* ── Firestore Admin Profile ── */
export interface AdminProfile {
  uid: string;
  name: string;
  email: string;
  role: 'AdminX' | 'Admin' | 'Moderator';
  status: 'Active' | 'Inactive';
  createdAt: string;
}
