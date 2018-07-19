var express = require("express"),
app = express(),
bodyParser = require("body-parser"),
passport = require("passport"),
User = require("./models/user.js"),
LocalStrategy = require("passport-local"),
expressSanitizer = require("express-sanitizer"),
passportLocalMongoose = require("passport-local-mongoose"),
Card = require("./models/card.js"),
Cour = require("./models/cours.js"),
seedDB = require("./seeds"),
mongoose = require("mongoose"),
methodOverride = require("method-override");

seedDB();
mongoose.connect("mongodb://localhost/irfa");
app.use(express.static("public"));
app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({extended: true}));
app.use(require("express-session")({
  secret: "Steel for Men, Silver for Monster and Gold for The Witcher",
  resave: false,
  saveUninitialized: false
}));
app.use(expressSanitizer());
app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req, res, next){
  res.locals.currentUser = req.user;
  next();
});
app.use(methodOverride("_method"));


app.post("/", function(req, res){
  var image = req.body.image;
  var desc = req.body.desc;
  var titre = req.body.titre;
  // var CourLien = req.body.CourLien;
  var newCard = {image: image, desc: desc, titre: titre}
  Card.create(newCard, function(err, newlyCreated){
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
      res.redirect("/");
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
  successRedirect: "/",
  failureRedirect: "/login"
}) ,function(req, res){

});

app.get("/logout", function(req, res){
  req.logout();
  res.redirect("/");
});

app.get("/", function(req, res){
  Card.find({}, function(err, allCards){
    if(err){
      console.log(err);
    }else{
      res.render("cards",{card:allCards});
    }

  });

});

app.get("/:id",function(req, res){
  Card.findById(req.params.id).populate("cours").exec(function(err, foundCard){

    if(err){
      res.redirect("/");
    }else {
      console.log(foundCard);
      res.render("show", {card: foundCard});
    }
});
})

app.get("/:id/edit", function(req, res){
  Card.findById(req.params.id, function(err, card){
    if(err){
      res.redirect("/");
    } else {
      res.render("edit", {card:  card});
    }
  });

});

app.get("/:id/cour", isLoggedIn, function(req, res){
  Cour.findById(req.params.id, function(err, Cour){
    if(err){
      res.redirect("/:id");
    }else{
      res.render("cours" ,{cour: Cour});
    }
  });
});


// app.put("/:id", function(req, res){
//    Card.findByIdAndUpdate(req.params.card_id, req.body.card, function(err, card){
//        if(err){
//            console.log(err);
//        } else {
//          var showUrl = "/" + card._id;
//          res.redirect(showUrl);
//        }
//    });
// });

app.put("/:id", function(req,res)  {


  Card.findByIdAndUpdate(req.params.card_id,{$set:req.body.card}, function(err, card){
    if(err){
      console.log(err);
    }
    var showUrl = "/" + card._id;
    res.redirect(showUrl);
  });
});

app.delete("/:id", function(req, res){
  Card.findById(req.params.id, function(err, card){
    if(err){
      console.log(err);
    } else {
      card.remove();
      res.redirect("/");
    }
  });
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
