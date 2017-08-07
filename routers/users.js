const express = require("express");
const router = express.Router();
var models = require("./../models");
const User = models.User;
const Profile = models.Profile;
const Location = models.Location;
const sequelize = models.sequelize;

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
	console.log(req.body);
	//Profile.
	//wrap in a transaction
	//parse age and height
	let age = Number(req.body.age);
	let height = Number(req.body.feet) * 12 + Number(req.body.inches);
	let user, profile, location;
	let randomCoordinate = Math.floor(Math.random() * 50);
	console.log(`coordinate = ${randomCoordinate}`);
	sequelize
		.transaction(t => {
			return User.create({
				username: req.body.username,
				email: req.body.email,
				profile_id: null,
				transaction: t
			})
				.then(createdUser => {
					//spread????, create location later
					user = createdUser;
					return Profile.create({
						about: req.body.about,
						talents: req.body.talents,
						favorite_things: req.body.favoriteThings,
						why: req.body.why,
						user_id: user.id,
						age: age,
						location_id: null,
						gender: req.body.gender,
						relationship_status: req.body.Relationship,
						education: req.body.education,
						kids: req.body.kids,
						height: height,
						occupation: req.body.occupation,
						transaction: t
					});
				})
				.then(createdProfile => {
					//create location coordinate
					profile = createdProfile;
					return Location.findOrCreate({
						defaults: { coordinate: 6 },
						where: { name: req.body.location },
						transaction: t
					}).spread(createdLocation => {
						//update user
						location = createdLocation;
						return Profile.update(
							{ location_id: location.id },
							{ where: { id: profile.id }, transaction: t }
						).then(createdProfile => {
							return User.update(
								{ profile_id: createdProfile.id },
								{ where: { id: user.id }, transaction: t }
							);
						});
					});
				});
		})
		.catch(e => {
			if (e.errors) {
				e.errors.forEach(error => {
					console.log(error.message);
				});
			}
		});
});

module.exports = router;
