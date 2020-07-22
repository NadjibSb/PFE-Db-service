const router = require("express").Router();
const bodyParser = require("body-parser");
const customerCtrl = require("./customerCtrl");

const urlEncodedParser = bodyParser.urlencoded({ extended: false });

router.get("/reset/:fileName", async function (req, res) {
  try {
    await customerCtrl.reset(req.params.fileName);
    console.log("Database reset : sucessesfull");
    res.json({ reset: true });
  } catch (err) {
    console.log("reset database Error");
    console.log(err);
    res.json({ reset: false, error: err });
  }
});

router.get("/allNums", async function (req, res) {
  try {
    let list = await customerCtrl.getAllMobileNum();
    console.log("get all customers nums => sucessesfull");
    res.json(list);
  } catch (err) {
    console.log("get all customers nums => error");
    console.log(err);
    res.json({ error: true, body: err });
  }
});

router.get("/count", async function (req, res) {
  try {
    let size = await customerCtrl.getSize();
    console.log("get all customers size => sucessesfull");
    res.json(size);
  } catch (err) {
    console.log("get all customers size => error");
    console.log(err);
    res.json({ error: true, body: err });
  }
});

router.get("/all/:page", async function (req, res) {
  try {
    let list = await customerCtrl.getAll(req.params.page);
    console.log(
      "get all customers=> page " + req.params.page + " => sucessesfull"
    );
    res.json(list);
  } catch (err) {
    console.log("get all customers=> page " + req.params.page + " => error");
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
    let customer = await customerCtrl.updateOne(
      req.params.mobile_num,
      req.body
    );
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

router.post("/update", async function (req, res) {
  try {
    let customerList = await customerCtrl.updateMult(req.body);
    Promise.all(customerList)
      .then((results) => {
        console.log("updated cutomers : " + results.length);
        res.json(results);
      })
      .catch((e) => {
        throw e;
      });
  } catch (err) {
    console.log("update customer : " + req.params.mobile_num + " => error");
    console.log(err);
    res.json({ error: true, body: err });
  }
});

module.exports = router;
