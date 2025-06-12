import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';

export default function ResumeResults() {
  const [sortBy, setSortBy] = useState('score');
  const [sortOrder, setSortOrder] = useState('desc');
  const [results, setResults] = useState([]);
  const [criteria, setCriteria] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedResults = sessionStorage.getItem('resumeResults');
    const storedCriteria = sessionStorage.getItem('jobCriteria');
    
    if (storedResults && storedCriteria) {
      setResults(JSON.parse(storedResults));
      setCriteria(JSON.parse(storedCriteria));
    } else {
      // If no results or criteria found, redirect back to dashboard
      navigate('/dashboard');
    }
  }, [navigate]);

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

  const getCardColor = (status) => {
    switch (status) {
      case 'Shortlisted':
        return '#4CAF50'; // Green
      case 'Under Review':
        return '#FFC107'; // Yellow
      case 'Rejected':
        return '#F44336'; // Red
      default:
        return '#2196F3'; // Blue or default
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

  if (!criteria) {
    return <div>Loading results...</div>; // Or a more sophisticated loading state
  }

  return (
    <div style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <button 
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
            fontSize: '16px'
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
              border: '1px solid #ccc'
            }}
          >
            <option value="score">Sort by Score</option>
            <option value="experience">Sort by Experience</option>
            <option value="name">Sort by Name</option>
          </select>
          
          <button
            onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
            style={{
              padding: '8px 16px',
              backgroundColor: '#1f3d72',
              color: 'white',
              border: 'none',
              borderRadius: '6px',
              cursor: 'pointer'
            }}
          >
            {sortOrder === 'asc' ? '↑ Ascending' : '↓ Descending'}
          </button>
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
          <h3 style={{ margin: '0 0 10px 0', color: '#2a4d8f' }}>Job Criteria:</h3>
          <p style={{ margin: '5px 0' }}><strong>Skills:</strong> {criteria.skills.join(', ')}</p>
          <p style={{ margin: '5px 0' }}><strong>Location:</strong> {criteria.location}</p>
        </div>
      )}

      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', 
        gap: '20px',
        padding: '20px 0'
      }}>
        {sortedResults.map((result, index) => (
          <div
            key={index}
            style={{
              display: 'flex',
              flexDirection: 'column',
              backgroundColor: getCardColor(result.status),
              color: 'white',
              padding: '20px',
              borderRadius: '10px',
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
          </div>
        ))}
      </div>
    </div>
  );
}