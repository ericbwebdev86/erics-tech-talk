const {Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

//create User model

class User extends Model {}

//define table columns and configuration
User.init(
    //table column definitions
    {
     id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
     },
     username: {
         type: DataTypes.STRING,
         allowNull: false
     },
     email: {
         type: DataTypes.STRING,
         allowNull: false,
         unique: true,
         validate: {
             isEmail: true
         }
     },
     password: {
         type: DataTypes.STRING,
         allowNull: false,
         validate: {
             //password must be at least 8 charcters long
             len: [8]
         }
     }   
    },
    {
        //table configs
        //pass in our imported sequelize connection
        sequelize,
        timestamps: false,
        underscored: true,
        modelName: 'user'
    }
);

module.exports = User;