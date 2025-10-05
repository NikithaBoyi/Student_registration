const mongoose = require("mongoose");

async function connectDB() {
  try {
    const uri = "mongodb+srv://student:nikitha%402006@studynotioncluster.8zteiyk.mongodb.net/studentregistration?retryWrites=true&w=majority&appName=studyNotionCluster";

    await mongoose.connect(uri);

    console.log("✅ MongoDB Connected Successfully to studentregistration DB");
  } catch (error) {
    console.error("❌ MongoDB connection failed:", error.message);
    process.exit(1);
  }
}

module.exports = connectDB;
