import { DataTypes } from "sequelize";
import { getDbConnection } from "../config/db/connection.js";
import { Category } from "./category.js";
import { ProductMeta } from "./productMeta.js";


const orm = getDbConnection()
export const Product = orm.define('Product', {
    product_id: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        autoIncrement: true,
    },
    price: {
        type: DataTypes.BIGINT,
        allowNull: false
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    product_meta_id: {
        type: DataTypes.BIGINT,
        allowNull: false
    },
    category_id: {
        type: DataTypes.BIGINT,
        allowNull: false
    }
}, {
    tableName: 'product',
    timestamps: false
});
Product.belongsTo(Category, { as: 'category', foreignKey: 'category_id' })
Product.belongsTo(ProductMeta, { as: 'product_meta', foreignKey: 'product_meta_id' })
