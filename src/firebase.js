import { initializeApp } from "firebase/app";
import 'firebase/firestore'
import { getFirestore } from "firebase/firestore";
import {getAnalytics}  from "firebase/analytics"


const firebaseConfig = {
    apiKey: "AIzaSyBidQGuqGqrFev252Bq7rm6sViaKfmH8fs",
    authDomain: "secrete-messages-gaston.firebaseapp.com",
    projectId: "secrete-messages-gaston",
    storageBucket: "secrete-messages-gaston.appspot.com",
    messagingSenderId: "1083008720471",
    appId: "1:1083008720471:web:818526125f7d835ba5cd12",
    measurementId: "G-242E206K6Q"
  };

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app)
export const analytics = getAnalytics(app)
