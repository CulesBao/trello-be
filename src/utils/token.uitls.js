import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import ApiError from './ApiError.js';
dotenv.config()
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: '1h'
    });
};
const verifyToken = (token, next) => {
    try{
        return jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
            if (err) {
                throw new ApiError(500, err)
            }
            return decoded.id
        })
    }
    catch(err){
        next(err)
    }
}
export default {generateToken, verifyToken}