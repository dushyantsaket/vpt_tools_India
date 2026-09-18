import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const uri = process.env.MONGO_URI || "mongodb://localhost:27017/dushyant_power_tools";
console.log("Connecting to:", uri);

mongoose.connect(uri)
  .then(async () => {
    console.log("MongoDB Connection Successful!");
    const collections = await mongoose.connection.db.listCollections().toArray();
    console.log("Collections:", collections.map(c => c.name));
    
    // Check if Product collection exists and print count
    if (collections.some(c => c.name === "products")) {
      const count = await mongoose.connection.db.collection("products").countDocuments();
      console.log("Product count:", count);
    } else {
      console.log("Products collection does not exist.");
    }
    
    await mongoose.disconnect();
    process.exit(0);
  })
  .catch(err => {
    console.error("MongoDB Connection Failed:", err.message);
    process.exit(1);
  });
