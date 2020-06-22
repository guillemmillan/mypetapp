const express = require("express");
const router = express.Router();
const Place = require("../models/Place.model.js");
const User = require("../models/Place.model");
const Pet = require("../models/Pet.model");



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

// Pets route

router.get('/pets', async (req, res) => {
  try {
    const pets = await Pet.findById(req.params.petsId)
    res.render('users/pets', {
      petsId: pets,
      user: req.session.currentUser
    })
  } catch (error) {
    console.log('ERROR AL HACER LA RUTA', error)
  }
})


//Place details

router.get('/:placeId', async (req, res) => {
  try {
    const placeDetails = await Place.findById(req.params.placeId)
    res.render('placeDetails', {
      place: placeDetails,
      user: req.session.currentUser
    })
  } catch (error) {
    console.log('ERROR AL HACER LA RUTA', error)
  }
})




//Place details alternative with promises

// router.get("/:placeId", (req, res) => {
//   Place.findById(req.params.placeId)
//     .then(placeDetails => {
//       console.log("Pasando places", placeDetails)
//       res.render("placeDetails", {
//         userInSession: req.session.currentUser,
//       });
//     });

// })



module.exports = router;