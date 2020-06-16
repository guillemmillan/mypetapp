const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const placeSchema = new Schema({
  type: String,
  name: String,
  location: String,
  dimension: String,
  image:{
      type: String,
    default:'../public/images/location.default.png'
    /*    default:'https://raw.githubusercontent.com/guillemmillan/mypetapp/master/myPetApp/public/images/location-deafult.png*/
    },
    persons: Number
});

const Place = mongoose.model("Place", placeSchema);
module.exports = Place;
