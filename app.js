var express = require("express"),
app = express(),
bodyParser = require("body-parser"),
mongoose = require("mongoose")

mongoose.connect("mongodb://localhost/irfa");
app.use(bodyParser.urlencoded({extended: true}));

app.use(express.static("public"));
app.set("view engine", "ejs");

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

app.get("/new", function(req, res){
  res.render("new.ejs");
});

app.listen(3000, function(){
  console.log("Server started");
});
