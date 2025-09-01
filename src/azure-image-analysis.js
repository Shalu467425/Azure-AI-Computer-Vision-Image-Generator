export async function analyzeImage(imageInput) {
  const endpoint = process.env.REACT_APP_AZURE_ENDPOINT;
  const key = process.env.REACT_APP_AZURE_KEY;

  if (!endpoint || !key) {
    throw new Error("Azure endpoint or key is missing in .env file.");
  }

  // Try v4.0 first
  try {
    return await callImageAnalysisV4(endpoint, key, imageInput);
  } catch (err) {
    if (err.message.includes("404")) {
      console.warn("v4.0 not supported, falling back to v3.2...");
      return await callImageAnalysisV3(endpoint, key, imageInput);
    }
    throw err; // other errors bubble up
  }
}

// --- v4.0 API call ---
async function callImageAnalysisV4(endpoint, key, imageInput) {
  const url = `${endpoint}/computervision/imageanalysis:analyze?api-version=2023-02-01&features=tags,caption,objects`;

  const headers = { "Ocp-Apim-Subscription-Key": key };
  let body;

  if (imageInput instanceof File) {
    headers["Content-Type"] = "application/octet-stream";
    body = imageInput;
  } else {
    headers["Content-Type"] = "application/json";
    body = JSON.stringify({ url: imageInput });
  }

  const response = await fetch(url, { method: "POST", headers, body });
  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Azure Vision API error (v4.0): ${response.status} ${errorText}`);
  }

  return await response.json();
}

// --- v3.2 API call ---
async function callImageAnalysisV3(endpoint, key, imageInput) {
  const url = `${endpoint}/vision/v3.2/analyze?visualFeatures=Tags,Description,Objects`;

  const headers = { "Ocp-Apim-Subscription-Key": key };
  let body;

  if (imageInput instanceof File) {
    headers["Content-Type"] = "application/octet-stream";
    body = imageInput;
  } else {
    headers["Content-Type"] = "application/json";
    body = JSON.stringify({ url: imageInput });
  }

  const response = await fetch(url, { method: "POST", headers, body });
  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Azure Vision API error (v3.2): ${response.status} ${errorText}`);
  }

  return await response.json();
}
