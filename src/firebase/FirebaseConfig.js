import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyBx4xzjHSVN-l12UTHaYfGYnLv3N-DbIxg",
    authDomain: "fd-app-1dc2e.firebaseapp.com",
    projectId: "fd-app-1dc2e",
    storageBucket: "fd-app-1dc2e.appspot.com",
    messagingSenderId: "30717747572",
    appId: "1:30717747572:web:9f0d6f3252e5e12e000c21",
    measurementId: "G-PWFWJ392MR",
  };

  const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);