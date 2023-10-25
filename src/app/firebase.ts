import { getApp, getApps, initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore,  } from 'firebase/firestore';
 

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDmSiKxr1BiCQwfRKIjbZMddK85HpCGCnI",
  authDomain: "userscontent.firebaseapp.com",
  projectId: "userscontent",
  storageBucket: "userscontent.appspot.com",
  messagingSenderId: "580056192066",
  appId: "1:580056192066:web:be655c0a30bc1d9cbd89db"
};


// Initialize Firebase
const app = getApps().length ? getApp() : initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth();

export { app, db, auth }
