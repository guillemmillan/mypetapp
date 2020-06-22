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

// router.get('/:placeId', async (req, res) => {
//   try {
//     const placeDetails = await Place.findById(req.params.placeId)
//     res.render('placeDetails', {
//       place: placeDetails,
//       user: req.session.currentUser
//     })
//   } catch (error) {
//     console.log('ERROR AL HACER LA RUTA', error)
//   }
// })


// router.post("/favorites/:placeId", async (req, res) => {
//   const {
//     _id: userId
//   } = req.session.currentUser
//   const {
//     placeId
//   } = req.params
//   const user = await User.findById({
//     _id: userId
//   }).lean()
//   const parque = user.parques.find((parqueId) => {
//     console.log("ID", parqueId, placeId)
//     return parqueId == placeId
//   })
//   console.log("Parque", parque)

//   if (!parque) {
//     const agregarParque = await User.findByIdAndUpdate({
//       _id: userId
//     }, {
//       $push: {
//         parques: placeId
//       }
//     }, {
//       new: true
//     }) // act del user.parque para que se muestre en la db
//     console.log('SE HA AGREGADO UN PARQUE A FAVORITO', agregarParque.parques)
//   } else {
//     const quitarParque = await User.findByIdAndUpdate({
//       _id: userId
//     }, {
//       $pull: {
//         parques: placeId
//       }
//     }, {
//       new: true
//     })
//     console.log('Parque quitado con éxtio GUILLLEM!', quitarParque)
//   }
//   res.redirect("/favorites")
// })



// router.get("/:placeId", (req, res) => {
//   //const user = req.session.currentUser;
//   Place.findById(req.params.placeId)
//     .then(placeDetails => {
//       console.log("Pasando places", placeDetails)
//       res.render('placeDetails', {
//         place: placeDetails,
//         user: req.session.currentUser
//       })
//     })
//     .catch(error => {
//       console.log("ERROR", error)
//     })
// })


module.exports = router;