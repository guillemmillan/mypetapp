const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const petSchema = new Schema({
  name: String,
  imgName: String,
  imgPath: String,

  /*image:{
      type: String,
    default:'../public/images/pet-default.png'
    /*    default:'https://raw.githubusercontent.com/guillemmillan/mypetapp/master/myPetApp/public/images/pet-default.png  
  }*/ 
    age: Number,
    breed: String
});

const Pet = mongoose.model("Pet", petSchema);
module.exports = Pet;