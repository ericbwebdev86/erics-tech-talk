const User = require('./User');
const Post = require('./Post');
const Comment = require('./Comment');

//associations
User.hasMany(Post, {
    foreignKey: 'user_id'
});
Post.belongsTo(User, {
    foreignKey: 'user_id',
});
Post.hasMany(Comment, {
    foreignKey: 'post_id',
    onDelete: 'CASCADE',
    hooks: true
});
Comment.belongsTo(User, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE'
});
// Comment.belongsTo(Post, {
//     foreignKey: 'post_id',
//     onDelete: 'set null'
// });
// User.hasMany(Comment, {
//     foreignkey: 'user_id'
// });


module.exports = { User, Post, Comment };