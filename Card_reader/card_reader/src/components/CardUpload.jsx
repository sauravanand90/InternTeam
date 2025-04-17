import React, { useState, useRef } from 'react';
import Tesseract from 'tesseract.js';

const CardUpload2 = () => {
    const [file, setFile] = useState(null);
    const [cardDetails, setCardDetails] = useState({});
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const canvasRef = useRef(null);

    const handleFileSelect = (event) => {
        setFile(event.target.files[0]);
        setError('');
        setCardDetails({});
    };

    const handleDrop = (e) => {
        e.preventDefault();
        setFile(e.dataTransfer.files[0]);
        setError('');
        setCardDetails({});
    };

    const handleDragOver = (e) => {
        e.preventDefault();
    };

    const handleFileUpload = () => {
        if (!file) {
            setError('Please select or drop an image.');
            return;
        }

        setLoading(true);
        setError('');

        const img = new Image();
        img.src = URL.createObjectURL(file);
        img.onload = () => {
            const canvas = canvasRef.current;
            const ctx = canvas.getContext('2d');
            canvas.width = img.width;
            canvas.height = img.height;

            // Draw & enhance
            ctx.drawImage(img, 0, 0);
            const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
            for (let i = 0; i < imgData.data.length; i += 4) {
                const avg = (imgData.data[i] + imgData.data[i + 1] + imgData.data[i + 2]) / 3;
                imgData.data[i] = imgData.data[i + 1] = imgData.data[i + 2] = avg; // grayscale
            }
            ctx.putImageData(imgData, 0, 0);

            canvas.toBlob((enhancedBlob) => {
                Tesseract.recognize(
                    enhancedBlob,
                    'eng',
                    { logger: m => console.log(m) }
                ).then(({ data: { text } }) => {
                    const details = extractCardDetails(text);
                    setCardDetails(details);
                }).catch(err => {
                    console.error(err);
                    setError('Error processing the image. Try a clearer image.');
                }).finally(() => {
                    setLoading(false);
                });
            });
        };
    };

    const extractCardDetails = (text) => {
        const cardTypeRegex = /(Visa|MasterCard|American Express|Discover|Business)/i;
        const cardNumberRegex = /\b(?:\d{4}[ -]?){3,4}\b/;
        const expiryRegex = /\b(0[1-9]|1[0-2])[/\- ]?(2[3-9])\b/;

        const lines = text.split('\n').map(line => line.trim()).filter(Boolean);
        const knownBrands = ['VISA', 'MASTERCARD', 'AMERICAN EXPRESS', 'DISCOVER', 'Business'];

        const cardHolderName = lines.find(line =>
            /^[A-Z .]{3,}$/.test(line) &&
            !/\d/.test(line) &&
            !knownBrands.some(brand => line.toUpperCase().includes(brand))
        );

        const cardNumber = text.match(cardNumberRegex)?.[0]?.replace(/[^0-9]/g, '') || null;

        let expiryDate = null;
        for (const line of lines) {
            if (/valid|thru|expiry|expires|until/i.test(line)) {
                const match = line.match(expiryRegex);
                if (match) {
                    expiryDate = `${match[1]}`/`${match[2]}`;
                    break;
                }
            }
        }
        if (!expiryDate) {
            const fallback = text.match(expiryRegex);
            if (fallback) {
                expiryDate = `${fallback[1]}`/`${fallback[2]}`;
            }
        }

        const cardType = text.match(cardTypeRegex)?.[0]?.toUpperCase() || null;

        return { cardType, cardHolderName, cardNumber, expiryDate };
    };

    const exportToCSV = () => {
        const csv = Papa.unparse([cardDetails]);
        const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", "card-details.csv");
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    const exportToPDF = () => {
        const doc = new jsPDF();
        doc.setFontSize(16);
        doc.text("Extracted Card Details", 20, 20);
        let y = 40;
        for (const [key, value] of Object.entries(cardDetails)) {
            if (value) {
                doc.text(`${key.replace(/([A-Z])/g, ' $1')}: ${value}`, 20, y);
                y += 10;
            }
        }
        doc.save("card-details.pdf");
    };

    return (
        <div style={{ padding: '20px', fontFamily: 'Arial' }}>
            <h1>Upload Card Image</h1>
            <div
                onDrop={handleDrop}
                onDragOver={handleDragOver}
                style={{
                    border: '2px dashed #ccc',
                    padding: '20px',
                    borderRadius: '10px',
                    textAlign: 'center',
                    marginBottom: '10px'
                }}
            >
                Drag and drop an image here or choose file
                <br /><br />
                <input type="file" accept="image/*" onChange={handleFileSelect} />
            </div>

            <button onClick={handleFileUpload} disabled={loading}>
                {loading ? 'Processing...' : 'Upload & Extract'}
            </button>
            {error && <p style={{ color: 'red' }}>{error}</p>}

            <canvas ref={canvasRef} style={{ display: 'none' }}></canvas>

            {file && (
                <div style={{ marginTop: '10px' }}>
                    <img
                        src={URL.createObjectURL(file)}
                        alt="Preview"
                        width="300"
                        style={{ border: '1px solid #ccc', borderRadius: '10px', padding: '5px' }}
                    />
                </div>
            )}

            {Object.keys(cardDetails).length > 0 && (
                <div style={{ marginTop: '20px', border: '1px solid #ddd', padding: '15px', borderRadius: '8px' }}>
                    <h2>Extracted Card Details:</h2>
                    {cardDetails.cardType && <p><strong>Card Type:</strong> {cardDetails.cardType}</p>}
                    {cardDetails.cardHolderName && <p><strong>Card Holder Name:</strong> {cardDetails.cardHolderName}</p>}
                    {cardDetails.cardNumber && <p><strong>Card Number:</strong> {cardDetails.cardNumber}</p>}
                    {cardDetails.expiryDate && <p><strong>Expiry Date:</strong> {cardDetails.expiryDate}</p>}

                    <div style={{ marginTop: '10px' }}>
                        <button onClick={exportToCSV} style={{ marginRight: '10px' }}>Export to CSV</button>
                        <button onClick={exportToPDF}>Export to PDF</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CardUpload2;