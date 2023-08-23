import { AuthenticationError } from "../error/error.js";
import {verifyToken} from "../utils/jwt.utils.js"

export function userAuthMiddleWare(req, res, next){
  const token = req.headers?.authorization?.split(" ")[1];
  if(!token) throw new AuthenticationError("You must provide an authorization token.")
  try {
    const payload = verifyToken(token)
    req.user = payload
    next()
  }catch (err){
    throw new AuthenticationError("Access denied, invalid token.")
  }
} 