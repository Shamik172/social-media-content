// Simple emoji regex
const EMOJI_REGEX =
  /[\u{1F600}-\u{1F64F}\u{1F300}-\u{1F5FF}\u{1F680}-\u{1F6FF}\u{2600}-\u{26FF}]/u;

const POSITIVE_WORDS = ["great", "awesome", "amazing", "love", "excited", "happy"];
const NEGATIVE_WORDS = ["bad", "sad", "angry", "hate", "terrible", "worst"];

// COMMON meaningful English words
const COMMON_WORDS = [
  "the", "is", "and", "this", "that", "to", "for", "you", "me", "it", "we",
  "with", "was", "are", "in", "on", "at", "my", "your", "a"
];

//   GARBAGE TEXT DETECTION
function isGarbageText(text) {
  // Remove punctuation & numbers
  const cleaned = text.replace(/[^a-zA-Z\s]/g, " ").trim();

  const words = cleaned.split(/\s+/).filter(Boolean);

  // If fewer than 5 alphabetic words → garbage
  if (words.length < 5) return true;

  // % of letters in the full string (avoid ascii noise)
  const letters = text.match(/[a-zA-Z]/g)?.length || 0;
  const total = text.length;

  if (total > 0 && letters / total < 0.25) return true; // less than 25% letters

  // Count meaningful English words
  const meaningful = words.filter((w) =>
    COMMON_WORDS.includes(w.toLowerCase())
  ).length;

  if (meaningful < 2) return true;

  return false;
}

// MAIN ANALYZER
exports.analyzeText = (text) => {
  const trimmed = text.trim();

  // Detect meaningless OCR garbage
  if (isGarbageText(trimmed)) {
    return {
      wordCount: 0,
      hashtagsCount: 0,
      mentionsCount: 0,
      emojisCount: 0,
      sentiment: "neutral",
      engagementScore: 0,
      suggestions: [
        "The extracted text appears too distorted or unclear for meaningful analysis.",
        "Try uploading a clearer image or use the AI analysis mode for better results."
      ]
    };
  }

  // Continue normal analysis
  const words = trimmed.split(/\s+/).filter(Boolean);
  const wordCount = words.length;

  const hashtags = trimmed.match(/#\w+/g) || [];
  const mentions = trimmed.match(/@\w+/g) || [];
  const emojis = trimmed.match(EMOJI_REGEX) || [];

  const lowerText = trimmed.toLowerCase();
  let positiveScore = 0;
  let negativeScore = 0;

  POSITIVE_WORDS.forEach((w) => lowerText.includes(w) && positiveScore++);
  NEGATIVE_WORDS.forEach((w) => lowerText.includes(w) && negativeScore++);

  let sentiment = "neutral";
  if (positiveScore > negativeScore) sentiment = "positive";
  if (negativeScore > positiveScore) sentiment = "negative";

  // Suggestions
  const suggestions = [];

  if (wordCount < 10) {
    suggestions.push("Your post is quite short. Add more detail to improve clarity.");
  } else if (wordCount > 50) {
    suggestions.push("Your post is long. Short, concise posts get more engagement.");
  }

  if (hashtags.length === 0) {
    suggestions.push("Add relevant hashtags to improve reach (e.g., #socialmedia #branding).");
  }

  if (emojis.length === 0) {
    suggestions.push("Try adding emojis to make the post more visually appealing.");
  }

  const hasCTA = /(follow|like|share|comment|subscribe|learn more|visit)/i.test(
    trimmed
  );

  if (!hasCTA) {
    suggestions.push("Add a CTA like 'Comment your thoughts' or 'Follow for more'.");
  }

  if (sentiment === "negative") {
    suggestions.push("The tone feels negative. More positive language can improve engagement.");
  }

  if (suggestions.length === 0) {
    suggestions.push("Your post is already well-structured! Small tweaks could enhance engagement.");
  }

  // Engagement Score
  let engagementScore = 50;

  if (wordCount >= 10 && wordCount <= 50) engagementScore += 10;
  if (hashtags.length > 0) engagementScore += 10;
  if (emojis.length > 0) engagementScore += 10;
  if (hasCTA) engagementScore += 10;
  if (sentiment === "positive") engagementScore += 10;
  if (sentiment === "negative") engagementScore -= 10;

  engagementScore = Math.max(0, Math.min(100, engagementScore));

  return {
    wordCount,
    hashtagsCount: hashtags.length,
    mentionsCount: mentions.length,
    emojisCount: emojis.length,
    sentiment,
    engagementScore,
    suggestions,
  };
};
