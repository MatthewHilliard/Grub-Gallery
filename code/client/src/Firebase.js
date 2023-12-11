// Obtain Firebase config keys from .env
const apiKey = import.meta.env.VITE_FIREBASE_API_KEY
const authDomain = import.meta.env.VITE_FIREBASE_AUTH_DOMAIN
const projectId = import.meta.env.VITE_FIREBASE_PROJECT_ID
const storageBucket = import.meta.env.VITE_FIREBASE_STORAGE_BUCKET
const messagingSenderId = import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID
const appId = import.meta.env.VITE_FIREBASE_APP_ID
const measurementId = import.meta.env.VITE_FIREBASE_MEASUREMENT_ID

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app"
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth"
import { gapi } from 'gapi-script'

import { getAnalytics } from "firebase/analytics"
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
const app = initializeApp(firebaseConfig)
const analytics = getAnalytics(app)

// Initialize Firebase authentication (code from PedroTech: https://www.youtube.com/watch?v=vDT7EnUpEoo&ab_channel=PedroTech)
export const auth = getAuth(app)


// function to signInWithGoogle (using Firebase authentication)
export const signInWithGoogle = () => {
    return new Promise(async (resolve, reject) => {
        try {
            const provider = new GoogleAuthProvider();
            const result = await signInWithPopup(auth, provider);
            console.log("User is:", result.user);
            resolve(result.user);
        } catch (error) {
            console.log("Error authenticating with Google:", error);
            reject(error);
        }
    });
};


  // function to sign out (with firebase authentication)
 export const handleSignOut = async () => {
    try {
        // IMPORTANT: if authenticated with google Calendar api --> sign out (prevents altering somebody else's google calendar)
        if (gapi.auth2) {
            await gapi.auth2.getAuthInstance().signOut()
        }
        // additionally, sign out with FIREBASE
        await auth.signOut()
        console.log("Successfully signed out")
    } catch (error) {
        console.log("Error signing out:", error)
    }
}