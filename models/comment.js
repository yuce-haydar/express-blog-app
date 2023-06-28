const { DataTypes } = require("sequelize");
const sequelize = require("../data/db");
const Blog = require("./blog");
const User = require("./user");
const Comment = sequelize.define('comment', {
 
    
    content: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    blogId: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
   
  } ,{timestamps:true});


    Comment.belongsTo(User, { foreignKey: 'userId' });
    Comment.belongsTo(Blog, { foreignKey: 'blogId' });
  

  module.exports = Comment;