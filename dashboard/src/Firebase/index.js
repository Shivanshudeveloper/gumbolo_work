import firebase from "firebase/app";
import "firebase/storage";
import "firebase/database";
import "firebase/auth";
import "firebase/messaging";
import "firebase/analytics";
import 'firebase/firestore';

var firebaseConfig = {
    apiKey: "AIzaSyCLy_gtKWKjx8NGJrCg5xnt6wymujhfilk",
    authDomain: "todolist-7ae58.firebaseapp.com",
    databaseURL: "https://todolist-7ae58-default-rtdb.firebaseio.com",
    projectId: "todolist-7ae58",
    storageBucket: "todolist-7ae58.appspot.com",
    messagingSenderId: "268359488891",
    appId: "1:268359488891:web:5580bd26491f6a46d919de",
    measurementId: "G-3J2YWV1GLG"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();


const storage = firebase.storage();
const database = firebase.database();
const auth = firebase.auth();
const firestore = firebase.firestore();

// Authentication for Google
var googleProvider = new firebase.auth.GoogleAuthProvider();
// Authentication for Facebook
var facebookProvider = new firebase.auth.FacebookAuthProvider();
// Authentication for Twitter
var twitterProvider = new firebase.auth.TwitterAuthProvider();

export {
    firestore, auth, googleProvider, facebookProvider, twitterProvider, database, storage, firebase as default
}