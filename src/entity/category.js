import { DataTypes } from "sequelize";
import { getDbConnection } from "../config/db/connection.js";


const orm = getDbConnection()
export const Category = orm.define('Category', {
    category_id: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    tableName: 'category',
    timestamps: false
  });
  