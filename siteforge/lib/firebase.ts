import { initializeApp, getApps, getApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey:            process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain:        process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId:         process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId:             process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

export function isFirebaseConfigured() {
  return [firebaseConfig.apiKey, firebaseConfig.authDomain, firebaseConfig.projectId, firebaseConfig.appId]
    .every(value => Boolean(value && !value.startsWith('your_')));
}

export function getFirebaseApp() {
  if (!isFirebaseConfigured()) throw new Error('FIREBASE_CLIENT_NOT_CONFIGURED');
  return getApps().length ? getApp() : initializeApp(firebaseConfig);
}

// Initialize on use, so missing staging settings cannot crash module imports.
export function getClientFirestore() {
  return getFirestore(getFirebaseApp());
}
