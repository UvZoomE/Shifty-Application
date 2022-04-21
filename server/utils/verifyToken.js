import { getAuth } from 'firebase-admin/auth';

export const verifyToken = (token) => {
  return getAuth().verifyIdToken(token)
  .then(decodedToken => {
    return decodedToken.uid;
  })
  .catch(() => {
    return undefined;
  })
}

// export default verifyToken;