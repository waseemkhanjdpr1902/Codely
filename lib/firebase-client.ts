// This file ONLY runs in the browser - NOT during build
import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID
};

// Only initialize if we're in the browser AND keys exist
export const initFirebase = () => {
  if (typeof window === 'undefined') return null;
  if (!process.env.NEXT_PUBLIC_FIREBASE_API_KEY) return null;
  
  try {
    const app = getApps().length ? getApp() : initializeApp(firebaseConfig);
    return { app, auth: getAuth(app), db: getFirestore(app) };
  } catch (error) {
    console.error('Firebase init error:', error);
    return null;
  }
};

// Singleton instances (only when available)
const firebase = initFirebase();
export const auth = firebase?.auth;
export const db = firebase?.db;
