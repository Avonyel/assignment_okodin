const express = require("express");
const router = express.Router();
var models = require("./../models");
var User = models.User;

router.get("/new", (req, res) => {
  //display newProfile page
  res.render("newProfile", {
    username: req.cookie.username,
    email: req.cookie.email
  });
});
router.post("/new", (req, res) => {
  //create a profile for a user
});

module.exports = router;
