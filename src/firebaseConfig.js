// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyBkioreNJoWMCMzL6xyJdMx33GJ_clC3W4",
    authDomain: "grumbler-f6a49.firebaseapp.com",
    projectId: "grumbler-f6a49",
    storageBucket: "grumbler-f6a49.appspot.com",
    messagingSenderId: "361389682823",
    appId: "1:361389682823:web:85fda3085940996428c822",
    measurementId: "G-PGJ3HD3VDC",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const fireDB = getFirestore(app);

export { app, fireDB };