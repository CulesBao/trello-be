import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import { NotFound, Unauthorized } from '../../handler/failed.handler';
import { MessageConstant } from '../message.constants';
dotenv.config()
const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET
const generateToken = (id: number): string => {
    if (accessTokenSecret)
        return jwt.sign({ id }, accessTokenSecret, {
            expiresIn: '1h'
        });
    return ''
};
const verifyToken = (token: string): number => {
    try {
        if (!accessTokenSecret)
            throw new Unauthorized(MessageConstant.Token.INVALID)

        const decoded = jwt.verify(token, accessTokenSecret) as jwt.JwtPayload;

        if (!decoded || typeof decoded === 'string' || !decoded.id) {
            throw new NotFound(MessageConstant.Token.NOT_FOUND)
        }

        return decoded.id;
    } catch (err) {
        throw err;
    }
}
export default { generateToken, verifyToken }