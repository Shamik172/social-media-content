import { useState } from "react";
import FileUpload from "./components/FileUpload";
import ResultPanel from "./components/ResultPanel";

export default function App() {
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-inter">
      {/* Header */}
      <header className="bg-white shadow-md p-6 border-b border-gray-200 sticky top-0 z-20">
        <div className="max-w-5xl mx-auto text-center">
          <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Social Media Content Analyzer</h1>
          <p className="text-gray-500 mt-1 text-sm">Upload a PDF or image to get AI-powered engagement insights</p>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 max-w-3xl mx-auto p-6 w-full animate-fadeIn">
        <div className="bg-white shadow-lg rounded-2xl p-6 border border-gray-200">
          <FileUpload 
            setResult={setResult}
            setLoading={setLoading}
            setError={setError}
          />

          {loading && (
            <div className="text-center text-lg font-semibold text-blue-600 mt-4 animate-pulse">
              Analyzing your content...
            </div>
          )}

          {error && !loading && (
            <div className="bg-red-50 border border-red-300 text-red-700 p-4 rounded-xl mt-4 font-medium">
              {error}
            </div>
          )}

          {result && !loading && (
            <div className="mt-6">
              <ResultPanel text={result.text} analysis={result.analysis} message={result.message} />
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