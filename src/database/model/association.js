import { User } from './user.model.js';
import { Post } from './post.model.js';
import { Comment } from './comment.model.js';
User.hasMany(Post, {
    foreignKey: { name: 'userId', allowNull: false },
    as: 'posts',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
});

Post.belongsTo(User, {
    foreignKey: { name: 'userId', allowNull: false },
    as: 'user',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
})

Post.hasMany(Comment, {
    foreignKey: { name: 'postId', allowNull: false },
    as: 'comments',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
})

Comment.belongsTo(Post, {
    foreignKey: { name: 'postId', allowNull: false },
    as: 'post',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
});

Comment.belongsTo(User, {
    foreignKey: { name: 'userId', allowNull: false },
    as: 'user',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
});

User.hasMany(Comment, {
    foreignKey: { name: 'userId', allowNull: false },
    as: 'comments',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
});