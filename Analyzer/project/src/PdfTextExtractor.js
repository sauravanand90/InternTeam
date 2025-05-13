// import React, { useState } from 'react';
// import * as pdfjsLib from 'pdfjs-dist';
// import pdfjsWorker from 'pdfjs-dist/build/pdf.worker.entry';

// pdfjsLib.GlobalWorkerOptions.workerSrc = pdfjsWorker;

// function ResumeSkillFilter() {
//     const [skillsInput, setSkillsInput] = useState('');
//     const [requiredSkills, setRequiredSkills] = useState([]);
//     const [status, setStatus] = useState('');
//     const [loading, setLoading] = useState(false);
//     const [skillSetLocked, setSkillSetLocked] = useState(false);
  
//     const handleSkillSubmit = () => {
//       const skills = skillsInput
//         .toLowerCase()
//         .split(',')
//         .map(skill => skill.trim())
//         .filter(skill => skill);
      
//       if (skills.length === 0) {
//         alert('Please enter at least one skill.');
//         return;
//       }
  
//       setRequiredSkills(skills);
//       setSkillSetLocked(true);
//       setStatus('');
//     };
  
//     const handleFileUpload = async (event) => {
//       if (requiredSkills.length === 0) {
//         alert('Please enter required skills before uploading a resume.');
//         return;
//       }
  
//       const file = event.target.files[0];
//       if (!file || file.type !== 'application/pdf') {
//         alert('Please upload a valid PDF file.');
//         return;
//       }
  
//       setLoading(true);
//       const reader = new FileReader();
  
//       reader.onload = async function () {
//         try {
//           const typedArray = new Uint8Array(reader.result);
//           const pdf = await pdfjsLib.getDocument({ data: typedArray }).promise;
  
//           let allText = '';
//           for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
//             const page = await pdf.getPage(pageNum);
//             const content = await page.getTextContent();
//             const text = content.items.map((item) => item.str).join(' ');
//             allText += text + '\n';
//           }
  
//           const resumeLower = allText.toLowerCase();
//           const matched = requiredSkills.filter(skill =>
//             resumeLower.includes(skill)
//           );
  
//           if (matched.length === requiredSkills.length) {
//             setStatus('Shortlisted');
//           } else {
//             setStatus('Rejected');
//           }
  
//           setLoading(false);
//         } catch (error) {
//           console.error('Error reading PDF:', error);
//           setLoading(false);
//         }
//       };
  
//       reader.readAsArrayBuffer(file);
//     };
  
//     return (
//       <div style={{ padding: '20px' }}>
//         <h2>Resume Shortlisting by Skills</h2>
  
//         {!skillSetLocked && (
//           <>
//             <label>Enter required skills (comma-separated):</label><br />
//             <input
//               type="text"
//               value={skillsInput}
//               onChange={(e) => setSkillsInput(e.target.value)}
//               placeholder="e.g., React, Node.js, Python"
//               style={{ width: '100%', padding: '8px', marginTop: '5px' }}
//             />
//             <button onClick={handleSkillSubmit} style={{ marginTop: '10px' }}>
//               Submit Skills
//             </button>
//           </>
//         )}
  
//         {skillSetLocked && (
//           <>
//             <p><strong>Required Skills:</strong> {requiredSkills.join(', ')}</p>
//             <input type="file" accept="application/pdf" onChange={handleFileUpload} />
//           </>
//         )}
  
//         {loading && <p>Extracting resume text...</p>}
  
//         {status && (
//           <div style={{ marginTop: '20px', color: status === 'Shortlisted' ? 'green' : 'red' }}>
//             <h3>Candidate is {status}</h3>
//           </div>
//         )}
//       </div>
//     );
//   }
  
//   export default ResumeSkillFilter;