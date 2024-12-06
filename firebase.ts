// Import the functions you need from the SDKs you need
import { getApp, getApps, initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDa1Z4KRp58Oa_lOddUPdFJ9mNcInQoCrs",
  authDomain: "otp-test-d2935.firebaseapp.com",
  projectId: "otp-test-d2935",
  storageBucket: "otp-test-d2935.firebasestorage.app",
  messagingSenderId: "1067216442509",
  appId: "1:1067216442509:web:7363d5891b6b5797c0fec4",
  measurementId: "G-6LE5MRWYTD"
};

// Initialize Firebase
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();

const auth = getAuth(app)
auth.useDeviceLanguage();

export {auth}