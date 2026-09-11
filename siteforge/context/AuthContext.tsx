'use client';

import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { User, onAuthStateChanged } from 'firebase/auth';
import { getFirebaseAuth } from '@/lib/firebaseAuth';
import { signInWithGoogle as authSignInWithGoogle, signOut as authSignOut } from '@/lib/auth';

type AuthContextValue = {
  user: User | null;
  loading: boolean;
  signInWithGoogle: () => Promise<User>;
  signOut: () => Promise<void>;
};

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser]       = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(getFirebaseAuth(), (u) => {
      setUser(u);
      setLoading(false);
      // Persist a lightweight cookie so middleware can guard protected routes.
      // The cookie is not a security token — Firestore rules enforce actual access control.
      if (u) {
        document.cookie = 'siteforge_auth=1; path=/; max-age=86400; SameSite=Lax';
      } else {
        document.cookie = 'siteforge_auth=; path=/; max-age=0';
      }
    });
    return unsubscribe;
  }, []);

  return (
    <AuthContext.Provider
      value={{ user, loading, signInWithGoogle: authSignInWithGoogle, signOut: authSignOut }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used inside <AuthProvider>');
  return ctx;
}
