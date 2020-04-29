import firebase from 'firebase/app';

const firebaseConfig = {
    apiKey: "AIzaSyAf076diGuNzfGu4vdzf6dMNi8czlUKqf8",
    authDomain: "postumblr-69792.firebaseapp.com",
    databaseURL: "https://postumblr-69792.firebaseio.com",
    projectId: "postumblr-69792",
    storageBucket: "postumblr-69792.appspot.com",
    messagingSenderId: "1090572456959",
    appId: "1:1090572456959:web:50f2280320531a3e49cdca"
};

export const firebaseApp = firebase.initializeApp(firebaseConfig);