const dotenv = require("dotenv");

// Set the NODE_ENV to 'development' by default
process.env.NODE_ENV = process.env.NODE_ENV || "development";

// Test if there is a .env file
let envFound = dotenv.config();
if (!envFound) {
  throw new Error("Couldn't find .env file");
}

// Export ENV vars
module.exports = {
  PORT: parseInt(process.env.PORT, 10),
  DB_URL: process.env.dbUrl,
};
