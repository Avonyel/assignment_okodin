"use strict";
module.exports = {
  up: function(queryInterface, Sequelize) {
    return queryInterface.createTable("Users", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      username: {
        type: Sequelize.STRING
        allowNull: false,
        unique: true
      },
      email: {
        type: Sequelize.STRING
        allowNull: false,
        unique: true
      },
      profile_id: {
        type: Sequelize.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn("NOW")
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn("NOW")
      }
    }).then(() => {
      return queryInterface.addIndex('Users', ['email'], {unique: true});
    }).then(() => {
      return queryInterface.addIndex('Users', ['username'], {unique: true});
    });
  },
  down: function(queryInterface, Sequelize) {
    return queryInterface.dropTable("Users");
  }
};
