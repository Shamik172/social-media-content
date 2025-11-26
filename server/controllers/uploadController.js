const path = require("path");
const fs = require("fs");
const pdfService = require("../services/pdfService");
const ocrService = require("../services/ocrService");
const analysisService = require("../services/analysisService");
const aiService = require("../services/aiService");

// Extract text depending on type
const extractText = async (filePath, ext) => {
  if (ext === ".pdf") {
    return await pdfService.extractTextFromPDF(filePath);
  }

  if ([".png", ".jpg", ".jpeg", ".webp"].includes(ext)) {
    return await ocrService.extractTextFromImage(filePath);
  }

  throw new Error("Unsupported file type");
};

// NORMAL ANALYSIS
exports.handleUpload = async (req, res) => {
  let filePath = req.file?.path;

  try {
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    const ext = path.extname(req.file.originalname).toLowerCase();
    const extractedText = await extractText(filePath, ext);

    if (!extractedText.trim()) {
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
  } finally {
    // DELETE FILE AFTER ANALYSIS
    if (filePath && fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
      console.log("Deleted uploaded file:", filePath);
    }
  }
};


// AI ANALYSIS
exports.handleUploadAI = async (req, res) => {
  let filePath = req.file?.path;

  try {
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    const ext = path.extname(req.file.originalname).toLowerCase();
    const extractedText = await extractText(filePath, ext);

    if (!extractedText.trim()) {
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
  } finally {
    // DELETE FILE AFTER ANALYSIS
    if (filePath && fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
      console.log("Deleted uploaded file:", filePath);
    }
  }
};
