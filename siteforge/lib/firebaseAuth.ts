'use client';

import { getAuth } from 'firebase/auth';
import { firebaseApp } from './firebase';

export function getFirebaseAuth() {
  return getAuth(firebaseApp);
}
