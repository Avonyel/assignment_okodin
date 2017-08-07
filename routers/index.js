const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  console.log(req.session);
  username = req.session.username || "";
  if (username) {
    //send them to the login ??
    // res.send(`username = ${username}`);
    res.render("signup");
  } else {
    //if not signed up
    res.render("signup");
  }
});
/*move this to user router
router.post('/users/new', (req, res)=>{

})*/

module.exports = router;
