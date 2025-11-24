// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth'
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCw1qZS-8t5ZDmwDPL2KGnpP3bAPF2M0xk",
  authDomain: "expensetrancker-653b2.firebaseapp.com",
  projectId: "expensetrancker-653b2",
  storageBucket: "expensetrancker-653b2.firebasestorage.app",
  messagingSenderId: "1000122258395",
  appId: "1:1000122258395:web:b6d0410b5165d3aa74cdfe",
  measurementId: "G-B69ZDYVFV3",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
export const storage = getStorage(app);
export const auth =getAuth(app)
export const db =getFirestore(app)
