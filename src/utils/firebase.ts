// Import the functions you need from the SDKs you need
import 'firebase/auth';
import 'firebase/storage';
import 'firebase/firestore';

import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyDG-ulsuQum2dpULwrVaG7C8QWCwjo474k',
  authDomain: 'trust-wallet01.firebaseapp.com',
  projectId: 'trust-wallet01',
  storageBucket: 'trust-wallet01.appspot.com',
  messagingSenderId: '623190740999',
  appId: '1:623190740999:web:562c8d32ec6f09544d9aa2',
  measurementId: 'G-HJD2NWFXKM',
};

initializeApp(firebaseConfig);

const auth = getAuth();
const db = getFirestore();

export { auth, db };
