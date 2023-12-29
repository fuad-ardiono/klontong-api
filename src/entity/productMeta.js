import { DataTypes } from "sequelize";
import { getDbConnection } from "../config/db/connection.js";


const orm = getDbConnection()
export const ProductMeta = orm.define('ProductMeta', {
    product_meta_id: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        autoIncrement: true,
    },
    width: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    height: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    weight: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    length: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    image: {
        type: DataTypes.TEXT,
        allowNull: true
    }
}, {
    tableName: 'product_meta',
    timestamps: false
});
