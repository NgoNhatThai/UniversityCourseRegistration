import handleJwt from '../ultils/handleJwt';
import { TokenExpiredError } from 'jsonwebtoken';
require('dotenv').config();

const secret = process.env.SECRET;

const checkJWT = async (req, res, next) => {
    let token = handleJwt.extractToken(req);
    const refresh_token = req.cookies['refresh_token'];
    if (!token || !refresh_token) {
        return res.status(401).json({
            errCode: 401,
            message: 'Not authorization token'
        })
    }
    try {
        let decoded = handleJwt.verify(token, secret);
        req.user = decoded?.data;
        if (decoded) {
            next();
        } else {
            return res.status(401).json({
                errCode: 401,
                message: 'Not authorization token'
            })
        }
    } catch (error) {
       
        if (error instanceof TokenExpiredError) {
            return res.status(401).json({
                errCode: 401,
                message: 'Token expired'
            })
        } else {
            return res.status(401).json({
                errCode: 401,
                message: 'Not authorization token'
            })
        }
    }
}


module.exports = {
    checkJWT
}