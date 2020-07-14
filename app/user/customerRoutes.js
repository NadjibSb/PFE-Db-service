const router = require("express").Router();
const bodyParser = require("body-parser");
const customerCtrl = require("./customerCtrl");

const urlEncodedParser = bodyParser.urlencoded({ extended: false });

router.get("/reset", function (req, res) {
  try {
    customerCtrl.reset();
    console.log("Database reset : sucessesfull");
    res.json({ reset: true });
  } catch (err) {
    console.log("reset database Error");
    console.log(err);
    res.json({ reset: false, error: err });
  }
});

router.get("/all", async function (req, res) {
  try {
    let list = await customerCtrl.getAllMobileNum();
    console.log("get all customers => sucessesfull");
    res.json(list);
  } catch (err) {
    console.log("get all customers  => error");
    console.log(err);
    res.json({ error: true, body: err });
  }
});

router.get("/get/:mobile_num", async function (req, res) {
  try {
    let customer = await customerCtrl.get(req.params.mobile_num);
    console.log("get customer : " + req.params.mobile_num + " => sucessesfull");
    res.json(customer);
  } catch (err) {
    console.log("get customer : " + req.params.mobile_num + " => error");
    console.log(err);
    res.json({ error: true, body: err });
  }
});

router.post("/update/:mobile_num", async function (req, res) {
  try {
    let customer = await customerCtrl.update(req.params.mobile_num, req.body);
    console.log(
      "update customer : " + req.params.mobile_num + " => sucessesfull"
    );
    console.log(req.body);
    res.json(customer);
  } catch (err) {
    console.log("update customer : " + req.params.mobile_num + " => error");
    console.log(err);
    res.json({ error: true, body: err });
  }
});

module.exports = router;
