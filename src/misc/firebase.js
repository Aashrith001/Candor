/* eslint-disable import/no-extraneous-dependencies */
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import 'firebase/storage';

const config = {
  apiKey: "AIzaSyAu2VnkLiT41CdRi_wHVW__41-CmXs8UJI",
  authDomain: "candor-28a5a.firebaseapp.com",
  databaseURL: "https://candor-28a5a-default-rtdb.firebaseio.com",
  projectId: "candor-28a5a",
  storageBucket: "candor-28a5a.appspot.com",
  messagingSenderId: "344379004886",
  appId: "1:344379004886:web:e7cc1f9b1598eee0f9f677"
};

const app = firebase.initializeApp(config);
export const auth = app.auth();
export const database = app.database();
export const storage = app.storage();
