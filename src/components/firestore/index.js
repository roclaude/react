import firebase from 'firebase'
import firestore from 'firestore'
/*
const config = {
    apiKey: process.env.REACT_APP_API_KEY,
    authDomain: process.env.REACT_APP_AUTH_DOMAIN,
    databaseURL: process.env.REACT_APP_DATABASE_URL,
    projectId: process.env.REACT_APP_PROJECT_ID,
    storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
}*/

const config = {
    apiKey: "AIzaSyDlX2I1UCGHZ6FwlQg8dP3Xb-kX_rlH25I",
    authDomain: "qreact-620c8.firebaseapp.com",
    databaseURL: "https://qreact-620c8.firebaseio.com",
    projectId: "qreact-620c8",
    storageBucket: "qreact-620c8.appspot.com",
    messagingSenderId: "1043588307749"
}

var firebase_db = firebase.initializeApp(config);
var firestoreDB = firebase_db.firestore();

export default firestoreDB;