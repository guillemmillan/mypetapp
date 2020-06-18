/*const { Router } = require('express');
const router = new Router();
const bcryptjs = require('bcryptjs');
const saltRounds = 10;
const User = require('../models/User.model');
const mongoose = require('mongoose');

// .get() route ==> to display the signup form to users
router.get('/signup', (req, res) => res.render('auth/signup'));

router.post('/signup', (req, res, next) => {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
        res.render('auth/signup', { errorMessage: 'All fields are mandatory. Please provide your username, email and password.' });
        return;
      }
      //Password validation
//       const regex = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/;
//   if (!regex.test(password)) {
//     res
//       .status(500)
//       .render('auth/signup', { errorMessage: 'Password needs to have at least 6 chars and must contain at least one number, one lowercase and one uppercase letter.' });
//     return;
//   }

  bcryptjs
    .genSalt(saltRounds)
    .then(salt => bcryptjs.hash(password, salt))
    .then(hashedPassword => {
      return User.create({
        // username: username
        username,
        email,
        // password => this is the key from the User model
        //     ^
        //     |            |--> this is placeholder (how we named returning value from the previous method (.hash()))
        password: hashedPassword
      });
    })

    .then(userFromDB => {
      console.log('Newly created user is: ', userFromDB);
      res.render('/');
    })
    .catch(error => {
        console.log("Comprobar si funiciona")
      if (error instanceof mongoose.Error.ValidationError) {
        res.status(500).render('auth/signup', { errorMessage: error.message });
      } else if (error.code === 11000) {
        res.status(500).render('auth/signup', {
          errorMessage: 'Username and email need to be unique. Either username or email is already used.'
        });
      } else {
        next(error);
      }
    }); // close .catch()
});
module.exports = router;*/

const { Router } = require("express");
const router = new Router();
const bcryptjs = require("bcryptjs");

const User = require("../models/User.model");
const mongoose = require("mongoose");
router.get("/signup", async (req, res) => res.render("auth/signup"));

router.get("/start", async (req, res) => {
const users = await User.find()
console.log(users)
 res.render("star")
});

router.post("/signup", async (req, res, next) => {
  const { username, email, password } = req.body;
  const hasEmptyRequiredField = !username || !email || !password;
  if (hasEmptyRequiredField) {
    return res.render("auth/signup",  {
     errorMessage:
        "All fields are mandatory. Please provide your username, email and password.",
    });
  }
  const passwordRegex = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/;
  const hasIncorrectPassCriteria = !passwordRegex.test(password);
  if (hasIncorrectPassCriteria) {
    //console.log("HA PASADO LA CLAVE")
    return res.status(400).render("auth/signup", {
      errorMessage:
        "Password needs to have at least 6 chars and must contain at least one number, one lowercase and one uppercase letter.",
    });
  }
  try {
    const saltRounds = 10;
    const salt = await bcryptjs.genSalt(saltRounds);
    const hashedPasword = await bcryptjs.hash(password, salt);
    const newUser = await User.create({
      username,
      email,
      password: hashedPasword,
    });

    if (newUser) {
      //console.log("USUSARIO CREADO")
      return res.redirect("/");
    }
  } catch (error) {
    console.log(error)
    const hasValidationError = error instanceof mongoose.Error.ValidationError;
    const hasDuplicateUniqueField = error.code === 11000;
    if (hasValidationError) {
      return res
        .status(400)
        .render("auth/signup", { errorMessage: error.message });
    }
    if (hasDuplicateUniqueField) {
      return res.status(400).render("auth/signup", {
        errorMessage:
          "Username and email need to be unique. Either username or email is already used.",
      });
    }
    next(error);
  }
});


//ruta de login


router.get('/login', (req, res) => res.render('auth/login'));

// .post() login route ==> to process form data
router.post('/login', (req, res, next) => {
  const { email, password } = req.body;
  if (email === '' || password === '') {
    res.render('auth/login', {
      errorMessage: 'Please enter both, email and password to login.'
    });
    return;
  }
  User.findOne({ email })
    .then(user => {
      if (!user) {
        res.render('auth/login', { errorMessage: 'Email is not registered. Try with other email.' });
        return;
      } else if (bcryptjs.compareSync(password, user.password)) {
        /*res.render('user-profile', { user });*/
        req.session.currentUser = user;
        res.redirect('userProfile')
      } else {
        res.render('auth/login', { errorMessage: 'Incorrect password.' });
      }
    })
    .catch(error => next(error));
});
router.post('/logout', (req, res) => {
  req.session.destroy();
  res.redirect('/');
});
router.get("/logout", (req, res)=> res.redirect("/") )
router.get("/", (req,res) => res.render("index"))


router.get('/userProfile', (req, res) => {
  res.render('users/user-profile', { userInSession: req.session.currentUser });
});
module.exports = router;
