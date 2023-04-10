module.exports = (err, req, res, next) => {
  //4 paremetreli hatayı ele alan bir middleware
  res.status(500).render("error/500", { title: "hata sayfası" });
};
