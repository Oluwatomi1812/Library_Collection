import pkg from 'jsonwebtoken';
const jwt = pkg;
const verify = pkg;
import dotenv from "dotenv"
dotenv.config()

//Generating the token
export function generateToken(newUser){
    const payload = {
        _id: newUser._id,
        email: newUser.email,
        username: newUser.username
    }
    const token = jwt.sign(payload, process.env.JWT_SECRET, {expiresIn: 60*60*24});
    return token
}

//Verify that token is valid
export function verifyToken(token){
    return jwt, verify(token, process.env.JWT_SECRET)
}
