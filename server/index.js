const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const path = require("path");

const uploadRoutes = require("./routes/uploadRoutes");

dotenv.config();

const app = express();

// CORS – allow your Vite frontend
app.use(
  cors({
    origin: "http://localhost:5173",
  })
);

app.use(express.json());

// Serve uploaded files
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Routes
app.use("/api/upload", uploadRoutes);

// Port
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
