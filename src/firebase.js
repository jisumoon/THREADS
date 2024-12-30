import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyB5IKho517IzsV6DW3DU_7sT1lS3PUrwos",
  authDomain: "thteads.firebaseapp.com",
  projectId: "thteads",
  storageBucket: "thteads.firebasestorage.app",
  messagingSenderId: "175080604243",
  appId: "1:175080604243:web:75d86aaae0f7b35225bca6",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

export const storage = getStorage(app);

export const db = getFirestore(app);
