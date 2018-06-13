var mongoose = require("mongoose");

var cardSchema = new mongoose.Schema({
  image: String,
  desc : String,
  titre : String,
  coursLien : String
});

module.exports = mongoose.model("card", cardSchema);
