// frontend/src/App.js
import React, { useState } from "react";

function App() {
  const [file, setFile] = useState(null); // For local upload
  const [supervisor, setSupervisor] = useState("");
  const [vehicle, setVehicle] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  

  // Backend URL — since FastAPI serves frontend, use relative path
  const API_URL = "/api";

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!supervisor || !vehicle || !file) {
      alert("Fill all required fields and upload a file");
      return;
    }

    setLoading(true);
    const formData = new FormData();
    formData.append("file", file);
    formData.append("supervisor_name", supervisor);
    formData.append("vehicle_no", vehicle);

    try {
      // Call the working /api/upload endpoint
      const res = await fetch(`${API_URL}/upload`, {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      console.log(data);
      setResult(data);
      setLoading(false);
    } catch (err) {
      console.error(err);
      setLoading(false);
      alert("Error uploading file");
    }
  };

  return (
    <div style={{ padding: "20px", fontFamily: "Arial" }}>
      <h1>📦 Box Detection App (Test Upload)</h1>

      <form onSubmit={handleSubmit}>
        <div>
          <label>Supervisor Name:</label>
          <input
            type="text"
            value={supervisor}
            onChange={(e) => setSupervisor(e.target.value)}
          />
        </div>

        <div>
          <label>Vehicle No:</label>
          <input
            type="text"
            value={vehicle}
            onChange={(e) => setVehicle(e.target.value)}
          />
        </div>

        <div>
          <label>Upload Video File:</label>
          <input type="file" accept="video/*" onChange={handleFileChange} />
        </div>

        <button type="submit" disabled={loading}>
          {loading ? "Uploading..." : "Upload File"}
        </button>
      </form>

      {result && (
        <div style={{ marginTop: "20px" }}>
          <h2>✅ Upload Result</h2>
          <pre>{JSON.stringify(result, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}

export default App;
