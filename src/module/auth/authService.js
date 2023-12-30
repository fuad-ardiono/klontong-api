import { AuthUser } from "../../entity/authUser.js";

import Joi from 'joi'
import bcrypt from 'bcrypt'
import * as jose from 'jose'
import * as dotEnv from 'dotenv'
dotEnv.config()

export default class AuthService {
    /**
     * 
     * @param {Object} requestJson 
     */
    async login(requestJson) {
        const schemaValidation = Joi.object({
            email: Joi.string()
                .required()
                .email(),
            password: Joi.string()
                .required()
        })

        const validated = schemaValidation.validate(requestJson, { abortEarly: false })

        if (validated.error) {
            return [422, validated.error.details]
        }

        const authUser = await AuthUser.findOne({
            where: {
                email: requestJson.email
            }
        })

        const matchHash = await bcrypt.compare(requestJson.password, authUser.password)

        if (matchHash) {
            const payloadJwt = {
                userId: authUser.user_id,
                userName: authUser.username,
                email: authUser.email
            }
            const secret = new TextEncoder().encode(
                process.env.AUTH_JWT_SECRET,
            )
            const token = await new jose.SignJWT(payloadJwt)
                .setProtectedHeader({ alg: 'HS256' })
                .setIssuedAt()
                .setIssuer('klontong_api')
                .setAudience(`auth_user`)
                .setExpirationTime('8h')
                .sign(secret)

            return [200, { token, email: payloadJwt.email }]
        }

        return [400, 'Invalid email or password']
    }

    /**
     * 
     * @param {Object} requestJson 
     */
    async register(requestJson) {
        const schemaValidation = Joi.object({
            email: Joi.string()
                .required()
                .email(),
            password: Joi.string()
                .required(),
            username: Joi.string()
                .required(),
            name: Joi.string()
                .required()
        })

        const validated = schemaValidation.validate(requestJson, { abortEarly: false })

        if (validated.error) {
            return [422, validated.error.details]
        }

        const saltRounds = 10
        const hashedPassword = await bcrypt.hash(requestJson.password, saltRounds)

        const authUser = await AuthUser.create({
            email: requestJson.email,
            password: hashedPassword,
            username: requestJson.username,
            name: requestJson.name
        })

        const authUserJson = authUser.toJSON()
        delete authUserJson.password

        return [200, authUserJson]
    }
}