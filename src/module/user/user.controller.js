import { Router } from "express";
import { successResponse, errorResponse } from "../../common/utils/response.js";
import * as userService from "./user.service.js";

export const userRouter=Router();
// create user
userRouter.post('/signup', async (req, res) => {
        let userData = req.body;
        let [user, created] = await userService.createUser(userData);
        return created ? successResponse(res,201,"User add successfully") :
         errorResponse(res,400,"Email already exists");
});
//create or update user

userRouter.put('/:id', async (req, res) => {
    await userService.createOrUpdateUser(req.params.id,req.body);
    successResponse(res,200,"User created or updated successfully");
});
//get all users
userRouter.get('/', async (req, res) => {
    
    let users =await userService.getAllUsers();
    if(!users){
        return errorResponse(res,400,"Users not found");
    }
    successResponse(res,200,"Users found successfully",users);

});
//get user by email
userRouter.get('/by-email', async (req, res) => {
    
        let user =await userService.getUserByEmail(req.query.email);
        if(!user){
            return errorResponse(res,400,"User not found");
        }
        successResponse(res,200,"User found successfully",user);
    
});
//get user by id
userRouter.get('/:id', async (req, res) => {
   
        let user =await userService.getUserById(req.params.id);
        if(!user){
            return errorResponse(res,400,"User not found");
        }
        successResponse(res,200,"User found successfully",user);
    
});