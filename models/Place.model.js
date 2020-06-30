const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const placeSchema = new Schema({
  type: String,
  name: String,
  imgName: String,
  imgPath: String,
  location: String,
  description: String,
  dimension: String,
  persons: Number
});

const Place = mongoose.model("Place", placeSchema);
module.exports = Place;