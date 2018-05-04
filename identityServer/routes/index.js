const express = require('express');
const router = express.Router();
const User = require("../models/User");
const Login = require("../models/Login");


/* GET home page. */
router.get('/', async (req, res) => {
  const users = await User.find({});
  const logins = await Login.find({}).limit(20);
  res.render('index', { users: users, logins: logins });
});

router.get("/sign-in", (req, res) => {
  res.render("sign-in");
});

router.post("/sign-in", async (req, res) => {
  console.log(req.body);
  const login = new Login(req.body);
  login.loginTime = new Date();
  await login.save();
  res.redirect("/");
});

router.get("/register", (req, res) => {
  res.render("register");
});

router.post("/register", async (req, res) => {
  console.log(req.body);
  const user = new User(req.body);
  await user.save();
  res.redirect("/");
});

module.exports = router;
