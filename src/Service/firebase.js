import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAu4jss2sMltfd1RNXkA2m7anMLulXcdy0",
  authDomain: "taily-project.firebaseapp.com",
  projectId: "taily-project",
  storageBucket: "taily-project.appspot.com",
  messagingSenderId: "1043168168461",
  appId: "1:1043168168461:web:95b2568a8d9658c167e344",
  measurementId: "G-QMKLZV3H0J",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Export services
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
export const firestore = getFirestore(app); // for consistency in naming