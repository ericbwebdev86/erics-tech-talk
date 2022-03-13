const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Comment extends Model {}

Comment.init(
    //table column definitions
    {
     id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
     },
     comment_text: {
         type: DataTypes.TEXT,
         allowNull: false,
         validate: {
             len: [1]
         }
     },
      user_id: {
          type: DataTypes.INTEGER,
          references: {
              model: 'user',
              key: 'id'
          }
      }
    },   
    {
        //table configs
        //pass in our imported sequelize connection
        sequelize,
        freezeTableName: true,
        underscored: true,
        modelName: 'comment'
    }
);
module.exports = Comment;