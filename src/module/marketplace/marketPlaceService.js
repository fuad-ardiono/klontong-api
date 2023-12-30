import { getDbConnection } from "../../config/db/connection.js";
import { Category } from "../../entity/category.js";

import { Product } from "../../entity/product.js"
import { ProductMeta } from "../../entity/productMeta.js";

export default class MarketPlaceService {
    constructor() {
        this.orm = getDbConnection()
    }

    /**
     * 
     * @param {number} perPage 
     * @param {number} page 
     * @param {number} name 
     */
    async list(perPage, page, name) {
        // TODO: Implement logic pagination
    }

    /**
     * 
     * @param {number} productId 
     */
    async detail(productId) {
        const product = await Product.findByPk(productId, { include: [
            { model: ProductMeta, as: 'product_meta' },
            { model: Category, as: 'category' }
        ] })

        if (!product) {
            return [404, 'Product not found']
        }

        return [200, product]
    }
}