import React, { useState, useCallback } from 'react';
import * as pdfjsLib from 'pdfjs-dist';
import pdfjsWorker from 'pdfjs-dist/build/pdf.worker.entry';

pdfjsLib.GlobalWorkerOptions.workerSrc = pdfjsWorker;

// Helper to recursively get all PDF files from DataTransferItemList
async function getAllPDFFilesFromItems(items) {
  const pdfFiles = [];

  async function traverseFileTree(item, path = "") {
    return new Promise((resolve) => {
      if (item.isFile) {
        item.file((file) => {
          if (file.type === "application/pdf") {
            pdfFiles.push(file);
          }
          resolve();
        });
      } else if (item.isDirectory) {
        const dirReader = item.createReader();
        dirReader.readEntries(async (entries) => {
          for (const entry of entries) {
            await traverseFileTree(entry, path + item.name + "/");
          }
          resolve();
        });
      } else {
        resolve();
      }
    });
  }

  const traversePromises = [];
  for (let i = 0; i < items.length; i++) {
    const entry = items[i].webkitGetAsEntry && items[i].webkitGetAsEntry();
    if (entry) {
      traversePromises.push(traverseFileTree(entry));
    }
  }
  await Promise.all(traversePromises);
  return pdfFiles;
}

export default function ResumeUploader({ criteria, onResultsReady }) {
  const [loading, setLoading] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState({});
  const [isDragging, setIsDragging] = useState(false);

  const handleFiles = async (files) => {
    setLoading(true);
    const fileArray = Array.from(files);
    const tempResults = [];
    const tempFiles = {};

    for (const file of fileArray) {
      if (file.type === 'application/pdf') {
        const text = await extractTextFromPDF(file);
        const { name, matchedSkills, matchedLocation, totalExperience, score, status } = analyzeResume(text, criteria);
        
        // Store the file for preview
        tempFiles[file.name] = file;
        
        tempResults.push({ 
          fileName: file.name,
          name,
          matchedSkills,
          matchedLocation,
          totalExperience,
          score,
          status
        });
      }
    }

    setUploadedFiles(tempFiles);
    setLoading(false);
    onResultsReady(tempResults, criteria);
  };

  const onDrop = useCallback(async (e) => {
    e.preventDefault();
    setIsDragging(false);
    let files = [];

    // Handle both files and folders
    if (e.dataTransfer.items && e.dataTransfer.items.length > 0) {
      // Check if it's a folder drop
      if (e.dataTransfer.items[0].webkitGetAsEntry) {
        files = await getAllPDFFilesFromItems(e.dataTransfer.items);
      } else {
        // Handle regular file drop
        files = Array.from(e.dataTransfer.files).filter(f => f.type === 'application/pdf');
      }
    } else if (e.dataTransfer.files) {
      // Fallback for browsers that don't support items
      files = Array.from(e.dataTransfer.files).filter(f => f.type === 'application/pdf');
    }

    if (files.length > 0) {
      handleFiles(files);
    }
  }, [criteria, onResultsReady]);

  const onDragOver = useCallback((e) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const onDragLeave = useCallback((e) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleFileInput = (e) => {
    const files = e.target.files;
    if (files.length > 0) {
      handleFiles(files);
    }
  };

  const handlePreview = (fileName) => {
    const file = uploadedFiles[fileName];
    if (file) {
      const fileUrl = URL.createObjectURL(file);
      window.open(fileUrl, '_blank');
    }
  };

  return (
    <>
      <div
        style={{
          border: `2px dashed ${isDragging ? '#4CAF50' : '#ccc'}`,
          borderRadius: '8px',
          padding: '20px',
          textAlign: 'center',
          backgroundColor: isDragging ? 'rgba(76, 175, 80, 0.1)' : 'transparent',
          transition: 'all 0.3s ease',
          marginBottom: '20px'
        }}
        onDrop={onDrop}
        onDragOver={onDragOver}
        onDragLeave={onDragLeave}
      >
        <div style={{ marginBottom: '15px' }}>
          <i className="fas fa-cloud-upload-alt" style={{ fontSize: '48px', color: '#666' }}></i>
        </div>
        <p style={{ marginBottom: '15px', color: '#666' }}>
          Drag and drop PDF files or folders here, or
        </p>
        <div style={{ display: 'flex', gap: '10px', justifyContent: 'center' }}>
          <input
            type="file"
            accept=".pdf"
            onChange={handleFileInput}
            style={{ display: 'none' }}
            id="file-input"
            multiple
          />
          <label
            htmlFor="file-input"
            style={{
              backgroundColor: '#4CAF50',
              color: 'white',
              padding: '10px 20px',
              borderRadius: '5px',
              cursor: 'pointer',
              display: 'inline-block',
              transition: 'background-color 0.3s'
            }}
            onMouseOver={(e) => e.target.style.backgroundColor = '#45a049'}
            onMouseOut={(e) => e.target.style.backgroundColor = '#4CAF50'}
          >
            Select Files
          </label>

          <input
            type="file"
            webkitdirectory="true"
            directory=""
            accept=".pdf"
            onChange={handleFileInput}
            style={{ display: 'none' }}
            id="folder-input"
          />
          <label
            htmlFor="folder-input"
            style={{
              backgroundColor: '#2196F3',
              color: 'white',
              padding: '10px 20px',
              borderRadius: '5px',
              cursor: 'pointer',
              display: 'inline-block',
              transition: 'background-color 0.3s'
            }}
            onMouseOver={(e) => e.target.style.backgroundColor = '#1976D2'}
            onMouseOut={(e) => e.target.style.backgroundColor = '#2196F3'}
          >
            Select Folder
          </label>
        </div>

        {loading && <p className="loading">Processing resumes...</p>}
      </div>
    </>
  );
}

async function extractTextFromPDF(file) {
  const buffer = await file.arrayBuffer();
  const pdf = await pdfjsLib.getDocument({ data: buffer }).promise;
  let text = '';

  for (let i = 1; i <= pdf.numPages; i++) {
    const page = await pdf.getPage(i);
    const content = await page.getTextContent();
    const pageText = content.items.map(item => item.str).join(' ');
    text += pageText + ' ';
  }
  //console.log(text);
  return text;
}

function extractName(text) {
    const STOP_WORDS = ['engineer', 'software', 'associate', 'junior', 'street', 'location', 'greater', 'experienced', 'intern', 'contact', 'email', 'linkedin', 'phone', 'education', 'skills'];
    const words = text
        .slice(0, 300) // Only the top part of the resume
        .replace(/\s{2,}/g, ' ') // Normalize extra spaces
        .trim()
        .split(/\s+/);
 
    let nameParts = [];
 
    for (let i = 0; i < words.length; i++) {
        const word = words[i].replace(/[^A-Za-z]/g, '');
 
        if (!word) continue;
 
        const lower = word.toLowerCase();
        const isStopWord = STOP_WORDS.includes(lower);
        const isValidNamePart = /^[A-Z][a-z]*$/.test(word) || /^[A-Z]{2,}$/.test(word);
 
        if (isStopWord) break;
 
        if (isValidNamePart) {
            nameParts.push(word);
        } else if (nameParts.length > 0) {
            break;
        }
    }
 
    // Reconstruct spaced names like T I N A → TINA
    let combinedName = nameParts.join(' ').trim();
 
    // If the name looks like it's all single letters (e.g., T I N A C O O K), merge them
    if (/^([A-Z])(\s[A-Z]){2,}$/.test(combinedName)) {
        combinedName = combinedName.replace(/\s/g, '');
    }
    //console.log(combinedName)
    return combinedName || 'Unknown';
}

function extractExperience(text) {
  // Convert text to lowercase for matching
  const textLower = text.toLowerCase();
  
  // Find experience section
  const experienceSectionRegex = /(?:work\s+)?experience(?:\s+section)?/i;
  const experienceMatch = textLower.match(experienceSectionRegex);
  
  if (!experienceMatch) {
    return 0;
  }

  // Get the text after experience section
  const startIndex = experienceMatch.index + experienceMatch[0].length;
  const experienceText = text.slice(startIndex);

  // Common date formats and month names
  const monthNames = {
    'jan': 1, 'feb': 2, 'mar': 3, 'apr': 4, 'may': 5, 'jun': 6,
    'jul': 7, 'aug': 8, 'sep': 9, 'oct': 10, 'nov': 11, 'dec': 12
  };

  // Split text into lines for better analysis
  const lines = experienceText.split(/[\n\r]+/);
  let totalMonths = 0;
  let foundExperience = false;

  // Process each line
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();
    if (!line) continue;

    // Look for date patterns
    const datePatterns = [
      // MM/YYYY - MM/YYYY
      /(\d{1,2})\/(\d{4})\s*[-–—]\s*(\d{1,2})\/(\d{4})/,
      // Month YYYY - Month YYYY
      /(jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)[a-z]*\s+(\d{4})\s*[-–—]\s*(jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)[a-z]*\s+(\d{4})/i,
      // YYYY - YYYY
      /(\d{4})\s*[-–—]\s*(\d{4})/,
      // Present/Current
      /(jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)[a-z]*\s+(\d{4})\s*[-–—]\s*(present|current)/i,
      /(\d{1,2})\/(\d{4})\s*[-–—]\s*(present|current)/i
    ];

    for (const pattern of datePatterns) {
      const match = line.match(pattern);
      if (match) {
        foundExperience = true;
        let startDate, endDate;

        if (pattern.toString().includes('present') || pattern.toString().includes('current')) {
          // Handle present/current date
          if (match[1] && match[2]) {
            // Month YYYY format
            startDate = new Date(match[2], monthNames[match[1].toLowerCase().substring(0, 3)] - 1);
          } else {
            // MM/YYYY format
            startDate = new Date(match[2], parseInt(match[1]) - 1);
          }
          endDate = new Date();
        } else if (match[1] && match[2] && match[3] && match[4]) {
          // Full date range
          if (isNaN(match[1])) {
            // Month YYYY format
            startDate = new Date(match[2], monthNames[match[1].toLowerCase().substring(0, 3)] - 1);
            endDate = new Date(match[4], monthNames[match[3].toLowerCase().substring(0, 3)] - 1);
          } else {
            // MM/YYYY format
            startDate = new Date(match[2], parseInt(match[1]) - 1);
            endDate = new Date(match[4], parseInt(match[3]) - 1);
          }
        } else {
          // YYYY - YYYY format
          startDate = new Date(match[1], 0);
          endDate = new Date(match[2], 0);
        }

        // Calculate months between dates
        const months = (endDate.getFullYear() - startDate.getFullYear()) * 12 +
                      (endDate.getMonth() - startDate.getMonth());
        totalMonths += months;
      }
    }

    // Look for duration mentions
    const durationPatterns = [
      // X years Y months
      /(\d+)\s*(?:years?|yrs?)\s*(?:and\s+)?(\d+)\s*(?:months?|mos?)/i,
      // X years
      /(\d+(?:\.\d+)?(?:\+)?)\s*(?:years?|yrs?)/i,
      // X months
      /(\d+(?:\.\d+)?(?:\+)?)\s*(?:months?|mos?)/i
    ];

    for (const pattern of durationPatterns) {
      const match = line.match(pattern);
      if (match) {
        foundExperience = true;
        if (match[2]) {
          // X years Y months format
          totalMonths += (parseInt(match[1]) * 12) + parseInt(match[2]);
        } else {
          // Single value format
          const value = parseFloat(match[1]);
          if (pattern.toString().includes('months')) {
            totalMonths += value;
          } else {
            totalMonths += value * 12;
          }
        }
      }
    }
  }

  return foundExperience ? totalMonths : 0;
}

function extractLocations(text) {
  const locationPattern = /\b([A-Z][a-z]+(?:\s[A-Z][a-z]+)*)\b/g;
  return [...text.matchAll(locationPattern)].map(match => match[0]);
}

function analyzeResume(text, { skills, location }) {
  const name = extractName(text);

  // Convert text to lowercase for matching
  const textLower = text.toLowerCase();

  // Extract and match skills
  const matchedSkills = skills.filter(skill => 
    textLower.includes(skill.toLowerCase())
  );

  // Calculate score based on matched skills
  const score = Math.round((matchedSkills.length / skills.length) * 100);

  // Extract total experience
  const totalExperience = extractExperience(text);

  // Check location match and extract the matched location
  // let matchedLocation = null;
  // Extract location
  const extractedLocations = extractLocations(text); 
  //console.log(extractedLocations)
  const userLocations = document.getElementById('location-input').value.split(',').map(loc => loc.trim().toLowerCase()).filter(Boolean);

  const matchedLocation = userLocations.filter(userLoc =>
    extractedLocations.some(resumeLoc => resumeLoc.toLowerCase().includes(userLoc))
  );

  const locationMatch = matchedLocation.length > 0;
  console.log(matchedLocation)   //To check which location matched



  // Determine status based on score
  let status;
  if (score >= 80) {
    status = 'Shortlisted';
  } else if (score >= 50 && score < 80) {
    status = 'Under Review';
  } else {
    status = 'Rejected';
  }

  return {
    name,
    matchedSkills,
    matchedLocation,
    totalExperience,
    score,
    status
  };
}