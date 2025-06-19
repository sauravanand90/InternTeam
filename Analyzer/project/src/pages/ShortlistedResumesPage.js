import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaArrowLeft, FaDownload, FaSortAmountUpAlt, FaSortAmountDownAlt } from 'react-icons/fa';
import * as XLSX from 'xlsx'; // Import xlsx library

export default function ShortlistedResumesPage() {
  const [shortlistedResumes, setShortlistedResumes] = useState([]);
  const [sortField, setSortField] = useState('score');
  const [sortDirection, setSortDirection] = useState('desc');
  const navigate = useNavigate();

  useEffect(() => {
    const storedResults = sessionStorage.getItem('resumeResults');
    if (storedResults) {
      const allResumes = JSON.parse(storedResults);
      const filtered = allResumes.filter(resume => resume.userActionStatus === 'Shortlisted');
      setShortlistedResumes(filtered);
    }
  }, []);

  const handleSortFieldChange = (e) => {
    setSortField(e.target.value);
  };

  const handleSortDirectionToggle = () => {
    setSortDirection((prev) => (prev === 'asc' ? 'desc' : 'asc'));
  };

  const getSortedResumes = () => {
    const sorted = [...shortlistedResumes];
    sorted.sort((a, b) => {
      let aValue, bValue;
      if (sortField === 'name') {
        aValue = a.name ? a.name.toLowerCase() : '';
        bValue = b.name ? b.name.toLowerCase() : '';
      } else if (sortField === 'score') {
        aValue = Number(a.score);
        bValue = Number(b.score);
      } else if (sortField === 'location') {
        aValue = (a.matchedLocation && a.matchedLocation[0]) ? a.matchedLocation[0].toLowerCase() : '';
        bValue = (b.matchedLocation && b.matchedLocation[0]) ? b.matchedLocation[0].toLowerCase() : '';
      } else if (sortField === 'experience') {
        aValue = Number(a.totalExperience) || 0;
        bValue = Number(b.totalExperience) || 0;
      }
      
      if (aValue < bValue) return sortDirection === 'asc' ? -1 : 1;
      if (aValue > bValue) return sortDirection === 'asc' ? 1 : -1;
      return 0;
    });
    return sorted;
  };

  const handleDownloadExcel = () => {
    const data = shortlistedResumes.map(resume => ({
      Name: resume.name,
      // FileName: resume.fileName,
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
    <div style={{ padding: '20px', maxWidth: '100%', minHeight: '100vh', margin: '0 auto', backgroundColor:'rgb(231, 233, 245)' }}>
      <div style={{ position: 'relative', display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <button className='res'
          onClick={() => navigate('/results')}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            padding: '8px 16px',
            backgroundColor: '#201783',
            color: 'white',
            border: 'none',
            borderRadius: '6px',
            cursor: 'pointer',
            fontSize: '16px',
            fontFamily: 'Tinos, serif'
          }}
        >
          <FaArrowLeft /> Back to Results
        </button>
        <p style={{
          position: 'absolute',
          left: '50%',
          transform: 'translateX(-50%)',
          textAlign: 'center',
          color: '#2a4d8f',
          margin: '0',
          fontFamily: 'Times New Roman, Times, serif',
          fontSize: '35px',
          fontWeight: 'bold',
          whiteSpace: 'nowrap'
        }}>Shortlisted Resumes</p>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          {/* Sort Controls */}
          <select
            value={sortField}
            onChange={handleSortFieldChange}
            style={{
              padding: '4px 10px',
              borderRadius: '5px',
              border: '1px solid #ccc',
              fontSize: '14px',
              fontFamily: 'Tinos, serif',
              background: '#f5f5fa',
              color: '#222',
              outline: 'none',
              fontWeight: 500,
              height: '36px',
              minWidth: '120px'
            }}
          >
            <option value="score">Sort by Score</option>
            <option value="name">Sort by Name</option>
            <option value="location">Sort by Location</option>
            <option value="experience">Sort by Experience</option>
          </select>
          <button
            onClick={handleSortDirectionToggle}
            style={{
              background: '#201783',
              color: 'white',
              border: 'none',
              borderRadius: '6px',
              padding: '4px 14px',
              fontSize: '14px',
              fontFamily: 'Tinos, serif',
              fontWeight: 500,
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              cursor: 'pointer',
              height: '36px',
            }}
          >
            {sortDirection === 'asc' ? (
              <><FaSortAmountUpAlt style={{marginRight: '1px'}} />Asc</>
            ) : (
              <><FaSortAmountDownAlt style={{marginRight: '1px'}} />Desc</>
            )}
          </button>
          <button 
            onClick={handleDownloadExcel}
            disabled={shortlistedResumes.length === 0}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              padding: '8px 16px',
              backgroundColor: '#28a745',
              color: 'white',
              border: 'none',
              borderRadius: '6px',
              cursor: shortlistedResumes.length === 0 ? 'not-allowed' : 'pointer',
              fontSize: '16px',
              opacity: shortlistedResumes.length === 0 ? 0.5 : 1
            }}
          >
            <FaDownload />
          </button>
        </div>
      </div>

      {shortlistedResumes.length > 0 ? (
        <table style={{ width: '100%', borderCollapse: 'collapse', color:'white', marginTop: '20px', fontFamily: 'Tinos, serif', backgroundColor:'transparent', border:'2px solid #2a4d8f'}}>
          <thead>
            <tr style={{ backgroundColor: 'transparent', borderBottom: '2px solid #2a4d8f' }}>
              <th style={{ padding: '12px', textAlign: 'left', color: '#2a4d8f' }}>Name</th>
              {/* <th style={{ padding: '12px', textAlign: 'left', color: '#2a4d8f' }}>File Name</th> */}
              <th style={{ padding: '12px', textAlign: 'left', color: '#2a4d8f' }}>Score</th>
              <th style={{ padding: '12px', textAlign: 'left', color: '#2a4d8f' }}>Experience</th>
              <th style={{ padding: '12px', textAlign: 'left', color: '#2a4d8f' }}>Matched Skills</th>
              <th style={{ padding: '12px', textAlign: 'left', color: '#2a4d8f' }}>Location</th>
              <th style={{ padding: '12px', textAlign: 'left', color: '#2a4d8f' }}>Email</th>
              <th style={{ padding: '12px', textAlign: 'left', color: '#2a4d8f' }}>Phone Number</th>
            </tr>
          </thead>
          <tbody>
            {getSortedResumes().map((resume, index) => (
              <tr key={index} style={{ borderBottom: '1px solid #eee', backgroundColor: index % 2 === 0 ? '#fff' : '#f9f9f9' }}>
                <td style={{ padding: '12px', color: '#333' }}>{resume.name}</td>
                {/* <td style={{ padding: '12px', color: '#333' }}>{resume.fileName}</td> */}
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
        <p style={{ textAlign: 'center', marginTop: '50px', fontSize: '18px', color: '#706565', fontFamily: 'Tinos, serif', marginLeft: '85px' }}>No resumes have been shortlisted yet.</p>
      )}
    </div>
  );
} 