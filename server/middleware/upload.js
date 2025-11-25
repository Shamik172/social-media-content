const multer = require("multer");
const path = require("path");
const fs = require("fs");

// FIXED — ALWAYS correct path
const uploadsPath = path.resolve(__dirname, "../uploads");

if (!fs.existsSync(uploadsPath)) {
  fs.mkdirSync(uploadsPath, { recursive: true });
  console.log("Uploads folder created:", uploadsPath);
}

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadsPath);
  },
  filename: function (req, file, cb) {
    const unique = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, "file-" + unique + path.extname(file.originalname));
  }
});

const allowed = [
  "application/pdf",
  "image/png",
  "image/jpeg",
  "image/jpg"
];

const fileFilter = (req, file, cb) => {
  if (allowed.includes(file.mimetype)) cb(null, true);
  else cb(new Error("Unsupported file type"), false);
};

module.exports = multer({ storage, fileFilter });
