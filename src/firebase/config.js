import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
import "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDk3NGZwxContqSuy2hPu02I7bENDY89ho",
  authDomain: "the-dub-hub.firebaseapp.com",
  projectId: "the-dub-hub",
  storageBucket: "the-dub-hub.appspot.com",
  messagingSenderId: "2401461800",
  appId: "1:2401461800:web:b32ab5b05ecef70063371d",
};

// init firebase
firebase.initializeApp(firebaseConfig);

// init services
const firestore = firebase.firestore();
const firebaseAuth = firebase.auth();
const firebaseStorage = firebase.storage();

// timestamp
const timestamp = firebase.firestore.Timestamp;

export { firestore, firebaseAuth, firebaseStorage, timestamp };
