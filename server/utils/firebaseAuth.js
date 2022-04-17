const firebaseConfig = require('./firebaseConfig.json')
const firebaseApp = require('firebase/app');
module.exports.firebaseAuth = require('firebase/auth');

// must initialize firebase app before using other services
const fbConfig = firebaseConfig;
const fbApp = firebaseApp.initializeApp(fbConfig);

// create instance of specified firebase service
module.exports.authInstance = module.exports.firebaseAuth.getAuth(fbApp)