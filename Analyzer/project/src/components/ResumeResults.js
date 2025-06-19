import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaArrowLeft, FaFilePdf, FaCheck, FaTimes, FaClipboardList, FaRedo, FaSortAmountUpAlt, FaSortAmountDownAlt } from 'react-icons/fa';
import ResumeUploader from './ResumeUploader';

export default function ResumeResults() {
  const [sortBy, setSortBy] = useState('score');
  const [sortOrder, setSortOrder] = useState('desc');
  const [results, setResults] = useState([]);
  const [criteria, setCriteria] = useState(null);
  const [uploadedFilesMap, setUploadedFilesMap] = useState({});
  const [shortlistedCount, setShortlistedCount] = useState(0);
  const [rejectedCount, setRejectedCount] = useState(0);
  const [showPopup, setShowPopup] = useState(false);
  const [showRejectPopup, setShowRejectPopup] = useState(false);
  const [showRestorePopup, setShowRestorePopup] = useState(false);
  const navigate = useNavigate();

  const allResumesRef = useRef(null);
  const shortlistedResumesRef = useRef(null);
  const rejectedResumesRef = useRef(null);

  useEffect(() => {
    const storedResults = sessionStorage.getItem('resumeResults');
    const storedCriteria = sessionStorage.getItem('jobCriteria');
    
    if (storedCriteria) {
      setCriteria(JSON.parse(storedCriteria));
      if (storedResults) {
        const parsedResults = JSON.parse(storedResults);
        console.log('ResumeResults: Parsed results from session storage:', parsedResults); // Debug log
        const initializedResults = parsedResults.map(resume => {
          const meetsExperience = checkExperienceCriteria(resume, JSON.parse(storedCriteria));
          return {
            ...resume,
            userActionStatus: resume.userActionStatus || null,
            initialStatus: meetsExperience ? (resume.initialStatus || 'Under Review') : 'Rejected'
          };
        });
        setResults(initializedResults);
        setShortlistedCount(initializedResults.filter(r => r.userActionStatus === 'Shortlisted' || r.initialStatus === 'Shortlisted').length);
        setRejectedCount(initializedResults.filter(r => r.userActionStatus === 'Rejected' || r.initialStatus === 'Rejected').length);
      }
    } else {
      navigate('/dashboard');
    }
  }, [navigate]);

  const handleResultsReady = (newResults, currentCriteria, newUploadedFiles) => {
    const initializedNewResults = newResults.map(resume => {
      const meetsExperience = checkExperienceCriteria(resume, currentCriteria);
      return {
        ...resume,
        userActionStatus: null,
        initialStatus: meetsExperience ? 'Under Review' : 'Rejected'
      };
    });

    setResults(prevResults => {
      const existingFileNames = new Set(prevResults.map(r => r.fileName));
      const trulyNewResults = initializedNewResults.filter(r => !existingFileNames.has(r.fileName));
      const combinedResults = [...prevResults, ...trulyNewResults];
      sessionStorage.setItem('resumeResults', JSON.stringify(combinedResults));
      
      // Recalculate counts based on combined results' initialStatus and userActionStatus
      const updatedShortlistedCount = combinedResults.filter(r => r.userActionStatus === 'Shortlisted' || (r.userActionStatus === null && r.initialStatus === 'Shortlisted')).length;
      const updatedRejectedCount = combinedResults.filter(r => r.userActionStatus === 'Rejected' || (r.userActionStatus === null && r.initialStatus === 'Rejected')).length;
      
      setShortlistedCount(updatedShortlistedCount);
      setRejectedCount(updatedRejectedCount);
      return combinedResults;
    });
    if (currentCriteria) {
      setCriteria(currentCriteria);
      sessionStorage.setItem('jobCriteria', JSON.stringify(currentCriteria));
    }
    if (newUploadedFiles) {
      setUploadedFilesMap(prevMap => ({ ...prevMap, ...newUploadedFiles }));
    }
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
    if (newResults[index].userActionStatus !== 'Shortlisted') {
      if (newResults[index].userActionStatus === 'Rejected' || newResults[index].initialStatus === 'Rejected') { // Check initialStatus too
        setRejectedCount(prevCount => prevCount - 1); 
      }
      newResults[index].userActionStatus = 'Shortlisted';
      setShortlistedCount(prevCount => prevCount + 1);
      setResults(newResults);
      sessionStorage.setItem('resumeResults', JSON.stringify(newResults));
      setShowPopup(true);
      setTimeout(() => setShowPopup(false), 3000);
    }
  };

  const handleReject = (index) => {
    const newResults = [...results];
    // If already rejected by user, clicking cross will un-reject (move to null status)
    if (newResults[index].userActionStatus === 'Rejected') {
      newResults[index].userActionStatus = null; // Un-reject
      setRejectedCount(prevCount => prevCount - 1);
    } else if (newResults[index].userActionStatus === 'Shortlisted') {
      setShortlistedCount(prevCount => prevCount - 1); 
      newResults[index].userActionStatus = 'Rejected';
      setRejectedCount(prevCount => prevCount + 1);
      setShowRejectPopup(true);
      setTimeout(() => setShowRejectPopup(false), 3000);
    } else if (newResults[index].userActionStatus === null) {
      newResults[index].userActionStatus = 'Rejected';
      setRejectedCount(prevCount => prevCount + 1);
      setShowRejectPopup(true);
      setTimeout(() => setShowRejectPopup(false), 3000);
    }
    setResults(newResults);
    sessionStorage.setItem('resumeResults', JSON.stringify(newResults));
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
    if (result.userActionStatus === 'Shortlisted') {
      return 'green'; // green for user shortlisted
    }
    if (result.userActionStatus === 'Rejected' || (result.userActionStatus === null && result.initialStatus === 'Rejected')) {
      return 'rgb(201 39 27)'; 
    }

    // Fallback to initialStatus if userActionStatus is null
    switch (result.initialStatus) {
      case 'Shortlisted':
        return '#4CAF50'; 
      case 'Under Review':
        return '#eba10e'; 
      case 'Rejected':
        return '#F44336'; 
      default:
        return '#2196F3'; 
    }
  };

  // New helper function to check experience criteria
  const checkExperienceCriteria = (resume, criteria) => {
    const min = criteria.minExp;
    const max = criteria.maxExp;
    const totalExperienceMonths = resume.totalExperience;

    if (min === 0 && max === 0) {
      return true; // No experience criteria set, so it always meets
    }

    const minMonths = min * 12;
    const maxMonths = max * 12;

    if (minMonths > 0 && maxMonths > 0) {
      return totalExperienceMonths >= minMonths && totalExperienceMonths <= maxMonths;
    } else if (minMonths > 0) {
      return totalExperienceMonths >= minMonths;
    } else if (maxMonths > 0) {
      return totalExperienceMonths <= maxMonths;
    }
    return true; // Should not reach here if min or max are set, but for safety
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

  const underReviewResults = sortedResults.filter(r => r.userActionStatus === null && r.initialStatus !== 'Rejected');
  const shortlistedUserResults = sortedResults.filter(r => r.userActionStatus === 'Shortlisted' || (r.userActionStatus === null && r.initialStatus === 'Shortlisted'));
  const rejectedUserResults = sortedResults.filter(r => r.userActionStatus === 'Rejected' || (r.userActionStatus === null && r.initialStatus === 'Rejected'));

  const handleScrollToCategory = (category) => {
    switch (category) {
      case 'shortlisted':
        shortlistedResumesRef.current?.scrollIntoView({ behavior: 'smooth' });
        break;
      case 'rejected':
        rejectedResumesRef.current?.scrollIntoView({ behavior: 'smooth' });
        break;
      case 'all':
      default:
        allResumesRef.current?.scrollIntoView({ behavior: 'smooth' });
        break;
    }
  };

  // Add this handler
  const handleMoveToUnderReview = (index, fromShortlisted = false, fromRejected = false) => {
    const newResults = [...results];
    if (fromShortlisted && newResults[index].userActionStatus === 'Shortlisted') {
      setShortlistedCount(prev => Math.max(0, prev - 1));
    }
    if (fromRejected && newResults[index].userActionStatus === 'Rejected') {
      setRejectedCount(prev => Math.max(0, prev - 1));
    }
    newResults[index].userActionStatus = null;
    setResults(newResults);
    sessionStorage.setItem('resumeResults', JSON.stringify(newResults));
    setShowRestorePopup(true);
    setTimeout(() => setShowRestorePopup(false), 3000);
  };

  if (!criteria) {
    return <div>Loading results...</div>;
  }

  return (
    <div style={{ padding: '20px', maxWidth: '100%', minHeight: '100vh', margin: '0 auto', backgroundColor:'rgb(231, 233, 245)' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <button 
          className='res'
          onClick={() => navigate('/dashboard')}
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
            fontFamily: 'Tinos, serif',
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
              backgroundColor: 'white',
              fontFamily: 'Tinos, serif',
              // color: 'white',
            }}
          >
            <option value="score" >Sort by Score</option>
            <option value="experience" >Sort by Experience</option>
            <option value="name" >Sort by Name</option>
          </select>
          
          <button 
            className='res'
            onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
            style={{
              padding: '8px 16px',
              backgroundColor: '#201783',
              color: 'white',
              border: 'none',
              borderRadius: '6px',
              cursor: 'pointer',
              fontFamily: 'Tinos, serif',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              fontSize: '14px',
            }}
          >
            {sortOrder === 'asc' ? (
              <><FaSortAmountUpAlt style={{marginRight: '1px'}} />Asc</>
            ) : (
              <><FaSortAmountDownAlt style={{marginRight: '1px'}} />Desc</>
            )}
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

      <h2 style={{ textAlign: 'center', color: '#1b1b47', marginBottom: '20px', fontFamily: 'Times New Roman, Times, serif', }}>Resume Analysis Results</h2>

      {criteria && (
        <div style={{ 
          backgroundColor: '#f5f9ff',
          boxShadow: '0 0 8px rgba(0, 0, 0, 0.1)',
          padding: '15px',
          borderRadius: '12px',
          marginBottom: '20px',
        }}>
          <h3 style={{ margin: '0 0 10px 0', color: '#1b1b47', fontFamily: 'Tinos, serif' }}>Job Criteria:</h3>
          <p style={{ margin: '5px 0', color: '#1b1b47', fontFamily: 'Tinos, serif' }}><strong>Skills:</strong> {criteria.skills.join(', ')}</p>
          <p style={{ margin: '5px 0', color: '#1b1b47', fontFamily: 'Tinos, serif' }}><strong>Location:</strong> {criteria.location}</p>
          {criteria.minExp !== undefined && criteria.maxExp !== undefined && (
            <p style={{ margin: '5px 0',color: '#1b1b47', fontFamily: 'Tinos, serif' }}>
              <strong>Experience:</strong> {criteria.minExp === 0 && criteria.maxExp === 0 ? 'Any' :
                criteria.minExp > 0 && criteria.maxExp > 0 ? `${criteria.minExp} - ${criteria.maxExp} years` :
                criteria.minExp > 0 ? `${criteria.minExp}+ years` :
                `${criteria.maxExp} years or less`}
            </p>
          )}
        </div>
      )}

      <div style={{ marginBottom: '30px', fontFamily: 'Georgia, Times New Roman, Times, serif' }}>
        <ResumeUploader 
          criteria={criteria} 
          onResultsReady={handleResultsReady} 
          onScrollToCategory={handleScrollToCategory}
          shortlistedCount={shortlistedCount}
          rejectedCount={rejectedCount}
          totalResumesCount={results.length}
        />
      </div>

      <p ref={allResumesRef} style={{textAlign: 'center',fontFamily:'Tinos, serif',fontSize: '38px', color: '#a8730a', marginBottom: '20px' }}>Resumes Under Review</p>
      <div style={{ 
        backgroundColor: '#f5f9ff',
        boxShadow: '0 0 8px rgba(0, 0, 0, 0.1)',
        padding: '15px',
        borderRadius: '12px',
        marginBottom: '30px',
      }}>
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', 
          gap: '20px',
          padding: '20px 0'
        }}>
          {underReviewResults.length > 0 ? (
            underReviewResults.map((result, index) => (
              <div
                key={result.fileName}
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
                    <FaFilePdf className='pdf'
                      style={{ cursor: 'pointer', fontSize: '24px', color: 'white' }} 
                      onClick={() => handlePreview(result.fileName)}
                      title="Preview PDF"
                    />
                  )}
                </div>
                {/* <p style={{ margin: '5px 0' }}><strong>File:</strong> {result.fileName}</p> */}
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
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  gap: '10px',
                  marginTop: 'auto',
                  paddingTop: '10px',
                  borderTop: '2px solid rgba(255,255,255,0.2)'
                }}>
                  <FaTimes 
                    className="icon-cross" 
                    style={{ cursor: 'pointer', fontSize: '24px' }} 
                    onClick={() => handleReject(results.findIndex(r => r.fileName === result.fileName))}
                    title="Reject Resume"
                  />
                  <FaCheck 
                    className="icon-tick" 
                    style={{ cursor: 'pointer', fontSize: '24px' }} 
                    onClick={() => handleShortlist(results.findIndex(r => r.fileName === result.fileName))}
                    title="Shortlist Resume"
                  />
                </div>
              </div>
            ))
          ) : (
            <p style={{ fontFamily:'Tinos, serif', gridColumn: '1 / -1', textAlign: 'center', fontSize: '18px', color: '#555' }}>No resumes under review.</p>
          )}
        </div>
      </div>

      {shortlistedUserResults.length > 0 && (
        <>
          <hr style={{ border: 'none', borderTop: '1px solid grey', width: '100%' }} />
          <p ref={shortlistedResumesRef} style={{textAlign: 'center',fontFamily:'Tinos, serif',fontSize: '38px', color: 'green', marginBottom: '20px' }}>Shortlisted Resumes</p>
          <div style={{ marginTop: '40px', backgroundColor: '#f5f9ff', boxShadow: '0 0 8px rgba(0, 0, 0, 0.1)', padding: '15px', borderRadius: '12px', marginBottom: '30px' }}>
            
            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', 
              gap: '20px',
              padding: '20px 0'
            }}>
              {shortlistedUserResults.map((result, index) => (
                <div
                  key={result.fileName}
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
                      <FaFilePdf className='pdf'
                        style={{ cursor: 'pointer', fontSize: '24px', color: 'white' }} 
                        onClick={() => handlePreview(result.fileName)}
                        title="Preview PDF"
                      />
                    )}
                  </div>
                  {/* <p style={{ margin: '5px 0' }}><strong>File:</strong> {result.fileName}</p> */}
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
                  <div style={{
                    display: 'flex',
                    justifyContent: 'flex-end',
                    gap: '10px',
                    marginTop: 'auto',
                    paddingTop: '10px',
                    borderTop: '2px solid rgba(255,255,255,0.2)'
                  }}>
                    <FaRedo 
                      className="icon-redo-shortlisted" 
                      style={{ cursor: 'pointer', fontSize: '24px'}}
                      onClick={() => handleMoveToUnderReview(results.findIndex(r => r.fileName === result.fileName), true, false)}
                      title="Move to Resumes Under Review"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    <hr style={{
    border: 'none',
    borderTop: '1px solid grey',
    width: '100%',
  }}></hr>
      {rejectedUserResults.length > 0 && (
        <>
          <p ref={rejectedResumesRef} style={{textAlign: 'center',fontFamily:'Tinos, serif', fontSize:'38px', color: 'rgb(201 39 27)', marginBottom: '20px' }}>Rejected Resumes</p>
          <div style={{marginTop: '0px', backgroundColor: '#f5f9ff', boxShadow: '0 0 8px rgba(0, 0, 0, 0.1)', padding: '15px', borderRadius: '12px', marginBottom: '30px' }}>
            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', 
              gap: '20px',
              padding: '20px 0'
            }}>
              {rejectedUserResults.map((result, index) => {
                const isExperienceMet = checkExperienceCriteria(result, criteria);
                return (
                  <div
                    key={result.fileName}
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
                        <FaFilePdf className='pdf'
                          style={{ cursor: 'pointer', fontSize: '24px', color: 'white' }} 
                          onClick={() => handlePreview(result.fileName)}
                          title="Preview PDF"
                        />
                      )}
                    </div>
                    {/* <p style={{ margin: '5px 0' }}><strong>File:</strong> {result.fileName}</p> */}
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
                    <div style={{
                      display: 'flex',
                      justifyContent: 'flex-end',
                      gap: '10px',
                      marginTop: 'auto',
                      paddingTop: '10px',
                      borderTop: '2px solid rgba(255,255,255,0.2)'
                    }}>
                      <FaRedo 
                        className="icon-redo-rejected" 
                        style={{ cursor: isExperienceMet ? 'pointer' : 'not-allowed', fontSize: '24px', opacity: isExperienceMet ? 1 : 0.5 }}
                        onClick={isExperienceMet ? () => handleMoveToUnderReview(results.findIndex(r => r.fileName === result.fileName), false, true) : undefined}
                        title={isExperienceMet ? "Move to Resumes Under Review" : "Does not meet experience criteria"}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </>
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
      {showRejectPopup && (
        <div style={{
          position: 'fixed',
          bottom: '20px',
          right: '20px',
          backgroundColor: '#F44336',
          color: 'white',
          padding: '10px 20px',
          borderRadius: '5px',
          boxShadow: '0 2px 10px rgba(0,0,0,0.2)',
          zIndex: 1000,
          animation: 'fadeInOut 3s forwards',
          fontFamily: 'Georgia, Times New Roman, Times, serif'
        }}>
          Resume rejected!
        </div>
      )}
      {showRestorePopup && (
        <div style={{
          position: 'fixed',
          bottom: '20px',
          right: '20px',
          backgroundColor: 'rgb(235, 161, 14)',
          color: 'white',
          padding: '10px 20px',
          borderRadius: '5px',
          boxShadow: '0 2px 10px rgba(0,0,0,0.2)',
          zIndex: 1000,
          animation: 'fadeInOut 3s forwards',
          fontFamily: 'Georgia, Times New Roman, Times, serif'
        }}>
          Resume restored!
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