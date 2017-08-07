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
/*move this to user router
router.post('/users/new', (req, res)=>{

})*/

router.post("/", (req, res) => {
  req.session.email = req.body.email;
  req.session.username = req.body.username;

  users
    .find({ username: req.body.username, email: req.body.email })
    .then(result => {
      console.log(result);
    });
});

module.exports = router;
