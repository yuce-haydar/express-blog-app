const express = require("express");
const router = express.Router();

const imageUpload = require("../helpers/image-upload");

const adminController = require("../controllers/admin");
const isAdmin = require("../middlewares/is-admin");
const isModerator = require("../middlewares/is-moderator");
const csrf = require("../middlewares/csrf");

router.get(
  "/blog/delete/:blogid",
  isModerator,
  csrf,
  adminController.get_blog_delete
);

router.post(
  "/blog/delete/:blogid",
  isModerator,
  adminController.post_blog_delete
);

router.get(
  "/category/delete/:categoryid",
  isAdmin,
  csrf,
  adminController.get_category_delete
);

router.post(
  "/category/delete/:categoryid",
  isAdmin,
  adminController.post_category_delete
);

router.get("/blog/create", isModerator, csrf, adminController.get_blog_create);

router.post("/categories/remove", isAdmin, adminController.get_category_remove);

router.post(
  "/blog/create",
  isModerator,
  csrf,
  imageUpload.upload.single("resim"),
  adminController.post_blog_create
);

router.get(
  "/category/create",
  isAdmin,
  csrf,
  adminController.get_category_create
);

router.post("/category/create", isAdmin, adminController.post_category_create);

router.get("/blogs/:blogid", isModerator, csrf, adminController.get_blog_edit);

router.post(
  "/blogs/:blogid",
  isModerator,
  imageUpload.upload.single("resim"),
  adminController.post_blog_edit
);

router.get(
  "/categories/:categoryid",
  isAdmin,
  csrf,
  adminController.get_category_edit
);

router.post(
  "/categories/:categoryid",
  isAdmin,
  adminController.post_category_edit
);

router.get("/blogs", isModerator, csrf, adminController.get_blogs);

router.get("/categories", isAdmin, csrf, adminController.get_categories);

router.get("/roles", isAdmin, adminController.get_roles);
router.get("/roles/:roleid", isAdmin, csrf, adminController.get_roles_edit);
router.post("/roles/remove", isAdmin, adminController.post_roles_remove);

router.post("/roles/:roleid", isAdmin, adminController.post_roles_edit);

router.get(
  "/role/delete/:roleid",
  isAdmin,
  csrf,
  adminController.get_roles_delete
);
router.post("/role/delete/:roleid", isAdmin, adminController.post_roles_delete);

router.get("/users", isAdmin, adminController.get_users);
router.get("/users/:userid", isAdmin, csrf, adminController.get_users_edit);
router.post("/users/:userid", isAdmin, adminController.post_user_edit);

module.exports = router;
