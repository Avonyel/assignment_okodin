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
  let coordinate = Math.floor(Math.random() * 50);
  console.log(`coordinate = ${coordinate}`);
  sequelize
    .transaction(t => {
      User.create({
        username: req.body.username,
        email: req.body.email,
        profile_id: null,
        transaction: t
      })
        .then(createdUser => {
          //spread????, create location later
          user = createdUser;
          Profile.create({
            about: req.body.about,
            talents: req.body.talents,
            favorite_things: req.body.favoriteThings,
            why: req.body.why,
            user_id: user.id,
            age: age,
            location_id: null,
            gender: "SOCIAL CONSTRUCT",
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
          Location.findOrCreate({
            defaults: { coordinate: coordinate },
            where: {
              name: req.body.location
            },
            transaction: t
          }).spread(createdLocation => {
            //update user
            location = createdLocation;
            Profile.update(
              { location_id: location.id },
              { where: { id: profile.id }, transaction: t }
            ).then(createdProfile => {
              User.update(
                { profile_id: createdProfile.id },
                { where: { id: user.id }, transaction: t }
              );
            });
          });
        });
    })
    .catch(e => {
      console.log("TERRIBLE THINGS HAVE HAPPENED");
    });
});

module.exports = router;
