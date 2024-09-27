const express = require("express");
const port = 3000;
const app = express();
const cookieParser = require("cookie-parser");
const session = require("express-session");

app.use(cookieParser("secret-code"));
app.use(
  session({
    secret: "mysecret-code",
    resave: false,
    saveUninitialized: true,
    cookie: {
      expires: Date.now() + 7 * 24 * 60 * 60 * 1000,
      maxAge: 7 * 24 * 60 * 60 * 1000,
    },
  })
);

app.get("/getcookie", (req, res) => {
  let {name} =req.query;
  res.cookie("name", name);
  res.render("/greet")
});

app.get("/greet", (req, res) => {
  console.log(req.cookies);
  let { name = "unknown" } = req.cookies;
  res.render("page.ejs",{
    name: name
  });
});

app.get("/signed", (req, res) => {
  res.cookie("madein", "India", { signed: true });
  res.send("signed cookie send successfully...");
});

app.get("/getsigned", (req, res) => {
  res.send(req.signedCookies);
});

app.get("/count", (req, res) => {
  if (req.session.count) {
    req.session.count++;
  } else {
    req.session.count = 1;
  }
  console.log(req.session)
  res.send(`The value of count is : ${req.session.count}`);
});

app.listen(port, () => {
  console.log(`The Server is running at port : ${port}`);
});
