import { Post, User } from '../../database/index.js';
import { Comment } from '../../database/model/comment.model.js';
import { Op } from 'sequelize';



export const createComments = async (comments) => {
    return await Comment.bulkCreate(comments);
}

export const updateComment = async (commentId, userId, content) => {
    const comment = await Comment.findByPk(commentId);
    if (!comment) {
        throw new Error("Comment not found");
    }
    if (comment.userId !== Number(userId)) {
        throw new Error("You are not authorized to update this comment");
    }
    comment.content = content;
    await comment.save();
    return comment;
}

export const findOrCreateComment = async (commentData) => {
    const { content, userId, postId } = commentData;
    const [comment, created] = await Comment.findOrCreate({
        where: { content, userId, postId },
    });
    return { comment, created };

}
export const searchComments = async (word) => {

    const { count, rows } = await Comment.findAndCountAll({
        where: {
            content: {
                [Op.like]: `%${word}%`
            }
        },
    });
    return { count, rows };
}
export const getNewestComments = async (postId) => {
    return await Comment.findAll({
        where: { postId },
        attributes: ['id', 'content', 'createdAt'],
        order: [['createdAt', 'DESC']],
        limit: 10,
    })

}
export const getCommentDetails=async(commentId)=>{
    return await Comment.findByPk(commentId,{
        attributes:['id','content'],
        include:[{
            model:User,
            as:'user',
            attributes:['id','name','email'],
        },{
            model:Post,
            as:'post',
            attributes:['id','title','content'],
        }],
    });
}
