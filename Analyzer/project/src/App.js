import React from 'react';
import { useState } from 'react';
import JobCriteriaForm from './components/JobCriteriaForm';
import ResumeUploader from './components/ResumeUploader';
import ResumeResults from './components/ResumeResults';
import ResumeFilterPage from './pages/ResumeFilterPage';
import LoginPage from './login/LoginPage'
import './App.css'

function App() {
  return (
    <div>
      <ResumeFilterPage />
      {/* <LoginPage /> */}
    </div>
  );
}

// function App() {
//   const [criteria, setCriteria] = useState(null);
//   const [results, setResults] = useState([]);

//   return (
//     <div className='container'>
//       <h1>Resume Analyzer</h1>
//       {!criteria ? (
//         <JobCriteriaForm onSubmit={setCriteria} />
//       ) : (
//         <>
//           <ResumeUploader criteria={criteria} onResults={setResults} />
//           {results.length > 0 && <ResumeResults results={results} />}
//         </>
//       )}
//     </div>
//   );
// }

export default App;