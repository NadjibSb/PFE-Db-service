const mongoose = require("mongoose");
const csvtojson = require("csvtojson");
const Customer = require("./customerModel");

// remove all customers & insert them again from dataset.csv
async function resetDB() {
  // remove all data
  Customer.find({}).remove(function (err, res) {
    if (err) throw Error(err);
    console.log("reset successful");
    console.log(res);
  });

  // import from csv
  const csvFilePath = __dirname + "/../../assets/dataset_simple.csv";
  console.log(csvFilePath);

  csvtojson()
    .fromFile(csvFilePath)
    .then((jsonObj) => {
      Customer.insertMany(jsonObj)
        .then(function () {
          console.log("csv loaded");
        })
        .catch(function () {
          console.log("error: csv not loaded");
        });
    });
  /*
  var newitem = Customer(user).save(function (err, data) {
    if (err) throw err;
  });*/
}

async function getCustomer(mobile_num) {
  let c = await Customer.findOne(
    { mobile_number: mobile_num },
    { _id: 0, __v: 0 }
  );
  console.log("customer num : " + c.mobile_number + " => churn: " + c.churn);
  return c;
}

async function getAllMobileNum() {
  let list = await Customer.find({}).select({ mobile_number: 1, _id: 0 });
  console.log(list);
  let nums = [];
  list.forEach((item) => {
    nums.push(item.mobile_number);
  });
  return nums;
}

const controller = {
  reset: resetDB,
  getCustomer: getCustomer,
  getAllMobileNum: getAllMobileNum,
};

module.exports = controller;
