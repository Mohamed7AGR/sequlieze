import {config} from 'dotenv';
import {resolve} from 'path';

config({path: resolve(`.env.${process.env.NODE_ENV}`)});

export const PORT = Number(process.env.PORT);

export const db={
    DB_NAME: process.env.DB_NAME,
    DB_USER: process.env.DB_USER,
    DB_PASSWORD: process.env.DB_PASSWORD,
    DB_HOST: process.env.DB_HOST,
    DB_DIALECT: process.env.DB_DIALECT,
    DB_POOL_MAX: Number(process.env.DB_POOL_MAX),
    DB_POOL_MIN: Number(process.env.DB_POOL_MIN),
}
