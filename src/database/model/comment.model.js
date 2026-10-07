import { sequelize } from '../connection.js';
import { DataTypes,Model } from 'sequelize';
export let Comment=class Comment extends Model{}
Comment.init({
   
    content:{
        type:DataTypes.TEXT,
        allowNull:false
    },
   

},{
    sequelize,
    modelName:'comment',
    timestamps:true,
    
})