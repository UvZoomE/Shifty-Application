import { getAuth } from 'firebase-admin/auth';

export const verifyToken = (token) => {
  return getAuth().verifyIdToken(token)
  .then(decodedToken => {
    return decodedToken.uid;
  })
  .catch((err) => {
    console.log(err)
  })
}

// export default verifyToken;