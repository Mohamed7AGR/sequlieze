import { sequelize } from '../connection.js';
import { DataTypes } from 'sequelize';


function checkNameLength(value){
    if(!value || value.length<=2){
        throw new Error('Name must be greater than 2 characters');
    }
}
export let User=sequelize.define('user',{
    name:{
        type:DataTypes.STRING(255),
        allowNull:false,
        validate:{
            notEmpty:true,
           
        }
    },
    email:{
        type:DataTypes.STRING(255),
        allowNull:false,
        unique:true,
        validate:{
            notEmpty:true,
            isEmail:true,
            
        }
    },
    password:{
        type:DataTypes.STRING(255),
        allowNull:false,
        validate:{
            notEmpty:true,
            checkPasswordLength(value){
                if(!value || value.length<=6){
                    throw new Error('Password must be greater than 6 characters');
                }
            },
        },
    },
    role:{
        type:DataTypes.ENUM('admin','user'),
        allowNull:false
    }

},{
    timestamps:true,
    hooks:{
        beforeCreate(user){
            checkNameLength(user.name);
        },
    }
})