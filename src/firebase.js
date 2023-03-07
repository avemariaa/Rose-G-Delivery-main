// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAME_fl_N_dUc92icQlZgcC-hPt4DEw7ys",
  authDomain: "rose-g-2537e.firebaseapp.com",
  projectId: "rose-g-2537e",
  storageBucket: "rose-g-2537e.appspot.com",
  messagingSenderId: "673208411180",
  appId: "1:673208411180:web:d5316c64f155303772dd89",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth();
export const storage = getStorage(app);
