import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaHome, FaSignOutAlt} from 'react-icons/fa';
import JobCriteriaForm from '../components/JobCriteriaForm';
import ResumeUploader from '../components/ResumeUploader';
import '../App.css'

export default function ResumeFilterPage() {
  const [criteria, setCriteria] = useState(null);
  const [processedResults, setProcessedResults] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if(!token){
      navigate('/login');
    }
  }, [navigate]);

  const handleCriteriaSubmit = (formData) => {
    setCriteria(formData);
    setProcessedResults(null); // Reset results when new criteria are submitted
  };

  const handleResultsReady = (results, currentCriteria) => {
    setProcessedResults(results);
    // Store results and criteria in session storage to pass to the next page
    sessionStorage.setItem('resumeResults', JSON.stringify(results));
    sessionStorage.setItem('jobCriteria', JSON.stringify(currentCriteria));
  };

  const handleNextClick = () => {
    navigate('/results');
  };

  return (
    <div className="resume-filter-page">
      <div className="navbar">
        <div style={{ flex: 1, display: 'flex', justifyContent: 'flex-start' }}>
          <button className="nav-btn" onClick={() => window.location.reload()} title="Home"><FaHome size={20} /></button>
        </div>
        <h1>Resume Analyzer</h1>
        <div style={{ flex: 1, display: 'flex', justifyContent: 'flex-end', paddingRight: '60px' }}>
          <button className="nav-btn" onClick={() => {
            localStorage.removeItem('token');
            navigate('/login');
          }} title="Logout"><FaSignOutAlt size={20} /></button>
        </div>
      </div>
      <div style={{ padding: '20px' }}>
        <div style={{ marginBottom: '30px' }}>
          <JobCriteriaForm onSubmit={handleCriteriaSubmit} />
        </div>

        {criteria && (
          <ResumeUploader criteria={criteria} onResultsReady={handleResultsReady} />
        )}

        {processedResults && processedResults.length > 0 && (
          <div style={{ textAlign: 'center', marginTop: '30px' }}>
            <button 
              onClick={handleNextClick}
              style={{
                padding: '10px 20px',
                backgroundColor: '#1f3d72',
                color: 'white',
                border: 'none',
                borderRadius: '6px',
                cursor: 'pointer',
                fontSize: '18px',
                fontWeight: 'bold'
              }}
            >
              View Ranked Resumes
            </button>
          </div>
        )}
      </div>
    </div>
  );
}