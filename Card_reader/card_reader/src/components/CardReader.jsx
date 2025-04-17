import React, { useState } from 'react';
import Tesseract from 'tesseract.js';
 
const CardUpload = () => {
    const [file, setFile] = useState(null);
    const [cardDetails, setCardDetails] = useState({});
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [imagePreviewUrl, setImagePreviewUrl] = useState('');
 
    const handleFileChange = (event) => {
        const selectedFile = event.target.files[0];
        setFile(selectedFile);
        setError('');
       
        // Create a preview URL for the selected image
        if (selectedFile) {
            const previewUrl = URL.createObjectURL(selectedFile);
            setImagePreviewUrl(previewUrl);
        } else {
            setImagePreviewUrl('');
        }
    };
 
    const handleFileUpload = () => {
        if (file) {
            setLoading(true);
            setError('');
 
            Tesseract.recognize(
                file,
                'eng',
                {
                    logger: (m) => console.log(m)
                }
            ).then(({ data: { text } }) => {
                console.log("Extracted Text:", text);
                const details = extractCardDetails(text);
                setCardDetails(details);
            }).catch(err => {
                console.error(err);
                setError('Error processing the image. Please try again.');
            }).finally(() => {
                setLoading(false);
            });
        } else {
            setError('Please select a file to upload.');
        }
    };
 
    const extractCardDetails = (text) => {
        const cardTypeRegex = /(Visa|MasterCard|American Express|Discover|VISA|MASTERCARD|AMERICAN EXPRESS|DISCOVER|Business)/i;
        const cardNumberRegex = /\b(?:\d[ -]*?){13,16}\b/;
        const expiryDateRegex = /(?:Expiry Date|Good Thru|Issued|Expires|Valid From|Valid Thru|Valid Until)?\s*(\d{2}\/\d{2}|\d{2}-\d{2}|\d{2}\s*\/\s*\d{2})/;
 
        const lines = text.split('\n').map(line => line.trim()).filter(Boolean);
        console.log("Lines:", lines); // Debugging
 
        const knownCardBrands = ['VISA', 'MASTERCARD', 'AMERICAN EXPRESS', 'DISCOVER', 'Business'];
 
        const cardHolderName = lines.find((line, index) => {
            const nextLine = lines[index + 1] || '';
            const isLikelyName = /^[A-Z\s.]{2,}$/.test(line) && !/\d/.test(line);
            const notBrand = !knownCardBrands.some(brand => line.toUpperCase().includes(brand));
            const notCardNumber = !cardNumberRegex.test(line) && !cardNumberRegex.test(nextLine);
            return isLikelyName && notBrand && notCardNumber;
        }) || 'Not found';
 
        const cardTypeMatch = text.match(cardTypeRegex);
        const cardNumberMatch = text.match(cardNumberRegex);
        const expiryDateMatch = text.match(expiryDateRegex);
 
        return {
            cardType: cardTypeMatch ? cardTypeMatch[0] : 'Not found',
            cardNumber: cardNumberMatch ? cardNumberMatch[0].replace(/[^0-9]/g, '') : 'Not found',
            cardHolderName,
            expiryDate: expiryDateMatch ? expiryDateMatch[1] : 'Not found',
        };
    };
 
    return (
        <div style={{ padding: '20px', fontFamily: 'Arial' }}>
            <h1>Upload Card Image</h1>
            <input type="file" accept="image/*" onChange={handleFileChange} />
            <button onClick={handleFileUpload} disabled={loading}>
                {loading ? 'Processing...' : 'Upload'}
            </button>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {imagePreviewUrl && (
                <div style={{ marginTop: '20px' }}>
                    <h2>Image Preview:</h2>
                    <img src={imagePreviewUrl} alt="Card Preview" style={{ maxWidth: '300px', maxHeight: '200px', border: '1px solid #ccc' }} />
                </div>
            )}
            {(cardDetails.cardType || cardDetails.cardNumber || cardDetails.cardHolderName || cardDetails.expiryDate) && (
                <div style={{ marginTop: '20px' }}>
                    <h2>Extracted Card Details:</h2>
                    <p><strong>Card Type:</strong> {cardDetails.cardType}</p>
                    <p><strong>Card Holder Name:</strong> {cardDetails.cardHolderName}</p>
                    <p><strong>Card Number:</strong> {cardDetails.cardNumber}</p>
                    <p><strong>Expiry Date:</strong> {cardDetails.expiryDate}</p>
                </div>
            )}
        </div>
    );
};
 
export default CardUpload;