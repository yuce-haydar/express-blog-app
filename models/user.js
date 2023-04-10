const { DataTypes } = require("sequelize");
const sequelize = require("../data/db");
const bcrypt = require("bcrypt");

const User = sequelize.define(
  "user",
  {
    fullname: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "ad soyad girmelisiniz",
        },
        ifFullname(value) {
          if (value.split(" ").length < 2) {
            // ali yazarsak olmaz
            throw new Error("lütfen ad ve soyad giriniz ");
          }
        },
      },
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: {
        args: true,
        msg: "email daha önce alınmış",
      },
      validate: {
        notEmpty: {
          msg: " email girmelisiniz ",
        },
        isEmail: { msg: "girdiniz email olmalıdır " },
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: { msg: "parola boş geçilemez" },
        len: { args: [8, 16], msg: "parola 8 16 karekter arasında olmalıdır " },
      },
    },
    resetToken: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    resetTokenExpire: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  },
  { timestamps: true }
);

User.afterValidate(async (user) => {
  user.password = await bcrypt.hash(user.password, 10);
});
module.exports = User;
