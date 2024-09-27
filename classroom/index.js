const express = require("express");
const port = 3000;
const app = express();
const session = require("express-session");

const sessionOptions = {
  secret: "supercode",
  resave: false,
  saveUninitialized: true,
  cookie: {
    expires: Date.now() + 1*1000,
    maxAge :  1*1000
  }
};
app.use(session(sessionOptions));

app.get("/", (req, res) => {
  res.send(`Welcome to the world of Coding...`);
});

app.get("/count", (req, res) => {
  if (req.session.count) {
    req.session.count++;
  } else {
    req.session.count = 1;
  }
  res.status(200).send(`Count: ${req.session.count}`);
});

app.get("/register", (req, res) => {
  let { name = "unknown" } = req.query;
  req.session.name = name;
  // res.send(`${name} cookie saved`)
  res.redirect("/hello");
});

app.get("/hello", (req, res) => {
  let { name = "unknown" } = req.session;
  console.log(req.session)
  res.send(`Welcome to the website : ${name} `);
});

app.listen(port, (req, res) => {
  console.log(`Server is running at port : ${port}`);
});
