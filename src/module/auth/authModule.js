import AuthController from "./authController.js"
import AuthService from "./authService.js"

export default class AuthModule {
    constructor(app) {
        this.app = app
        this.authService = new AuthService()
    }

    initModule() {
        new AuthController(this)
    }
}