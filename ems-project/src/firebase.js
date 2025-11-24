// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBhvyt22uD-GtMpflBC1rHQ661STQHP3aI",
  authDomain: "employe-portal-fb221.firebaseapp.com",
  projectId: "employe-portal-fb221",
  storageBucket: "employe-portal-fb221.firebasestorage.app",
  messagingSenderId: "736223056608",
  appId: "1:736223056608:web:a7a6eed261ada057ac3685",
  measurementId: "G-02T2MDW95J"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

export default app;