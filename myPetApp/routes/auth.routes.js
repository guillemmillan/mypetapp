const {
  Router
} = require("express");
const bcryptjs = require("bcryptjs");
const User = require("../models/User.model");
const Place = require("../models/Place.model");
const mongoose = require("mongoose");
const router = Router();
const Pet = require("../models/Pet.model");

router.get("/signup", async (req, res) => res.render("auth/signup"));

router.get("/start", async (req, res) => {
  const users = await User.find();
  console.log(users);
  res.render("star");
});

router.post("/signup", async (req, res, next) => {
  const {
    username,
    email,
    password
  } = req.body;
  const hasEmptyRequiredField = !username || !email || !password;
  if (hasEmptyRequiredField) {
    return res.render("auth/signup", {
      errorMessage: "All fields are mandatory. Please provide your username, email and password.",
    });
  }
  const passwordRegex = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/;
  const hasIncorrectPassCriteria = !passwordRegex.test(password);
  if (hasIncorrectPassCriteria) {
    //console.log("HA PASADO LA CLAVE")
    return res.status(400).render("auth/signup", {
      errorMessage: "Password needs to have at least 6 chars and must contain at least one number, one lowercase and one uppercase letter.",
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
    console.log(error);
    const hasValidationError = error instanceof mongoose.Error.ValidationError;
    const hasDuplicateUniqueField = error.code === 11000;
    if (hasValidationError) {
      return res.status(400).render("auth/signup", {
        errorMessage: error.message,
      });
    }
    if (hasDuplicateUniqueField) {
      return res.status(400).render("auth/signup", {
        errorMessage: "Username and email need to be unique. Either username or email is already used.",
      });
    }
    next(error);
  }
});

//ruta de login
router.get("/logout", function (req, res, next) {
  if (req.session) {
    // delete session object
    req.session.destroy(function (err) {
      if (err) {
        return next(err);
      } else {
        return res.redirect("/");
      }
    });
  }
});

router.get("/login", (req, res) => res.render("auth/login"));

// .post() login route ==> to process form data
router.post("/login", async (req, res, next) => {
  try {
    const {
      email,
      password
    } = req.body;
    const hasEmptyRequiredField = !email || !password;
    if (hasEmptyRequiredField) {
      return res.render("auth/login", {
        errorMessage: "Please enter both, email and password to login.",
      });
    }
    const currentUser = await User.findOne({
      email
    });
    if (!currentUser) {
      return res.render("auth/login", {
        errorMessage: "Email is not registered. Try with other email.",
      });
    }
    const hasValidPassword = await bcryptjs.compare(
      password,
      currentUser.password
    );
    if (hasValidPassword) {
      req.session.currentUser = currentUser;
      return res.redirect("/userProfile");
    }

    return res.render("auth/login", {
      errorMessage: "Incorrect password.",
    });
  } catch (err) {
    console.error(err);
    next(err);
  }
});

router.get("/userProfile", (req, res) => {
  res.render("users/user-profile", {
    userInSession: req.session.currentUser,
  });
});










module.exports = router;