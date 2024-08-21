
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAnalytics } from 'firebase/analytics';

const firebaseConfig = {
  apiKey: "AIzaSyBQHE6u5K1l2GRSKpA4inFjsi4c0oO0-a8",
  authDomain: "delicacy-9b1ed.firebaseapp.com",
  projectId: "delicacy-9b1ed",
  storageBucket: "delicacy-9b1ed.appspot.com",
  messagingSenderId: "1044490766152",
  appId: "1:1044490766152:web:9af7f73f6dd90b7c0ad57d",
  measurementId: "G-7VJ53NR7GM"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const analytics = getAnalytics(app);
export { db, analytics };