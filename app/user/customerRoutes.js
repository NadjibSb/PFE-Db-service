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

router.get("/all", async function (req, res) {
  try {
    let list = await customerCtrl.getAllMobileNum();
    console.log("get all customers => sucessesfull");
    res.json(list);
  } catch {
    console.log("get all customers  => error");
    res.send("get all customers  => error");
  }
});

router.get("/:mobile_num", async function (req, res) {
  try {
    let customer = await customerCtrl.getCustomer(req.params.mobile_num);
    console.log("get customer : " + req.params.mobile_num + " => sucessesfull");
    res.json(customer);
  } catch {
    console.log("get customer : " + req.params.mobile_num + " => error");
    res.send("get customer : " + req.params.mobile_num + " => error");
  }
});

module.exports = router;
