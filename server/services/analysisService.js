// Simple emojis regex
const EMOJI_REGEX =
  /[\u{1F600}-\u{1F64F}\u{1F300}-\u{1F5FF}\u{1F680}-\u{1F6FF}\u{2600}-\u{26FF}]/u;

const POSITIVE_WORDS = ["great", "awesome", "amazing", "love", "excited", "happy"];
const NEGATIVE_WORDS = ["bad", "sad", "angry", "hate", "terrible", "worst"];

exports.analyzeText = (text) => {
  const trimmed = text.trim();
  const words = trimmed.split(/\s+/).filter(Boolean);
  const wordCount = words.length;

  const hashtags = trimmed.match(/#\w+/g) || [];
  const mentions = trimmed.match(/@\w+/g) || [];
  const emojis = trimmed.match(EMOJI_REGEX) || [];

  const lowerText = trimmed.toLowerCase();

  let positiveScore = 0;
  let negativeScore = 0;

  POSITIVE_WORDS.forEach((w) => {
    if (lowerText.includes(w)) positiveScore++;
  });

  NEGATIVE_WORDS.forEach((w) => {
    if (lowerText.includes(w)) negativeScore++;
  });

  let sentiment = "neutral";
  if (positiveScore > negativeScore) sentiment = "positive";
  else if (negativeScore > positiveScore) sentiment = "negative";

  const suggestions = [];

  // Length-based suggestions
  if (wordCount < 10) {
    suggestions.push("Your post is very short. Consider adding more context or details.");
  } else if (wordCount > 50) {
    suggestions.push("Your post is quite long. Consider shortening it for better readability.");
  }

  // Hashtags
  if (hashtags.length === 0) {
    suggestions.push(
      "Add relevant hashtags to increase discoverability (e.g., #marketing #startup)."
    );
  }

  // Emojis
  if (emojis.length === 0) {
    suggestions.push("Consider adding emojis to make the post more visually engaging.");
  }

  // Call-to-action
  const hasCTA = /(follow|like|share|comment|subscribe|check out|learn more|visit)/i.test(
    trimmed
  );
  if (!hasCTA) {
    suggestions.push(
      "Add a clear call-to-action like 'Follow for more' or 'Comment your thoughts'."
    );
  }

  // Sentiment
  if (sentiment === "negative") {
    suggestions.push(
      "Your post feels negative. Consider using a more positive or encouraging tone for better engagement."
    );
  }

  if (suggestions.length === 0) {
    suggestions.push(
      "Your post looks good! Minor tweaks to hashtags, emojis, or CTA could further improve engagement."
    );
  }

  // Simple engagement score (0–100)
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
