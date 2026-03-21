import { initializeApp, getApps, getApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth, type Auth } from 'firebase/auth';

const firebaseConfig = {
  apiKey:            process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain:        process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId:         process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId:             process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

// Prevent re-initialising on hot-reload
const app = getApps().length ? getApp() : initializeApp(firebaseConfig);

export const db = getFirestore(app);

// Auth validates the API key on init — guard against missing env vars during build
let _auth: Auth | null = null;
try {
  _auth = getAuth(app);
} catch {
  // No-op: auth will be null when env vars are absent (e.g. CI build)
}
export const auth = _auth as Auth;
