import React, { useState } from "react";
import "./App.css";

function App() {
  const [imageUrl, setImageUrl] = useState("");
  const [fileName, setFileName] = useState("");

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setFileName(file.name);
      // Later: You can send this file to backend
    }
  };

  return (
    <div className="app-container">
      <div className="card">
        {/* Title */}
        <h1 className="title">Azure Image Captioning</h1>
        <p className="subtitle">
          Enter an image URL or upload a file to analyze, or generate an image
          from a prompt.
        </p>

        {/* URL/Prompt Input */}
        <div className="input-group">
          <label className="label">Image URL or Prompt</label>
          <input
            type="text"
            placeholder="Paste an image URL or enter a text prompt..."
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            className="input-box"
          />
        </div>

        {/* File Upload */}
        <div className="input-group">
          <label className="label">Upload Image</label>
          <div className="file-upload">
            <input
              type="file"
              accept="image/*"
              onChange={handleFileUpload}
              className="file-input"
            />
            {fileName && (
              <span className="file-name">Selected: {fileName}</span>
            )}
          </div>
        </div>

        {/* Buttons */}
        <div className="button-group">
          <button
            onClick={() => alert("Analyze button clicked (logic pending)")}
            className="btn analyze-btn"
          >
            Analyze Image
          </button>
          <button
            onClick={() => alert("Generate button clicked (logic pending)")}
            className="btn generate-btn"
          >
            Generate Image
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
