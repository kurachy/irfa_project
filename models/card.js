var mongoose = require("mongoose");

var cardSchema = new mongoose.Schema({
  image: String,
  desc : String,
  titre: String,
  content: String,
  quiz:[
    {
      questions:String,
      reponce:[String
      ]
    }
  ]
  // cours: [
  //    {
  //       type: mongoose.Schema.Types.ObjectId,
  //       ref: "Cour"
  //    }
  // ]

});

module.exports = mongoose.model("Card", cardSchema);
