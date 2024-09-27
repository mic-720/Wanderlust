const express = require("express");
const port = 3000;
const app = express();
const users = require("./routes/user.js");
const posts = require("./routes/post.js");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const flash = require("connect-flash");
const path = require("path");

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));

// const sessionOptions = {
//   secret: "secretcode",
//   resave: false,
//   saveUninitialized: true,
// };

// app.use(session(sessionOptions));
// app.use(flash());

// app.use((req, res, next) => {
//   res.locals.success = req.flash("success");
//   res.locals.error = req.flash("error");
//   next();
// });

// app.get("/test", (req, res) => {
//   res.send("test successful...");
// });

// app.get("/register", (req, res) => {
//   let { name = "anonymous" } = req.query;
//   req.session.name = name;
//   console.log(req.session);
//   if (name === "anonymous") {
//     req.flash("error", "user not registered ");
//   } else {
//     req.flash("success", "user registered successfully");
//   }
//   res.redirect("/hello");
// });

// app.get("/hello", (req, res) => {
//   res.render("page.ejs", {
//     name: req.session.name,
//   });
// });

// app.get("/count", (req, res) => {
//   if (req.session.count) {
//     req.session.count++;
//   } else {
//     req.session.count = 1;
//   }
//   console.log(req.session);
//   res.send(`Count : ${req.session.count}`);
// });

// app.use(cookieParser("secret-code"));

// app.get("/getcookie", (req, res) => {
//   res.cookie("name", "sattu don",{signed: true});
//   res.send("sent some cookies..");
// });

// app.get("/print", (req, res) => {
//   console.log(req.signedCookies);
//   let { name = "unknown" } = req.signedCookies;
//   res.send(`Welcome to the page : ${name}`);
// });

app.listen(port, (req, res) => {
  console.log(`Server is running at port : ${port}`);
});

// app.use(cookieParser("secret"));
// app.use("/users", users);
// app.use("/posts", posts);

// app.get("/cook", (req, res) => {
//   res.cookie("greet", "hello")
//   res.cookie("made in", "India")
//   res.send("sent you a cookie");
// })

// app.get("/get", (req, res) => {
//   res.cookie("made-in", "India", { signed: true })
//   res.send('cookie sent');
// })

// app.get("/verify",(req,res)=>{
//   // res.send(req.signedCookies);
//   console.log(req.signedCookies);
// })

// app.get("/greet", (req, res) => {
//   let { name = "bidu" } = req.cookies;
//   res.send(`Welcome ${name}`)
// })

// app.get("/", (req, res) => {
//   res.send(req.cookies)
// })
