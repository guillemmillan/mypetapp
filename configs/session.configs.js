const session = require("express-session");
// vamos a utilizar este middleware en app.js,por lo tanto lo tenemos que exportar
module.exports = (app) => {
  app.use(
    session({
      secret: process.env.SESS_SECRET,
      resave: false,
      saveUninitialized: true,
      cookie: { maxAge: 6000000 }, // 60 * 1000 ms === 1 min
    })
  );
};
