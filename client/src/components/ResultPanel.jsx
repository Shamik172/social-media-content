export default function ResultPanel({ text, analysis, message }) {
  return (
    <div className="bg-white p-6 rounded-lg shadow space-y-4">
      <h2 className="text-xl font-semibold">Analysis Result</h2>

      {message && (
        <div className="bg-yellow-100 border border-yellow-300 text-yellow-800 p-3 rounded">
          {message}
        </div>
      )}

      {text && (
        <div>
          <h3 className="font-semibold mb-1">Extracted Text</h3>
          <div className="bg-gray-100 p-3 rounded max-h-56 overflow-auto whitespace-pre-wrap text-sm">
            {text}
          </div>
        </div>
      )}

      {analysis && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-gray-50 p-4 rounded">
            <h4 className="font-semibold mb-2">Summary</h4>
            <ul className="space-y-1 text-sm">
              <li>Words: {analysis.wordCount}</li>
              <li>Hashtags: {analysis.hashtagsCount}</li>
              <li>Mentions: {analysis.mentionsCount}</li>
              <li>Emojis: {analysis.emojisCount}</li>
              <li>Sentiment: {analysis.sentiment}</li>
              <li>Engagement Score: {analysis.engagementScore}/100</li>
            </ul>
          </div>

          <div className="bg-gray-50 p-4 rounded">
            <h4 className="font-semibold mb-2">Suggestions</h4>
            <ul className="list-disc pl-5 space-y-1 text-sm">
              {analysis.suggestions.map((s, i) => (
                <li key={i}>{s}</li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}
