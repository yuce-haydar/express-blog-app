const expres = require("express");
const router = expres.Router();
const userControllers = require("../controllers/user");

router.get("/blogs/category/:slug", userControllers.blog_list);
router.get("/blogs/:slug/", userControllers.blogs_details);
router.get("/blogs", userControllers.blog_list);
router.get("/", userControllers.index);

module.exports = router; //!bu kullanımla yukardaki yazdıklarımızı importa açtık
