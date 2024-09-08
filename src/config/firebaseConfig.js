// firebaseConfig.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyCcO_aUMPMOoWvMuIgf9jsR4iw5pioW2t8",
    authDomain: "bms-v-k.firebaseapp.com",
    projectId: "bms-v-k",
    storageBucket: "bms-v-k.appspot.com",
    messagingSenderId: "180675063648",
    appId: "1:180675063648:web:9375c9542411425a837805"
  };

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const firestore = getFirestore(app);

export { auth, firestore };
