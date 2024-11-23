import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAbcltCS4-_yl9lLf1Aq9CXwi4u6YIUnHQ",
  authDomain: "steakhouse-4785f.firebaseapp.com",
  projectId: "steakhouse-4785f",
  storageBucket: "steakhouse-4785f.firebasestorage.app",
  messagingSenderId: "533092193921",
  appId: "1:533092193921:web:88eedaa02d98ba6bbd9f80",
  measurementId: "G-FBB4WF9JDN"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app)