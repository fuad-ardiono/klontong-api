import { fakerID_ID as faker } from '@faker-js/faker';
import { Category } from "../../entity/category.js"
import { ProductMeta } from '../../entity/productMeta.js';
import { Product } from '../../entity/product.js';

function createRandomProductMeta() {
  return {
    width: faker.number.bigInt({ min: 100, max: 1000 }),
    height: faker.number.bigInt({ min: 100, max: 1000 }),
    weight: faker.number.bigInt({ min: 100, max: 1000 }),
    length: faker.number.bigInt({ min: 100, max: 1000 }),
    image: faker.image.urlLoremFlickr({ width: 300, height: 300 })
  };
}

function createRandomProduct() {
  return {
    price: faker.number.bigInt({ min: 1000, max: 1000000 }),
    name: faker.commerce.productName(),
    description: faker.commerce.productDescription(),
    category_id: faker.number.bigInt({ min: 1, max: 5 })
  }
}

async function runSeed() {
  try {
    const listCategory = [
      {
        name: 'Fashion'
      },
      {
        name: 'Education'
      },
      {
        name: 'Automotive'
      },
      {
        name: 'Medicine'
      },
      {
        name: 'Technology'
      }
    ]

    await Category.bulkCreate(listCategory, { returning: true });

    const listProductMeta = faker.helpers.multiple(createRandomProductMeta, {
      count: 100,
    })
    const productMeta = await ProductMeta.bulkCreate(listProductMeta, { returning: true })

    const listProduct = faker.helpers.multiple(createRandomProduct, {
      count: 100,
    })

    productMeta.forEach((obj, index) => {
      listProduct[index].product_meta_id = obj.dataValues.product_meta_id
    })
    const product = await Product.bulkCreate(listProduct)

    console.log(product)
    console.log('Success seeding data');
  } catch (error) {
    console.error('Failed seeding data:', error);
  }
}
runSeed()