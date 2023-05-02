const User = require("../models/user");
const Blog = require("../models/blog");
var bcrypt = require("bcryptjs");
const sendMailService = require("../helpers/send-mail");
const config = require("../config");
const saltRound = 10;
const crypto = require("crypto");
const { Op } = require("sequelize");
exports.get_register = async function (req, res, next) {
  try {
    return res.render("auth/register", {
      title: "register ",
    });
  } catch (error) {
    next(error);
  }
};
exports.post_register = async function (req, res, next) {
  const name = req.body.name;
  const email = req.body.email;
  const password = req.body.password;
  try {
    await User.create({
      fullname: name,
      email: email,
      password: password,
    });
    sendMailService.sendMail({
      from: config.email.from,
      to: email,
      subject: "hesabınız olusturuldu",
      text: "hesabınız basarılı bir sekilde olusuruldu ",
    });
    req.session.message = {
      text: "hesabiniza giris yapabilirsiniz",
      class: "success",
    };
    res.redirect("/account/login");
  } catch (err) {
    let mesaj = "";
    if (
      err.name == "SequelizeValidationError" ||
      err.name == "SequelizeUniqueConstraintError"
    ) {
      for (const e of err.errors) {
        mesaj += e.message + " ";
      }

      return res.render("auth/register", {
        title: "register",
        message: { text: mesaj, class: "danger" },
      });
    } else {
      next(err);
    }
  }
};
//login
exports.get_login = async function (req, res, next) {
  const message = req.session.message;
  delete req.session.message;
  try {
    return res.render("auth/login", {
      title: "Login ",
      message: message,
      csrfToken: req.csrfToken(),
    });
  } catch (error) {
    next(error);
  }
};

exports.post_login = async function (req, res, next) {
  const email = req.body.email;
  const password = req.body.password;

  try {
    const user = await User.findOne({
      where: {
        email: email,
      },
    });
    if (!user) {
      return res.render("auth/login", {
        title: "lo gin",
        message: { text: "kullanici bulunamdi", class: "danger" },
      });
    }
    const matchPassword = await bcrypt.compare(password, user.password);
    if (matchPassword) {
      const userRoles = await user.getRoles({
        attributes: ["rolename"],
        raw: true,
      });

      //session
      req.session.roles = userRoles.map((role) => role["rolename"]); //["admin",["moderator"]]
      req.session.isAuth = true;
      req.session.fullname = user.fullname;
      req.session.userid = user.id;

      const url = req.query.returnUrl || "/";
      res.redirect(url);
    }
    return res.render("auth/login", {
      title: "login",
      message: { text: "parola hatali", class: "danger" },
    });
  } catch (error) {
    next(error);
  }
};

exports.get_logout = async function (req, res, next) {
  try {
    await req.session.destroy();
    return res.redirect("/account/login");
  } catch (error) {
    next(error);
  }
};

exports.get_resetpassword = async function (req, res, next) {
  try {
    return res.render("auth/resetpassword", {
      title: "reset passsword ",
    });
  } catch (error) {
    next(error);
  }
};
exports.post_resetpassword = async function (req, res, next) {
  const email = req.body.email;
  try {
    let token = crypto.randomBytes(32).toString("hex");

    const user = await User.findOne({ where: { email: email } });
    if (!user) {
      req.session.message = {
        text: "girdiginiz email ile daha once kayit olunmus",
        class: "warning",
      };
      return res.redirect("resetpassword");
    }

    user.resetToken = token;
    user.resetTokenExpire = Date.now() + 1000 * 60 * 600;
    await user.save();

    sendMailService.sendMail({
      from: config.email.from,
      to: email,
      subject: "parola sıfırlama",
      html: `<p>parola sıfırlamak için linke tıklayınız</p>
        <p>
          <a href="http://127.0.0.1:3131/account/newpassword/${token}">Parola sıfırla </a>
        </p>
        `,
    });

    return res.redirect("login");
  } catch (error) {
    next(error);
  }
};

exports.get_newpassword = async function (req, res, next) {
  try {
    const token = req.params.token;
    const user = await User.findOne({
      where: {
        resetToken: token,
        resetTokenExpire: {
          [Op.gt]: Date.now(),
        },
      },
    });
    return res.render("auth/newpassword", {
      title: "new password",
      token: token,
      userId: user.id,
    });
  } catch (error) {
    next(error);
  }
};
exports.post_newpassword = async function (req, res, next) {
  const token = req.body.token;
  const userId = req.body.userId;
  const newpassword = req.body.password;

  try {
    const user = await User.findOne({
      where: {
        resetToken: token,
        resetTokenExpire: {
          [Op.gt]: Date.now(),
        },
        id: userId,
      },
    });
    user.password = await bcrypt.hash(newpassword, 10);
    user.resetToken = null;
    user.resetTokenExpire = null;
    await user.save();
    req.session.message = { text: "parola günellendi", class: "success" };
    return res.redirect("login");
  } catch (error) {
    next(error);
  }
};

exports.get_profile = async function (req, res, next) {
  const userid = req.session.userid;
  const blogid = req.params.blogid;
  




  try {
    const user =await User.findByPk(userid);
    const blog = await Blog.findAll({
      where:  {  userId: userid },
    });

    return res.render("auth/profile", {
      title: "profile",
      user:user,
      blog:blog
    
    });
  } catch (error) {
    next(error);
  }
};