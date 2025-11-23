export default function ResultPanel({ text, analysis, message }) {
  return (
    <div className="bg-white p-8 rounded-3xl shadow-xl border border-gray-100 space-y-8 transition-all duration-300 hover:shadow-2xl">
      {/* Title */}
      <div className="flex items-center gap-3">
        <div className="w-2 h-8 bg-blue-500 rounded-full"></div>
        <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight">Analysis Result</h2>
      </div>

      {/* Message */}
      {message && (
        <div className="bg-yellow-100 border border-yellow-300 text-yellow-900 p-4 rounded-2xl text-sm font-medium shadow-sm">
          {message}
        </div>
      )}

      {/* Extracted Text */}
      {text && (
        <div className="space-y-3">
          <h3 className="font-semibold text-gray-800 text-xl">Extracted Text</h3>
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-4 rounded-2xl max-h-72 overflow-auto whitespace-pre-wrap text-sm border border-blue-200 shadow-inner leading-relaxed">
            {text}
          </div>
        </div>
      )}

      {/* Main Analysis */}
      {analysis && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-4">

          {/* Summary */}
          <div className="bg-gradient-to-br from-blue-50 to-purple-50 border border-blue-200 rounded-2xl p-6 shadow-md hover:shadow-lg transition-all">
            <h4 className="font-semibold mb-4 text-gray-900 text-lg">Summary</h4>
            <ul className="space-y-3 text-sm text-gray-700">
              <li className="flex justify-between"><span className="font-medium">Words</span> <span className="font-bold text-blue-700">{analysis.wordCount}</span></li>
              <li className="flex justify-between"><span className="font-medium">Hashtags</span> <span className="font-bold text-purple-700">{analysis.hashtagsCount}</span></li>
              <li className="flex justify-between"><span className="font-medium">Mentions</span> <span className="font-bold text-green-700">{analysis.mentionsCount}</span></li>
              <li className="flex justify-between"><span className="font-medium">Emojis</span> <span className="font-bold text-yellow-700">{analysis.emojisCount}</span></li>
              <li className="flex justify-between"><span className="font-medium">Sentiment</span> <span className="font-bold capitalize text-pink-700">{analysis.sentiment}</span></li>
              <li className="flex justify-between"><span className="font-medium">Engagement Score</span> <span className="font-bold text-indigo-700">{analysis.engagementScore}/100</span></li>
            </ul>
          </div>

          {/* Suggestions */}
          <div className="bg-gradient-to-br from-pink-50 to-rose-50 border border-pink-200 rounded-2xl p-6 shadow-md hover:shadow-lg transition-all">
            <h4 className="font-semibold mb-4 text-gray-900 text-lg">Suggestions</h4>
            <ul className="list-disc pl-5 space-y-3 text-sm text-gray-700 leading-relaxed">
              {analysis.suggestions.map((s, i) => (
                <li key={i} className="font-medium text-rose-800">{s}</li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}