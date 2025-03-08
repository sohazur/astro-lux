// Import the required functions from Firebase SDK
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBnMhMMHBmpruxWaaNmdNc1kgn31hgJPeU",
  authDomain: "dubai-to-the-stars.firebaseapp.com",
  projectId: "dubai-to-the-stars",
  storageBucket: "dubai-to-the-stars.firebasestorage.app",
  messagingSenderId: "37116883167",
  appId: "1:37116883167:web:62534dd9258796f34d796a",
  measurementId: "G-6572DFX6JY",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Get Firebase services
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };
