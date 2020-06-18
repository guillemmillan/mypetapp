const express = require('express');
const router  = express.Router();
const bcrypt = require('bcryptjs')

/* GET home page */
router.get('/', (req, res, next) => {
  res.render('index');
});

router.get('/places', (req, res)=> {
  res.render('places/allplaces');
});

router.get('/aboutus', (req, res)=> {
  res.render('about');
});

router.get('/contact', (req, res)=> {
  res.render('contact');
});

module.exports = router;
