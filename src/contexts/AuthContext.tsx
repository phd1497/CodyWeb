import React, { createContext, useContext, useEffect, useState } from 'react';
import { User as FirebaseUser } from 'firebase/auth';
import { onAuthChanged, logOut } from '../services/authService';
import { getUserProfile } from '../services/firestoreService';
import type { UserProfile, AdminProfile } from '../types';

interface AuthState {
  firebaseUser: FirebaseUser | null;
  profile: UserProfile | AdminProfile | null;
  loading: boolean;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthState>({
  firebaseUser: null,
  profile: null,
  loading: true,
  signOut: async () => {},
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [firebaseUser, setFirebaseUser] = useState<FirebaseUser | null>(null);
  const [profile, setProfile] = useState<UserProfile | AdminProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthChanged(async (user) => {
      setFirebaseUser(user);

      if (user) {
        try {
          const prof = await getUserProfile(user.uid);
          setProfile(prof);
        } catch {
          setProfile(null);
        }
      } else {
        setProfile(null);
      }

      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const handleSignOut = async () => {
    await logOut();
    setProfile(null);
  };

  return (
    <AuthContext.Provider value={{ firebaseUser, profile, loading, signOut: handleSignOut }}>
      {children}
    </AuthContext.Provider>
  );
};
