const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs')
const Place = require('../models/Place.model.js')
//const authRouter = require('./auth.routes');
//Registro de partials

//hbs.registerPartials(__dirname + '/partials/places')

//modelo de parques

const User = require("../models/Place.model");
const mongoose = require("mongoose");

router.get("/signup", async (req, res) => res.render("auth/signup"));
/* GET home page */
router.get('/', (req, res, next) => {
  //console.log(Place.find())
  Place.find()
    .then(allPlaces => {
      res.render('index', {
        places: allPlaces
      });
    })

});

// router.get('/places', (req, res) => {
//   res.render('places/allplaces');
// });

router.get('/aboutus', (req, res) => {
  res.render('about');
});

router.get('/contact', (req, res) => {
  res.render('contact');
});

module.exports = router;