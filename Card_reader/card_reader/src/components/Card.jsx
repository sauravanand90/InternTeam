// src/CardReader.js
import React, { useState } from 'react';
import Tesseract from 'tesseract.js';

const Card = () => {
    const [image, setImage] = useState(null);
    const [extractedText, setExtractedText] = useState('');
    const [loading, setLoading] = useState(false);

    const handleImageChange = (e) => {
        setImage(e.target.files[0]);
    };

    const handleImageUpload = () => {
        if (image) {
            setLoading(true);
            Tesseract.recognize(
                image,
                'eng',
                {
                    logger: (m) => console.log(m), // Log progress
                }
            ).then(({ data: { text } }) => {
                setExtractedText(text);
                setLoading(false);
            }).catch(err => {
                console.error(err);
                setLoading(false);
            });
        }
    };

    return (
        <div>
            <h1>Card Reader</h1>
            <input type="file" accept="image/*" onChange={handleImageChange} />
            <button onClick={handleImageUpload} disabled={!image || loading}>
                {loading ? 'Processing...' : 'Extract Text'}
            </button>
            {extractedText && (
                <div>
                    <h2>Extracted Text:</h2>
                    <p>{extractedText}</p>
                </div>
            )}
        </div>
    );
};

export default Card;