const Tesseract = require("tesseract.js");

exports.extractTextFromImage = async (filePath) => {
  const result = await Tesseract.recognize(filePath, "eng");
  return result.data.text || "";
};
