import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import { getAnalytics, isSupported } from 'firebase/analytics';

// Your Firebase configuration from Firebase Console
const firebaseConfig = {
  apiKey: "AIzaSyAO7lyH8yKzIKj0g1OX7DX48W-0yYBNKQo",
  authDomain: "myengineer-hub.firebaseapp.com",
  databaseURL: "https://myengineer-hub-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "myengineer-hub",
  storageBucket: "myengineer-hub.firebasestorage.app",
  messagingSenderId: "981822632854",
  appId: "1:981822632854:web:4b3ac714c32e8a800e63b7",
  measurementId: "G-N1PZR8181H"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase services
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

// Initialize Analytics only if supported (handles SSR and localhost issues)
let analytics = null;
isSupported().then((supported) => {
  if (supported && typeof window !== 'undefined') {
    analytics = getAnalytics(app);
  }
}).catch((error) => {
  console.warn('Analytics not supported:', error);
});

export { analytics };

export default app; 