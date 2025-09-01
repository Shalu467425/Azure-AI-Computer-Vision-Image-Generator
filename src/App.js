import React, { useState } from "react";
import "./App.css";
import { analyzeImage } from "./azure-image-analysis";

function App() {
  const endpoint = process.env.REACT_APP_AZURE_VISION_ENDPOINT;
  const key = process.env.REACT_APP_AZURE_VISION_KEY;
  const [inputValue, setInputValue] = useState("");
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState(null);
  const [error, setError] = useState(null);

  const handleAnalyze = async () => {
    setLoading(true);
    setResults(null);
    setError(null);

    try {
      const data = await analyzeImage(inputValue);
      setResults(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleGenerate = () => {
    console.log("Generate Image clicked. Input:", inputValue);
  };

  const DisplayResults = () => {
    if (!results) return null;
    return (
      <div className="results">
        <h2>Analysis Results</h2>
        <img src={inputValue} alt="Analyzed" width="300" />
        <pre>{JSON.stringify(results, null, 2)}</pre>
      </div>
    );
  };

  return (
    <div className="app-container">
      <h1 className="app-title">AI Image App</h1>

      <input
        type="text"
        placeholder="Enter image URL..."
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        className="app-input"
      />

      <div className="button-group">
        <button className="app-button" onClick={handleAnalyze} disabled={loading}>
          {loading ? "Analyzing..." : "Analyze Image"}
        </button>
        <button className="app-button" onClick={handleGenerate}>
          Generate Image
        </button>
      </div>

      {error && <p className="error">{error}</p>}
      <DisplayResults />
    </div>
  );
}

export default App;
