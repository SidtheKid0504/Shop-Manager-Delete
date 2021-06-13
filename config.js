import firebase from 'firebase';
require('@firebase/firestore');

const firebaseConfig = {
  apiKey: "AIzaSyDJCfmVYoYpPzAyc4g6k2QVRcrQVcjh2jk",
  authDomain: "strange-team-300918.firebaseapp.com",
  projectId: "strange-team-300918",
  storageBucket: "strange-team-300918.appspot.com",
  messagingSenderId: "540709050580",
  appId: "1:540709050580:web:23d07984731c870d160341"
};

firebase.initializeApp(firebaseConfig);
export default firebase.firestore();