// obtain Firebase config keys from .env
const apiKey = VITE_FIREBASE_API_KEY
const authDomain = VITE_FIREBASE_AUTH_DOMAIN
const projectId = VITE_FIREBASE_PROJECT_ID
const storageBucket = VITE_FIREBASE_STORAGE_BUCKET
const messagingSenderId = VITE_FIREBASE_MESSAGING_SENDER_ID
const appId = VITE_FIREBASE_APP_ID
const measurementId = VITE_FIREBASE_MEASUREMENT_ID

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: apiKey,
  authDomain: authDomain,
  projectId: projectId,
  storageBucket: storageBucket,
  messagingSenderId: messagingSenderId,
  appId: appId,
  measurementId: measurementId
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);