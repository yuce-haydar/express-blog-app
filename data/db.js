const config = require("../config");
const mysql = require("mysql2");
// let connection= mysql.createConnection(conf.db);
const Sequelize = require("sequelize");

const sequelize = new Sequelize(
  config.db.database,
  config.db.user,
  config.db.password,
  {
    host: config.db.host,
    dialect: "mysql" /*kullandıgımız db */,
    storage: "./session.mysql",
    define: {
      timestamps: false,
    },
  }
);

async function connect() {
  try {
    await sequelize.authenticate();
    console.log(" sequlize ile server baglantisi yapıldı ");
  } catch (error) {
    console.log("baglanti hatasi", error);
  }
}

// connection.connect(function(err){
//   if(err){
//    console.log(err);
//    return
//   }
//   console.log("servera baglandı1");
// //   connection.query("select * from blog ",function(err,result){
// //     console.log(result);
//   //s})

// })
// module.exports=connection.promise()//!then ve catch ile yakalayabilmek için promise formatına dönüştürdük
connect();
module.exports = sequelize;
