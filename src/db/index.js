const mongoose = require("mongoose");
const { DB_NAME } = require("../constants");

const connectDB = async () => {
  try {
    const databaseStr = process.env.MONGODB_URI.replace(
      "<password>",
      process.env.PASSWORD
    );
    const connectionInstance = await mongoose.connect(
      `${databaseStr}/${DB_NAME}`
    );
    console.log(`\n MONGODB connected !! `);
  } catch (error) {
    console.log("MONGODB connection error ", error);
    process.exit(1);
  }
};

module.exports = { connectDB };
