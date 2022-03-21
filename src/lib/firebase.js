
import firebase from 'firebase';
import 'firebase/storage'
// import { initializeApp } from 'firebase/app';
// import '@react-native-firebase/firestore';

// import 'firebase/auth';

const config = {
    apiKey: "AIzaSyDRvt-YpPt7RoaM7io5NagtDTJFzEocCpU",
    authDomain: "todo-fa83b.firebaseapp.com",
    projectId: "todo-fa83b",
    storageBucket: "todo-fa83b.appspot.com",
    messagingSenderId: "594355060494",
    appId: "1:594355060494:web:fc1c8f50e9d4a5e340e15f"
};

firebase.initializeApp(config);
const database = firebase.firestore();
// const firebase = initializeApp(config);

// const { FieldValue } = firebase.firestore;

export default database;