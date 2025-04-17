const express = require('express');
const multer = require('multer');
const cors = require('cors');
const { exec } = require('child_process');
const path = require('path');
const fs = require('fs');

const app = express();
app.use(cors());
const PORT = 5000;

const upload = multer({ dest: 'upload/' });

app.post('/api/upload', upload.single('cardImage'), (req, res) => {
  if (!req.file) return res.status(400).send('No image uploaded');

  const imagePath = path.join(__dirname, req.file.path);
  const pythonScript = path.join(__dirname, 'ocr', 'extract_card.py');

  exec(`python "${pythonScript}" "${imagePath}"`, (error, stdout, stderr) => {
    fs.unlinkSync(imagePath); // cleanup
    if (error) {
      console.error(stderr);
      return res.status(500).send('OCR failed');
    }
    res.json(JSON.parse(stdout));
  });
});

app.listen(PORT, () => console.log(`Backend running at http://localhost:${PORT}`));
