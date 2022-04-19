const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const firebaseConfig = require('./utils/firebaseConfig.json')
const firebaseApp = require('firebase/app');
const firebaseAuth = require('firebase/auth');

const PORT = 3002;
const app = express();

app.use(morgan('tiny'));
app.use(express.json());
app.use(cors());

// must initialize firebase app before using other services
const fbConfig = firebaseConfig;
const fbApp = firebaseApp.initializeApp(fbConfig);

// create instance of specified firebase service
const auth = firebaseAuth.getAuth(fbApp)

app.post('/sign-up', (req, res) => {
  const { email, password } = req.body
  firebaseAuth.createUserWithEmailAndPassword(auth, email, password)
  .then((userCred) => firebaseAuth.getIdToken(userCred.user, true))
  .then(token => {
    res.set('Authorization', token);
    res.sendStatus(201);
  })
  .catch(err => res.send(500))
})

app.post('/login', (req, res) => {
  const reqToken = req.header['Authorization'];
  const { email, password } = req.body;
  firebaseAuth.signInWithEmailAndPassword(auth, email, password)
  .then((userCred) => firebaseAuth.getIdToken(userCred.user))
  .then(token => {
    if(reqToken !== token){
      res.set('Authorization', token)
    }
    res.sendStatus(200)
  })
  .catch(err => res.send(401))

})

app.listen(PORT, () => console.log(`Listening on port: ${PORT}`))