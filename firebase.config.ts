// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAbcltCS4-_yl9lLf1Aq9CXwi4u6YIUnHQ",
  authDomain: "steakhouse-4785f.firebaseapp.com",
  projectId: "steakhouse-4785f",
  storageBucket: "steakhouse-4785f.firebasestorage.app",
  messagingSenderId: "533092193921",
  appId: "1:533092193921:web:88eedaa02d98ba6bbd9f80",
  measurementId: "G-FBB4WF9JDN"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);