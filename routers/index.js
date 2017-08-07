const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  console.log(req.session);
  username = req.session.username || "";
  if (username) {
    //send them to the login ??
  } else {
    //if not signed up
    res.render("signup");
  }
  //res.end();
});

module.exports = router;
