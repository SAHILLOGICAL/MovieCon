import { initializeApp, getApp } from "firebase/app";
import { initializeAuth, getAuth, getReactNativePersistence } from 'firebase/auth';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBRljiDGPpvrlfZ7Rk2Vx3MyiJq_nbPxDc",
  authDomain: "moviecon-223a6.firebaseapp.com",
  projectId: "moviecon-223a6",
  storageBucket: "moviecon-223a6.appspot.com",
  messagingSenderId: "1029101986029",
  appId: "1:1029101986029:web:4cfbd73fcb7c88b2436ce4"
};

const app = initializeApp(firebaseConfig);

initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage)
});

const firestore_db=getFirestore(app);

export {app,firestore_db}