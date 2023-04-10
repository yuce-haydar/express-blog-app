module.exports = (err, req, res, next) => {
  console.log("loglama " + err.message);
  next(err); //eğer içi boş olursa süreç devam eder ancak hata silinmiş olur
};
