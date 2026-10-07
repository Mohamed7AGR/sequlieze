import { Post, Comment,User } from "../../database/index.js";
// create user
export const createUser=async(userData)=>{
    let {name,email,password,role} = userData;
    const defaults = {name, email, password, role };
    return await User.findOrCreate({
        where:{email},
        defaults
    });
}

//create or update user
export const createOrUpdateUser =async(id,userData)=>{
    let {name,email,password,role}=userData;
    return await User.upsert(
        {id,name,email,password,role},
        {validate:false}
    )

}
//get all users
export const getAllUsers=async()=>{
    return await User.findAll({
        attributes:{exclude:['role','password']},
        include:[{
            model:Post,
            as:'posts',
            attributes:['id','title','content'],
        },{
            model:Comment,
            as:'comments',
            attributes:['id','content'],
        }],
    });
}
//get user by email
export const getUserByEmail=async(email)=>{
    return await User.findOne({where:{email}});
}
//get user by Id
export const getUserById=async(id)=>{
    return await User.findByPk(id,{attributes:{exclude:['role']}});
}