if(process.env.NODE_ENV != 'production'){
  require('dotenv').config() 
}
const mongoose = require("mongoose");
const initData = require("./data.js");
const Listing = require("../models/listing.js");
// const MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust";

main()
  .then(() => {
    console.log("connection successful...");
  })
  .catch((err) => {
    console.log(err);
  });

async function main() {
  await mongoose.connect("mongodb://inverselimitcontinuity:eDJr4XS7zXsjMvnr@cluster0-shard-00-00.r7goe.mongodb.net:27017,cluster0-shard-00-01.r7goe.mongodb.net:27017,cluster0-shard-00-02.r7goe.mongodb.net:27017/?ssl=true&replicaSet=atlas-20h5co-shard-0&authSource=admin&retryWrites=true&w=majority&appName=Cluster0 ");
}

const initDB = async () => {
  await Listing.deleteMany({});
  initData.data = initData.data.map((obj) => ({
    ...obj,
    owner: "66ff78eead6878a7a267994f",
  }));
  await Listing.insertMany(initData.data);
  console.log("data was initialized...");
};
initDB();
  

