const { getAuth } = require('firebase-admin/auth');

module.exports.verifyToken = (token) => {
  getAuth().verifyIdToken(token)
  .then(decodedToken => {
    return decodedToken.uid;
  })
  .catch(() => {
    return undefined;
  })
}