const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// MongoDB Atlas Connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ Connected to MongoDB Atlas"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

// User Schema & Model
const userSchema = new mongoose.Schema({
  name: String,
  branch: String,
  year: String,
  skills: [String],
});

const User = mongoose.model("User", userSchema);

// Test route
app.get("/", (req, res) => {
  res.send("Campus Connect Backend is running");
});

// Add user (Now saves to MongoDB)
app.post("/api/users", async (req, res) => {
  try {
    const { name, branch, year, skills } = req.body;
    if (!name || !branch || !year || !skills) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const newUser = new User({ name, branch, year, skills });
    await newUser.save();

    res.status(201).json({ message: "User added successfully to Atlas" });
  } catch (error) {
    res.status(500).json({ message: "Error saving user", error });
  }
});

// Get users (Now fetches from MongoDB)
app.get("/api/users", async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: "Error fetching users", error });
  }
});

// Port
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});