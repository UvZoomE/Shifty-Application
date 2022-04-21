import firebaseConfig from './firebaseConfig.json';
import initializeApp from 'firebase/app';
import fb from 'firebase/auth';

// must initialize firebase app before using other services
const fbAuthApp = initializeApp(firebaseConfig);

// create instance of specified firebase service
export const authInstance = fb.getAuth(fbAuthApp);
export const firebase = fb;