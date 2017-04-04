const express               = require("express"),
    mongoose                = require("mongoose"),
    passport                = require("passport"),
    bodyParser              = require("body-parser"),
    LocalStrategy           = require("passport-local"),
    passportLocalMongose    = require("passport-local-mongoose");


const app = express();
mongoose.connect("mongodb://user:testapp@ds129050.mlab.com:29050/ecdata");

app.set("view engine", "ejs");

app.get("/", function (req, res) {
    res.render("home");
});

app.get("/secret", function (req, res) {
    res.render("secret");
});

app.listen(3000, process.env.port, function () {
    console.log("Server Started!");
});