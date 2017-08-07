const express = require("express");
const router = express.Router();
var models = require("./../models");
var User = models.User;

router.get("/new", (req, res) => {
	//display newProfile page
	console.log(req.cookies.username + " " + req.cookies.email);
	res.render("newProfile", {
		username: req.cookies.username,
		email: req.cookies.email
	});
});
router.post("/new", (req, res) => {
	//create a profile for a user
});

module.exports = router;
