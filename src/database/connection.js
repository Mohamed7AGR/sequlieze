import {Sequelize} from 'sequelize';
import { db } from '../config/config.service.js';
export let sequelize=new Sequelize(db.DB_NAME,db.DB_USER,db.DB_PASSWORD,{
    host:db.DB_HOST,
    dialect:db.DB_DIALECT,
    pool:{
        max:db.DB_POOL_MAX,
        min:db.DB_POOL_MIN,
    }
});

export const connectDB=async()=>{
    try{
        await sequelize.sync({alter:false });
        console.log("Database connected successfully");

    }catch(err){
        console.log("Database connection failed", err);
    }
}

export default sequelize;