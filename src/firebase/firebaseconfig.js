import AsyncStorage from '@react-native-async-storage/async-storage';
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import {
  initializeAuth,
  getReactNativePersistence
} from 'firebase/auth/react-native';

// import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyDQlBD0VjeUlX7eCtUNLoQbYbSIIWnS-b4",
  authDomain: "vcasino-f9a8d.firebaseapp.com",
  projectId: "vcasino-f9a8d",
  storageBucket: "vcasino-f9a8d.appspot.com",
  messagingSenderId: "821897936292",
  appId: "1:821897936292:web:d9188aaf9edcb93e84d531",
  measurementId: "G-Z020RVDGK6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage)
});

export {auth, app}; 