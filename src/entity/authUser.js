import { DataTypes } from "sequelize";
import { getDbConnection } from "../config/db/connection.js";


const orm = getDbConnection()
export const AuthUser = orm.define('AuthUser', {
    user_id: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        autoIncrement: true,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    tableName: 'auth_user',
    timestamps: false
});
