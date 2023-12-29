import { responseError } from "../utils/responseUtils.js";
import * as jose from 'jose'

export default async function authFilter(req, res, next) {
    let tokenHeader = req.headers['authorization'];

    if (tokenHeader) {
        if (tokenHeader.split(' ')[0] !== 'Bearer') {
            return responseError(res, 'Incorrect token format', null, 401);
        }

        let token = tokenHeader.split(' ')[1];

        if (!token) {
            return responseError(res, 'No token provided', null, 401);
        }

        const secret = new TextEncoder().encode(
            process.env.AUTH_JWT_SECRET,
        )

        try {
            const { payload, protectedHeader } = await jose.jwtVerify(token, secret, {
                issuer: 'klontong_api',
                audience: 'auth_user'
            })

            req.userId = payload.userId
            next()
        } catch (error) {
            console.log(error)
            return responseError(res, 'Unauthorized', null, 401)
        }
    } else {
        console.log('jaja')
        return responseError(res, 'Unauthorized', null, 401)
    }
}