import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";



const firebaseConfig = {
    apiKey: "AIzaSyCNaYu65SPrZcw_YMvLrh8-60dSQRHusVU",
    authDomain: "signup-signin-dashboard.firebaseapp.com",
    projectId: "signup-signin-dashboard",
    storageBucket: "signup-signin-dashboard.appspot.com",
    messagingSenderId: "100046750694",
    appId: "1:100046750694:web:578068fb50ac83af5d8c27",
    measurementId: "G-E8NT5SGGHC"
  };

export const myFirebase = firebase.initializeApp(firebaseConfig);
const baseDb = myFirebase.firestore();
export const db = baseDb;