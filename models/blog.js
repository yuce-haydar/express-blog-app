const { DataTypes } = require("sequelize");
const sequelize = require("../data/db");
const slugfield = require("../helpers/slugfield");

const Blog = sequelize.define(
  "blog",
  {
    baslik: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    url: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    altbaslik: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    aciklama: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    resim: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    anasayfa: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    onay: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
  },
  {
    timestamps: true,
    validate: {
      checkValidOnay() {
        if (this.anasayfa && !this.onay) {
          throw new Error("anasayfaya aldıgınız blogu Onaylamadınız ");
        }
      },
    },
  }
);

module.exports = Blog;
