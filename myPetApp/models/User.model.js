const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const pwdRegex = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/;

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  username: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    match: [
      pwdRegex,
      "Password needs to have at least 6 chars and must contain at least one number, one lowercase and one uppercase letter."
    ],
    required: true,
  },
  image: {
    type: String,
    default: '../images/user-default.png'
  },
  location: String,
  parques: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Place"
  }],
  pets:[{
    type: mongoose.SchemaTypes.ObjectId,
    ref:"Pets"
  }]
});

const User = mongoose.model("User", userSchema);
module.exports = User;