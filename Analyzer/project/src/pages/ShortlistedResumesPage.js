import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaArrowLeft, FaDownload } from 'react-icons/fa';
import * as XLSX from 'xlsx'; // Import xlsx library

export default function ShortlistedResumesPage() {
  const [shortlistedResumes, setShortlistedResumes] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const storedResults = sessionStorage.getItem('resumeResults');
    if (storedResults) {
      const allResumes = JSON.parse(storedResults);
      const filtered = allResumes.filter(resume => resume.userActionStatus === 'Shortlisted');
      setShortlistedResumes(filtered);
    }
  }, []);

  const handleDownloadExcel = () => {
    const data = shortlistedResumes.map(resume => ({
      Name: resume.name,
      FileName: resume.fileName,
      Score: `${resume.score}%`,
      TotalExperience: formatExperience(resume.totalExperience),
      MatchedSkills: resume.matchedSkills.join(', '),
      Location: resume.matchedLocation.join(', ') || 'No location matched',
      Email: resume.email || 'N/A',
      PhoneNumber: resume.phoneNumber || 'N/A',
      Status: resume.userActionStatus,
    }));

    const ws = XLSX.utils.json_to_sheet(data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Shortlisted Resumes');
    XLSX.writeFile(wb, 'shortlisted_resumes.xlsx');
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
    <div style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <button 
          onClick={() => navigate('/results')}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            padding: '8px 16px',
            backgroundColor: '#1f3d72',
            color: 'white',
            border: 'none',
            borderRadius: '6px',
            cursor: 'pointer',
            fontSize: '16px'
          }}
        >
          <FaArrowLeft /> Back to Results
        </button>
        <h1 style={{ color: '#2a4d8f', margin: '0' }}>Shortlisted Resumes</h1>
        <button 
          onClick={handleDownloadExcel}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            padding: '8px 16px',
            backgroundColor: '#28a745',
            color: 'white',
            border: 'none',
            borderRadius: '6px',
            cursor: 'pointer',
            fontSize: '16px'
          }}
        >
          <FaDownload />
        </button>
      </div>

      {shortlistedResumes.length > 0 ? (
        <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '20px' }}>
          <thead>
            <tr style={{ backgroundColor: '#eef2fb', borderBottom: '2px solid #d4def7' }}>
              <th style={{ padding: '12px', textAlign: 'left', color: '#2a4d8f' }}>Name</th>
              <th style={{ padding: '12px', textAlign: 'left', color: '#2a4d8f' }}>File Name</th>
              <th style={{ padding: '12px', textAlign: 'left', color: '#2a4d8f' }}>Score</th>
              <th style={{ padding: '12px', textAlign: 'left', color: '#2a4d8f' }}>Experience</th>
              <th style={{ padding: '12px', textAlign: 'left', color: '#2a4d8f' }}>Matched Skills</th>
              <th style={{ padding: '12px', textAlign: 'left', color: '#2a4d8f' }}>Location</th>
              <th style={{ padding: '12px', textAlign: 'left', color: '#2a4d8f' }}>Email</th>
              <th style={{ padding: '12px', textAlign: 'left', color: '#2a4d8f' }}>Phone Number</th>
            </tr>
          </thead>
          <tbody>
            {shortlistedResumes.map((resume, index) => (
              <tr key={index} style={{ borderBottom: '1px solid #eee', backgroundColor: index % 2 === 0 ? '#fff' : '#f9f9f9' }}>
                <td style={{ padding: '12px', color: '#333' }}>{resume.name}</td>
                <td style={{ padding: '12px', color: '#333' }}>{resume.fileName}</td>
                <td style={{ padding: '12px', color: '#333' }}>{resume.score}%</td>
                <td style={{ padding: '12px', color: '#333' }}>{formatExperience(resume.totalExperience)}</td>
                <td style={{ padding: '12px', color: '#333' }}>{resume.matchedSkills.join(', ') || 'N/A'}</td>
                <td style={{ padding: '12px', color: '#333' }}>{resume.matchedLocation.join(', ') || 'No location matched'}</td>
                <td style={{ padding: '12px', color: '#333' }}>{resume.email || 'N/A'}</td>
                <td style={{ padding: '12px', color: '#333' }}>{resume.phoneNumber || 'N/A'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p style={{ textAlign: 'center', marginTop: '50px', fontSize: '18px', color: '#555' }}>No resumes have been shortlisted yet.</p>
      )}
    </div>
  );
} 