import React, { useState, useCallback } from 'react';
import * as pdfjsLib from 'pdfjs-dist';
import pdfjsWorker from 'pdfjs-dist/build/pdf.worker.entry';

pdfjsLib.GlobalWorkerOptions.workerSrc = pdfjsWorker;

export default function ResumeUploader({ criteria }) {
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState([]);
  const [uploadedFiles, setUploadedFiles] = useState({});
  const [sortBy, setSortBy] = useState('score-desc');
  const [showEmailModal, setShowEmailModal] = useState(false);
  const [selectedCandidate, setSelectedCandidate] = useState(null);
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
    sortResults(tempResults, sortBy);
    setLoading(false);
  };

  const onDrop = useCallback((e) => {
    e.preventDefault();
    setIsDragging(false);
    const files = e.dataTransfer.files;
    handleFiles(files);
  }, [criteria]);

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
    handleFiles(files);
  };

  const handlePreview = (fileName) => {
    const file = uploadedFiles[fileName];
    if (file) {
      const fileUrl = URL.createObjectURL(file);
      window.open(fileUrl, '_blank');
    }
  };

  const handleEmail = (candidate) => {
    setSelectedCandidate(candidate);
    setShowEmailModal(true);
  };

  const getEmailTemplate = (candidate) => {
    const currentDate = new Date();
    const interviewDate = new Date(currentDate.setDate(currentDate.getDate() + 3)); // Schedule interview 3 days from now
    const formattedDate = interviewDate.toLocaleDateString('en-US', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
    const formattedTime = '10:00 AM';

    if (candidate.status === 'Shortlisted') {
      return {
        subject: `Interview Invitation - ${candidate.name}`,
        body: `Dear ${candidate.name},

We are pleased to inform you that your application has been shortlisted for the position. Your profile matches our requirements, particularly in the following areas:
${candidate.matchedSkills.map(skill => `- ${skill}`).join('\n')}

We would like to invite you for an interview on ${formattedDate} at ${formattedTime}.

Please confirm your availability for this interview slot. If this time doesn't work for you, please let us know your preferred time slots.

Best regards,
Hiring Team`
      };
    } else {
      return {
        subject: `Application Status - ${candidate.name}`,
        body: `Dear ${candidate.name},

Thank you for your interest in the position and for taking the time to apply. After careful consideration of your application, we regret to inform you that we have decided to move forward with other candidates whose qualifications more closely match our current needs.

We appreciate your interest in joining our team and wish you success in your job search.

Best regards,
Hiring Team`
      };
    }
  };

  const sendEmail = (candidate) => {
    const { subject, body } = getEmailTemplate(candidate);
    const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.open(gmailUrl, '_blank');
    setShowEmailModal(false);
  };

  const handleSort = (e) => {
    const newSortBy = e.target.value;
    setSortBy(newSortBy);
    sortResults([...results], newSortBy);
  };

  const sortResults = (resultsToSort, sortCriteria) => {
    let sortedResults = [...resultsToSort];
    
    switch (sortCriteria) {
      case 'score-desc':
        sortedResults.sort((a, b) => b.score - a.score);
        break;
      case 'score-asc':
        sortedResults.sort((a, b) => a.score - b.score);
        break;
      case 'name-asc':
        sortedResults.sort((a, b) => (a.name || '').localeCompare(b.name || ''));
        break;
      case 'name-desc':
        sortedResults.sort((a, b) => (b.name || '').localeCompare(a.name || ''));
        break;
      case 'experience-desc':
        sortedResults.sort((a, b) => b.totalExperience - a.totalExperience);
        break;
      case 'experience-asc':
        sortedResults.sort((a, b) => a.totalExperience - b.totalExperience);
        break;
      case 'status':
        const statusOrder = { 'Shortlisted': 0, 'Under Review': 1, 'Rejected': 2 };
        sortedResults.sort((a, b) => statusOrder[a.status] - statusOrder[b.status]);
        break;
      default:
        break;
    }
    
    setResults(sortedResults);
  };

  const getCardColor = (status) => {
    switch (status) {
      case 'Shortlisted':
        return '#4CAF50'; // Green
      case 'Under Review':
        return '#FFC107'; // Yellow
      case 'Rejected':
        return '#F44336'; // Red
      default:
        return '#9E9E9E'; // Grey
    }
  };

  const formatExperience = (months) => {
    const years = Math.floor(months / 12);
    const remainingMonths = months % 12;
    
    if (years === 0) {
      return `${remainingMonths} months`;
    } else if (remainingMonths === 0) {
      return `${years} years`;
    } else {
      return `${years} years ${remainingMonths} months`;
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
          Drag and drop PDF files here, or
        </p>
        <div>
          <input
            type="file"
            webkitdirectory="true"
            directory=""
            accept=".pdf"
            onChange={handleFileInput}
            style={{ display: 'none' }}
            id="file-input"
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
            Select Folder
          </label>
        </div>
      </div>

      {loading && (
        <div style={{ textAlign: 'center', margin: '20px 0' }}>
          <p>Analyzing resumes...</p>
        </div>
      )}
      
      {results.length > 0 && (
        <div style={{ margin: '20px 0'}}>
          <label style={{ marginRight: '10px', color: '#333' }}>Sort by: </label>
          <select 
            value={sortBy} 
            onChange={handleSort}
            style={{
              padding: '8px',
              borderRadius: '5px',
              border: '1px solid #ccc',
              backgroundColor: 'white',
              cursor: 'pointer',
              minWidth: '200px',
            }}
          >
            <option value="score-desc">Score (High to Low)</option>
            <option value="score-asc">Score (Low to High)</option>
            <option value="name-asc">Name (A to Z)</option>
            <option value="name-desc">Name (Z to A)</option>
            <option value="experience-desc">Experience (High to Low)</option>
            <option value="experience-asc">Experience (Low to High)</option>
            <option value="status">Status (Shortlisted → Rejected)</option>
          </select>
        </div>
      )}

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px', marginTop: '20px', justifyContent: 'center', alignItems: 'center' }}>
        {results.map((result, index) => (
          <div
            key={index}
            style={{
              height: '300px',
              display: 'flex',
              flexDirection: 'column',
              backgroundColor: getCardColor(result.status),
              color: 'white',
              padding: '20px',
              borderRadius: '10px',
              width: '300px',
              boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
              fontSize: '15px'
            }}
          >
            <h3 style={{ margin: '0 0 10px 0' }}>{result.name}</h3>
            <p style={{ margin: '5px 0' }}><strong>File:</strong> {result.fileName}</p>
            <p style={{ margin: '5px 0' }}><strong>Score:</strong> {result.score}%</p>
            <p style={{ margin: '5px 0' }}><strong>Total Experience:</strong> {formatExperience(result.totalExperience)}</p>
            <div style={{ margin: '10px 0' }}>
                <strong style={{ marginRight: '5px' }}>Matched Skills:</strong>
                <span>{result.matchedSkills.join(', ') || 'No skills matched'}</span>
            </div>
            <div style={{ margin: '5px 0' }}>
                <strong style={{ marginRight: '5px' }}>Location:</strong>
                <span>{result.matchedLocation.join(', ') || 'No location matched'}</span>
            </div>
            {/* <div style={{ margin: '5px 0' }}>
              <strong>Location:</strong> {result.matchedLocation || 'No location match found'} 
            </div> */}
            <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
              <button className='preview'
                onClick={() => handlePreview(result.fileName)}
                style={{
                  backgroundColor: 'rgba(255, 255, 255, 0.2)',
                  color: 'white',
                  border: '1px solid white',
                  padding: '8px 16px',
                  borderRadius: '5px',
                  cursor: 'pointer',
                  flex: 'none',
                  transition: 'background-color 0.3s',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
                onMouseOver={(e) => e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.3)'}
                onMouseOut={(e) => e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.2)'}
              >
                Preview
              </button>
            </div>
          </div>
        ))}
      </div>

      {showEmailModal && selectedCandidate && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          zIndex: 1000
        }}>
          <div style={{
            backgroundColor: 'white',
            padding: '20px',
            borderRadius: '10px',
            maxWidth: '500px',
            width: '90%',
            maxHeight: '90vh',
            overflow: 'auto'
          }}>
            <h3 style={{ margin: '0 0 20px 0', color: '#333' }}>
              {selectedCandidate.status === 'Shortlisted' ? 'Interview Email' : 'Rejection Email'}
            </h3>
            <div style={{ marginBottom: '20px' }}>
              <strong style={{ color: '#333' }}>Subject:</strong>
              <p style={{ color: '#666' }}>{getEmailTemplate(selectedCandidate).subject}</p>
            </div>
            <div style={{ marginBottom: '20px' }}>
              <strong style={{ color: '#333' }}>Body:</strong>
              <pre style={{ 
                whiteSpace: 'pre-wrap', 
                color: '#666',
                backgroundColor: '#f5f5f5',
                padding: '10px',
                borderRadius: '5px',
                marginTop: '10px'
              }}>
                {getEmailTemplate(selectedCandidate).body}
              </pre>
            </div>
            <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end' }}>
              <button
                onClick={() => setShowEmailModal(false)}
                style={{
                  padding: '8px 16px',
                  borderRadius: '5px',
                  border: '1px solid #ccc',
                  backgroundColor: '#f5f5f5',
                  cursor: 'pointer',
                  transition: 'background-color 0.3s'
                }}
                onMouseOver={(e) => e.target.style.backgroundColor = '#ffebee'}
                onMouseOut={(e) => e.target.style.backgroundColor = '#f5f5f5'}
              >
                Cancel
              </button>
              <button
                onClick={() => sendEmail(selectedCandidate)}
                style={{
                  padding: '8px 16px',
                  borderRadius: '5px',
                  border: 'none',
                  backgroundColor: '#4CAF50',
                  color: 'white',
                  cursor: 'pointer'
                }}
              >
                Send Email
              </button>
            </div>
          </div>
        </div>
      )}
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

  // Try different location matching patterns
  // const locationPatterns = [
  //   new RegExp(`\\b${locationLower}\\b`, 'i'),  // Exact word match
  //   new RegExp(locationLower, 'i'),             // Partial match
  //   new RegExp(locationLower.replace(/\s+/g, '\\s*'), 'i')  // Flexible space match
  // ];

  // for (const pattern of locationPatterns) {
  //   const match = text.match(pattern);
  //   if (match) {
  //     // Find the original case version of the location
  //     const startIndex = textLower.indexOf(match[0]);
  //     const endIndex = startIndex + match[0].length;
  //     matchedLocation = text.slice(startIndex, endIndex);
  //     console.log('Location matched:', matchedLocation);
  //     break;
  //   }
  // }

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