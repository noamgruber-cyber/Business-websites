'use client';

import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { User, onAuthStateChanged } from 'firebase/auth';
import { getFirebaseAuth } from '@/lib/firebaseAuth';
import { signInWithGoogle as authSignInWithGoogle, signOut as authSignOut } from '@/lib/auth';

type AuthContextValue = {
  user: User | null;
  loading: boolean;
  reauthenticationRequired: boolean;
  signInWithGoogle: () => Promise<User>;
  signOut: () => Promise<void>;
};

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser]       = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [reauthenticationRequired, setReauthenticationRequired] = useState(false);

  useEffect(() => {
    let active = true;
    const unsubscribe = onAuthStateChanged(getFirebaseAuth(), async (u) => {
      if (!u) {
        if (active) {
          setUser(null);
          setReauthenticationRequired(false);
          setLoading(false);
        }
        return;
      }

      try {
        await ensureServerSession(u);
        if (active) {
          setUser(u);
          setReauthenticationRequired(false);
        }
      } catch {
        if (active) {
          setUser(u);
          setReauthenticationRequired(true);
        }
      } finally {
        if (active) setLoading(false);
      }

      // Persist a lightweight cookie so middleware can guard protected routes.
      // The cookie is not proof of identity and remains only for the legacy flow.
      if (u) {
        document.cookie = 'siteforge_auth=1; path=/; max-age=86400; SameSite=Lax';
      }
    });
    return () => {
      active = false;
      unsubscribe();
    };
  }, []);

  const signInWithGoogle = async () => {
    const signedInUser = await authSignInWithGoogle();
    await ensureServerSession(signedInUser, true);
    setUser(signedInUser);
    setReauthenticationRequired(false);
    return signedInUser;
  };

  const signOut = async () => {
    await clearServerSession();
    await authSignOut();
    document.cookie = 'siteforge_auth=; path=/; max-age=0';
    setUser(null);
    setReauthenticationRequired(false);
  };

  return (
    <AuthContext.Provider
      value={{ user, loading, reauthenticationRequired, signInWithGoogle, signOut }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export async function ensureServerSession(user: User, forceExchange = false): Promise<void> {
  if (!forceExchange) {
    const current = await fetch('/api/session', {
      method: 'GET',
      credentials: 'same-origin',
      cache: 'no-store',
    });
    if (current.ok) return;
  }

  const idToken = await user.getIdToken(forceExchange);
  const exchange = await fetch('/api/session', {
    method: 'POST',
    credentials: 'same-origin',
    headers: { Authorization: `Bearer ${idToken}` },
  });
  if (!exchange.ok) throw new Error('SERVER_SESSION_EXCHANGE_FAILED');
}

export async function clearServerSession(): Promise<void> {
  const response = await fetch('/api/session', {
    method: 'DELETE',
    credentials: 'same-origin',
  });
  if (!response.ok) throw new Error('SERVER_SESSION_CLEAR_FAILED');
}

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used inside <AuthProvider>');
  return ctx;
}
