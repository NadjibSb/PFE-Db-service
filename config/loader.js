const mongoose = require("mongoose");
const express = require("express");
const bodyParser = require("body-parser");
const config = require("./index");

module.exports = function (app) {
  app.use(express.static(__dirname + "/../assets"));
  app.use(bodyParser.urlencoded({ extended: false }));

  mongoose
    .connect(process.env.MONGODB_URI || config.DB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(function (succ) {
      console.log("success to connect to DB");
    })
    .catch(function (err) {
      console.log("error to connect to DB");
      console.log(err);
    });
};
