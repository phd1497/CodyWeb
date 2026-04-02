import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getAnalytics } from 'firebase/analytics';

const firebaseConfig = {
  apiKey: "AIzaSyAvDMFNyxvusMZbJzKEDxWobt1tl91KUS0",
  authDomain: "cody-web-60f8f.firebaseapp.com",
  projectId: "cody-web-60f8f",
  storageBucket: "cody-web-60f8f.firebasestorage.app",
  messagingSenderId: "622972945457",
  appId: "1:622972945457:web:b2170e5b8b7cc7066c0110",
  measurementId: "G-F8CVBDK9N5",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize services
export const auth = getAuth(app);
export const db = getFirestore(app);
export const analytics = getAnalytics(app);

export default app;
