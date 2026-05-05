import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDQfwXDB1wZtcou_FzDgJpym01RSjvn-C4", // Get this from Firebase Console
  authDomain: "codely-89c2b.firebaseapp.com",
  projectId: "codely-89c2b",
  storageBucket: "codely-89c2b.firebasestorage.app",
  appId: "1:87035129665:web:301e0adca23a054aab3bc0"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
