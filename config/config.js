let user = require("./stupidworkaround");

module.exports = {
  development: {
    username: user.username,
    password: user.password,
    database: "okodin_development",
    host: "127.0.0.1",
    dialect: "postgres"
  },
  test: {
    username: user.name,
    password: user.password,
    database: "okodin_test",
    host: "127.0.0.1",
    dialect: "postgres"
  },
  production: {
    username: "root",
    password: null,
    database: "okodin_production",
    host: "127.0.0.1",
    dialect: "postgres"
  }
};
