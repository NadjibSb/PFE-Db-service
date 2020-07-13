const router = require("express").Router();

const customerRoutes = require("../app/user/customerRoutes");

router.get("/", function (req, res) {
  res.send("server is up");
});

router.use("/customer", customerRoutes);

module.exports = router;
