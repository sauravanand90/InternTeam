import React, { useState, useCallback } from 'react';
import * as pdfjsLib from 'pdfjs-dist';
import pdfjsWorker from 'pdfjs-dist/build/pdf.worker.entry';
import { FaFileAlt } from 'react-icons/fa';

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

export default function ResumeUploader({ criteria, onResultsReady, onScrollToCategory, shortlistedCount, rejectedCount, totalResumesCount }) {
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
        const { name, matchedSkills, matchedLocation, totalExperience, score, initialStatus, userActionStatus, email, phoneNumber } = analyzeResume(text, criteria);
        
        // Store the file for preview
        tempFiles[file.name] = file;
        
        tempResults.push({ 
          fileName: file.name,
          name,
          matchedSkills,
          matchedLocation,
          totalExperience,
          score,
          initialStatus,
          userActionStatus,
          email,
          phoneNumber
        });
      }
    }

    setUploadedFiles(tempFiles);
    setLoading(false);
    onResultsReady(tempResults, criteria, tempFiles);
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
  }, [criteria, onResultsReady, handleFiles]);

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
        <p style={{ marginBottom: '15px', color: '#706565', fontFamily: 'Tinos, serif' }}>
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
              backgroundColor: '#1976D2',
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
      <div style={{ display: 'flex', justifyContent: 'flex-start', gap: '20px', marginTop: '20px' }}>
        <button 
          onClick={() => onScrollToCategory('shortlisted')}
          style={{
            backgroundColor: '#4CAF50',
            color: 'white',
            padding: '10px 20px',
            borderRadius: '5px',
            border: 'none',
            cursor: 'pointer',
            fontSize: '16px',
            transition: 'background-color 0.3s'
          }} onMouseOver={(e) => e.target.style.backgroundColor = '#45a049'} onMouseOut={(e) => e.target.style.backgroundColor = '#4CAF50'}>
          Shortlisted Resumes ({shortlistedCount})
        </button>
        <button 
          onClick={() => onScrollToCategory('rejected')}
          style={{
            backgroundColor: '#f44336',
            color: 'white',
            padding: '10px 20px',
            borderRadius: '5px',
            border: 'none',
            cursor: 'pointer',
            fontSize: '16px',
            transition: 'background-color 0.3s'
          }} onMouseOver={(e) => e.target.style.backgroundColor = '#da190b'} onMouseOut={(e) => e.target.style.backgroundColor = '#f44336'}>
          Rejected Resumes ({rejectedCount})
        </button>
        <div 
          // onClick={() => onScrollToCategory('all')}
          style={{
            color: 'rgb(27, 27, 71)',
            padding: '10px 20px',
            paddingLeft: '20px',
            borderRadius: '5px',
            border: 'none',
            fontSize: '20px',
          }} 
          // onMouseOver={(e) => e.target.style.backgroundColor = '#1976D2'} onMouseOut={(e) => e.target.style.backgroundColor = '#2196F3'}
          ><FaFileAlt size={20} />Total Resumes
           ({totalResumesCount})
        </div>   
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
    const STOP_WORDS = [
        'engineer', 'software', 'associate', 'junior', 'street', 'location', 'greater',
        'experienced', 'intern', 'contact', 'email', 'linkedin', 'phone', 'education',
        'skills', 'resume', 'cv', 'curriculum', 'vitae', 'profile', 'professional',
        'summary', 'objective', 'career', 'experience', 'work', 'history',
        'mid-level', 'mid', 'level', 'senior', 'lead', 'team', 'manager', 'specialist',
        'analyst', 'developer', 'designer', 'consultant', 'coordinator', 'administrator',
        'assistant', 'executive', 'director', 'vice', 'president', 'chief', 'and'
    ];

    const preprocessedText = text
        .slice(0, 500)
        .replace(/[^\w\s.-]/g, ' ')
        .replace(/\s{2,}/g, ' ')
        .trim();

    const words = preprocessedText.split(/\s+/);
    let nameParts = [];
    let foundName = false;

    for (let i = 0; i < words.length; i++) {
        const word = words[i].trim();
        if (!word) continue;

        const lower = word.toLowerCase();
        
        if (STOP_WORDS.includes(lower)) {
            if (foundName) break;
            continue;
        }

        if (/^[A-Z][a-z]*$/.test(word) ||
            /^[A-Z]{2,}$/.test(word) ||
            /^[A-Z]\.$/.test(word) ||
            /^[A-Z]$/.test(word) ||
            /^[A-Z][a-z]*-[A-Z][a-z]*$/.test(word)) {
            
            nameParts.push(word);
            foundName = true;
        } else if (foundName) {
            break;
        }
    }

    let processedNameParts = [];
    let currentBlock = [];

    for (let i = 0; i < nameParts.length; i++) {
        const part = nameParts[i];
        if (/^[A-Z]$/.test(part)) {
            currentBlock.push(part);
        } else {
            if (currentBlock.length > 0) {
                if (currentBlock.length > 1) {
                    processedNameParts.push(currentBlock.join(''));
                } else {
                    processedNameParts.push(currentBlock[0]);
                }
                currentBlock = [];
            }
            processedNameParts.push(part);
        }
    }

    if (currentBlock.length > 0) {
        if (currentBlock.length > 1) {
            processedNameParts.push(currentBlock.join(''));
        } else {
            processedNameParts.push(currentBlock[0]);
        }
    }

    let combinedName = processedNameParts.join(' ').trim();

    // Handle true initials (e.g., J K L -> J. K. L.)
    // This applies if the name still looks like space-separated single letters
    if (combinedName.split(' ').every(part => /^[A-Z]$/.test(part) || /^[A-Z]\.$/.test(part)) && combinedName.split(' ').length >= 2) {
        combinedName = combinedName.split(' ').map(part => {
            if (/^[A-Z]$/.test(part)) return part + '.';
            return part;
        }).join(' ');
    }

    // Handle capitalization for all name parts, including special prefixes like Mc/Mac
    combinedName = combinedName
        .split(' ')
        .map(word => {
            if (/^[A-Z]\.$/.test(word)) return word; // Keep initials with periods as is
            
            const lowerWord = word.toLowerCase();
            if (lowerWord.startsWith('mc') && word.length > 2) {
                return 'Mc' + word.charAt(2).toUpperCase() + word.slice(3).toLowerCase();
            }
            if (lowerWord.startsWith('mac') && word.length > 3) {
                return 'Mac' + word.charAt(3).toUpperCase() + word.slice(4).toLowerCase();
            }
            // For other words, ensure first letter is capitalized, rest lowercase
            return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
        })
        .join(' ');

    // Handle hyphenated names (e.g., mary-jane -> Mary-Jane)
    combinedName = combinedName.replace(/([A-Za-z]+)-([A-Za-z]+)/g, (_, p1, p2) => 
        p1.charAt(0).toUpperCase() + p1.slice(1).toLowerCase() + '-' + p2.charAt(0).toUpperCase() + p2.slice(1).toLowerCase()
    );

    // Final validation
    if (!combinedName || combinedName.length < 2 || combinedName.toLowerCase() === 'unknown') {
        return 'Unknown';
    }
    
    return combinedName;
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

