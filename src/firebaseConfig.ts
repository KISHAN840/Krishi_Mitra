import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";


const firebaseConfig = {
  apiKey: "AIzaSyC-t-VPa-s3P87zus_h6wFrjYjoNWDHIRY",
  authDomain: "krishi-mitra-b28b1.firebaseapp.com",
  projectId: "krishi-mitra-b28b1",
  storageBucket: "krishi-mitra-b28b1.firebasestorage.app",
  messagingSenderId: "934566664255",
  appId: "1:934566664255:web:9981c58f757abaeaf9808a"
};


const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const db = getFirestore(app);
