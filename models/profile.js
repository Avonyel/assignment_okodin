'use strict';
module.exports = function(sequelize, DataTypes) {
  var Profile = sequelize.define('Profile', {
    about: DataTypes.TEXT,
    talents: DataTypes.TEXT,
    favorite_things: DataTypes.TEXT,
    why: DataTypes.TEXT,
    user_id: DataTypes.INTEGER,
    age: DataTypes.INTEGER,
    location_id: DataTypes.INTEGER,
    gender: DataTypes.STRING,
    relationship_status: DataTypes.STRING,
    education: DataTypes.STRING,
    kids: DataTypes.INTEGER,
    height: DataTypes.INTEGER,
    occupation: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return Profile;
};