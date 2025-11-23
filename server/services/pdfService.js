const fs = require("fs");
const pdfParse = require("pdf-parse-fixed");

exports.extractTextFromPDF = async (filePath) => {
  const dataBuffer = fs.readFileSync(filePath);
  const data = await pdfParse(dataBuffer);
  return data.text || "";
};
