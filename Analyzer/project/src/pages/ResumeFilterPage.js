import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaHome, FaSignOutAlt} from 'react-icons/fa';
import JobCriteriaForm from '../components/JobCriteriaForm';
import '../App.css'

export default function ResumeFilterPage() {
  const [criteria, setCriteria] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if(!token){
      navigate('/login');
    }

    // Load criteria from sessionStorage on component mount
    const storedCriteria = sessionStorage.getItem('jobCriteria');
    if (storedCriteria) {
      setCriteria(JSON.parse(storedCriteria));
    }
  }, [navigate]);

  const handleCriteriaSubmit = (formData) => {
    console.log('ResumeFilterPage: Criteria submitted:', formData); // Debug log
    setCriteria(formData);
    sessionStorage.setItem('jobCriteria', JSON.stringify(formData));
    
    // Clear previous resume results from session storage
    sessionStorage.removeItem('resumeResults');
    
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
      </div>
    </div>
  );
}