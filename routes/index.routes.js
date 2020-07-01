const express = require("express");
const router = express.Router();
const Place = require("../models/Place.model.js");
const User = require("../models/User.model");
const Pet = require("../models/Pet.model");
const WithAuth = require("../utils/utils");

const uploadCloud = require("../configs/cloudinary.js");

router.get("/signup", async (req, res) => res.render("auth/signup"));

router.get("/aboutus", (req, res) => {
  res.render("about");
});

router.get("/contact", (req, res) => {
  res.render("contact");
});

//Favourite route

router.get("/favorites", async (req, res) => {
  try {
    if (req.session.currentUser == undefined) {
      res.redirect("/login");
    } else {
      const {
        _id: userId
      } = req.session.currentUser;
      console.log(req.session.currentUser);

      const user = await User.findById({
          _id: userId,
        })
        .populate("parques")
        .lean();
      console.log(user);
      res.render("users/favorites", user);
    }
  } catch (error) {
    console.log(error);
  }
});

router.post("/favorites/:placeId", async (req, res) => {
  const {
    _id: userId
  } = req.session.currentUser;
  const {
    placeId
  } = req.params;
  const user = await User.findById({
    _id: userId,
  }).lean();
  const parque = user.parques.find((parqueId) => {
    console.log("ID", parqueId, placeId);
    return parqueId == placeId;
  });
  console.log("Parque", parque);

  if (!parque) {
    const agregarParque = await User.findByIdAndUpdate({
      _id: userId,
    }, {
      $push: {
        parques: placeId,
      },
    }, {
      new: true,
    }); // act del user.parque para que se muestre en la db
    console.log("SE HA AGREGADO UN PARQUE A FAVORITO", agregarParque.parques);
  } else {
    const quitarParque = await User.findByIdAndUpdate({
      _id: userId,
    }, {
      $pull: {
        parques: placeId,
      },
    }, {
      new: true,
    });
    console.log("Parque quitado con éxtio GUILLLEM!", quitarParque);
  }
  res.redirect("/");
});

// Delete pet

router.get("/pets/delete/:petId", (req, res) => {
  const {
    _id: userId
  } = req.session.currentUser;
  Pet.findByIdAndRemove(req.params.petId)
    .then((pet) => {
      User.findByIdAndUpdate({
          _id: userId,
        }, {
          $pull: {
            pets: req.params.petId,
          },
        }, {
          new: true,
        })
        .then(() => res.redirect("/pets"))
        .catch((err) => console.log("error de eliminación de mascostas", err));
    })
    .catch((error) => {
      console.log(error);
    });
});

// Pets route

router.get("/pets", WithAuth, async (req, res) => {
  try {
    const user = await User.findById(req.session.currentUser._id)
      .populate("pets")
      .lean();
    console.log("USUARIO", user);
    res.render("users/pets", user);
  } catch (error) {
    console.log(error);
  }
});
router.get("/pets/:petId", async (req, res) => {
  try {
    const petDetails = await Pet.findById(req.params.petId);
    res.render("petDetails", {
      pet: petDetails,
      user: req.session.currentUser,
    });
  } catch (error) {
    console.log("ERROR AL HACER LA RUTA", error);
  }
});

router.get("/pet-add", (req, res) => {
  res.render("users/pet-add", {
    user: req.session.currentUser,
  });
});

//RUTA POST PETS
router.post("/pet-add", uploadCloud.single("image"), async (req, res) => {
  const {
    _id: userId
  } = req.session.currentUser;
  const {
    file: {
      path,
      originalname
    } = {}
  } = req;
  const {
    name,
    age,
    breed
  } = req.body;
  const newPet = await Pet.create({
    name,
    age,
    breed,
    imgPath: path,
    imgName: originalname,
  });
  console.log(newPet);
  const updateUser = await User.findByIdAndUpdate({
    _id: userId,
  }, {
    $push: {
      pets: newPet._id,
    },
  }, {
    new: true,
  });
  console.log(updateUser.pets);
  res.redirect("/pets");
});


//edit user profile

router.get("/userProfile/edit", async (req, res) => {
  try {
    const {
      _id: userId
    } = req.session.currentUser;

    const user = await User.findById({
      _id: userId,
    });
    //console.log('ESTE ES EL USER', user)

    res.render("users/edit", {
      user,
    });
  } catch (error) {
    console.log(error);
  }
});

router.post("/userProfile/edit", async (req, res, next) => {
  try {
    const {
      _id: userId
    } = req.session.currentUser;

    const {
      username,
      email
    } = req.body;

    const updateUser = await User.findByIdAndUpdate({
      username,
      email,
      // password: hashedPasword,
    });
    res.redirect("/userProfile", {
      updateUser,
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
});


//Place details

router.get("/places/:placeId", async (req, res) => {
  try {
    const placeDetails = await Place.findById(req.params.placeId);
    res.render("placeDetails", {
      place: placeDetails,
      user: req.session.currentUser,
    });
  } catch (error) {
    console.log("ERROR AL HACER LA RUTA", error);
  }
});

// Add places
router.get("/placeAdd", (req, res) => {
  res.render("users/place-add");
});

router.post("/placeAdd", uploadCloud.single("image"), async (req, res) => {
  const {
    file: {
      path,
      originalname
    } = {}
  } = req;
  const {
    name,
    location,
    description
  } = req.body;
  const newPlace = await Place.create({
    name,
    location,
    description,
    imgPath: path,
    imgName: originalname,
  });
  console.log(newPlace);
  res.redirect("/");
});


// Index

router.get("/", async (req, res) => {
  try {
    const allPlaces = await Place.find().lean();
    //const user = req.session.currentUser;
    const {
      currentUser: {
        _id
      } = {}
    } = req.session;
    //Buscar Usuario
    const [user] = await User.find({
      _id,
    });
    const {
      parques = []
    } = user || {};
    //Favoritos del user
    const isFavorite = (placeId) => parques.includes(placeId);
    const places = allPlaces.map((place) => ({
      ...place,
      user,
      favorite: isFavorite(place._id),
    }));

    // console.log('ÚSUSARIO', user)
    // console.log('PLACES', places)

    res.render("index", {
      places,
    });
  } catch (err) {
    console.error(err);
    next(err);
  }
});



module.exports = router;