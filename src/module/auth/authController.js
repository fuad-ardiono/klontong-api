import { responseError, responseOk } from "../../utils/responseUtils.js"
import AuthModule from "./authModule.js"
import AuthService from "./authService.js"

export default class AuthController {
    /** 
     * @param {AuthModule} authModule 
    */
    constructor(authModule) {
        this.login(authModule.app, authModule.authService)
        this.register(authModule.app, authModule.authService)
    }

    /** 
     * @param {Express} app 
     * @param {AuthService} authService 
    */
    login(app, authService) {

        app.post('/auth/login', 
        /** 
         * @param {import("express").Request} req 
         * @param {import("express").Response} res 
        */
        async (req, res) => {
            const login = await authService.login(req.body)

            if (login[0] == 422) {
                return responseError(res, 'Invalid form', null, register[1], register[0])
            }

            if (login[0] == 400) {
                return responseError(res, login[1], null)
            }

            return responseOk(res, 'Success login', login[1])
        })
    }

    /**
     * 
     * @param {Express} app 
     * @param {AuthService} authService 
     */
    register(app, authService) {
        app.post('/auth/register', 
        /** 
         * @param {import("express").Request} req 
         * @param {import("express").Response} res 
        */
        async (req, res, next) => {
            try {
                const register = await authService.register(req.body)

                if (register[0] == 422) {
                    return responseError(res, 'Invalid form', null, register[1], register[0])
                }
    
                return responseOk(res, 'Success register', register[1])
            } catch(error) {
                next(error)
            }
        })
    }
}