const express = require("express");
const multer = require("multer");
const path = require("path");
const uploadAIController = require("../controllers/uploadController");

const router = express.Router();

// Storage config (same as normal route)
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "..", "uploads"));
  },
  filename: function (req, file, cb) {
    const unique = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, "file-" + unique + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

// POST /api/upload-ai
router.post("/", upload.single("file"), uploadAIController.handleUploadAI);

module.exports = router;
