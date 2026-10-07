import { Post,Comment,User } from '../../database/index.js';
import { sequelize } from '../../database/connection.js';
export const createPost = async (postData) => {
    const post = new Post(postData);
    return await post.save();
}

export const deletePost = async (postId, userId) => {
    const post = await Post.findByPk(postId);
    if (!post) {
        throw new Error("Post not found");
    }
    if (post.userId !== Number(userId)) {
        throw new Error("You are not authorized to delete this post");
    }
    await post.destroy();
    return true;
}
export const getPosts=async()=>{
    const {rows:posts}=await Post.findAndCountAll({
        attributes:['id','title','content'],
        include:[{
            model:User,
            as:'user',
            attributes:['id','name','email'],
        },
        {
            model:Comment,
            as:'comments',
            attributes:['id','content'],
        }],
    });
    return {posts};
}
export const getPostDetails = async () => {
    return await Post.findAll({
        attributes: [
            'id',
            'title',
            'content',
        ],
        include: [{
            model: User,
            as: 'user',
            attributes: [
                'name',
            ]
        }, {
            model: Comment,
            as: 'comments',
            attributes: [
                'id',
                'content',
            ]
        }]
    })
}
export const getPostsCommentCount = async () => {
    return await Post.findAll({
        attributes: [
            'id',
            'title',
            [
                sequelize.fn('COUNT', sequelize.col('comments.id')), 'commentCount'
            ]
        ],
        include: [{
            model: Comment,
            as: 'comments',
            attributes: [],
        }],
        group: ['post.id', 'post.title'],

    })
}