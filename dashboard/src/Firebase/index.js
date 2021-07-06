import firebase from "firebase/app";
import "firebase/storage";
import "firebase/database";
import "firebase/auth";
import "firebase/messaging";
import "firebase/analytics";
import 'firebase/firestore';

var firebaseConfig = {
    apiKey: "AIzaSyAB8H8uco5aNiniI8VsIprhijac6MwfUcI",
    authDomain: "gumbolo.firebaseapp.com",
    projectId: "gumbolo",
    storageBucket: "gumbolo.appspot.com",
    messagingSenderId: "224765942327",
    appId: "1:224765942327:web:1dc405f89661515d0bfdb2",
    measurementId: "G-LG7F4DF5EB"
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