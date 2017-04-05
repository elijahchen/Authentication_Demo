const express               = require("express"),
    mongoose                = require("mongoose"),
    passport                = require("passport"),
    bodyParser              = require("body-parser"),
    LocalStrategy           = require("passport-local"),
    passportLocalMongose    = require("passport-local-mongoose"),
    User                    = require("./models/user");

mongoose.connect("mongodb://user:testapp@ds129050.mlab.com:29050/ecdata");

const app = express();
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));
app.use(require("express-session")({
    secret: "Pikachu",
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// ================
//      ROUTES
// ================

app.get("/", function (req, res) {
    res.render("home");
});

app.get("/secret", function (req, res) {
    res.render("secret");
});

// == User Auth Routes ==
app.get("/register", function (req, res) {
    res.render("register");
});
app.post("/register", function (req, res) {
    User.register(new User({username: req.body.username}), req.body.password, function (err, user) {
        if(err){
            console.log(err);
            return res.render("register");
        }
        passport.authenticate("local")(req, res, function () {
           res.redirect("/secret");
        });
    });
});

app.listen(3000, process.env.port, function () {
    console.log("Server Started!");
});