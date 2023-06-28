const expres = require("express");
const router = expres.Router();
const userControllers = require("../controllers/user");
const csrf = require("../middlewares/csrf");
router.get("/blogs/category/:slug", userControllers.blog_list);
router.get("/blogs/:slug/",  csrf,userControllers.blogs_details);
router.post("/blogs/:slug/",csrf, userControllers.blogs_details_comment);
router.get("/blogs", userControllers.blog_list);
router.get("/", userControllers.index);

module.exports = router; //!bu kullanımla yukardaki yazdıklarımızı importa açtık
