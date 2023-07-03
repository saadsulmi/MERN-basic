import firebase from 'firebase/compat/app';
import 'firebase/compat/storage'

const firebaseConfig = {
    apiKey: "AIzaSyA7gOt3yK6yrXgUC05dOomEAqEjG7Jru80",
    authDomain: "mern-app-f6a33.firebaseapp.com",
    projectId: "mern-app-f6a33",
    storageBucket: "mern-app-f6a33.appspot.com",
    messagingSenderId: "156933219735",
    appId: "1:156933219735:web:ea225e0e47c86c1acb10d2"
  };

export default firebase.initializeApp(firebaseConfig);