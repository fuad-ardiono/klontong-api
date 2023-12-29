import { Sequelize } from "sequelize"
import * as dotEnv from 'dotenv'

dotEnv.config();

export const getDbConnection = function() {
    return new Sequelize(`${process.env.DB_URI}`);
}