'use client';

import {
  GoogleAuthProvider,
  User as FirebaseUser,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from 'firebase/auth';
import { createContext, ReactNode, useContext, useEffect, useMemo, useState } from 'react';
import { auth } from '@/lib/firebase-client';

export type CodelyUser = {
  uid: string;
  email: string;
  name: string;
  provider: 'firebase' | 'local';
};

type AuthContextValue = {
  user: CodelyUser | null;
  loading: boolean;
  firebaseConfigured: boolean;
  message: string;
  loginWithEmail: (email: string, password: string) => Promise<void>;
  signupWithEmail: (name: string, email: string, password: string) => Promise<void>;
  loginWithGoogle: () => Promise<void>;
  loginWithDemo: () => void;
  logout: () => Promise<void>;
};

const LOCAL_USER_KEY = 'codely.localUser.v1';

const AuthContext = createContext<AuthContextValue | null>(null);

export default function AuthProvider({ children }: { children: ReactNode }) {
  const firebaseConfigured = Boolean(auth);
  const [user, setUser] = useState<CodelyUser | null>(() => readLocalUser());
  const [loading, setLoading] = useState(Boolean(auth));
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (!auth) {
      return;
    }

    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser ? mapFirebaseUser(firebaseUser) : readLocalUser());
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const value = useMemo<AuthContextValue>(
    () => ({
      user,
      loading,
      firebaseConfigured,
      message,
      loginWithEmail: async (email, password) => {
        setMessage('');
        if (auth) {
          await signInWithEmailAndPassword(auth, email, password);
          return;
        }

        const localUser = createLocalUser(email, email.split('@')[0] || 'Codely User');
        setUser(localUser);
        setMessage('Firebase Auth is not configured yet. You are signed in with local launch mode.');
      },
      signupWithEmail: async (name, email, password) => {
        setMessage('');
        if (auth) {
          const credential = await createUserWithEmailAndPassword(auth, email, password);
          if (name.trim()) {
            await updateProfile(credential.user, { displayName: name.trim() });
          }
          setUser({
            uid: credential.user.uid,
            email: credential.user.email || email,
            name: name.trim() || credential.user.displayName || email.split('@')[0] || 'Codely User',
            provider: 'firebase',
          });
          return;
        }

        const localUser = createLocalUser(email, name.trim() || email.split('@')[0] || 'Codely User');
        setUser(localUser);
        setMessage('Firebase Auth is not configured yet. Account was saved in local launch mode.');
      },
      loginWithGoogle: async () => {
        setMessage('');
        if (!auth) {
          setMessage('Firebase Auth is not configured yet. Add Firebase keys in Vercel to enable Google login.');
          return;
        }

        await signInWithPopup(auth, new GoogleAuthProvider());
      },
      loginWithDemo: () => {
        setMessage('');
        const localUser = createLocalUser('demo@codely.local', 'Codely Demo User');
        setUser(localUser);
        setMessage('You are using local launch mode. Add Firebase keys in Vercel for production auth.');
      },
      logout: async () => {
        setMessage('');
        if (auth?.currentUser) await signOut(auth);
        clearLocalUser();
        setUser(null);
      },
    }),
    [firebaseConfigured, loading, message, user]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used inside AuthProvider.');
  }
  return context;
}

function mapFirebaseUser(firebaseUser: FirebaseUser | (FirebaseUser & { displayName?: string | null })): CodelyUser {
  return {
    uid: firebaseUser.uid,
    email: firebaseUser.email || 'user@codely.app',
    name: firebaseUser.displayName || firebaseUser.email?.split('@')[0] || 'Codely User',
    provider: 'firebase',
  };
}

function createLocalUser(email: string, name: string): CodelyUser {
  const localUser = {
    uid: `local_${email.toLowerCase()}`,
    email,
    name,
    provider: 'local' as const,
  };
  window.localStorage.setItem(LOCAL_USER_KEY, JSON.stringify(localUser));
  return localUser;
}

function readLocalUser() {
  if (typeof window === 'undefined') return null;
  try {
    const value = window.localStorage.getItem(LOCAL_USER_KEY);
    return value ? (JSON.parse(value) as CodelyUser) : null;
  } catch {
    return null;
  }
}

function clearLocalUser() {
  if (typeof window !== 'undefined') {
    window.localStorage.removeItem(LOCAL_USER_KEY);
  }
}
