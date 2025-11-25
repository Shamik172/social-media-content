const express = require("express");
const upload = require("../middleware/upload");
const uploadController = require("../controllers/uploadController");

const router = express.Router();

router.post("/", upload.single("file"), uploadController.handleUpload);

module.exports = router;
