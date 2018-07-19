var mongoose = require("mongoose");

var courShema = new mongoose.Schema({
  title: String,
  content: String,
  progression: 0
});
module.exports = mongoose.model("Cour", courShema);
