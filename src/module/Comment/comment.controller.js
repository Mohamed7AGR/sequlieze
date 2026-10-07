import { Router } from "express";
import { successResponse, errorResponse } from "../../common/utils/response.js";
import * as commentService from "./comment.service.js";
export const commentRouter = Router();

commentRouter.post('/', async (req, res) => {
    try {
        const comments = await commentService.createComments(req.body.comments);
        successResponse(res, 201, "Comments created successfully", comments);
    } catch (error) {
        errorResponse(res, 400, error.message);
    }
});

commentRouter.patch('/:commentId', async (req, res) => {
    try {
        const { userId, content } = req.body;
        const comment = await commentService.updateComment(req.params.commentId, userId, content);
        successResponse(res, 200, "Comment updated successfully", comment);
    } catch (error) {
        errorResponse(res, 400, error.message);
    }

})
commentRouter.post('/find-or-create', async (req, res) => {
    try {
        const { content, userId, postId } = req.body;
        const { comment, created } = await commentService.findOrCreateComment({ content, userId, postId });
        res.status(200).json({ comment, created });
    } catch (error) {
        errorResponse(res, 400, error.message);
    }
})
commentRouter.get('/search',async(req,res)=>{
    try{
        const {count,rows}=await commentService.searchComments(req.query.word);
        if(count===0){
            throw new Error("no comment found");
        }
        res.status(200).json({count,comments:rows});
    }catch(error){
        errorResponse(res,400,error.message);
    }
});
commentRouter.get('/newest/:postId',async(req,res)=>{
    try{
        const comments=await commentService.getNewestComments(req.params.postId);
        res.status(200).json(comments);
    }catch(error){
        errorResponse(res,400,error.message);
    }
});

commentRouter.get('/details/:commentId',async(req,res)=>{
    try {
        const comment=await commentService.getCommentDetails(req.params.commentId);
        if(!comment){
            throw new Error("comment not found");
        }
        res.status(200).json(comment);
    } catch (error) {
        errorResponse(res,400,error.message);
    }
})