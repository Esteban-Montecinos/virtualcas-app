import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

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
const bd = initializeApp(firebaseConfig);
//const analytics = getAnalytics(app);
//const bd = getFirestore(app);

export default bd; 