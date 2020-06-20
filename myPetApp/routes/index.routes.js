const express = require("express");
const router = express.Router();
const Place = require("../models/Place.model.js");

const User = require("../models/Place.model");

router.get("/signup", async (req, res) => res.render("auth/signup"));

router.get("/aboutus", (req, res) => {
  res.render("about");
});

router.get("/contact", (req, res) => {
  res.render("contact");
});

router.get("/", async (req, res) => {
  try {
    const allPlaces = await Place.find().lean();
    const user = req.session.currentUser;
    res.render("index", {
      places: allPlaces.map((place) => ({
        user,
        ...place
      })),
    });
  } catch (err) {
    console.error(err);
    next(err);
  }
});

router.get("/:placeId", (req, res) => {
  //const user = req.session.currentUser;
  Place.findById(req.params.placeId)
    .then(placeDetails => {
      console.log("Pasando places", placeDetails)
      res.render('placeDetails', {
        place: placeDetails,
        user: req.session.currentUser
      })
    })
    .catch(error => {
      console.log("ERROR", error)
    })
})


module.exports = router;