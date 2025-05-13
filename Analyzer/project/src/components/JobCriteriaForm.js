import { useState } from 'react';
import Select from 'react-select';

const skillOptions = [
  { value: 'javascript', label: 'JavaScript' }, { value: 'django', label: 'Django' },
  { value: 'react', label: 'React' }, { value: 'flask', label: 'Flask' },
  { value: 'nodejs', label: 'Node.js' }, { value: 'spring', label: 'Spring' },
  { value: 'python', label: 'Python' }, { value: 'java', label: 'Java' }, 
  { value: 'c', label: 'C' }, { value: 'c++', label: 'C++' },
  { value: 'c#', label: 'C#' }, { value: 'git', label: 'Git' },
  { value: 'sql', label: 'SQL' }, { value: 'docker', label: 'Docker' },
  { value: 'html', label: 'HTML' }, { value: 'kubernetes', label: 'Kubernetes' },
  { value: 'css', label: 'CSS' }, { value: 'aws', label: 'AWS' },
  { value: 'angular', label: 'Angular' }, { value: 'azure', label: 'Kubernetes' },
  { value: 'vue', label: 'Vue' }, { value: 'linux', label: 'Linux' },
  { value: 'express', label: 'Express' }, { value: 'machine learning', label: 'Machine Learning' },
  { value: 'mongodb', label: 'MongoDB' }, { value: 'deep learning', label: 'Deep Learning' },
  { value: 'mysql', label: 'MySQL' }, { value: 'tensorflow', label: 'Tensorflow' },
  { value: 'postgresql', label: 'PostgreSQL' }, { value: 'pytorch', label: 'Pytorch' },
  // Add more skills as needed
];

export default function JobCriteriaForm({ onSubmit }) {
  const [skills, setSkills] = useState([]);
  const [location, setLocation] = useState('');
  const [minExp, setMinExp] = useState('');
  const [maxExp, setMaxExp] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({
      skills: skills.map(option => option.value),
      location: location.toLowerCase(),
      minExp: parseInt(minExp),
      maxExp: parseInt(maxExp),
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <label for="skill-select"><strong>Select or Add Skills:</strong></label>
      <Select
        options={skillOptions}
        isMulti
        onChange={setSkills}
        placeholder="Type or Select Skills..."
      />
      <label><strong>Enter Preferred Locations (comma separated):</strong></label>
      <input id="location-input" placeholder="e.g. Bangalore, Hyderabad, Pune" onChange={e => setLocation(e.target.value)} />

      <label><strong>Experience Range (Years):</strong></label>
      <input type="number" placeholder="From" onChange={e => setMinExp(e.target.value)} />
      <input type="number" placeholder="To" onChange={e => setMaxExp(e.target.value)} />
      
      <button className="submit" type="submit">Submit Criteria</button>
    </form>
  );
}