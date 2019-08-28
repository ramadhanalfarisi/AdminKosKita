import * as firebase from 'firebase';
const firebaseConfig = {
  apiKey: 'AIzaSyCDd5CscTn_JEprkJU9J6UyY4FbWuKhJMc',
  authDomain: 'latihanrn.firebaseapp.com',
  databaseURL: 'https://latihanrn.firebaseio.com',
  projectId: 'latihanrn',
  storageBucket: 'latihanrn.appspot.com',
  messagingSenderId: '675605372938',
  appId: '1:675605372938:web:d6b60d94eed8d6f5',
};
firebase.initializeApp(firebaseConfig);
export const fbs = {
  auth: firebase.auth(),
  database: firebase.database(),
  storage: firebase.storage(),
  taskStore: firebase.storage,
  timestamp: firebase.database,
};
