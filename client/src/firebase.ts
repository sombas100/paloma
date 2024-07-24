// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "paloma-8a8b7.firebaseapp.com",
  projectId: "paloma-8a8b7",
  storageBucket: "paloma-8a8b7.appspot.com",
  messagingSenderId: "564690853637",
  appId: "1:564690853637:web:8074d31c219f911c82616c",
  measurementId: "G-JNSY7XXEE6"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
