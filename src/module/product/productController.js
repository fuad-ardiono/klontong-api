import { responseError, responseOk } from "../../utils/responseUtils.js"
import ProductService from "./productService.js"
import authFilter from "../../filter/authFilter.js"

export default class ProductController {
    /** 
     * @param {ProductModule} productModule
    */
    constructor(productModule) {
        this.create(productModule.app, productModule.productService)
    }

    /** 
     * @param {Express} app 
     * @param {ProductService} productService 
    */
    create(app, productService) {
        app.post('/product', 
        authFilter,
        /** 
         * @param {import("express").Request} req 
         * @param {import("express").Response} res 
        */
        async (req, res) => {
            const create = await productService.create(req.body)

            if (create[0] == 422) {
                return responseError(res, 'Invalid form', null, create[1], create[0])
            }

            return responseOk(res, 'Success create data', create[1])
        })
    }
}