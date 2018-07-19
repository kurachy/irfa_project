var mongoose = require("mongoose");
var Card = require("./models/card");
var Cour = require("./models/cours")

var data = [
  {
    image: "https://udemy-images.udemy.com/course/240x135/874012_c7f2_3.jpg",
    desc: "I sincerely wish for you every possible joy life could bring. Let's do it again then, what the heck. With practice comes confidence. This is unplanned it really just happens. Maybe there's a happy little Evergreen that lives here. That's what makes life fun. That you can make these decisions. That you can create the world that you want. Only eight colors that you need. But we're not there yet, so we don't need to worry about it.",
    titre : "Drawing"
  },
  {
    image: "https://udemy-images.udemy.com/course/240x135/1035000_c1aa_2.jpg",
    desc: "That's a son of a gun of a cloud. I really believe that if you practice enough you could paint the 'Mona Lisa' with a two-inch brush. Any little thing can be your friend if you let it be. These little son of a guns hide in your brush and you just have to push them out. Trees cover up a multitude of sins. There are no mistakes. You can fix anything that happens.",
    titre : "Docker"
  },
  {
    image: "https://udemy-images.udemy.com/course/240x135/815816_7c01.jpg",
    desc: "Van Dyke Brown is a very nice brown, it's almost like a chocolate brown. That's crazy. If you've been in Alaska less than a year you're a Cheechako. We must be quiet, soft and gentle. It's beautiful - and we haven't even done anything to it yet. Trees get lonely too, so we'll give him a little friend. And right there you got an almighty cloud. Let's have a nice tree right here.",
    titre : "Android"
  }

]

function seedDB(){
  Card.remove({},function(err){
    if(err){
      console.log(err);
    }
    console.log("removed cards!");
    data.forEach(function(seed){
      Card.create(seed, function(err, card){
        if(err){
          console.log(err);
        } else {
          console.log("added a card");

          Cour.create(
            {
              title: "#**#*#*#*#*#*",
              content:"That's why I paint - because I can create the kind of world I want - and I can make this world as happy as I want it. No worries. No cares. Just float and wait for the wind to blow you around. We'll put all the little clouds in and let them dance around and have fun. Isn't that fantastic that you can create an almighty tree that fast? If you overwork it you become a cloud killer.",
              progression: 0
            }, function(err, cour){
              if(err){
                console.log(err);
              }else{

                card.cours.push(cour);

                card.save();
                console.log("Created new comment");
              }
            });
          }
        });
      });
    });
  }

  module.exports = seedDB;
