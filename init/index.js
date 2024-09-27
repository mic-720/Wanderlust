const mongoose = require("mongoose");
const initData = require('./data.js');
const Listing = require("../models/listing.js");
// const MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust";
const MONGO_URL = "mongodb://inverselimitcontinuity:eDJr4XS7zXsjMvnr@cluster0-shard-00-00.r7goe.mongodb.net:27017,cluster0-shard-00-01.r7goe.mongodb.net:27017,cluster0-shard-00-02.r7goe.mongodb.net:27017/?ssl=true&replicaSet=atlas-20h5co-shard-0&authSource=admin&retryWrites=true&w=majority&appName=Cluster0";

main()
  .then(() => {
    console.log("connection successful...");
  })
  .catch((err) => {
    console.log(err);
  });

async function main() {
  await mongoose.connect(MONGO_URL);
}

const initDB = async () => {
    // await Listing.deleteMany({});
    await Listing.insertMany(initData.data);
    console.log("data was initialized...");
}
initDB();