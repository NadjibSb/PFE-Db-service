const mongoose = require("mongoose");
const express = require("express");
const bodyParser = require("body-parser");
const config = require("./index");

module.exports = function (app) {
  app.use(express.static(__dirname + "/../assets"));
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json());

  mongoose
    .connect(config.DB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
    })
    .then(function (succ) {
      console.log("success to connect to DB");
    })
    .catch(function (err) {
      console.log("error to connect to DB");
      console.log(err);
    });
};