function matchLocation(text, location) {
  const locationPattern = new RegExp(location, 'gi');
  return [...text.matchAll(locationPattern)].map(match => match[0]);
}

function extractEmail(text) {
  // Comprehensive email regex that handles various formats
  const emailPattern = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g;
  const emails = text.match(emailPattern);
  return emails && emails.length > 0 ? emails[0] : null;
}

function extractPhoneNumber(text) {
  // Comprehensive phone regex that handles:
  // - International numbers with country codes (+91, +1, etc.)
  // - Numbers with or without spaces, hyphens, or dots
  // - Numbers with or without parentheses
  // - Numbers with optional extensions
  const phonePattern = /(?:\+\d{1,3}[-.\s]?)?(?:\(?\d{3}\)?[-.\s]?)?\d{3}[-.\s]?\d{4}(?:[-.\s]?(?:ext|x|extension)[-.\s]?\d{1,5})?/g;
  const phoneNumbers = text.match(phonePattern);
  
  if (phoneNumbers) {
    for (const num of phoneNumbers) {
      // Clean the number and check if it has enough digits
      const digits = num.replace(/[^\d]/g, '');
      if (digits.length >= 7 && digits.length <= 15) { // Most phone numbers are between 7-15 digits
        return num.trim();
      }
    }
  }
  return null;
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
  const extractedLocations = extractLocations(text); 
  //console.log(extractedLocations)
  const userLocations = location.split(',').map(loc => loc.trim().toLowerCase()).filter(Boolean);

  const matchedLocation = userLocations.filter(userLoc =>
    extractedLocations.some(resumeLoc => resumeLoc.toLowerCase().includes(userLoc))
  );

  // console.log(matchedLocation)   //To check which location matched

  // Determine initial status based on score
  let initialStatus;
  if (score >= 80) {
    initialStatus = 'Shortlisted';
  } else if (score >= 50 && score < 80) {
    initialStatus = 'Under Review';
  } else {
    initialStatus = 'Rejected';
  }

  const email = extractEmail(text);
  const phoneNumber = extractPhoneNumber(text);

  console.log("analyzeResume: Extracted Email:", email);
  console.log("analyzeResume: Extracted Phone Number:", phoneNumber);

  return {
    name,
    matchedSkills,
    matchedLocation,
    totalExperience,
    score,
    initialStatus,
    userActionStatus: null,
    email,
    phoneNumber
  };
}