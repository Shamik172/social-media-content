const path = require("path");
const pdfService = require("../services/pdfService");
const ocrService = require("../services/ocrService");
const analysisService = require("../services/analysisService");
const aiService = require("../services/aiService");

const extractText = async (filePath, ext) => {
  if (ext === ".pdf") {
    return await pdfService.extractTextFromPDF(filePath);
  }

  if ([".png", ".jpg", ".jpeg", ".webp"].includes(ext)) {
    return await ocrService.extractTextFromImage(filePath);
  }

  throw new Error("Unsupported file type");
};


// NORMAL RULE-BASED ANALYSIS
exports.handleUpload = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    const filePath = req.file.path;
    const ext = path.extname(req.file.originalname).toLowerCase();

    const extractedText = await extractText(filePath, ext);

    if (!extractedText || extractedText.trim().length === 0) {
      return res.status(200).json({
        text: "",
        analysis: null,
        message: "No readable text found in the document.",
      });
    }

    const analysis = analysisService.analyzeText(extractedText);

    return res.status(200).json({ text: extractedText, analysis });

  } catch (err) {
    console.error("Error in handleUpload:", err);
    return res.status(500).json({
      error: "Internal server error while processing the file.",
    });
  }
};

// AI-BASED ANALYSIS
exports.handleUploadAI = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    const filePath = req.file.path;
    const ext = path.extname(req.file.originalname).toLowerCase();

    const extractedText = await extractText(filePath, ext);

    if (!extractedText || extractedText.trim().length === 0) {
      return res.status(200).json({
        text: "",
        ai: null,
        message: "OCR could not read any text from the document.",
      });
    }

    const aiResult = await aiService.analyzeWithAI(extractedText);

    return res.status(200).json({ text: extractedText, ai: aiResult });

  } catch (err) {
    console.error("AI Error:", err);
    return res.status(500).json({ error: "AI analysis failed." });
  }
};
