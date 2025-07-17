// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: "halal-food-sydney-app.firebaseapp.com",
  projectId: "halal-food-sydney-app",
  storageBucket: "halal-food-sydney-app.firebasestorage.app",
  messagingSenderId: "895490973315",
  appId: "1:895490973315:web:cd7f56c7e81a3bb73f45b6",
  measurementId: "G-WT4HRMT3QN"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const analytics = getAnalytics(app);

export { db, analytics };