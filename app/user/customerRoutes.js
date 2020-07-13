const router = require("express").Router();

const customerCtrl = require("./customerCtrl");

router.get("/reset", function (req, res) {
  try {
    customerCtrl.reset();
    console.log("Database reset : sucessesfull");
    res.send("Database reset : sucessesfull");
  } catch {
    console.log("reset database Error");
    res.send("reset database Error");
  }
});

module.exports = router;
