import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyD10ivjXW67cACohAuFRMgf9W-N51YfoFM",
    authDomain: "caretech-d37f7.firebaseapp.com",
    projectId: "caretech-d37f7",
    storageBucket: "caretech-d37f7.firebasestorage.app",
    messagingSenderId: "1056217519909",
    appId: "1:1056217519909:web:9ec4b1184ed245d679accc",
    measurementId: "G-9625RMT3QL"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const db = getFirestore(app);