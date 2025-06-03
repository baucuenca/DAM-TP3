import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDgBKhZt9au9WjXWFrslFtc3rcRmlL33Ww",
  authDomain: "dam-tp3.firebaseapp.com",
  projectId: "dam-tp3",
  storageBucket: "dam-tp3.firebasestorage.app",
  messagingSenderId: "939147262750",
  appId: "1:939147262750:web:b1ca9c9fdb3cb91e49670f",
  measurementId: "G-481F5EYJL5"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth };

