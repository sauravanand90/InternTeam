import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaArrowLeft, FaFilePdf, FaCheck, FaTimes, FaClipboardList } from 'react-icons/fa';
import ResumeUploader from './ResumeUploader';

export default function ResumeResults() {
  const [sortBy, setSortBy] = useState('score');
  const [sortOrder, setSortOrder] = useState('desc');
  const [results, setResults] = useState([]);
  const [criteria, setCriteria] = useState(null);
  const [uploadedFilesMap, setUploadedFilesMap] = useState({});
  const [shortlistedCount, setShortlistedCount] = useState(0);
  const [showPopup, setShowPopup] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const storedResults = sessionStorage.getItem('resumeResults');
    const storedCriteria = sessionStorage.getItem('jobCriteria');
    
    if (storedCriteria) {
      setCriteria(JSON.parse(storedCriteria));
      if (storedResults) {
        const parsedResults = JSON.parse(storedResults);
        console.log('ResumeResults: Parsed results from session storage:', parsedResults); // Debug log
        // Ensure userActionStatus is null if not explicitly set in stored data
        const initializedResults = parsedResults.map(resume => ({
          ...resume,
          userActionStatus: resume.userActionStatus || null
        }));
        setResults(initializedResults);
        setShortlistedCount(initializedResults.filter(r => r.userActionStatus === 'Shortlisted').length);
      }
    } else {
      // If no criteria found, redirect back to dashboard
      navigate('/dashboard');
    }
  }, [navigate]);

  const handleResultsReady = (newResults, currentCriteria, newUploadedFiles) => {
    // Ensure newly uploaded resumes have userActionStatus initialized to null
    const initializedNewResults = newResults.map(resume => ({
      ...resume,
      userActionStatus: null // Ensure new resumes start with null userActionStatus
    }));

    setResults(initializedNewResults);
    if (currentCriteria) {
      setCriteria(currentCriteria);
      sessionStorage.setItem('jobCriteria', JSON.stringify(currentCriteria));
    }
    if (newUploadedFiles) {
      setUploadedFilesMap(newUploadedFiles);
    }
    // Update session storage with the new results that include userActionStatus
    sessionStorage.setItem('resumeResults', JSON.stringify(initializedNewResults));
    setShortlistedCount(initializedNewResults.filter(r => r.userActionStatus === 'Shortlisted').length);
  };

  const handlePreview = (fileName) => {
    const file = uploadedFilesMap[fileName];
    if (file) {
      const fileUrl = URL.createObjectURL(file);
      window.open(fileUrl, '_blank');
    } else {
      console.error("File not found for preview:", fileName);
      alert("Could not preview file. Please re-upload the file to enable preview.");
    }
  };

  const handleShortlist = (index) => {
    const newResults = [...results];
    // Only change status if it's not already shortlisted by user action
    if (newResults[index].userActionStatus !== 'Shortlisted') {
      // Decrement count if it was previously rejected by user action
      if (newResults[index].userActionStatus === 'Rejected') {
        setShortlistedCount(prevCount => prevCount + 1);
      } else if (newResults[index].userActionStatus === null) {
        setShortlistedCount(prevCount => prevCount + 1);
      }
      newResults[index].userActionStatus = 'Shortlisted';
      setResults(newResults);
      sessionStorage.setItem('resumeResults', JSON.stringify(newResults));
      setShowPopup(true);
      setTimeout(() => setShowPopup(false), 3000);
    }
  };

  const handleReject = (index) => {
    const newResults = [...results];
    // Only change status if it's not already rejected by user action
    if (newResults[index].userActionStatus !== 'Rejected') {
      // Decrement count if it was previously shortlisted by user action
      if (newResults[index].userActionStatus === 'Shortlisted') {
        setShortlistedCount(prevCount => prevCount - 1);
      }
      newResults[index].userActionStatus = 'Rejected';
      setResults(newResults);
      sessionStorage.setItem('resumeResults', JSON.stringify(newResults));
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

  const getCardColor = (result) => {
    // If user has taken an action, prioritize that status
    if (result.userActionStatus === 'Shortlisted') {
      return '#388E3C'; // A slightly different, darker green for user shortlisted
    }
    if (result.userActionStatus === 'Rejected') {
      return 'grey'; // Original Red for user rejected
    }

    // Fallback to initial status if no user action
    switch (result.initialStatus) {
      case 'Shortlisted':
        return '#4CAF50'; // Original Green
      case 'Under Review':
        return '#FFC107'; // Original Yellow
      case 'Rejected':
        return '#F44336'; // Original Red
      default:
        return '#2196F3'; // Default blue (shouldn't be hit if initialStatus is always one of the above)
    }
  };

  const sortedResults = [...results].sort((a, b) => {
    let comparison = 0;
    switch (sortBy) {
      case 'score':
        comparison = a.score - b.score;
        break;
      case 'experience':
        comparison = a.totalExperience - b.totalExperience;
        break;
      case 'name':
        comparison = a.name.localeCompare(b.name);
        break;
      default:
        comparison = 0;
    }
    return sortOrder === 'asc' ? comparison : -comparison;
  });

  // Filter results based on userActionStatus
  const underReviewResults = sortedResults.filter(r => r.userActionStatus === null || r.userActionStatus === 'Shortlisted');
  const rejectedResults = sortedResults.filter(r => r.userActionStatus === 'Rejected');

  if (!criteria) {
    return <div>Loading results...</div>;
  }

  return (
    <div style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <button 
          className='res'
          onClick={() => navigate('/dashboard')}
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
            fontSize: '16px',
            fontFamily: 'Georgia, Times New Roman, Times, serif',
          }}
        >
          <FaArrowLeft /> Back to Dashboard
        </button>
        
        <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
          <select 
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            style={{
              padding: '8px',
              borderRadius: '6px',
              border: '1px solid #ccc',
              fontFamily: 'Georgia, Times New Roman, Times, serif',
            }}
          >
            <option value="score">Sort by Score</option>
            <option value="experience">Sort by Experience</option>
            <option value="name">Sort by Name</option>
          </select>
          
          <button 
            className='res'
            onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
            style={{
              padding: '8px 16px',
              backgroundColor: '#1f3d72',
              color: 'white',
              border: 'none',
              borderRadius: '6px',
              cursor: 'pointer',
              fontFamily: 'Georgia, Times New Roman, Times, serif',
            }}
          >
            {sortOrder === 'asc' ? '↑ Ascending' : '↓ Descending'}
          </button>

          <div 
            style={{
              backgroundColor: '#4CAF50',
              color: 'white',
              padding: '8px 12px',
              borderRadius: '6px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '14px',
              fontWeight: 'bold',
              marginLeft: '10px',
              gap: '5px'
            }}
            onClick={() => navigate('/shortlisted-resumes')}
            title="View Shortlisted Resumes"
          >
            <FaClipboardList size={20} />
            {shortlistedCount}
          </div>
        </div>
      </div>

      <h2 style={{ textAlign: 'center', color: '#2a4d8f', marginBottom: '20px' }}>Resume Analysis Results</h2>

      {criteria && (
        <div style={{ 
          backgroundColor: '#eef2fb',
          padding: '15px',
          borderRadius: '8px',
          marginBottom: '20px',
          border: '1px solid #d4def7'
        }}>
          <h4 style={{ margin: '0 0 10px 0', color: '#2a4d8f', fontFamily: 'Paprika' }}>Job Criteria:</h4>
          <p style={{ margin: '5px 0', fontFamily: 'Georgia, Times New Roman, Times, serif' }}><strong>Skills:</strong> {criteria.skills.join(', ')}</p>
          <p style={{ margin: '5px 0', fontFamily: 'Georgia, Times New Roman, Times, serif' }}><strong>Location:</strong> {criteria.location}</p>
        </div>
      )}

      {criteria && (
        <div style={{ marginBottom: '30px', fontFamily: 'Georgia, Times New Roman, Times, serif' }}>
          <ResumeUploader criteria={criteria} onResultsReady={handleResultsReady} />
        </div>
      )}

      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', 
        gap: '20px',
        padding: '20px 0'
      }}>
        {underReviewResults.map((result, index) => (
          <div
            key={index}
            style={{
              display: 'flex',
              flexDirection: 'column',
              backgroundColor: getCardColor(result),
              color: 'white',
              padding: '20px',
              borderRadius: '10px',
              boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
              fontSize: '15px',
              fontFamily: 'Georgia, Times New Roman, Times, serif'
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
              <h3 style={{ margin: '0' }}>{result.name}</h3>
              {result.fileName && (
                <FaFilePdf 
                  style={{ cursor: 'pointer', fontSize: '24px', color: 'white' }} 
                  onClick={() => handlePreview(result.fileName)}
                  title="Preview PDF"
                />
              )}
            </div>
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
            {/* Tick and Cross Icons at the bottom */}
            <div style={{
              display: 'flex',
              justifyContent: 'flex-end',
              gap: '10px',
              marginTop: 'auto', // Pushes this div to the bottom
              paddingTop: '10px', // Add some space from content above
              borderTop: '1px solid rgba(255,255,255,0.2)' // Optional separator line
            }}>
              <FaCheck 
                className="icon-tick" 
                style={{ cursor: 'pointer', fontSize: '24px' }} 
                onClick={() => handleShortlist(results.findIndex(r => r.fileName === result.fileName))}
                title="Shortlist Resume"
              />
              <FaTimes 
                className="icon-cross" 
                style={{ cursor: 'pointer', fontSize: '24px' }} 
                onClick={() => handleReject(results.findIndex(r => r.fileName === result.fileName))}
                title="Reject Resume"
              />
            </div>
          </div>
        ))}
      </div>

      {rejectedResults.length > 0 && (
        <div style={{ marginTop: '40px' }}>
          <h2 style={{ textAlign: 'center', color: '#dc3545', marginBottom: '20px' }}>Rejected Resumes</h2>
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', 
            gap: '20px',
            padding: '20px 0'
          }}>
            {rejectedResults.map((result, index) => (
              <div
                key={index}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  backgroundColor: getCardColor(result),
                  color: 'white',
                  padding: '20px',
                  borderRadius: '10px',
                  boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                  fontSize: '15px'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                  <h3 style={{ margin: '0' }}>{result.name}</h3>
                  {result.fileName && (
                    <FaFilePdf 
                      style={{ cursor: 'pointer', fontSize: '24px', color: 'white' }} 
                      onClick={() => handlePreview(result.fileName)}
                      title="Preview PDF"
                    />
                  )}
                </div>
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
                {/* Tick icon for Rejected resumes to move them back */}
                <div style={{
                  display: 'flex',
                  justifyContent: 'flex-end',
                  gap: '10px',
                  marginTop: 'auto',
                  paddingTop: '10px',
                  borderTop: '1px solid rgba(255,255,255,0.2)'
                }}>
                  <FaCheck 
                    className="icon-tick" 
                    style={{ cursor: 'pointer', fontSize: '24px' }} 
                    onClick={() => handleShortlist(results.findIndex(r => r.fileName === result.fileName))}
                    title="Move to Shortlisted/Under Review"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {showPopup && (
        <div style={{
          position: 'fixed',
          bottom: '20px',
          right: '20px',
          backgroundColor: '#4CAF50',
          color: 'white',
          padding: '10px 20px',
          borderRadius: '5px',
          boxShadow: '0 2px 10px rgba(0,0,0,0.2)',
          zIndex: 1000,
          animation: 'fadeInOut 3s forwards',
          fontFamily: 'Georgia, Times New Roman, Times, serif'
        }}>
          Resume shortlisted!
        </div>
      )}

      <style>{`
        @keyframes fadeInOut {
          0% { opacity: 0; transform: translateY(20px); }
          10% { opacity: 1; transform: translateY(0); }
          90% { opacity: 1; transform: translateY(0); }
          100% { opacity: 0; transform: translateY(20px); }
        }
      `}</style>

    </div>
  );
}