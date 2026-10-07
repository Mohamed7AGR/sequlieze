import { sequelize } from '../connection.js';
import { DataTypes,Model } from 'sequelize';
export class Post extends Model{}
Post.init({
    title:{
        type:DataTypes.STRING(255),
        allowNull:false
    },
    content:{
        type:DataTypes.TEXT,
        allowNull:true
    },
   

},{
    sequelize,
    modelName:'post',
    timestamps:true,
    paranoid:true,
    
})