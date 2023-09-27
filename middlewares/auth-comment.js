module.exports = function (req, res, next) {
  if (!req.session.isAuth) {
    req.session.message = { text: "yorum yapmak ıcın lutfen gırıs yapın ya da kayıt olun",class:"danger"};
    return res.redirect("/account/login?returnUrl=" + req.originalUrl);

  }
  next();
};
