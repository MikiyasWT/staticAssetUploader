const express = require("express");
const router = express.Router();
//const homeController = require("../controllers/home");
const uploadController = require("../controllers/upload");
const upload = require("../middleware/upload");

let routes = (app) => {
  //router.get("/", homeController.getHome);
  router.get('/',uploadController.getListFiles);
  router.post("/upload",  uploadController.uploadFiles);
  router.delete("/:name", uploadController.removeFile);
  app.use("/api", router);
};

module.exports = routes;