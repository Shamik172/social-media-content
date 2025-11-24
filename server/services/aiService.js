require("dotenv").config();
const { GoogleGenerativeAI } = require("@google/generative-ai");

// Load API key from .env
const apiKey = process.env.GEMINI_API_KEY;

const genAI = new GoogleGenerativeAI(apiKey);

exports.analyzeWithAI = async (text) => {
  try {
    const model = genAI.getGenerativeModel({
      model: "models/gemini-2.5-flash",
      generationConfig: {
        maxOutputTokens: 2048,
        temperature: 0.5,
      },
    });

    const prompt = `
You are a social media expert.
Analyze the following content and return ONLY valid JSON:

{
  "summary": "..." ,
  "rewritten": "..." ,
  "hashtags": ["", "", "", "", ""],
  "suggestions": ["", "", ""]
}

Content:
${text}
`;

    const response = await model.generateContent(prompt);

    // Extract real text
    let raw = response.response.text().trim();

    // Strip ```json blocks
    raw = raw.replace(/```json|```/g, "");

    return JSON.parse(raw);

  } catch (err) {
    console.error("Gemini Error:", err.message);
    return {
      summary: "AI failed to generate.",
      rewritten: "",
      hashtags: [],
      suggestions: []
    };
  }
};
