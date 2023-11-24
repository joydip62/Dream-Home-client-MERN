// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_apiKey,
  authDomain: import.meta.env.VITE_authDomain,
  projectId: import.meta.env.VITE_projectId,
  storageBucket: import.meta.env.VITE_storageBucket,
  messagingSenderId: import.meta.env.VITE_messagingSenderId,
    appId: import.meta.env.VITE_appId,
  
// VITE_apiKey=AIzaSyBILp1nPVD_BUeeNWsytc-Ybym4MkujKNE
// VITE_authDomain=dream-home-e1592.firebaseapp.com
// VITE_projectId=dream-home-e1592
// VITE_storageBucket=dream-home-e1592.appspot.com
// VITE_messagingSenderId=941893581588
// VITE_appId=1:941893581588:web:c912011b66f46681636001
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
