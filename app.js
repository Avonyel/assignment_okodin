const express = require("express");
const app = express();

const bodyParser = require("body-parser");
const cookieSession = require("cookie-session");
const exphbs = require("express-handlebars");
const index = require("./routers/index");

//bodyParser
app.use(bodyParser.urlencoded({ extended: true }));

//Sessions
app.use(
  cookieSession({
    name: "session???",
    //keys: ["I LOVE CATS"],
    secret: "I LOVE CATS"
  })
);

//views
const hbs = exphbs.create({
  partialsDir: "views/",
  defaultLayout: "main"
});
app.engine("handlebars", hbs.engine);
app.set("view engine", "handlebars");

//signup route
app.use("/", index);

//run the server
var port = process.env.PORT || process.argv[2] || 3000;
var host = "localhost";

var args;
process.env.NODE_ENV === "production" ? (args = [port]) : (args = [port, host]);

args.push(() => {
  console.log(`Listening: http://${host}:${port}`);
});

app.listen.apply(app, args);
