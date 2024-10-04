const User = require("../models/user.js");

const renderSignupForm = (req, res) => {
  res.render("./users/signup.ejs");
};

const signup = async (req, res, next) => {
  try {
    let { username, email, password } = req.body;
    const newUser = new User({ username, email });
    const registeredUser = await User.register(newUser, password);
    console.log("User Registered : ", registeredUser.username);
    req.login(registeredUser, (err) => {
      if (err) {
        return next(err);
      }
      req.flash("success", "Welcome to Wanderlust");
      res.redirect("/listings");
    });
  } catch (e) {
    req.flash("error", e.message);
    res.redirect("/signup");
  }
};

const renderSigninForm = (req, res) => {
  res.render("./users/signin.ejs");
};

const signin = async (req, res) => {
  let { username, password } = req.body;
  req.flash("success", "Welcome back to Wanderlust");
  let redirectUrl = res.locals.redirectUrl || "/listings";
  res.redirect(redirectUrl);
};

const logout = (req, res, next) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    req.flash("success", "you are logged out");
    res.redirect("/listings");
  });
};

module.exports = {
  renderSignupForm,
  signup,
  renderSigninForm,
  signin,
  logout,
};
