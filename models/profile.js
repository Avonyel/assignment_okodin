"use strict";
module.exports = function(sequelize, DataTypes) {
  var Profile = sequelize.define(
    "Profile",
    {
      about: DataTypes.TEXT,
      talents: DataTypes.TEXT,
      favorite_things: DataTypes.TEXT,
      why: DataTypes.TEXT,
      user_id: DataTypes.INTEGER,
      age: {
        type: DataTypes.INTEGER,
        validate: {
          isInt: {
            msg: "Age must be an integer"
          }
        }
      },
      location_id: DataTypes.INTEGER,
      gender: DataTypes.STRING,
      relationship_status: DataTypes.STRING,
      education: DataTypes.STRING,
      kids: DataTypes.INTEGER,
      height: {
        type: DataTypes.INTEGER,
        validate: {
          isInt: {
            msg: "Height must be an integer"
          }
        }
      },
      occupation: DataTypes.STRING
    },
    {
      classMethods: {
        associate: function(models) {
          // associations can be defined here
        }
      }
    }
  );
  return Profile;
};
