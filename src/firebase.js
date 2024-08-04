// firebase.js
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyDRCa7llsS_nl2hB3FNmQVt02JPH99t6ls",
  authDomain: "eifella.firebaseapp.com",
  projectId: "eifella",
  storageBucket: "eifella.appspot.com",
  messagingSenderId: "663379506918",
  appId: "1:663379506918:web:1a131a70b28cb9ceda6d27"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);