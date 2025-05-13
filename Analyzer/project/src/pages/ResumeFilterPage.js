// src/pages/ResumeFilterPage.jsx
import { useState } from 'react';
import JobCriteriaForm from '../components/JobCriteriaForm';
import ResumeUploader from '../components/ResumeUploader';
import '../App.css'

export default function ResumeFilterPage() {
  const [criteria, setCriteria] = useState(null);

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