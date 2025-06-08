// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { setDoc,doc } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBWYIaeodJzSL6KupFcnp0gkRC5t1EeLLk",
  authDomain: "farmtech-3b36f.firebaseapp.com",
  projectId: "farmtech-3b36f",
  storageBucket: "farmtech-3b36f.appspot.com",
  messagingSenderId: "1084697622205",
  appId: "1:1084697622205:web:1940f34681d0d846b669d4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth= getAuth();
export const db= getFirestore(app)
export default app;