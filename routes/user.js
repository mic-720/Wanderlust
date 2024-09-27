const express = require("express");
const router = express.Router();
const User = require("../models/user.js");
const wrapAsync = require("../utils/wrapAsync");
const passport = require("passport");

router.get("/signup", (req, res) => {
  res.render("./users/signup.ejs");
});

router.post(
  "/signup",
  wrapAsync(async (req, res) => {
    try {
      let { username, email, password } = req.body;
      const newUser = new User({ username, email });
      const registeredUser = await User.register(newUser, password);
      console.log(registeredUser);
      req.flash("success", "Welcome to Wanderlust");
      res.redirect("/listings");
    } catch (e) {
      req.flash("error", e.message);
      res.redirect("/signup");
    }
  })
);

router.get("/signin", (req, res) => {
  res.render("./users/signin.ejs");
});

// router.post(
//   "/signin",
//   passport.authenticate("local", {
//     failureRedirect: "/login",
//     failureFlash: true,
//   }),
//   (req, res) => {
//     req.flash("success", "Welcome to Wanderlust, You are logged in!");
//     res.redirect("/listings");
//   }
// );

router.post("/signin", passport.authenticate("local",{failureRedirect: "/signin",failureFlash :true}), async (req, res) => {
  let { username, password } = req.body;
  req.flash("success","Welcome back to Wanderlust")
  res.redirect("/listings")

});

module.exports = router;
