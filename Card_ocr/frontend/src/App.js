import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [file, setFile] = useState(null);
  const [result, setResult] = useState(null);

  const handleUpload = async () => {
    const formData = new FormData();
    formData.append('cardImage', file);

    try {
      const res = await axios.post('http://localhost:5000/api/upload', formData);
      setResult(res.data);
    } catch (err) {
      alert('OCR Failed');
    }
  };

  return (
    <div style={{ padding: 30 }}>
      <h2>UK Card OCR Extractor</h2>
      <input type="file" onChange={e => setFile(e.target.files[0])} />
      <button onClick={handleUpload}>Upload</button>
      {result && (
        <div style={{ marginTop: 20 }}>
          <p><b>Card Number:</b> {result.card_number || 'Not found'}</p>
          <p><b>Expiry Date:</b> {result.expiry || 'Not found'}</p>
          <p><b>Cardholder Name:</b> {result.name || 'Not found'}</p>
          <p><b>Card Type:</b> {result.card_type || 'Not found'}</p>
        </div>
      )}
    </div>
  );
}

export default App;
