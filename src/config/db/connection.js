import { Sequelize } from "sequelize"
import * as dotEnv from 'dotenv'

dotEnv.config();

export const getDbConnection = function() {
    return new Sequelize(`${process.env.DB_URI}`, {
        pool: {
            max: 5,
            min: 0,
            idle: 10000
          }
    });
}