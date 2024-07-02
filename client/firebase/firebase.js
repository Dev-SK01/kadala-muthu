// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth ,GoogleAuthProvider} from 'firebase/auth'

const firebaseConfig = {
  apiKey: "AIzaSyDEBt9MWHGRQp0Wus5U95jElGh9NgqcuV0",
  authDomain: "kadala-muthu-6e4a2.firebaseapp.com",
  projectId: "kadala-muthu-6e4a2",
  storageBucket: "kadala-muthu-6e4a2.appspot.com",
  messagingSenderId: "759399960771",
  appId: "1:759399960771:web:b5d25e027f6ac15a0d9276",
  measurementId: "G-2W3DHD9VLC"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth();

const authprovider = new GoogleAuthProvider();

export {app , auth , authprovider};
