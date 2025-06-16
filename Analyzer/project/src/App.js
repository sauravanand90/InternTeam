import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
//import { useState } from 'react';
//import JobCriteriaForm from './components/JobCriteriaForm';
//import ResumeUploader from './components/ResumeUploader';
import ResumeResults from './components/ResumeResults';
import ResumeFilterPage from './pages/ResumeFilterPage';
import LoginPage from './login/LoginPage'
import ProtectedRoute from './components/ProtectedRoute';
import RegisterPage from './login/RegisterPage';
import ShortlistedResumesPage from './pages/ShortlistedResumesPage';
import './App.css'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/results" element={<ResumeResults />} />  
        <Route path="/shortlisted-resumes" element={<ShortlistedResumesPage />} />
        <Route path="/dashboard" element={
          <ProtectedRoute>
            <ResumeFilterPage />
          </ProtectedRoute>
        }   />
      </Routes>
    </Router>
  );
}

export default App;