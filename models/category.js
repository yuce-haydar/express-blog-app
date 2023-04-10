const { DataTypes } = require("sequelize");
const sequelize = require("../data/db");
const slugfield = require("../helpers/slugfield");

const Category = sequelize.define("category", {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  url: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

module.exports = Category;
