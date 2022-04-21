const firebaseConfig = require('./firebaseConfig.json');
const { initializeApp } = require('firebase/app')
const firebase = require('firebase/auth');

// must initialize firebase app before using other services
const fbAuthApp = initializeApp(firebaseConfig);

// create instance of specified firebase service
const authInstance = firebase.getAuth(fbAuthApp)

module.exports = firebase, authInstance