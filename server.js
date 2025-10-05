const express = require("express");
const path = require("path");
const connectDB = require("./db");
const mongoose = require("mongoose");
const multer = require("multer");

const app = express();
app.use(express.json());

// Connect to MongoDB
connectDB();

// Serve frontend files
app.use(express.static(path.join(__dirname)));
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

// -----------------------------
// Multer setup for file uploads
// -----------------------------
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/"); // Make sure 'uploads' folder exists
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + "-" + file.originalname);
  }
});
const upload = multer({ storage: storage });

// -----------------------------
// Mongoose Student Model
// -----------------------------
const studentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  phone: { type: String, required: true },
  age: { type: Number, required: true },
  dob: { type: String },
  examTime: { type: String },
  admissionMonth: { type: String },
  joiningWeek: { type: String },
  gender: { type: String },
  languages: [String],
  course: { type: String },
  skills: [String],
  percentage: { type: Number },
  portfolio: { type: String },
  search: { type: String },
  color: { type: String },
  address: { type: String },
  formType: { type: String },
  photo: { type: String },      // file path
  signature: { type: String },  // file path
  resume: { type: String },     // file path
});

const Student = mongoose.model("Student", studentSchema);

// -----------------------------
// API Routes
// -----------------------------

// Add a new student with file uploads
app.post("/api/students", upload.fields([
  { name: "photo", maxCount: 1 },
  { name: "signature", maxCount: 1 },
  { name: "resume", maxCount: 1 }
]), async (req, res) => {
  try {
    const files = req.files;
    const data = req.body;

    if (files.photo) data.photo = files.photo[0].path;
    if (files.signature) data.signature = files.signature[0].path;
    if (files.resume) data.resume = files.resume[0].path;

    // Convert age, percentage to numbers
    data.age = parseInt(data.age);
    data.percentage = parseInt(data.percentage);

    // Convert languages and skills to arrays if coming as strings
    if (typeof data.languages === "string") data.languages = [data.languages];
    if (typeof data.skills === "string") data.skills = [data.skills];

    const student = await Student.create(data);
    res.status(201).json(student);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Get all students
app.get("/api/students", async (req, res) => {
  try {
    const students = await Student.find();
    res.json(students);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// -----------------------------
// Start Server
// -----------------------------
const PORT = 8080;
app.listen(PORT, () => {
  console.log(`✅ Server started on port ${PORT}`);
});
