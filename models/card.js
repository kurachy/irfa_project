var mongoose = require("mongoose");

var cardSchema = new mongoose.Schema({
  image: String,
  desc : String,
  titre: String,
  cours: [
     {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Cour"
     }
  ]
});

module.exports = mongoose.model("Card", cardSchema);
