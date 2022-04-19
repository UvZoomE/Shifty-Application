const { getAuth } = require('firebase-admin/auth');

modules.export.verifyToken = (token) => {
  getAuth().verifyIdToken(token)
  .then(decodedToken => {
    return decodedToken.uid;
  })
  .catch(() => {
    return undefined;
  })
}