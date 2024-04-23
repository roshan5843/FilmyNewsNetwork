// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "movie-blog-f606b.firebaseapp.com",
  projectId: "movie-blog-f606b",
  storageBucket: "movie-blog-f606b.appspot.com",
  messagingSenderId: "1052939125659",
  appId: "1:1052939125659:web:d12b4fa4a37c5e8d61d73e"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);