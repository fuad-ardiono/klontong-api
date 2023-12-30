import ProductController from "./productController.js"
import ProductService from "./productService.js"

export default class ProductModule {
    constructor(app) {
        this.app = app
        this.productService = new ProductService()
    }

    initModule() {
        new ProductController(this)
    }
}