import mongoose from "mongoose";
import Admin from "./models/Admin.js";
import dotenv from "dotenv";
dotenv.config();

mongoose
  .connect(process.env.MONGODB_URI || "mongodb://localhost:27017/dpt", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(async () => {
    console.log("Connected to DB");
    const seedPassword =
      process.env.ADMIN_SEED_PASSWORD || "change-me-admin-2026";
    const admins = [
      {
        username: "dushyant",
        email: "dushyant@dpt.com",
        password: seedPassword,
      },
      { username: "ram", email: "ram@dpt.com", password: seedPassword },
    ];

    for (let adminData of admins) {
      const existing = await Admin.findOne({ username: adminData.username });
      if (!existing) {
        await Admin.create(adminData);
        console.log(`Created admin: ${adminData.username}`);
      } else {
        console.log(`Admin ${adminData.username} already exists`);
      }
    }
    mongoose.disconnect();
  })
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });
