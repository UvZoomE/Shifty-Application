const firebaseConfig = require('./firebaseConfig.json')
const { initializeApp } = require('firebase/app');
const { getAuth } = require('firebase/auth');

// must initialize firebase app before using other services
const fbConfig = firebaseConfig;
module.exports.fbAuthApp = initializeApp(fbConfig);

// create instance of specified firebase service
module.exports.authInstance = getAuth(module.exports.fbAuthApp)