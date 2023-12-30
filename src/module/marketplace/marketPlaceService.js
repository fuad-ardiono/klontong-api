import { Op } from "sequelize";
import { Category } from "../../entity/category.js";

import { Product } from "../../entity/product.js"
import { ProductMeta } from "../../entity/productMeta.js";

export default class MarketPlaceService {
    /**
     * 
     * @param {number} pageSize 
     * @param {number} page 
     * @param {number} name 
     */
    async list(pageSize, page, name) {
        const paramQuerySQL = {};
        let limit;
        let offset;

        if (pageSize != '' && typeof pageSize !== 'undefined') {
            limit = pageSize
        } else {
            limit = 5
            pageSize = 5
        }
        paramQuerySQL.limit = limit;

        if (page != '' && typeof page !== 'undefined') {
            offset = page * pageSize - pageSize
        } else {
            offset = 0
            page = 1
        }
        paramQuerySQL.offset = offset;

        if (name != '' && typeof name !== 'undefined') {
            paramQuerySQL.where = {
                name: {
                    [Op.like]: `%${name}%`
                }
            }
        }

        paramQuerySQL.include = [
            { model: ProductMeta, as: 'product_meta' },
            { model: Category, as: 'category' }
        ]

        const data = await Product.findAndCountAll(paramQuerySQL);
        const totalPage = Math.ceil(data.count / pageSize)

        const paginationMeta = {
            pageSize: parseInt(pageSize),
            page: parseInt(page),
            totalRecord: data.count,
            totalPage: totalPage < 1 ? 1 : totalPage
        }

        if (data) {
            return [200,
                {
                    paginationMeta,
                    paginationData: data.rows
                }
            ]
        } else {
            return [404,
                {
                    paginationMeta,
                    paginationData: []
                }
            ]
        }
    }

    /**
     * 
     * @param {number} productId 
     */
    async detail(productId) {
        const product = await Product.findByPk(productId, {
            include: [
                { model: ProductMeta, as: 'product_meta' },
                { model: Category, as: 'category' }
            ]
        })

        if (!product) {
            return [404, 'Product not found']
        }

        return [200, product]
    }
}