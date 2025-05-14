import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import JobCriteriaForm from '../components/JobCriteriaForm';
import ResumeUploader from '../components/ResumeUploader';
import '../App.css'

export default function ResumeFilterPage() {
  const [criteria, setCriteria] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if(!token){
      navigate('/login');
    }
  }, [navigate]);

  // const handleLogout = () => {               //Can be used after adding a logout button
  //   localStorage.removeItem('token');
  //   navigate('/login');
  // };

  const handleCriteriaSubmit = (formData) => {
    setCriteria(formData);
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>Resume Analyzer</h1>

      <div style={{ marginBottom: '30px' }}>
        <JobCriteriaForm onSubmit={handleCriteriaSubmit} />
      </div>

      {criteria && (
        <ResumeUploader criteria={criteria} />
      )}
    </div>
  );
}