import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAsPUJUs-N_pHkYoJr_nqV8sY645Ju8fmU",
  authDomain: "tagging-app-ab62a.firebaseapp.com",
  projectId: "tagging-app-ab62a",
  storageBucket: "tagging-app-ab62a.appspot.com",
  messagingSenderId: "200428386831",
  appId: "1:200428386831:web:61162b713168db0726017a"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
