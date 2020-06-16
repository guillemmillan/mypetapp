const { Router } = require("express");
const router = new Router();
const bcryptjs = require("bcryptjs");

const User = require("../models/User.model");
const mongoose = require("mongoose");

router.get("/signup", async (req, res) => res.render("auth/signup"));

router.post("/signup", async (req, res, next) => {
  const { username, email, password } = req.body;
  const hasEmptyRequiredField = !username || !email || !password;
  if (hasEmptyRequiredField) {
    return res.render("auth/signup", {
      errorMessage:
        "All fields are mandatory. Please provide your username, email and password.",
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
      return res.redirect("/");
    }
  } catch (error) {
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
module.exports = router;
