import { initializeApp } from "firebase/app";
import firebase from "firebase/compat/app";

import "firebase/auth";
import {getAuth} from "firebase/auth";
import {getFirestore} from "firebase/firestore";
import {getStorage} from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCrqEwNsQGJrbXAdeH9F7_iHwkUY36TbeU",
  authDomain: "nwitter-5be11.firebaseapp.com",
  projectId: "nwitter-5be11",
  storageBucket: "nwitter-5be11.appspot.com",
  messagingSenderId: "912009383102",
  appId: "1:912009383102:web:474a11dfe2f0b668dae2ef"
};

const app = initializeApp(firebaseConfig);
export default app;
export const authService=getAuth();
export const firebaseInstance=firebase;
export const dbService=getFirestore();
export const storageService=getStorage();