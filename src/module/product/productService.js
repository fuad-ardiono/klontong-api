import Joi from 'joi'
import * as fs from 'node:fs/promises'
import { ProductMeta } from '../../entity/productMeta.js'
import { Product } from '../../entity/product.js'

export default class ProductService {
    /**
     * 
     * @param {Object} requestData 
     */
    async create(requestData) {
        const schemaValidation = Joi.object({
            name: Joi.string()
                .required(),
            description: Joi.string()
                .required(),
            category_id: Joi.number()
                .required(),
            price: Joi.number()
                .required(),
            meta: Joi.object({
                width: Joi.number()
                    .required(),
                height: Joi.number()
                    .required(),
                weight: Joi.number()
                    .required(),
                length: Joi.number()
                    .required(),
                image: Joi.binary().encoding('base64')
                    .required()
            }).required()
        })

        const validated = schemaValidation.validate(requestData, { abortEarly: false })

        if (validated.error) {
            return [422, validated.error.details]
        }

        let imageExtension = ''

        switch(requestData.meta.image.charAt(0)) {
            case '/':
                imageExtension = '.jpg'
                break;
            case 'i':
                imageExtension = '.png'
                break;
            case 'R':
                imageExtension = '.gif'
                break;
            case 'U':
                imageExtension = '.webp'
                break;
            default:
                imageExtension = '.jpg'
        }

        const bufferImage = Buffer.from(requestData.meta.image, "base64")
        const unixTimestamp = Math.floor(new Date().getTime() / 1000)
        const pathImage = `storage/product-${unixTimestamp}${imageExtension}`

        try {
            await fs.readdir('storage', { recursive: false })
        } catch {
            await fs.mkdir('storage')
        }
        await fs.writeFile(pathImage, bufferImage)

        const productMeta = await ProductMeta.create({
            ...requestData.meta,
            image: pathImage
        })

        const product = await Product.create({
            name: requestData.name,
            description: requestData.description,
            category_id: requestData.category_id,
            price: requestData.price,
            product_meta_id: productMeta.product_meta_id
        })

        return [200, product.toJSON()]
    }
}