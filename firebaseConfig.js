// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDAYHJilwqF4eJuyKM4yyhkLxPQnvz3U1s",
  authDomain: "flyfiles---file-sharing-app.firebaseapp.com",
  projectId: "flyfiles---file-sharing-app",
  storageBucket: "flyfiles---file-sharing-app.appspot.com",
  messagingSenderId: "396655799623",
  appId: "1:396655799623:web:8b2e2a767a1860d7727062",
  measurementId: "G-93VCVD5MF6"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);