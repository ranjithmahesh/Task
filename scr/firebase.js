// Import the functions you need from the SDKs you need

import {initializeApp} from 'firebase/app';
import {getAuth} from 'firebase/auth';
import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  doc,
  setDoc,
  updateDoc,
} from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyCLG8k3W_CIG82y3tEhkgDP90fkZiJSkK0',
  authDomain: 'netflix-project-b1dc4.firebaseapp.com',
  projectId: 'netflix-project-b1dc4',
  storageBucket: 'netflix-project-b1dc4.appspot.com',
  messagingSenderId: '534521793119',
  appId: '1:534521793119:web:d31f7d9172b9960b4c29ea',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

const db = getFirestore(app);

export {
  app,
  auth,
  db,
  getFirestore,
  collection,
  addDoc,
  getDocs,
  doc,
  updateDoc,
  setDoc,
};
