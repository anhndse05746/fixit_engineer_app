import firebase from '@react-native-firebase/app'
import auth from '@react-native-firebase/auth'
import messaging from '@react-native-firebase/messaging'

// Initialize Firebase
const firebaseConfig = {
    apiKey: "AIzaSyC8gn90i9ADP8c0CS78nVEE9jxofYqNYBk",
    authDomain: "fir-project-b086a.firebaseapp.com",
    projectId: "fir-project-b086a",
    storageBucket: "fir-project-b086a.appspot.com",
    messagingSenderId: "920183925647",
    appId: "1:920183925647:web:431b0d59c8d0454690f9fa"
};

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

export default () => {
    return { firebase, auth, messaging }
}