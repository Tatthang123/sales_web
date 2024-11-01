import jwt from "jsonwebtoken"
import { AuthFailureError, ForbiddenError } from "../core/error.reponse.js"
const checkJwt = (req, res, next) => {

    const white_list = ['/api/v1/auth/login', '/api/v1/register']
    if (white_list.includes(req.path)) {
        return next();
    }
    const token = req.header('Authorization')?.split(' ')[1]
    if (!token) {
        throw new AuthFailureError('Access token is missing or invalid');
    }
    jwt.verify(token, process.env.JWT_KEY, (err, user) => {
        if (err) {
            throw new ForbiddenError('Token is no longer valid or expired');
        }
        req.user = user;
        next();
    })
}
export default checkJwt