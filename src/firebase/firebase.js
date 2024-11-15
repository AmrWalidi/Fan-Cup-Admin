import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAfFWMOJgpAD0RlLO7CDldS1hOYQJzJzXg",
  authDomain: "fan-cup.firebaseapp.com",
  projectId: "fan-cup",
  storageBucket: "fan-cup.firebasestorage.app",
  messagingSenderId: "581416832706",
  appId: "1:581416832706:web:847d29a2f60ddb5d1db55b",
  measurementId: "G-MMS2V3DT71",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app)

export { app, auth, db };
