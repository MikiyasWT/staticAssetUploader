const express = require("express");
const app = express();
const db = require("./models");
const initRoutes = require("./routes/file");

global.__basedir = __dirname;

app.use(express.urlencoded({ extended: true }));
initRoutes(app);

//db.sequelize.sync();
db.sequelize.sync({ force: true }).then(() => {
  console.log("Drop and re-sync db.");
});

db.sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

let port = 8000;
app.listen(port, () => {
  console.log(`Running at localhost:${port}`);
});



