export default function AIResultPanel({ text, ai, message }) {
  return (
    <div className="bg-white p-8 rounded-3xl shadow-xl border border-gray-100 space-y-8 transition-all duration-300 hover:shadow-2xl">

      {/* Title */}
      <div className="flex items-center gap-3">
        <div className="w-2 h-8 bg-purple-600 rounded-full"></div>
        <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight">
          AI-Powered Content Insights ✨
        </h2>
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
          <div className="bg-gradient-to-br from-purple-50 to-indigo-50 p-4 rounded-2xl max-h-72 overflow-auto whitespace-pre-wrap text-sm border border-purple-200 shadow-inner leading-relaxed">
            {text}
          </div>
        </div>
      )}

      {/* AI Analysis */}
      {ai && (
        <div className="space-y-6">

          {/* Summary */}
          <div className="bg-purple-50 border border-purple-200 p-6 rounded-2xl shadow-md hover:shadow-lg transition-all">
            <h4 className="font-semibold text-lg text-purple-900 mb-2">Summary</h4>
            <p className="text-gray-800 text-sm leading-relaxed">{ai.summary}</p>
          </div>

          {/* Rewritten Caption */}
          <div className="bg-indigo-50 border border-indigo-200 p-6 rounded-2xl shadow-md hover:shadow-lg transition-all">
            <h4 className="font-semibold text-lg text-indigo-900 mb-2">High-Engagement Caption</h4>
            <p className="text-gray-800 whitespace-pre-wrap text-sm leading-relaxed">
              {ai.rewritten}
            </p>
          </div>

          {/* Hashtags */}
          <div className="bg-blue-50 border border-blue-200 p-6 rounded-2xl shadow-md hover:shadow-lg transition-all">
            <h4 className="font-semibold text-lg text-blue-900 mb-2">Trending Hashtags</h4>
            <div className="flex flex-wrap gap-2">
              {ai.hashtags.map((tag, index) => (
                <span
                  key={index}
                  className="px-3 py-1 text-xs font-semibold bg-blue-200 text-blue-700 rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Suggestions */}
          <div className="bg-rose-50 border border-rose-200 p-6 rounded-2xl shadow-md hover:shadow-lg transition-all">
            <h4 className="font-semibold text-lg text-rose-900 mb-2">AI Suggestions</h4>
            <ul className="list-disc pl-5 space-y-3 text-sm text-gray-800 leading-relaxed">
              {ai.suggestions.map((s, i) => (
                <li key={i} className="font-medium">{s}</li>
              ))}
            </ul>
          </div>

        </div>
      )}
    </div>
  );
}
