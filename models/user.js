"use strict";
module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define("User", {
    username: {
      type: DataTypes.STRING,

      validate: {
        notEmpty: {
          msg: "Username cannot be empty"
        }
      }
    },
    email: {
      type: DataTypes.STRING,

      validate: {
        notEmpty: {
          msg: "Username cannot be empty"
        },
        isEmail: {
          msg: "Invalid email."
        }
      }
    },

    profile_id: DataTypes.INTEGER
  });
  return User;
};
