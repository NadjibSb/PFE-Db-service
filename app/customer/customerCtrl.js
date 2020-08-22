const mongoose = require("mongoose");
const csvtojson = require("csvtojson");
const fs = require("fs");
const Customer = require("./customerModel");

const PER_PAGE = 100;

// remove all customers & insert them again from dataset.csv
async function resetDB(fileName) {
  // remove all data
  Customer.find({}).remove(function (err, res) {
    if (err) throw Error(err);
    console.log(res);
  });

  // import from csv
  let csvFilePath = __dirname + "/../../assets/" + fileName + ".csv";
  if (!fs.existsSync(csvFilePath)) {
    csvFilePath = __dirname + "/../../assets/dataset_simple.csv";
  }

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
}

async function getAllCustomersCount() {
  const count = await Customer.countDocuments();
  const nbrP = parseInt(count / PER_PAGE) + 1;
  const res = { total: count, pages: nbrP };
  console.log(res);
  return res;
}

async function getCustomer(mobile_num) {
  let c = await Customer.findOne(
    { mobile_number: mobile_num },
    { _id: 0, __v: 0 }
  );
  console.log("customer num : " + c.mobile_number + " => churn: " + c.churn);
  return c;
}

async function updateCustomer(mobile_num, fields) {
  let c = await Customer.findOneAndUpdate(
    { mobile_number: mobile_num },
    fields,
    { new: true }
  );
  return c;
}

async function updateMultConstumers(costumers) {
  let newList = await costumers.map(async (c) => {
    const { mobile_number, ...fields } = c;
    newC = await updateCustomer(mobile_number, fields);
    return newC;
  });
  return newList;
}

async function getAllCustomers(page, selectedFields) {
  let list = await Customer.find({})
    .select({ _id: 0, ...selectedFields })
    .skip((page - 1) * PER_PAGE)
    .limit(PER_PAGE);
  return list;
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
  get: getCustomer,
  updateOne: updateCustomer,
  updateMult: updateMultConstumers,
  getAllMobileNum: getAllMobileNum,
  getSize: getAllCustomersCount,
  getAll: getAllCustomers,
};

module.exports = controller;
