import { sendErrorResponse } from '../helper/common'
import { verifyToken } from '../helper/jwt'


function validateUser(req, res, next) {
  let authorizationHeader = req.headers['authorization']
  if (authorizationHeader) {
    let token = authorizationHeader.split(' ')[1]
    verifyToken(token, req.app.get('JWTSecretKey'), function (err, decoded) {
      if (err) {
        sendErrorResponse(res, 'Authentication credentials were not provided', err, 401)
      } else {
        req.body.userId = decoded.id;
        next();
      }
    });
  }
}


export { validateUser }