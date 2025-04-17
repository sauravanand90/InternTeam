const express = require('express');
const multer = require('multer');
const Tesseract = require('tesseract.js');
const path = require('path');
const fs = require('fs');
 
const app = express();
const PORT = 3000;
 
// Set up multer for image upload
const upload = multer({ dest: 'uploads/' });
 
app.post('/upload-card', upload.single('cardImage'), async (req, res) => {
  if (!req.file) return res.status(400).send('No image uploaded.');
 
  const imagePath = path.join(__dirname, req.file.path);
 
  try {
    const result = await Tesseract.recognize(imagePath, 'eng');
 
    const text = result.data.text;
    console.log('Raw OCR Text:\n', text);
 
    // Extract card details using regex
    const cardNumber = text.match(/\b(?:\d[ -]*?){13,16}\b/);
    const expiry = text.match(/(0[1-9]|1[0-2])\/?([0-9]{2,4})/);
    const name = text.match(/([A-Z]{2,})(\s[A-Z]{2,})+/); // crude name pattern
 
    res.json({
        cardNumber: cardNumber ? cardNumber[0] : 'Not found',
        expiryDate: expiry ? expiry[0] : 'Not found',
        cardholderName: name ? name[0] : 'Not found',
      });
      
    fs.unlinkSync(imagePath); // clean up uploaded image
    res.send('Card processed. Check console for details.');
 
  } catch (error) {
    console.error('OCR Error:', error);
    res.status(500).send('Error processing image.');
  }
});
 
app.listen(PORT, () => {
  console.log(`Server running on http:localhost:${PORT}`);
});