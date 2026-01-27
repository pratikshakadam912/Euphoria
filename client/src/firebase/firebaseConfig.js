
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";


const firebaseConfig = {
    apiKey: "AIzaSyBurOFuuIPrUYloofx_t_bNuNAJ2XPjk5Q",
    authDomain: "euphoria-e614d.firebaseapp.com",
    projectId: "euphoria-e614d",
    storageBucket: "euphoria-e614d.firebasestorage.app",
    messagingSenderId: "445660316550",
    appId: "1:445660316550:web:a528bcd3a80d6871d06207"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const db = getFirestore(app);