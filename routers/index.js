const express = require("express");
const router = express.Router();
var models = require("./../models");
var User = models.User;

router.get("/", (req, res) => {
  // username = req.session.username || "";
  if (req.session.isNew) {
    //send them to the login ??
    // res.send(`username = ${username}`);
    res.render("login");
  } else {
    //if not signed up
    res.render("index");
  }
});

router.post("/", (req, res) => {
  User.find({
    username: req.body.username,
    email: req.body.email
  }).then(result => {
    if (result !== null) {
      //render main page
      req.session.email = req.body.email;
      req.session.username = req.body.username;
      res.redirect("/");
    } else {
      //go to create profile
      //set temporary cookies for ease
      req.cookie.email = req.body.email;
      req.cookie.username = req.body.username;
      res.redirect("/users/new");
    }
  });
});

module.exports = router;
