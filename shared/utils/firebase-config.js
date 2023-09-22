import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseKey = process.env.NEXT_PUBLIC_FIREBASE_APIKEY;
const firebaseAppId = process.env.NEXT_PUBLIC_FIREBASE_APPID;

const firebaseConfig = {
  apiKey: firebaseKey,
  authDomain: 'e-commerce-8cc60.firebaseapp.com',
  projectId: 'e-commerce-8cc60',
  storageBucket: 'e-commerce-8cc60.appspot.com',
  messagingSenderId: '830843189207',
  appId: firebaseAppId,
};

initializeApp(firebaseConfig);

export const auth = getAuth();
