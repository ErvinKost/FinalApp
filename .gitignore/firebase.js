// Import the functions you need from the SDKs you need
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDGVRbASG3e1wfoYVyimYLc060WZlR1frY",
  authDomain: "fir-auth-4f711.firebaseapp.com",
  projectId: "fir-auth-4f711",
  storageBucket: "fir-auth-4f711.appspot.com",
  messagingSenderId: "671169169389",
  appId: "1:671169169389:web:ecdccf155407f4c85409e4"
};
  
// Initialize Firebase
let app;
if (firebase.apps.length === 0) {
  app = firebase.initializeApp(firebaseConfig);
} else {
  app = firebase.app()
}

const auth = firebase.auth()

export { auth };