const express = require("express");
const router = express.Router();

const authContoller = require("../controllers/auth");
const csrf = require("../middlewares/csrf");

router.get("/register", csrf, authContoller.get_register);
router.post("/register", csrf, authContoller.post_register);

router.get("/login", csrf, authContoller.get_login);
router.post("/login", csrf, authContoller.post_login);

router.get("/logout", authContoller.get_logout);

router.get("/resetpassword", csrf, authContoller.get_resetpassword);
router.post("/resetpassword", authContoller.post_resetpassword);

router.get("/newpassword/:token", csrf, authContoller.get_newpassword);
router.post("/newpassword", authContoller.post_newpassword);


router.get("/profile", authContoller.get_profile);
module.exports = router;
