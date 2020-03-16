import JWT from 'jsonwebtoken'

function getToken(user) {

  let payload = {
    'id': user._id
  }
  let privateKey = process.env.JWT_SECRET
  let signOptions = {
    issuer: process.env.JWT_ISSUER,
    subject: process.env.JWT_SUBJECT,
    audience: process.env.JWT_AUDIENCE,
    expiresIn: process.env.JWT_EXPIRE_TIME
    // algorithm: process.env.JWT_ALGORITHM
  }
  return JWT.sign(payload, privateKey, signOptions)
}

function verifyToken(token, JWTSecretKey, verifyOptions = {}) {

  try {
    return JWT.verify(token, JWTSecretKey, verifyOptions);
  } catch (err) {
    return false;
  }
}

function decodeToken(token) {
  return JWT.decode(token, { complete: true });
}

export { getToken, verifyToken, decodeToken }