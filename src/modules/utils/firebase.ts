import { initializeApp } from "firebase/app";
import {
    getAuth
} from "firebase/auth";
import { getStorage } from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyBsa9QD3ZvUpyRuR-3mgc7_JhSbaTHGyIE",
    authDomain: "elegant-skein-350903.firebaseapp.com",
    projectId: "elegant-skein-350903",
    storageBucket: "elegant-skein-350903.appspot.com",
    messagingSenderId: "602224114743",
    appId: "1:602224114743:web:f50f9406274b601ac113b2",
    measurementId: "G-HF7F1Z75HS"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
const firebaseAuth = getAuth(firebaseApp);
const firebaseStorage = getStorage(firebaseApp);
