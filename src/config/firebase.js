// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore"
import { getStorage } from "firebase/storage"

//import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyApGCamm0flaBQq2_LEIAaTfng4p3U-RvQ",
  authDomain: "fir-tutorial-94a54.firebaseapp.com",
  projectId: "fir-tutorial-94a54",
  storageBucket: "fir-tutorial-94a54.appspot.com",
  messagingSenderId: "52605189436",
  appId: "1:52605189436:web:8454c74da9f9711943b239",
  measurementId: "G-SLKTF7DHHN"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
//const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();

export const db = getFirestore(app);
export const storage = getStorage(app);

