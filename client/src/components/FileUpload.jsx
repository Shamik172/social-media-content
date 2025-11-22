import { useRef, useState } from "react";
import { uploadFile } from "../utils/api";

export default function FileUpload({ setResult, setLoading, setError }) {
  const [file, setFile] = useState(null);
  const inputRef = useRef();

  const handleFile = (e) => {
    setFile(e.target.files[0]);
  };

  const submit = async () => {
    setError("");
    setResult(null);

    if (!file) {
      setError("Please select a file first.");
      return;
    }

    setLoading(true);

    try {
      const data = await uploadFile(file);
      setResult(data);
    } catch (err) {
      console.log(err);
      setError(
        err?.response?.data?.error || "Failed to process file. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h2 className="text-xl font-semibold mb-2">Upload Document</h2>
      <p className="text-gray-600 mb-3">Supported: PDF, JPG, PNG</p>

      <div
        className="border-2 border-dashed border-blue-400 rounded-lg py-10 text-center cursor-pointer bg-blue-50 hover:bg-blue-100"
        onClick={() => inputRef.current.click()}
      >
        <input
          ref={inputRef}
          type="file"
          className="hidden"
          onChange={handleFile}
          accept=".pdf,image/*"
        />
        <p className="text-blue-600 font-medium">Click to choose file</p>
        {file && <p className="mt-2 text-gray-800">{file.name}</p>}
      </div>

      <button
        onClick={submit}
        className="mt-4 w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded"
      >
        Analyze Content
      </button>
    </div>
  );
}
