var express = require("express"),
app = express(),
bodyParser = require("body-parser"),
passport = require("passport"),
User = require("./models/user.js"),
LocalStrategy = require("passport-local"),
passportLocalMongoose = require("passport-local-mongoose"),
mongoose = require("mongoose")

mongoose.connect("mongodb://localhost/irfa");
app.use(express.static("public"));
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));
app.use(require("express-session")({
  secret: "",
  resave: false,
  saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


var irfaSchema = new mongoose.Schema({
  image: String,
  desc : String,
  titre : String,
  coursLien : String
});

var Irfa = mongoose.model("card", irfaSchema);


app.get("/", function(req, res){
  Irfa.find({}, function(err, allCards){
    if(err){
      console.log(err);
    }else{
      res.render("cards",{card:allCards});
    }

  });

});

app.post("/", function(req, res){
  var image = req.body.image;
  var desc = req.body.desc;
  var titre = req.body.titre;
  var coursLien = req.body.coursLien;
  var newCard = {image: image, desc: desc, titre: titre, coursLien: coursLien}
  Irfa.create(newCard, function(err, newlyCreated){
    if(err){
      console.log(err);
    }else{
      res.redirect("/");
    }
  })
});

app.get("/secret",isLoggedIn, function(req, res){
   res.render("secret");
});

app.get("/register", function(req, res){
  res.render("register");
});

app.post("/register", function(req, res){
  User.register(new User({username: req.body.username}), req.body.password, function(err, user){
    if(err){
      console.log(err);
      return res.render('register');
    }
    passport.authenticate("local")(req, res, function(){
      res.redirect("/secret");
    });
  });
});



app.get("/new", function(req, res){
  res.render("new.ejs");
});

app.get("/login", function(req, res){
  res.render("login");
});





app.post("/login", passport.authenticate("local", {
  successRedirect: "/secret",
  failureRedirect: "/login"
}) ,function(req, res){

});

app.get("/logout", function(req, res){
  req.logout();
  res.redirect("/");
});

function isLoggedIn(req, res, next){
  if(req.isAuthenticated()){
    return next();
  }
  res.redirect("/login")
}

app.listen(3000, function(){
  console.log("Server started");
});
