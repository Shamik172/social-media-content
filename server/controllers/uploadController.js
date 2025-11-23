const path = require("path");
const pdfService = require("../services/pdfService");
const ocrService = require("../services/ocrService");
const analysisService = require("../services/analysisService");

exports.handleUpload = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    const filePath = req.file.path;
    const ext = path.extname(req.file.originalname).toLowerCase();

    let extractedText = "";

    if (ext === ".pdf") {
      extractedText = await pdfService.extractTextFromPDF(filePath);
    } else if (ext === ".png" || ext === ".jpg" || ext === ".jpeg") {
      extractedText = await ocrService.extractTextFromImage(filePath);
    } else {
      return res
        .status(400)
        .json({ error: "Unsupported file type. Upload PDF or image." });
    }

    if (!extractedText || extractedText.trim().length === 0) {
      return res.status(200).json({
        text: "",
        analysis: null,
        message: "No readable text found in the document.",
      });
    }

    const analysis = analysisService.analyzeText(extractedText);

    return res.status(200).json({
      text: extractedText,
      analysis,
    });
  } catch (err) {
    console.error("Error in handleUpload:", err);
    return res.status(500).json({
      error: "Internal server error while processing the file.",
    });
  }
};
