import { useState } from "react";
import FileUpload from "./components/FileUpload";
import ResultPanel from "./components/ResultPanel";
import AIResultPanel from "./components/AIResultPanel";

export default function App() {
  const [result, setResult] = useState(null);
  const [aiResult, setAiResult] = useState(null);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // mode = "normal" | "ai"
  const [mode, setMode] = useState("normal");

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-inter">

      {/* Header */}
      <header className="bg-white shadow-md p-6 border-b border-gray-200 sticky top-0 z-20">
        <div className="max-w-5xl mx-auto text-center">
          <h1 className="text-3xl font-bold text-gray-900 tracking-tight">
            Social Media Content Analyzer
          </h1>
          <p className="text-gray-500 mt-1 text-sm">
            Upload a PDF or image to get insights — normal or AI-powered
          </p>
        </div>
      </header>

      {/* Main */}
      <main className="flex-1 max-w-3xl mx-auto p-6 w-full animate-fadeIn">
        <div className="bg-white shadow-lg rounded-2xl p-6 border border-gray-200">

          {/* MODE SWITCH */}
          <div className="flex justify-center mb-6 gap-3">
            <button
              onClick={() => {
                setMode("normal");
                setResult(null);
                setAiResult(null);
                setError("");
              }}
              className={`px-4 py-2 rounded-xl font-semibold border transition-all ${mode === "normal"
                  ? "bg-blue-600 text-white border-blue-600"
                  : "bg-white text-gray-600 border-gray-300 hover:bg-gray-50"
                }`}
            >
              Normal Analysis
            </button>

            <button
              onClick={() => {
                setMode("ai");
                setResult(null);
                setAiResult(null);
                setError("");
              }}
              className={`px-4 py-2 rounded-xl font-semibold border transition-all ${mode === "ai"
                  ? "bg-purple-600 text-white border-purple-600"
                  : "bg-white text-gray-600 border-gray-300 hover:bg-gray-50"
                }`}
            >
              AI Analysis ✨
            </button>
          </div>

          {/* Upload */}
          <FileUpload
            setResult={setResult}
            setAiResult={setAiResult}
            setLoading={setLoading}
            setError={setError}
            mode={mode}
          />


          {/* Loading */}
          {loading && (
            <div className="text-center text-lg font-semibold text-blue-600 mt-4 animate-pulse">
              {mode === "normal"
                ? "Analyzing your content..."
                : "Generating AI-powered insights..."}
            </div>
          )}

          {/* Error */}
          {error && !loading && (
            <div className="bg-red-50 border border-red-300 text-red-700 p-4 rounded-xl mt-4 font-medium">
              {error}
            </div>
          )}

          {/* RESULT PANELS */}
          {!loading && mode === "normal" && result && (
            <div className="mt-6">
              <ResultPanel
                text={result.text}
                analysis={result.analysis}
                message={result.message}
              />
            </div>
          )}

          {!loading && mode === "ai" && aiResult && (
            <div className="mt-6">
              <AIResultPanel
                text={aiResult.text}
                ai={aiResult.ai}
                message={aiResult.message}
              />
            </div>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="text-center py-4 text-gray-500 text-sm border-t bg-white">
        Built with <span className="font-semibold text-gray-700">MERN</span> • Vite • Tailwind CSS
      </footer>
    </div>
  );
}
