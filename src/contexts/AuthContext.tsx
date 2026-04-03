import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
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
  signOut: async () => undefined,
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [firebaseUser, setFirebaseUser] = useState<FirebaseUser | null>(null);
  const [profile, setProfile] = useState<UserProfile | AdminProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthChanged(async (user) => {
      setFirebaseUser(user);

      if (!user) {
        setProfile(null);
        setLoading(false);
        return;
      }

      try {
        const userProfile = await getUserProfile(user.uid);
        setProfile(userProfile);
      } catch {
        setProfile(null);
      } finally {
        setLoading(false);
      }
    });

    return unsubscribe;
  }, []);

  const signOut = useCallback(async () => {
    await logOut();
    setProfile(null);
  }, []);

  const value = useMemo(
    () => ({ firebaseUser, profile, loading, signOut }),
    [firebaseUser, profile, loading, signOut],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
