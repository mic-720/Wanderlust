const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync");
const passport = require("passport");
const { savedRedirectUrl } = require("../middleware.js");
const {
  renderSignupForm,
  signup,
  renderSigninForm,
  signin,
  logout,
} = require("../controllers/users.js");

router.get("/signup", renderSignupForm);

router.post("/signup", wrapAsync(signup));

router.get("/signin", renderSigninForm);

router.post(
  "/signin",
  savedRedirectUrl,
  passport.authenticate("local", {
    failureRedirect: "/signin",
    failureFlash: true,
  }),
  signin
);

router.get("/logout", logout);

module.exports = router;
