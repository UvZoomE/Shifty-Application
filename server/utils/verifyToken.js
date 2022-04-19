const { getAuth } = require('firebase-admin/auth');

module.exports.verifyToken = (token) => {
  return getAuth().verifyIdToken(token)
  .then(decodedToken => {
    return decodedToken.uid;
  })
  .catch(() => {
    return undefined;
  })
}