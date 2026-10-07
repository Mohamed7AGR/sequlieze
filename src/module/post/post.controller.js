import { Router } from "express";
import { successResponse, errorResponse } from "../../common/utils/response.js";
import * as postService from "./post.service.js";

export const postRouter=Router();

postRouter.post('/',async(req,res)=>{
    try{
        const post=await postService.createPost(req.body);
        successResponse(res,201,"Post created successfully",post);
    }catch(error){
        errorResponse(res,400,error.message);
    }
});
postRouter.get('/',async(req,res)=>{
    try{
        const posts=await postService.getPosts();
        successResponse(res,200,"Posts fetched successfully",posts);
    }catch(error){
        errorResponse(res,400,error.message);
    }
})
postRouter.delete('/:postId',async(req,res)=>{
    try{
        await postService.deletePost(req.params.postId,req.body.userId);
        successResponse(res,200,"Post deleted successfully");
    }catch(error){
        errorResponse(res,400,error.message);
    }
});

postRouter.get('/details',async(req,res)=>{
    try {
        const posts =await postService.getPostDetails();
        successResponse(res,200,"Posts fetched successfully",posts);
    } catch (error) {
        errorResponse(res,400,error.message);
    }
});
postRouter.get('/comment-count',async(req,res)=>{
    try {
        const posts =await postService.getPostsCommentCount();
        successResponse(res,200,"Posts comment count fetched successfully",posts);
    } catch (error) {
        errorResponse(res,400,error.message);
    }
})