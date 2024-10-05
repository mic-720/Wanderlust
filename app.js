if(process.env.NODE_ENV != 'production'){
  require('dotenv').config() 
}
const port = process.env.PORT;
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
// const MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust";
var methodOverride = require("method-override");
var ejsMate = require("ejs-mate");
const ExpressError = require("./utils/ExpressError.js");
const session = require("express-session");
const MongoStore = require('connect-mongo');

const flash = require("connect-flash");

const passport = require("passport");
const LocalStrategy = require("passport-local");
const User = require("./models/user.js");

const listingRouter = require("./routes/listing.js");
const reviewRouter = require("./routes/review.js");
const userRouter = require("./routes/user.js");

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));
app.use(express.static(path.join(__dirname, "/public/css")));
app.use(express.static(path.join(__dirname, "/public/js")));
app.use(methodOverride("_method"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.engine("ejs", ejsMate);
const store = MongoStore.create({
  mongoUrl: process.env.MONGO_URI,
  crypto: {
    secret: process.env.SECRET,
    touchAfter: 24*60*60
  }
})
store.on("error", () => {
  console.log("Error in Mongo Store ",err)
})
const sessionOptions = {
  store,
  secret: process.env.SECRET,
  resave: false,
  saveUninitialized: true,
  cookie: {
    expires: Date.now() + 7 * 24 * 60 * 60 * 100,
    maxAge: 7 * 24 * 60 * 60 * 1000,
    httpOnly: true,
  },
};



app.use(session(sessionOptions));
app.use(flash());

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((req, res, next) => {
  res.locals.success = req.flash("success");
  res.locals.error = req.flash("error");
  res.locals.currUser = req.user;
  next();
});

app.use(`/listings`, listingRouter);
app.use(`/listings/:id/reviews`, reviewRouter);
app.use(`/`,userRouter)

// main()
//   .then(() => {
//     console.log("connection successful...");
//   })
//   .catch((err) => {
//     console.log(err);
//   });

// async function main() {
//   await mongoose.connect(MONGO_URL);
// }

app.get("/", (req, res) => {
  res.redirect("/listings")
});

// app.get("/demo",async (req,res)=>{
//   let fakeUser = new User({
//     email: "user@gmail.com",
//     username: "user"
//   })
//   let registeredUser = await User.register(fakeUser,"password1")
//   res.send(registeredUser)
// })

// app.get("/testListing", async (req, res) => {
//     let sampleListing = new Listing({
//         title: "My new villa",
//         description: "By the beach",
//         price: 1200,
//         location: "Patna, Bihar",
//         country: "India",
//     });

//     await sampleListing.save()
//     console.log('sample was saved');
//     res.send('successful');
// });

app.all("*", (req, res, next) => {
  throw new ExpressError(404, "Page Not Found");
});

app.use((err, req, res, next) => {
  let { status = 500, message = "some error occured..." } = err;
  // res.status(status).send(message);
  res.status(status).render("error.ejs", { err });
});

// app.listen(port, () => {
//   console.log(`Server is running at port : ${port}`);
// });

mongoose.connect(process.env.MONGO_URI).then(() => {
  app.listen(port, () => {
    console.log(`Connected to DB and running on port:${port}/`);
  });
});